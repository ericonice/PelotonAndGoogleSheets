function CsvWorkoutDataSyncer(spreadsheetId, useSampleData = false) {
  this.spreadsheetId = spreadsheetId;
  this.useSampleData = useSampleData;
}

CsvWorkoutDataSyncer.prototype = {

  updateWorkoutData: function () {
    let spreadsheet = new Spreadsheet(this.spreadsheetId);

    // Get properties
    let properties = spreadsheet.getProperties();

    this.username = properties.username;
    this.password = properties.password;
    let previousRefreshDate = properties.lastWorkoutRefreshDate;
    let previousWorkoutCount = properties.lastWorkoutTotal;

    // Get the latest Peloton data
    let workoutData = this.useSampleData ?
      Utilities.parseCsv(sampleData) :
      this.getWorkoutData(this.username, this.password);

    // Update properties
    let refreshDate = new Date();
    let currentWorkoutCount = workoutData.length - 1;
    spreadsheet.setProperty('lastWorkoutRefreshDate', refreshDate);
    spreadsheet.setProperty('lastWorkoutTotal', currentWorkoutCount);

    let results = {
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
    let userIdAndCookie = authorize(this.username, this.password);

    // Fetch and parse data from API
    let url = 'https://api.onepeloton.com/api/user/' + userIdAndCookie.userId + '/workout_history_csv';
    let header = { "Cookie": userIdAndCookie.cookie };
    let options = { "headers": header };
    let response = UrlFetchApp.fetch(url, options);

    // Response is csv  
    let csvData = response.getContentText();

    return Utilities.parseCsv(csvData);
  }
};

function test() {
  // Get the spreadsheet
  let syncer = new CsvWorkoutDataSyncer(SpreadsheetId, false);

  // Update spreadsheet
  let results = syncer.updateWorkoutData();
  console.log('Updated spreadsheet ' + syncer.spreadsheetId + ': ' + JSON.stringify(results, null, 2));

}




