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
  this.initialPageSize = 10;
  this.pageSize = limit;
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
  
  updateWorkoutData: function() {
    // Create or update the header row 
    var rows = [WorkoutProperties.concat(MetricProperties)];
    this.workoutSheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);  

    // Get the last workout and expected number of rows to fetch
    var firstPage = this.getWorkoutDataResponse(0, this.initialPageSize);           
    var totalWorkoutCount = firstPage.total; 
    var currentWorkoutCount = this.workoutSheet.getLastRow() - 1;
    var numberOfNewWorkouts = totalWorkoutCount - currentWorkoutCount;
    var firstPageIsEnough = numberOfNewWorkouts < this.initialPageSize; 

    // Find the page with the last workout ID
    var numberOfPages = Math.floor(numberOfNewWorkouts / this.pageSize);

    for (let page = numberOfPages; page >= 0; page--) {
      let lastWorkoutId;
      
      if (page == numberOfPages) {
        lastWorkoutId = this.workoutSheet.getRange(2, 1).getValue();
      } 

      // Use the first page if all of the new workouts are in the first page
      var workoutData = firstPageIsEnough
        ? firstPage
        : this.getWorkoutDataResponse(page, this.pageSize);   
      
      // Process the data, stopping if we find the last workout ID so we don't
      // add duplicate workouts
      var processedWorkouts = this.processWorkoutData(workoutData, lastWorkoutId);
     
      // Verify found last workout ID was found.  
      if (lastWorkoutId && !processedWorkouts.foundLastWorkout) {
        throw 'Failed to find last workout.  This could be an indication that the workout data is corrupt.'
      }

      // Add the new workouts
      var rows = processedWorkouts.rows;
      if (rows.length > 0) {
        this.workoutSheet.insertRows(2, rows.length);
        this.workoutSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      }
  
      // Log progress if querying multiple pages
      if (numberOfPages > 0) {
        console.log('Processed page ' + page + ' containing ' + rows.length + ' workouts.'); 
      }
    }
    
    // Update properties
    var refreshDate = new Date().toString();
    var currentWorkoutCount = this.workoutSheet.getLastRow() - 1;
    this.spreadsheet.setProperty('lastWorkoutRefreshDate', refreshDate);
    this.spreadsheet.setProperty('lastWorkoutTotal', currentWorkoutCount);

    this.verify(totalWorkoutCount, currentWorkoutCount);
    
    return {
      operation: 'Update recent workouts',
      previousRefreshDate : this.properties.lastWorkoutRefreshDate, 
      previousWorkoutCount : this.properties.lastWorkoutTotal, 
      addedWorkouts: numberOfNewWorkouts,
      expectedTotal: totalWorkoutCount, 
      actualTotal: currentWorkoutCount
    };
  },  

  processWorkoutData: function(workoutData, stopAtWorkoutId) {
    var rows = [];
    var foundLastWorkout = false;

    var data = workoutData.data;
    
    for (let d of data) {
      if (d.id == stopAtWorkoutId) {
        foundLastWorkout = true;
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
      
    return {
      rows : rows,
      foundLastWorkout : foundLastWorkout
    }
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
  
  getWorkoutDataResponse: function(page, limit) {
    var url = 'https://api.onepeloton.com/api/user/' 
      + this.userId 
      + '/workouts?&joins=ride&sort_by=created_at&desc=true&page=' 
      + page + '&limit=' + limit;    
    
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

function test1() {
  var syncer = new WorkoutDataSyncer(EricSpreadsheetId, 50, false);
  syncer.initialize();
  var results = syncer.updateWorkoutData();
  console.log('Update workouts: ' + JSON.stringify(results, null, 2));  
}
