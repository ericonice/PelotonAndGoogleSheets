function doGet(request) {
  console.log('Updating "Peloton Workout Data" spreadsheet with the latest data:' + JSON.stringify(request, null, 2));
    
  // Get the spreadsheet
  var parameters = request.parameter;
  var spreadsheetId = request.parameter.id;
  var useSampleData = ('useSampleData' in parameters)
    ? request.parameter.useSampleData
    : false;
  
  // Update the workout spreadsheet.  
  var syncer = new WorkoutDataSyncer(spreadsheetId, 5, useSampleData);
  syncer.initialize();
  var results = syncer.updateRecentWorkoutData();
  console.log('Updated workout data for spreadsheet' + spreadsheetId + ': ' + JSON.stringify(results, null, 2));
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateRecentWorkouts() {
  for (let spreadsheetId of SpreadSheetIds) {
    var syncer = new WorkoutDataSyncer(EricSpreadsheetId, 5);
    syncer.initialize();
    var results = syncer.updateRecentWorkoutData();
    console.log('Update Recent Workouts for spreadsheet (' + spreadsheetId + '): ' + JSON.stringify(results, null, 2));  
  }
}

function updateAllWorkouts() {
  // Fetch 100 workouts at a time when loading all of the workouts
  var syncer = new WorkoutDataSyncer(EricSpreadsheetId, 100, false);
  syncer.initialize();
  var results = syncer.updateAllWorkoutData();
  console.log('Update All Workouts: ' + JSON.stringify(results, null, 2));  
}

function updateRecentClasses() {
  for (let spreadsheetId of SpreadSheetIds) {
    var syncer = new ClassDataSyncer(JianSpreadsheetId, 5);
    syncer.initialize();
    var results = syncer.updateRecentClassData();
    console.log('Update Recent Classes for spreadsheet (' + spreadsheetId + '): ' + JSON.stringify(results, null, 2));  
  }
}

function updateAllClasses() {
  // Fetch 500 classes at a time when loading all of the workouts
  var syncer = new ClassDataSyncer(JianSpreadsheetId, 500);
  syncer.initialize();
  var results = syncer.updateAllClassData();
  console.log('Update All Classes: ' + JSON.stringify(results, null, 2));  
}