function(appName){
  eval(file.read("/apps/"+appName+"/index.js"));
  return true;
}
