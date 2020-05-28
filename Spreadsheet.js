const SpreadsheetId = '1BtKc-EUZnRyii4v8qL-0wxczzAwcV31EBVQpzT18Ax0';
const PropertiesSheetName = 'Properties';
const ClassDataSheetName = 'Class Data';
const WorkoutDataSheetName = 'Workout Data';
const CsvWorkoutDataSheetName = 'Workout Data (CSV)'

function Spreadsheet(spreadsheetId) {
  this.spreadsheetId = spreadsheetId;
  this.spreadsheet = this.getSpreadsheetOrDefault(spreadsheetId);
  this.propertiesSheet = this.spreadsheet.getSheetByName(PropertiesSheetName);
  this.workoutSheet = this.spreadsheet.getSheetByName(WorkoutDataSheetName);
  this.csvWorkoutSheet = this.spreadsheet.getSheetByName(CsvWorkoutDataSheetName);
}

Spreadsheet.prototype = {
  getProperties: function(numberOfProperties = 4) {
    var propertiesSheet = this.spreadsheet.getSheetByName(PropertiesSheetName);
    
    var properties = {};
    for (var i = 1; i <= numberOfProperties; i++) {
      properties[propertiesSheet.getRange(i, 1).getValue()] = propertiesSheet.getRange(i, 2).getValue();
    }

    return properties;
  },

  setProperty: function(key, value) {
    var propertyKeys = this.propertiesSheet.getRange(1, 1, 10).getValues().flat(1);
    var row = propertyKeys.indexOf(key);
    
    if (row == -1) {
      throw 'Unable to find property ' + key;
    }
    
    this.propertiesSheet.getRange(row + 1, 2).setValue(value);
  },

  getSpreadsheetOrDefault: function() {
    if (this.spreadsheetId == null) {
      this.spreadsheetId = SpreadsheetId;
    }
  
    return SpreadsheetApp.openById(this.spreadsheetId);
  }
}
