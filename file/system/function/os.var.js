function(key,value){
  var keys = os.hotWindow.slice(7);
  keys = "V"+keys+key;
  if(!value){
    return eval(keys);
  }else{
    eval(keys+"=value");
    return eval(keys);
  }
}
