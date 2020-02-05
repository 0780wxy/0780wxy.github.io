function(key,values){
  var keys = os.hotWindow.slice(7);
  keys = "V"+keys+key;
  if(!values){
    if(values == ""){
      eval(keys+"='';");
      return eval(keys);
    }else{
      return eval(keys);
    }
  }else{
    eval(keys+"=values;");
    return eval(keys);
  }
}
