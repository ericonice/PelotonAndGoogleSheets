function doGet(request) {
  console.log('Updating "Peloton Workout Data" spreadsheet with the latest data:' + JSON.stringify(request, null, 2));
    
  // Get the spreadsheet
  var parameters = request.parameter;
  var spreadsheetId = request.parameter.id;
  var useSampleData = ('useSampleData' in parameters)
    ? request.parameter.useSampleData
    : false;
    
  // Update spreadsheet
  var results = updateRecentWorkouts(spreadsheetId, useSampleData);
  console.log('Updated spreadsheet ' + spreadsheetId + ': ' + JSON.stringify(results, null, 2));  
  
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateRecentWorkouts(spreadsheetId, useSampleData) {
  var syncer = new WorkoutDataSyncer(spreadsheetId, 5, useSampleData);
  syncer.initialize();
  return syncer.updateRecentWorkoutData();
}

function updateAllWorkouts() {
  var syncer = new WorkoutDataSyncer(SpreadsheetId, 100, false);
  syncer.initialize();
  return syncer.updateAllWorkoutData();
}
