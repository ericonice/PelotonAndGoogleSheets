# PelotonAndGoogleSheets

This project allows you to sync your Peloton data to a google spreadsheet.  You can then use the google data studio, via a google spreadsheets data connector, to analyze your Peloton data.  In order for this to work, you will need to do the following:
* Create google app script which will add your peloton data to a google spreadsheet
* Create a google data source associated with your google spreadsheet.
* Create google data studio report


## 1. Create the google spreadsheet which will contain your Peloton data
1. Create three sheets
    * Workout Data
    * Class Data
    * Properties
1. In the Properties sheet, add the following:
    * Row 1, Column A: username
    * Row 1, Column B: _Your Peloton Username_
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

    https://script.google.com/macros/s/[project ID]/exec?id=[spreadsheetId]


    
    
  
 ## 4. Create the google data source
 
 ## 5. Create the google data studio report
    
 

