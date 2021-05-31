function getWaterLevel(msg_txt) {
  // Remove superfluous info
  msg_txt = parseMessage(msg_txt);
  
  Logger.log(msg_txt)
  
  // Make 'msg_txt' lowercase and remove spaces
  msg_txt = msg_txt.toLowerCase();
  msg_txt = msg_txt.replace(/ /g,"");
  Logger.log(msg_txt)
  
  // Retrieve iWetland sheet names used in Google Sheets
  var sheetNames = getSheetNames();
  
  // Loop through all sheet names to see if one matches text message
  for (var i=0; i<sheetNames.length; i++) {
    // Convert sheetNames to lower case
    var compareStr = sheetNames[i].toLowerCase();
    
    // Remove spaces from sheetNames
    compareStr = compareStr.replace(/ /g,"");
    
    // Search e-mail body for given site name
    var results = msg_txt.search(compareStr);
    Logger.log([compareStr, results])
    
    if (results>-1){
      var sheetIndex = i;
      Logger.log([i,sheetNames[i]])
      
      // Remove site name from 'msg_txt
      msg_txt = msg_txt.replace(compareStr,"");
      
      Logger.log(msg_txt)
      Logger.log(msg_txt.length)
      // Isolate up to first 4 characters (e.g. 40.5)
      if (msg_txt.length<4){
        waterLevel = msg_txt.slice(0,msg_txt.length);
      }
      if (msg_txt.length>3){
        waterLevel = msg_txt.slice(0,4);
        
        if (waterLevel==0){
          waterLevel = 0.00001;
        } //End of 'if' statement
      }
      
      //Logger.log(waterLevel)
      
    } //End of 'if' statement
  } //End of for loop
  
  // Pass 'waterLevel' to calling function
  return waterLevel
}
