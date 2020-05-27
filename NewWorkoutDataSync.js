const WorkoutLimit = 100;

const WorkoutProperties = [
  'workout_id',
  'ride_id',
  'workout_timestamp',
  'class_timestamp',
  'title',
  'fitness_discipline',
  'ride_type',
  'instructor',
  'length',
  'difficulty_estimate',
  'overall_estimate',
  'difficulty_rating_avg',
  'difficulty_rating_count',
  'difficulty_level',
  'overall_rating_avg',
  'overall_rating_count',
  'rating',
  'total_workouts'
];

const MetricProperties = [
  'total_calories',
  'total_distance',
  'total_output',
  'max_output',
  'avg_output',
  'max_cadence',
  'avg_cadence',
  'max_resistance',
  'avg_resistance',
  'max_speed',
  'avg_speed',
  'max_heart_rate',
  'avg_heart_rate'
];

function updateRecentWorkoutData() {
  try {
    var spreadsheet = getSpreadsheetOrDefault();
    var sheet = spreadsheet.getSheetByName(WorkoutDataSheetName);
    var lastWorkoutId = sheet.getRange(2, 1).getValue();
    var workoutData = getWorkoutData(spreadsheet, lastWorkoutId, 5);
    
    // Add the new workouts at the beginning
    var newWorkouts = workoutData.workouts;
    if (newWorkouts.length > 0) {
      sheet.insertRows(2, newWorkouts.length);
      sheet.getRange(2, 1, newWorkouts.length, newWorkouts[0].length).setValues(newWorkouts);
    }

    var totalRows = sheet.getLastRow() - 1;
    var results = {
      operation: 'Update recent workouts',
      addedWorkouts: newWorkouts.length,
      expectedTotal: workoutData.expectedTotal, 
      actualTotal: totalRows
    };

    console.log(JSON.stringify(results, null, 2));    
    
  } catch (e) {
    console.log(e);
  }
}  
  
function updateAllWorkoutData() {
  try {
    var spreadsheet = getSpreadsheetOrDefault();
    var sheet = spreadsheet.getSheetByName(WorkoutDataSheetName);    

    // Create the header row 
    var rows = [WorkoutProperties.concat(MetricProperties)];
    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);  
    
    // Add the new workouts
    var workoutData = getWorkoutData(spreadsheet, '', 500);    
    var newWorkouts = workoutData.workouts;
    sheet.getRange(2, 1, newWorkouts.length, newWorkouts[0].length).setValues(newWorkouts);
            
    var results = {
      operation: 'Update all workouts',
      expectedTotal: workoutData.expectedTotal,
      actualTotal: total
    };

    console.log(JSON.stringify(results, null, 2));    
    
  } catch (e) {
    console.log(e);
  }
  
}

function getWorkoutData(spreadsheet, lastWorkoutId, limit) {
  var properties = getSpreadsheetProperties(spreadsheet, 2);
  var userIdAndCookie = authorize(properties.username, properties.password);
  
  var metadata = getMetadata();
  
  var total = 0;
  var page = 0;
  var rowPosition = 2;
  var page_count;
  var expectedTotal;
  var first = true;
  var foundWorkoutId = false;
  var newWorkouts = [];
  do {
    var workoutData = getWorkoutDataResponse(userIdAndCookie, page++, limit);           
    
    // Process the data, stopping if we find the last workout ID
    var processedWorkouts = processWorkoutData(userIdAndCookie, metadata, workoutData, lastWorkoutId);
    newWorkouts = newWorkouts.concat(processedWorkouts);
    
    // If the number of processed workouts is less than the count, we found the workout Id
    foundWorkoutId = (processedWorkouts < workoutData.count);
    
    if (first) {
      page_count = workoutData.page_count;
      expectedTotal = workoutData.total; 
      first = false;
    }    
    
    console.log('Processed page ' + page + ' containing ' + processedWorkouts.length + ' workouts.'); 
  }
  while (!foundWorkoutId && (page < page_count));
  
  return {
    workouts: newWorkouts,
    expectedTotal: expectedTotal
  }
}

