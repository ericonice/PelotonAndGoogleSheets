function doGet(request) {
  console.log('Updating "Peloton Workout Data" spreadsheet with the latest data:' + JSON.stringify(request, null, 2));
    
  // Get the spreadsheet
  var parameters = request.parameter;
  var spreadsheetId = request.parameter.id;
  var useSampleData = ('useSampleData' in parameters)
    ? request.parameter.useSampleData
    : false;
  
  // Update the workout spreadsheet.  
  var syncer = new WorkoutDataSyncer(spreadsheetId, 50, useSampleData);
  syncer.initialize();
  var results = syncer.updateWorkoutData();
  console.log('Updated workout data for spreadsheet' + spreadsheetId + ': ' + JSON.stringify(results, null, 2));
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateAllWorkouts() {
  for (let spreadsheetId of SpreadSheetIds) {
    var syncer = new WorkoutDataSyncer(spreadsheetId, 50);
    syncer.initialize();
    var results = syncer.updateWorkoutData();
    console.log('Update workouts for spreadsheet (' + spreadsheetId + '): ' + JSON.stringify(results, null, 2));  
  }
}

function updateRecentClasses() {
  for (let spreadsheetId of SpreadSheetIds) {
    var syncer = new ClassDataSyncer(spreadsheetId, 5);
    syncer.initialize();
    var results = syncer.updateRecentClassData();
    console.log('Update Recent Classes for spreadsheet (' + spreadsheetId + '): ' + JSON.stringify(results, null, 2));  
  }
}

function updateAllClasses() {
  for (let spreadsheetId of SpreadSheetIds) {
    // Fetch 500 classes at a time when loading all of the workouts
    var syncer = new ClassDataSyncer(spreadsheetId, 500);
    syncer.initialize();
    var results = syncer.updateAllClassData();
    console.log('Update All Classes: ' + JSON.stringify(results, null, 2));  
  }
}
