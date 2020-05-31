const ClassProperties = [
  'ride_id',
  'original_air_time',
  'ride_type',
  'powerzone_type',
  'fitness_discipline',
  'title',
  'instructor',
  'difficulty_estimate',
  'overall_estimate',
  'difficulty_rating_avg',
  'difficulty_rating_count',
  'difficulty_level',
  'length',
  'overall_rating_avg',
  'overall_rating_count',
  'rating',
  'total_ratings',
  'total_workouts',
  'total_user_workouts',
  'is_favorite'
];

function ClassDataSyncer(spreadsheetId, limit) {
  this.spreadsheetId = spreadsheetId;
  this.limit = limit;
}

ClassDataSyncer.prototype = {
  initialize: function () {
    this.spreadsheet = new Spreadsheet(this.spreadsheetId);
    this.classSheet = this.spreadsheet.classSheet;
    this.properties = this.spreadsheet.getProperties();
    this.username = this.properties.username;
    this.password = this.properties.password;
    this.login();
  },

  login: function () {
    var userIdAndCookie = authorize(this.username, this.password);
    this.userId = userIdAndCookie.userId;
    this.cookie = userIdAndCookie.cookie;
  },

  verify: function (expectedTotal, actualTotal) {
    if (expectedTotal != actualTotal) {
      throw 'Expected classes (' + expectedTotal + ') is different from actual classes (' + actualTotal + ')';
    }
  },

  updateRecentClassData: function () {
    this.lastClassId = this.classSheet.getRange(2, 1).getValue();
    if (this.lastClassId == null) {
      throw 'No previous class.  Please first update all classes.';
    }

    var classData = this.getClassData();

    // Insert the new classes at the beginning 
    var newClasses = classData.classes;
    if (newClasses.length > 0) {
      this.classSheet.insertRows(2, newClasses.length);
      this.classSheet.getRange(2, 1, newClasses.length, newClasses[0].length).setValues(newClasses);
    }

    // Update properties
    var refreshDate = new Date().toString();
    var currentClassCount = this.classSheet.getLastRow() - 1;
    this.spreadsheet.setProperty('lastClassRefreshDate', refreshDate);
    this.spreadsheet.setProperty('lastClassTotal', currentClassCount);

    this.verify(classData.expectedTotal, currentClassCount);

    return {
      operation: 'Update recent classes',
      previousRefreshDate: this.properties.lastClassRefreshDate,
      previousClassCount: this.properties.lastClassTotal,
      addedClasses: newClasses.length,
      expectedTotal: classData.expectedTotal,
      actualTotal: currentClassCount
    };
  },

  updateAllClassData: function () {
    // Create the header row 
    var rows = [ClassProperties];
    this.classSheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);

    // Add the new classes
    var classData = this.getClassData();
    var newClasses = classData.classes;
    this.classSheet.getRange(2, 1, newClasses.length, newClasses[0].length).setValues(newClasses);

    // Update properties
    var refreshDate = new Date().toString();
    var currentClassCount = this.classSheet.getLastRow() - 1;
    this.spreadsheet.setProperty('lastClassRefreshDate', refreshDate);
    this.spreadsheet.setProperty('lastClassTotal', currentClassCount);

    this.verify(classData.expectedTotal, currentClassCount);

    return {
      operation: 'Update all classes',
      previousRefreshDate: this.properties.lastClassRefreshDate,
      previousClassCount: this.properties.lastClassTotal,
      addedClasses: newClasses.length,
      expectedTotal: classData.expectedTotal,
      actualTotal: currentClassCount
    };
  },

  getClassData: function () {
    var total = 0;
    var page = 0;
    var rowPosition = 2;
    var page_count;
    var expectedTotal;
    var first = true;
    var foundRideId = false;
    var newClasses = [];
    do {
      var classData = this.getClassDataResponse(page++);

      // Process the data, stopping if we find the last ride ID
      var processedClasses = this.processClassData(classData);
      newClasses = newClasses.concat(processedClasses);

      // If the number of processed classes is less than the count, we found the ride Id
      foundRideId = (processedClasses.length < classData.count);

      if (first) {
        page_count = classData.page_count;
        expectedTotal = classData.total;
        first = false;
      }

      // Log progress if syncing all classes (which is case when there is no last class Id)
      if (this.lastClassId == null) {
        console.log('Processed page ' + page + ' containing ' + processedClasses.length + ' classes.');
      }
    }
    while (!foundRideId && (page < page_count));

    return {
      classes: newClasses,
      expectedTotal: expectedTotal
    };
  },

  processClassData: function (classData) {
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

    for (let d of classData.data) {
      if (d.id == this.lastClassId) {
        break;
      }

      var row = [];
      for (let value of ClassProperties) {
        switch (value) {
          case 'instructor':
            row.push(instructorsById[d.instructor_id]);
            break;
          case 'original_air_time':
            row.push(new Date(d.original_air_time * 1000).toString());
            break;
          case 'ride_type':
            row.push(rideTypesById[d.ride_type_id]);
            break;
          case 'length':
            row.push(d.duration / 60);
            break;
          case 'ride_id':
            row.push(d.id);
            break;
          case 'powerzone_type':
            row.push(getPowerzoneType(d.title));
            break;
          default:      
            row.push(d[value]);
        }
      }

      rows.push(row);
    }

    return rows;
  },

  getClassDataResponse: function (page) {
    var url = `https://api.onepeloton.com/api/v2/ride/archived?browse_category=cycling&sort_by=original_air_time&true=false&page=${page}&limit=${this.limit}`;
    var header = { "Cookie": this.cookie };
    var options = { "headers": header };
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }
};



