const WorkoutProperties = [
  'workout_id',
  'ride_id',
  'workout_timestamp',
  'class_timestamp',
  'title',
  'fitness_discipline',
  'ride_type',
  'powerzone_type',
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

function WorkoutDataSyncer(spreadsheetId, limit, useSampleData = false) {
  this.spreadsheetId = spreadsheetId;
  this.useSampleData = useSampleData;
  this.limit = limit;
}

WorkoutDataSyncer.prototype = {
  initialize: function() {
    this.spreadsheet = new Spreadsheet(this.spreadsheetId);
    this.workoutSheet = this.spreadsheet.workoutSheet;
    this.properties = this.spreadsheet.getProperties();
    this.username = this.properties.username;
    this.password = this.properties.password;
    this.login();
    this.setMetadata();
  },

  login: function() {
    if (!this.useSampleData) {
      var userIdAndCookie = authorize(this.username, this.password);
      this.userId = userIdAndCookie.userId;
      this.cookie = userIdAndCookie.cookie;
    }
  },

  verify: function(expectedTotal, actualTotal) {
    if (expectedTotal != actualTotal) {
      throw 'Expected workouts (' + expectedTotal + ') is different from actual workouts (' + actualTotal + ')';
    }
  },
  
  updateRecentWorkoutData: function() {
    this.lastWorkoutId = this.workoutSheet.getRange(2, 1).getValue();
    if (this.lastWorkoutId == null) {
      throw 'No previous workouts.  Please first update all workouts.'
    }

    var workoutData = this.getWorkoutData();
    
    // Insert the new workouts at the beginning 
    var newWorkouts = workoutData.workouts;
    if (newWorkouts.length > 0) {
      this.workoutSheet.insertRows(2, newWorkouts.length);
      this.workoutSheet.getRange(2, 1, newWorkouts.length, newWorkouts[0].length).setValues(newWorkouts);
    }

    // Update properties
    var refreshDate = new Date().toString();
    var currentWorkoutCount = this.workoutSheet.getLastRow() - 1;
    this.spreadsheet.setProperty('lastWorkoutRefreshDate', refreshDate);
    this.spreadsheet.setProperty('lastWorkoutTotal', currentWorkoutCount);

    this.verify(workoutData.expectedTotal, currentWorkoutCount);
    
    return {
      operation: 'Update recent workouts',
      previousRefreshDate : this.properties.lastWorkoutRefreshDate, 
      previousWorkoutCount : this.properties.lastWorkoutTotal, 
      addedWorkouts: newWorkouts.length,
      expectedTotal: workoutData.expectedTotal, 
      actualTotal: currentWorkoutCount
    };
  },
  
  updateAllWorkoutData: function() {
    // Create the header row 
    var rows = [WorkoutProperties.concat(MetricProperties)];
    this.workoutSheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);  
    
    // Add the new workouts
    var workoutData = this.getWorkoutData();    
    var newWorkouts = workoutData.workouts;
    this.workoutSheet.getRange(2, 1, newWorkouts.length, newWorkouts[0].length).setValues(newWorkouts);

    // Update properties
    var refreshDate = new Date().toString();
    var currentWorkoutCount = this.workoutSheet.getLastRow() - 1;
    this.spreadsheet.setProperty('lastWorkoutRefreshDate', refreshDate);
    this.spreadsheet.setProperty('lastWorkoutTotal', currentWorkoutCount);

    this.verify(workoutData.expectedTotal, currentWorkoutCount);

    return {
      operation: 'Update all workouts',
      previousRefreshDate : this.properties.lastWorkoutRefreshDate, 
      previousWorkoutCount : this.properties.lastWorkoutTotal, 
      addedWorkouts: newWorkouts.length,
      expectedTotal: workoutData.expectedTotal, 
      actualTotal: currentWorkoutCount
    };
  },

  getWorkoutData: function() {    
    var total = 0;
    var page = 0;
    var rowPosition = 2;
    var page_count;
    var expectedTotal;
    var first = true;
    var foundWorkoutId = false;
    var newWorkouts = [];
    do {
      var workoutData = this.getWorkoutDataResponse(page++);           
      
      // Process the data, stopping if we find the last workout ID
      var processedWorkouts = this.processWorkoutData(workoutData);
      newWorkouts = newWorkouts.concat(processedWorkouts);
      
      // If the number of processed workouts is less than the count, we found the workout Id
      foundWorkoutId = (processedWorkouts.length < workoutData.count);
      
      if (first) {
        page_count = workoutData.page_count;
        expectedTotal = workoutData.total; 
        first = false;
      }    
     
      // Log progress if syncing all workouts (which is case when there is no last workout Id)
      if (this.lastWorkoutId == null) {
        console.log('Processed page ' + page + ' containing ' + processedWorkouts.length + ' workouts.'); 
      }
    }
    while (!foundWorkoutId && (page < page_count));
    
    return {
      workouts: newWorkouts,
      expectedTotal: expectedTotal
    }
  },

  processWorkoutData: function(workoutData) {
    var rows = [];
    
    var data = workoutData.data;
    
    for (let d of data) {
      if (d.id == this.lastWorkoutId) {
        break;
      }
      
      var row = [];    
      var ride = d.ride;
      
      for (let value of WorkoutProperties) {
        switch (value) {
          case 'instructor':
            row.push(this.instructorsById[ride.instructor_id]);
            break;
          case 'class_timestamp':
            row.push(new Date(ride.original_air_time *1000).toString());
            break;
          case 'workout_timestamp':
            row.push(new Date(d.start_time *1000).toString());
            break;
          case 'ride_type':
            row.push(this.rideTypesById[ride.ride_type_id]);
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
          case 'powerzone_type':
            row.push(this.getPowerzoneType(ride.title));
            break;
          default:      
            row.push(ride[value]);
        }
      }
        
      // Add the metrics
      var metrics = this.getWorkoutMetrics(d.id);
      for (let value of MetricProperties) {
        row.push(metrics[value]); 
      };

      rows.push(row);
    }
      
    return rows;    
  },

  getWorkoutMetrics: function(workoutId, interval = 10000) {
    var url = 'https://api.onepeloton.com/api/workout/' + workoutId 
      + '/performance_graph?every_n=' + interval; 
    
    var header = {"Cookie": this.cookie};
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
  },
  
  getWorkoutDataResponse: function(page) {
    var url = 'https://api.onepeloton.com/api/user/' 
      + this.userId 
      + '/workouts?&joins=ride&sort_by=created_at&desc=true&page=' 
      + page + '&limit=' + this.limit;    
    
    var header = {"Cookie": this.cookie};
    var options = {"headers": header};
    var response = UrlFetchApp.fetch(url, options);
    
    return JSON.parse(response.getContentText()); 
  },

  setMetadata: function() {
    var url = 'https://api.onepeloton.com/api/ride/metadata_mappings';    
    var response = UrlFetchApp.fetch(url);
    var metadata = JSON.parse(response.getContentText()); 
    
    this.instructorsById = {};
    var instructors = metadata.instructors;
    instructors.forEach(instructor => {
      this.instructorsById[instructor.id] = instructor.name;
    });
    
    this.rideTypesById = {};  
    var rideTypes = metadata.class_types;
    rideTypes.forEach(rideType => {
      this.rideTypesById[rideType.id] = rideType.name;
    });
  },
    
  getPowerzoneType: function(title) {
    if (title.includes('FTP Test')) {
      return 'FTP Test';
    }
    
    if (title.includes('Power Zone')) {
      if (title.includes('Endurance')) {
        return 'PZE';
      } 
      
      if (title.includes('Max')) {
        return 'PZ Max';
      } 
      
      return 'PZ';
    }
    
    return 'Other';
  }
}

