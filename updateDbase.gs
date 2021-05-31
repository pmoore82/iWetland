function updateDbase() {
  // Get 'Processed' label so that old iWetland texts can be skipped
  var label = GmailApp.getUserLabelByName("Processed");
  
  // Get identifier for messages with iWetland label
  var iWetland_label = GmailApp.getUserLabelByName('iWetland');
  
  // Get all threads that are labeled with iWetland
  var iWetland_threads = iWetland_label.getThreads();
  
  // Create 'Date' object before which threads will be ignored
  var startDate = new Date();
  startDate.setFullYear(2017,9-1,1); //Sept.1st, 2017
  
  for (var ii=0; ii<25; ii++){
    // Get all labels associated with thread
    var thread_labels = iWetland_threads[ii].getLabels()
    
    // Determine how many labels thread has
    if (thread_labels.length==1){ //This means that it has the 'iWetland' label and not the 'Processed' label
      //Logger.log(thread_labels[0].getName())
      
      // Process information from e-mail
      // Get first message in thread (new Twilio forwarding only creates one message per thread)
      var threadMessages = iWetland_threads[ii].getMessages();
      
      // Get date from e-mail
      var msg_date = threadMessages[0].getDate();
      
      if(msg_date>startDate){
        // Get body text
        var msg_txt = threadMessages[0].getPlainBody();
        
        // Get water level from 'msg_txt' - iWetland script
        var wtrLvl = getWaterLevel(msg_txt);
        
        // Make 'msg_txt' string lowercase
        msg_txt = msg_txt.toLowerCase();
        // Remove spaces from 'msg_txt' string
        msg_txt = msg_txt.replace(/ /g, "");
        msg_txt = msg_txt.replace(/lookout,a/,"lookouta")
        Logger.log(msg_txt)
        
        // Get phone #
        var msg_phone = threadMessages[0].getSubject();
        // Remove '+' from 'msg_phone'
        msg_phone = msg_phone.replace('+', "");
        
        //Parse date
        var year = msg_date.getFullYear();
        var month = msg_date.getMonth()+1;
        var day = msg_date.getDate();
        var hr = msg_date.getHours();
        var mn = msg_date.getMinutes();
        
        // Create 'Date' object
        var daylightEnds, daylightStarts
        daylightEnds = new Date();
        daylightStarts = new Date();
        daylightEnds.setFullYear(year,11-1,5);
        daylightStarts.setFullYear(year,3-1,12);
        if (msg_date>daylightStarts){
          if (msg_date<daylightEnds){
            //Adjust for daylight savings
            hr = hr-1;
          } //End of 'if' re. 'msg_date'
        } //End of 'if' re. 'msg_date'
        
        // Retrieve iWetland sheet names - iWetland script
        var sheetNames = getSheetNames();
        
        // Loop through all sheet names to see if one matches text message
        for (var i=0; i<sheetNames.length; i++) {
          // Convert sheetNames to lowercase
          var compareStr = sheetNames[i].toLowerCase();
          
          // Remove spaces from sheetNames
          compareStr = compareStr.replace(/ /g,"");
          
          // Search e-mail body for given site name
          var results = msg_txt.search(compareStr);
          
          if (results>-1){
            var sheetIndex = i;
            Logger.log([i,sheetNames[i]])
          } //End of 'if' statement
        } //End of for loop
        
        // Open iWetland Google Sheet
	  // --> Example Google Sheet address:
	  // https://docs.google.com/spreadsheets/d/123ABC_thisisanexample/edit#gid=0
        var spreadsheet = SpreadsheetApp.openById('123ABC_thisisanexample');
        
        // Get sheet that is to be updated
        var sheets = spreadsheet.getSheetByName(sheetNames[sheetIndex])
        
        Logger.log(sheets.getName());
        
        var rangeA = sheets.getRange(sheets.getLastRow()+1, 1)
        var rangeB = sheets.getRange(sheets.getLastRow()+1, 2)
        var rangeC = sheets.getRange(sheets.getLastRow()+1, 3)
        var rangeD = sheets.getRange(sheets.getLastRow()+1, 4)
        var rangeE = sheets.getRange(sheets.getLastRow()+1, 5)
        var rangeF = sheets.getRange(sheets.getLastRow()+1, 6)
        var rangeG = sheets.getRange(sheets.getLastRow()+1, 7)
        var rangeH = sheets.getRange(sheets.getLastRow()+1, 8)
        
        //Date cell
        var formula1 = "=date(";
        formula1 = formula1.concat(rangeA.getA1Notation(),",",rangeB.getA1Notation(),",",rangeC.getA1Notation(),")");
        
        //Time cell
        var formula2 = "=time(";
        formula2 = formula2.concat(rangeD.getA1Notation(),",",rangeE.getA1Notation(),",0)");
        
        //Date-time cell
        var formula3 = "=";
        formula3 = formula3.concat(rangeG.getA1Notation(),"+",rangeH.getA1Notation());
        
        // Empty variable to fill 'Notes' cell
        var note = "";
        
        // Get value from 'Offset' cell
        var rangeM = sheets.getRange(sheets.getLastRow(), 13)
        var offset = "=";
        offset = offset.concat(rangeM.getA1Notation());
        
        // Adjust 'wtrLvl' using 'offset'
        var wtrLvl_offset = "=";
        wtrLvl_offset = wtrLvl_offset.concat(rangeF.getA1Notation(),"+",rangeM.getA1Notation());
        
        // Append data to specified sheet
        // --> updated to include cells for offset
        sheets.appendRow([year.toFixed(0), month, day, hr, mn, wtrLvl, formula1, formula2, formula3, wtrLvl_offset, msg_phone, note, offset]);
        
        // Add 'Processed' label to thread
        label.addToThread(iWetland_threads[ii]);
      } // End of 'If' statement evaluating if thread is 'recent'
    } // End of 'If' for processing new threads
  } // Enf of 'for' loop to run through all 'iWetland' threads
} // Close function