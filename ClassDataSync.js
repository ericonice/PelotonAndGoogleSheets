const Limit = 500;
const DataColumns = [
  'difficulty_estimate',
  'overall_estimate',
  'difficulty_rating_avg',
  'difficulty_rating_count',
  'difficulty_level',
  'duration',
  'fitness_discipline',
  'fitness_discipline_display_name',
  'id',
  'overall_rating_avg',
  'overall_rating_count',
  'rating',
  'series_id',
  'title',
  'total_ratings',
  'total_workouts',
  'total_user_workouts',
  'is_favorite'   
];
      
const InstructorColumn = 'instructor';
const ClassTimestampColumn = 'class_timestamp';
const RideTypeColumn = 'ride_type';


function getAllClassData() {
  try {
    var spreadsheet = getSpreadsheetOrDefault();
    var sheet = spreadsheet.getSheetByName(ClassDataSheetName);

        
    var properties = getSpreadsheetProperties(spreadsheet, 2);
    var userIdAndCookie = authorize(properties.username, properties.password);

    // Create the header row 
    var rows = [];
    var rowPosition = 1;
    var headerRow = [InstructorColumn, ClassTimestampColumn, RideTypeColumn].concat(DataColumns);    
    rows.push(headerRow);
    sheet.getRange(rowPosition++, 1, 1, rows[0].length).setValues(rows);

    var total = 0;
    var page = 0;
    var rowPosition = 2;
    var page_count;
    var expectedTotal;
    var first = true;
    do {
      var classData = getClassData(userIdAndCookie, page++, Limit);           
      var rows = processClassData(classData);
      sheet.getRange(rowPosition, 1, rows.length, rows[0].length).setValues(rows);
      rowPosition += rows.length;
      total += rows.length;
      
      if (first) {
        expectedTotal = classData.total;    
        page_count = classData.page_count;
        first = false;
      }    
    }
    while (page < page_count);
    
    var results = {
      expectedTotal: expectedTotal,
      actualTotal: total
    };

    console.log(JSON.stringify(results, null, 2));    
    
  } catch (e) {
    console.log(e);
  }
  
}

function getClassData(userIdAndCookie, page, limit) {
  var url = 'https://api.onepeloton.com/api/v2/ride/archived?browse_category=cycling&sort_by=original_air_time&desc=false&page=' + page + '&limit=' + limit;    
  var header = {"Cookie": userIdAndCookie.cookie};
  var options = {"headers": header};
  var response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText()); 
}

function processClassData(classData) {
  var rows = [];
  
  var instructors = classData.instructors;
  var data = classData.data;
  var rideTypes = classData.ride_types;
  
  var instructorsById = {};
  instructors.forEach(instructor => {
    instructorsById[instructor.id] = instructor.name;
  });
  
  var rideTypesById = {};  
  rideTypes.forEach(rideType => {
    rideTypesById[rideType.id] = rideType.name;
  });
             
  classData.data.forEach(d => {
    var row = [];
    
    // Process fields which need transformations separately
    row.push(instructorsById[d.instructor_id]);
    row.push(new Date(d.original_air_time *1000));
    row.push(rideTypesById[d.ride_type_id]);
  
    // Add all of the columns which do not require any transformations
    DataColumns.forEach(value => {
      row.push(d[value]);
     });
      
    rows.push(row);
  });
    
  return rows;    
}

