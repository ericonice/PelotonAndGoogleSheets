const SpreadsheetId = '1BtKc-EUZnRyii4v8qL-0wxczzAwcV31EBVQpzT18Ax0';
const PropertiesSheetName = 'Properties';
const ClassDataSheetName = 'Class Data';
const WorkoutDataSheetName = 'Workout Data';


function getSpreadsheetProperties(spreadsheet, numberOfProperties = 2) {
  var propertiesSheet = spreadsheet.getSheetByName(PropertiesSheetName);
  
  var properties = {};
  for (var i = 1; i <= numberOfProperties; i++) {
    properties[propertiesSheet.getRange(i, 1).getValue()] = propertiesSheet.getRange(i, 2).getValue();
  }

  return properties;
}

function setSpreadsheetProperty(spreadsheet, key, value) {
  var propertiesSheet = spreadsheet.getSheetByName(PropertiesSheetName);  
  var propertyKeys = propertiesSheet.getRange(1, 1, 10).getValues().flat(1);
  var row = propertyKeys.indexOf(key);
  
  if (row == -1) {
    throw 'Unable to find property ' + key;
  }
  
  propertiesSheet.getRange(row + 1, 2).setValue(value);
}

function getSpreadsheetOrDefault(spreadsheetId) {
  if (spreadsheetId == null) {
    spreadsheetId = SpreadsheetId;
  }
  
  return SpreadsheetApp.openById(spreadsheetId);
}