function processWorkoutData(userIdAndCookie, metadata, workoutData, stopOnWorkoutId) {
  var rows = [];
  
  var data = workoutData.data;
  
  var instructors = metadata.instructors;
  var rideTypes = metadata.rideTypes; 
             
  for (let d of data) {
    var workoutId = d.id;
    if (d.id == stopOnWorkoutId) {
      break;
    }
    
    var row = [];    
    var ride = d.ride;
    
    for (let value of WorkoutProperties) {
      switch (value) {
        case 'instructor':
          row.push(instructors[ride.instructor_id]);
          break;
        case 'class_timestamp':
          row.push(new Date(ride.original_air_time *1000).toString());
          break;
        case 'workout_timestamp':
          row.push(new Date(d.start_time *1000).toString());
          break;
        case 'ride_type':
          row.push(rideTypes[ride.ride_type_id]);
          break;
        case 'length':
          row.push(ride.duration/60);
          break;
        case 'workout_id':
          row.push(d.id);
          break;
        case 'ride_id':
          row.push(ride.id);
          break;
        case 'fitness_discipline':
          row.push(d.fitness_discipline);
          break;
        default:      
         row.push(ride[value]);
      }
    }
      
    // Add the metrics
    var metrics = getWorkoutMetrics(userIdAndCookie, d.id);
    for (let value of MetricProperties) {
      row.push(metrics[value]); 
    };

    rows.push(row);
  }
    
  return rows;    
}

function getMetadata() {
  var url = 'https://api.onepeloton.com/api/ride/metadata_mappings';    
  var response = UrlFetchApp.fetch(url);
  var metadata = JSON.parse(response.getContentText()); 
  
  var instructorsById = {};
  var instructors = metadata.instructors;
  instructors.forEach(instructor => {
    instructorsById[instructor.id] = instructor.name;
  });
  
  var rideTypesById = {};  
  var rideTypes = metadata.class_types;
  rideTypes.forEach(rideType => {
    rideTypesById[rideType.id] = rideType.name;
  });
  
  return {
    instructors : instructorsById,
    rideTypes : rideTypesById
  }
}

function getWorkoutDataResponse(userIdAndCookie, page, limit) {
  var url = 'https://api.onepeloton.com/api/user/' 
    + userIdAndCookie.userId 
    + '/workouts?&joins=ride&sort_by=created_at&desc=true&page=' 
    + page + '&limit=' + limit;    
  
  var header = {"Cookie": userIdAndCookie.cookie};
  var options = {"headers": header};
  var response = UrlFetchApp.fetch(url, options);
  
  return JSON.parse(response.getContentText()); 
}

function getWorkoutMetrics(userIdAndCookie, workoutId, interval = 10000) {
  var url = 'https://api.onepeloton.com/api/workout/' + workoutId 
    + '/performance_graph?every_n=' + interval; 
  
  var header = {"Cookie": userIdAndCookie.cookie};
  var options = {"headers": header};
  var response = UrlFetchApp.fetch(url, options);
  
  var metrics = JSON.parse(response.getContentText()); 
  
  var values = new Map();
  metrics.summaries.forEach(data => {
    switch (data.slug) {
      case 'distance':
        values['total_distance'] = data.value;
        break;
      case 'calories':
        values['total_calories'] = data.value;
        break;
      case 'total_output':
        values['total_output'] = data.value;
        break;
      default:
        throw 'Unexpected slug ' + data.slug;
    }
  });
  
  metrics.metrics.forEach(data => {
    switch (data.slug) {
      case 'output':
        values['max_output'] = data.max_value;
        values['avg_output'] = data.average_value;
        break;
      case 'cadence':
        values['max_cadence'] = data.max_value;
        values['avg_cadence'] = data.average_value;
        break;
      case 'resistance':
        values['max_resistance'] = data.max_value;
        values['avg_resistance'] = data.average_value;
        break;
      case 'speed':
        values['max_speed'] = data.max_value;
        values['avg_speed'] = data.average_value;
        break;
      case 'heart_rate':
        values['max_heart_rate'] = data.max_value;
        values['avg_heart_rate'] = data.average_value;
        break;
      default:
        throw 'Unexpected slug ' + data.slug;
    };
  });
  
  return values;  
}