function doGet(request) {
  console.log('Updating "Peloton Workout Data" spreadsheet with the latest data:' + JSON.stringify(request, null, 2));
    
  // Get the spreadsheet
  var parameters = request.parameter;
  var spreadsheetId = request.parameter.id;
  var useSampleData = ('useSampleData' in parameters)
    ? request.parameter.useSampleData
    : false;
  
  // Update the workout (csv) spreadsheet.  
  // This can be removed once report is converted to non-csv datasource.
  var csvSyncer = new CsvWorkoutDataSyncer();
  csvSyncer.spreadsheetId = spreadsheetId;
  csvSyncer.useSampleData = useSampleData;
  var csvResults = csvSyncer.updateWorkoutData();
  console.log('Updated workout data (csv) for spreadsheet' + spreadsheetId + ': ' + JSON.stringify(csvResults, null, 2));

  // Update the workout spreadsheet
  var results = updateRecentWorkouts(spreadsheetId, useSampleData);  
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateRecentWorkouts(spreadsheetId, useSampleData) {
  var syncer = new WorkoutDataSyncer(spreadsheetId, 5, useSampleData);
  syncer.initialize();
  var results = syncer.updateRecentWorkoutData();
  console.log('Update Recent Workouts: ' + JSON.stringify(results, null, 2));  
  return results;
}

function updateAllWorkouts() {
  // Fetch 100 workouts at a time when loading all of the workouts
  var syncer = new WorkoutDataSyncer(SpreadsheetId, 100, false);
  syncer.initialize();
  var results = syncer.updateAllWorkoutData();
  console.log('Update All Workouts: ' + JSON.stringify(results, null, 2));  
}

function updateRecentClasses() {
  var syncer = new ClassDataSyncer(SpreadsheetId, 5);
  syncer.initialize();
  var results = syncer.updateRecentClassData();
  console.log('Update Recent Classes: ' + JSON.stringify(results, null, 2));  
}

function updateAllClasses() {
  // Fetch 500 classes at a time when loading all of the workouts
  var syncer = new ClassDataSyncer(SpreadsheetId, 500);
  syncer.initialize();
  var results = syncer.updateAllClassData();
  console.log('Update All Classes: ' + JSON.stringify(results, null, 2));  
}