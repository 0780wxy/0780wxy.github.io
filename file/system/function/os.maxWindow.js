function(ele){
  var windowC = "";
  eval("windowC=window_"+ele);
  if(windowC.mode == "max"){
    //缩小窗口
    windowC.mode = "normal";
    $(".window_"+ele).animate({
      "width" : windowC.width + "px",
      "height" : windowC.height+"px",
      "top" : windowC.top + "px",
      "left" : windowC.left + "px"
    },os.effect*0.25);
  }else{
    //增大窗口
    windowC.mode = "max";
    windowC.left = $(".window_"+ele).css("left").slice(0,-2);
    windowC.top = $(".window_"+ele).css("top").slice(0,-2);
    $(".window_"+ele).animate({
      "width" : "100%",
      "height" : document.body.clientHeight - os.size+"px",
      "top" : os.size,
      "left" : 0
    },os.effect*0.25);
  }
  return true;
}
