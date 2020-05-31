function doGet(request) {
  console.log('Updating Peloton Workout and Classes Data spreadsheet with the latest data: ' + JSON.stringify(request, null, 2));
    
  // Get the spreadsheet
  var parameters = request.parameter;
  var spreadsheetId = request.parameter.id;
  var useSampleData = ('useSampleData' in parameters) ? 
    request.parameter.useSampleData :
    false;
  
  let results = {};

  // Update the workout spreadsheet.  
  results.workout_update_results = updateAllWorkouts(spreadsheetId, useSampleData);

  // Update the classes spreadsheet.  
  results.classes_update_results = updateAllClasses(spreadsheetId);

  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateAllWorkoutsForEveryone() {
  for (let spreadsheetId of SpreadSheetIds) {
    updateAllWorkouts(spreadsheetId, false);
  }
}

function updateAllWorkouts(spreadsheetId, useSampleData) {
  var syncer = new WorkoutDataSyncer(spreadsheetId, 50, useSampleData);
  syncer.initialize();
  var results = syncer.updateWorkoutData();
  console.log('Updated workout data for spreadsheet ' + spreadsheetId + ': ' + JSON.stringify(results, null, 2));
  return results;
}

function updateAllClassesForEveryone() {
  for (let spreadsheetId of SpreadSheetIds) {
    updateAllClasses(spreadsheetId);  
  }
}

function updateAllClasses(spreadsheetId) {
  // Fetch 500 classes at a time when loading all of the workouts
  var syncer = new ClassDataSyncer(spreadsheetId, 500);
  syncer.initialize();
  var results = syncer.updateAllClassData();
  console.log('Updated Classes data for spreadsheet ' + spreadsheetId + ': ' + JSON.stringify(results, null, 2));
  return results;
}

