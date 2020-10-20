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

  ![Screenshot for spreadsheet](https://github.com/ericonice/PelotonAndGoogleSheets/blob/master/images/screenshot_for_spreadsheet.png) 

## 2. Create the google app script project
There are lots of ways to do this, so if you are familiar with google app script, please use your preferred method.  If not, here is a suggested approach.
1. Dowload the zip file for this github project
1. Unzip the zip file
    ```
    unzip PelotonAndGoogleSheets-master.zip
    mv PelotonAndGoogleSheets-master MyPelotonProject
    cd MyPelotonProject
    cp SpreadsheetIds-template.js SpreadsheetIds.js
    ```
1. Edit SpreadsheetIds.js to provide sheet ID(s) of your google spreadsheet(s).  It should look something like:
    ```
    // copy this file as SpreadsheetIds.js that
    // will provide real Ids but will not be tracked by git
    const User1SpreadsheetId = '1BtKc-EUZnRyii4v8qL-0wxczzAwcV31EBVQpzT18Ax0';

    // The following constanrt are referenced in other files. Don't rename.
    const SpreadSheetIds = [User1SpreadsheetId];
    ```
1. Install clasp to be able to push local files to google app project (https://developers.google.com/apps-script/guides/clasp). Note, Node.js must be installed in order to use clasp.
    ```
    npm install @google/clasp -g
    ```

1. Create the google app project using clasp:
    ```
    clasp login
    clasp create --type webapp --title "MyPelotonProject" 
    clasp push
    ```

## 3. Deploy and test the google app script
1. Go to https://script.google.com/home
1. Open the project you just created, _MyPelotonProject_
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
Google data studio allows you to quickly and relatively easily analyze your data.  To help you get started, I am providing a sample report.  However, once you become acquainted with google data studio, you'll likely either want to enhance this sample report or even create something entirely new.
1. Go to https://datastudio.google.com/u/0/reporting/2ebcd725-dd38-46de-ac64-ed318a7c3961/page/eGeQB
1. Select _Make a copy of this report_
1. Map the data source _My Peloton Spreadsheet - Workout Data_ to _Workout Data_
1. Map the data source _My Peloton Spreadsheet - Class Data_ to _Class Data_
1. Edit the report
    * Modify the _Refresh_ link to the following (replacing values to match your IDs):
        ```
        https://script.google.com/macros/s/{script ID}/exec?id={spreadsheet ID}&refreshClasses=false 
        ```
        This link will refresh the both the workout data and class data
    * Remove what you don't like
    * Add some cool charts
    
 
## 6. Add triggers to project to update the workout and class data
You can create triggers to automatically update the workout and class data.
1. From the script editor, choose Edit > Current project's triggers.
1. Click the link that says: No triggers set up. Click here to add one now.
1. Under Run, select the name of function you want to trigger.
1. To refresh workout data for all users, choose _updateAllWorkoutsForEveryone_.  I typically run this daily.

    ![Screenshot for workout data](https://github.com/ericonice/PelotonAndGoogleSheets/blob/master/images/screenshot_for_workouts_trigger.png)  

1. To refresh class data for all users, choose _updateAllClassesForEveryone_.  I typically run this weekly as I am not that interested in the class data.

    ![Screenshot for class data](https://github.com/ericonice/PelotonAndGoogleSheets/blob/master/images/screenshot_for_classes_trigger.png)  
