function doGet(request) {
  console.log(`Updating Peloton Workout and Classes Data spreadsheet with the latest data: ${JSON.stringify(request, null, 2)}`);

  // Get the spreadsheet
  let parameters = request.parameter;
  let spreadsheetId = request.parameter.id;
  if (!request.parameter.id) {
    throw 'Missing required id parameter';
  }

  let useSampleData = ('useSampleData' in parameters) ?
    !!request.parameter.useSampleData && (request.parameter.useSampleData !== 'false'):
    false;
  
  let refreshClasses = ('refreshClasses' in parameters) ?
    !!request.parameter.refreshClasses && (request.parameter.refreshClasses !== 'false'):
    true;

  let results = {};

  // Update the workout spreadsheet.  
  results.workout_update_results = updateAllWorkouts(spreadsheetId, useSampleData);

  // Update the classes spreadsheet.  
  results.classes_update_results = updateAllClasses(spreadsheetId, refreshClasses);
  
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateAllWorkoutsForEveryone() {
  for (let spreadsheetId of SpreadSheetIds) {
    updateAllWorkouts(spreadsheetId, false);
  }
}

function updateAllWorkouts(spreadsheetId, useSampleData) {
  let syncer = new WorkoutDataSyncer(spreadsheetId, 50, useSampleData);
  syncer.initialize();
  let results = syncer.updateWorkoutData();
  console.log(`Updated workout data for spreadsheet ${spreadsheetId}: ${JSON.stringify(results, null, 2)}`);
  return results;
}

function updateAllClassesForEveryone() {
  for (let spreadsheetId of SpreadSheetIds) {
    updateAllClasses(spreadsheetId, true);  
  }
}

function updateRecentClassesForEveryone() {
  for (let spreadsheetId of SpreadSheetIds) {
    updateAllClasses(spreadsheetId, false);  
  }
}

function updateAllClasses(spreadsheetId, refreshClasses) {
  // Fetch 500 classes at a time when loading all of the workouts
  let syncer = new ClassDataSyncer(spreadsheetId, 500);
  syncer.initialize();
  let results = refreshClasses ?
    syncer.updateAllClassData() :
    syncer.updateRecentClassData();

  console.log(`Updated class data for spreadsheet ${spreadsheetId}: ${JSON.stringify(results, null, 2)}`);
  return results;
}
