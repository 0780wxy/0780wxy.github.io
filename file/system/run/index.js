systemUI = function(){
  //加载UI
  $("body").html('<div class="background">'+file.read("/data/"+userName+"/background.htm")+'</div><div class="top"></div><div class="body"></div><div class="apps"></div>');
  $(".top").css({
    "width" : "100%",
    "height" : os.size+"px",
    "position" : "fixed",
    "top" : 0,
    "left" : 0,
    "background" : "rgba(255,255,255,.9)"
  });
  $(".body,.apps").css({
    "width" : "100%",
    "height" : "calc(100% - "+os.size+"px)",
    "position" : "fixed",
    "bottom" : 0,
    "left" : 0
  });
  $(".apps").css({
    "background" : "rgba(0,0,0,.8)"
  }).hide();
  $(".top").html("<div class='os'>"+file.read("/system/image/os.svg")+"</div>");
  $(".top .os").css({
    "width" : os.size+"px",
    "height" : os.size+"px"
  }).click(function(){
    $(".apps").stop().fadeToggle(os.effect);
  });
}
iniFun.push("systemUI");
