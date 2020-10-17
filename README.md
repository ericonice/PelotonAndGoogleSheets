# PelotonAndGoogleSheets

This project allows you to sync your Peloton data to a google spreadsheet.  You can then use google data studio, connected to the google spreadsheets data source, to analyze your Peloton data.  In order for this to work, you will need to do the following:
* Create google app script which will add your peloton data to a google spreadsheet
* Create a google data source associated with your google spreadsheet
* Create google data studio report

## 1. Create the google spreadsheet which will contain your Peloton data
1. Create three sheets
    * Workout Data
    * Class Data
    * Properties
1. In the Properties sheet, add the following:
    * Row 1, Column A: username
    * Row 1, Column B: _Your_Peloton_Username_
    * Row 2, Column A: password
    * Row 2, Column B: _Your_Peloton_Password_
1. Note the spreadsheet ID as you will need it later, something like: _1BtKc-FUZnRyii4v7qL-0wxczzAwcV31EBVQpzT18Ax0_
1. Repeat the above for all Peloton users

## 2. Create the google app script project
There are lots of ways to do this, so if you are familiar with google app scropt, please use your preferred method.  If not, here is a suggested approach.
Copy SpreadsheetIds-template.js as SpreadsheetIds.js and provide real sheet ids there.
1. Install clasp to be able to push local files to google app project (https://github.com/google/clasp) 
1. Install git to be able to clone this github project
1. git clone git@github.com:ericonice/PelotonAndGoogleSheets.git MyPelotonProject
1. cd MyPelotonProject
1. copy SpreadsheetIds-template.js as SpreadsheetIds.js and provide sheet ID(s) of your google spreadsheet(s).
1. clasp login
1. clasp create --type webapp --title "MyPelotonProject" 
1. clasp push

## 3. Deploy and test the google app script
1. Go to https://script.google.com/home
1. Open the _MyPelotonProject_
1. Choose Publish->Deploy as web app...
1. Select **Update**
    * Select **Review Permissions**
    * Ignore warnings, and **Allow** access
1. In Publish->Deploy as web app..., copy the _Current web app url_
1. In browser, invoke the script by running the _Current web app url_ and adding the _spreadsheet ID_ parameter.  
**Note, this can take a long time, about 5 minutes for every 1000 workouts.  The google app script has a maximum running time of 5 minutes, so initially the script may need to be run multiple times.** 
    ```
    https://script.google.com/macros/s/{script ID}/exec?id={spreadsheet ID}
    ```
  
## 4. Create the google data sources
1. Create data source for the workout data
    * Go to https://datastudio.google.com
    * Create->Data Source and select _Google Sheets_
    * Select the spreadsheet created in step 1
    * Select the Workout Data sheet     
    * Select Connect 
    * In subsequent steps, this will be called the _Workout Data_ data source
1. Create the data source for the class data
    * Go to https://datastudio.google.com
    * Create->Data Source and select _Google Sheets_
    * Select the spreadsheet created in step 1
    * Select the Class Data sheet
    * Select Connect 
    * In subsequent steps, this will be called the _Class Data_ data source
  
## 5. Create the google data studio report
Google data studio allows you to quickly and relatively easily analyze your data.  To help you get started, I am providing a sample report.  However, once you become acquainted with google data studio, you'll like either want to enhance this sample report or even create something entirely new.
1. Go to https://datastudio.google.com/u/0/reporting/2ebcd725-dd38-46de-ac64-ed318a7c3961/page/eGeQB
1. Select _Make a copy of this report_
1. Map the data source My Peloton Spreadsheet - Workout Data_ to _Workout Data_
1. Map the data source _My Peloton Spreadsheet - Class Data_ to _Class Data_
1. Edit the report
    * Modify the _Refresh_ link to the following (replacing values to match your IDs):
        ```
        https://script.google.com/macros/s/{script ID}/exec?id={spreadsheet ID}&refreshClasses=false 
        ```
        This link will refresh the both the workout data and class data
    * Remove what you don't like
    * Add some cool charts
    
 

