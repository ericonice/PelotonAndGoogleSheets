function updateWorkoutData() {
  var results = updateWorkoutData(SpreadsheetId);
  console.log('Updated spreadsheet ' + spreadsheetId + ': ' + JSON.stringify(results, null, 2));
}

function doGet(request) {
  console.log('Updating "Peloton Workout Data" spreadsheet with the latest data:' + JSON.stringify(request, null, 2));
  
  // Get the spreadsheet
  var parameters = request.parameter;
  var spreadsheetId = request.parameter.id;
  var useSampleData = ('useSampleData' in parameters)
    ? request.parameter.useSampleData
    : false;
    
  // Update spreadsheet
  var results = updateWorkoutData(spreadsheetId, useSampleData);
    
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function updateWorkoutData(spreadsheetId, useSampleData = false) {
  var spreadsheet = getSpreadsheetOrDefault(spreadsheetId);
  
  // Get properties
  var properties = getSpreadsheetProperties(spreadsheet, 4);
  var username = properties.username;
  var password = properties.password;
  var previousRefreshDate = properties.lastWorkoutRefreshDate;
  var previousWorkoutCount = properties.lastWorkoutTotal;
 
  // Get the latest Peloton data
  var workoutData = useSampleData 
      ? Utilities.parseCsv(sampleData)
      : getPelotonData(username, password);
    
  // Update properties
  var refreshDate = new Date();
  var currentWorkoutCount = workoutData.length - 1;
  setSpreadsheetProperty(spreadsheet, 'lastWorkoutRefreshDate', refreshDate);
  setSpreadsheetProperty(spreadsheet, 'lastWorkoutTotal', currentWorkoutCount);

  var results = {
    status : "Success", 
    previousRefreshDate : previousRefreshDate, 
    previousWorkoutCount : previousWorkoutCount, 
    currentWorkoutCount : currentWorkoutCount,
    workoutsAdded : currentWorkoutCount - previousWorkoutCount,
    refreshDate : refreshDate
  };
  
  // Replace all data with new Peloton data 
  var workoutSheet = spreadsheet.getSheetByName(WorkoutDataSheetName);
  workoutSheet.getRange(1, 1, workoutData.length, workoutData[0].length).setValues(workoutData);
  
  return results;
}

function getPelotonData(username, password) {
  var userIdAndCookie = authorize(username, password);
    
  // Fetch and parse data from API
  var url = 'https://api.onepeloton.com/api/user/' + userIdAndCookie.userId + '/workout_history_csv';    
  var header = {"Cookie": userIdAndCookie.cookie};
  var options = {"headers": header};
  var response = UrlFetchApp.fetch(url, options);
  
  // Response is csv  
  var csvData = response.getContentText();
  
  return Utilities.parseCsv(csvData);
}