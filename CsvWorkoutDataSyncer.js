function CsvWorkoutDataSyncer(spreadsheetId, useSampleData = false) {
  this.spreadsheetId = spreadsheetId;
  this.useSampleData = useSampleData;
}

CsvWorkoutDataSyncer.prototype = {

  updateWorkoutData: function () {
    var spreadsheet = new Spreadsheet(this.spreadsheetId);

    // Get properties
    var properties = spreadsheet.getProperties();

    this.username = properties.username;
    this.password = properties.password;
    var previousRefreshDate = properties.lastWorkoutRefreshDate;
    var previousWorkoutCount = properties.lastWorkoutTotal;

    // Get the latest Peloton data
    var workoutData = this.useSampleData ?
      Utilities.parseCsv(sampleData) :
      this.getWorkoutData(this.username, this.password);

    // Update properties
    var refreshDate = new Date();
    var currentWorkoutCount = workoutData.length - 1;
    spreadsheet.setProperty('lastWorkoutRefreshDate', refreshDate);
    spreadsheet.setProperty('lastWorkoutTotal', currentWorkoutCount);

    var results = {
      status: "Success",
      previousRefreshDate: previousRefreshDate,
      previousWorkoutCount: previousWorkoutCount,
      currentWorkoutCount: currentWorkoutCount,
      workoutsAdded: currentWorkoutCount - previousWorkoutCount,
      refreshDate: refreshDate
    };

    // Replace all data with new Peloton data 
    spreadsheet.csvWorkoutSheet.getRange(1, 1, workoutData.length, workoutData[0].length).setValues(workoutData);

    return results;
  },

  getWorkoutData: function () {
    var userIdAndCookie = authorize(this.username, this.password);

    // Fetch and parse data from API
    var url = 'https://api.onepeloton.com/api/user/' + userIdAndCookie.userId + '/workout_history_csv';
    var header = { "Cookie": userIdAndCookie.cookie };
    var options = { "headers": header };
    var response = UrlFetchApp.fetch(url, options);

    // Response is csv  
    var csvData = response.getContentText();

    return Utilities.parseCsv(csvData);
  }
};

function test() {
  // Get the spreadsheet
  var syncer = new CsvWorkoutDataSyncer(SpreadsheetId, false);

  // Update spreadsheet
  var results = syncer.updateWorkoutData();
  console.log('Updated spreadsheet ' + syncer.spreadsheetId + ': ' + JSON.stringify(results, null, 2));

}




