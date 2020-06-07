const PropertiesSheetName = 'Properties';
const ClassDataSheetName = 'Class Data';
const WorkoutDataSheetName = 'Workout Data';
const CsvWorkoutDataSheetName = 'Workout Data (CSV)';
const MaxProperties = 10;

function Spreadsheet(spreadsheetId) {
  this.spreadsheetId = spreadsheetId;
  this.spreadsheet = this.getSpreadsheetOrDefault(spreadsheetId);
  this.propertiesSheet = this.spreadsheet.getSheetByName(PropertiesSheetName);
  this.workoutSheet = this.spreadsheet.getSheetByName(WorkoutDataSheetName);
  this.csvWorkoutSheet = this.spreadsheet.getSheetByName(CsvWorkoutDataSheetName);
  this.classSheet = this.spreadsheet.getSheetByName(ClassDataSheetName);
}

Spreadsheet.prototype = {
  getProperties: function (numberOfProperties = 6) {
    let propertiesSheet = this.spreadsheet.getSheetByName(PropertiesSheetName);

    let properties = {};
    for (let i = 1; i <= numberOfProperties; i++) {
      properties[propertiesSheet.getRange(i, 1).getValue()] = propertiesSheet.getRange(i, 2).getValue();
    }

    return properties;
  },

  setProperty: function (key, value) {
    let propertyKeys = this.propertiesSheet.getRange(1, 1, MaxProperties).getValues().flat(1);
    let index = propertyKeys.indexOf(key);

    // Create the row if it does not already exist
    if (index == -1) {
      index = this.propertiesSheet.getLastRow();
      this.propertiesSheet.getRange(index + 1, 1).setValue(key);
    }

    // Lookup 0 based, sheets 1 based, so add 1 to index
    this.propertiesSheet.getRange(index + 1, 2).setValue(value);
  },

  getSpreadsheetOrDefault: function () {
    if (this.spreadsheetId == null) {
      this.spreadsheetId = SpreadSheetIds[0];
    }

    return SpreadsheetApp.openById(this.spreadsheetId);
  }
};
