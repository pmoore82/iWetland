function parseMessage(inputStr) {
  var outputStr
  
  outputStr = inputStr.replace(/cm/i,"");
  outputStr = outputStr.replace(/Lookout, A/i,"Lookout A");
  outputStr = outputStr.replace(/Lookout,A/i,"Lookout A");
  outputStr = outputStr.replace(/cms/i,"");
  outputStr = outputStr.replace(/inches/i,"");
  outputStr = outputStr.replace(/ in/i,"");
  outputStr = outputStr.replace(/\din/i,"");
  outputStr = outputStr.replace(/(sent with Gentle Effect)/i,"");
  outputStr = outputStr.replace(")","");
  outputStr = outputStr.replace("(","");
  outputStr = outputStr.replace(",","");
  outputStr = outputStr.replace(":","");
  outputStr = outputStr.replace("-","");
  outputStr = outputStr.replace(/weller/i,"");
  outputStr = outputStr.replace(/height/i,"");
  
  return outputStr
}
