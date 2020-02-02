function(ele){
  $(ele).parent().on("mousedown touchstart",function(){
    os.zIndex++;
    $(ele).parent().css("z-index",os.zIndex);
  });
  $(ele).on("mousedown",function(event){
    var divX = event.pageX - $(ele).parent().css("left").slice(0,-2);
    divX = divX.toFixed(0);
    var divY = event.pageY - $(ele).parent().css("top").slice(0,-2);
    divY = divY.toFixed(0);
    $("html").on("mousemove",function(event){
      $(ele).parent().css({
        "left" : Number(event.pageX - divX)+"px",
        "top" : Number(event.pageY - divY)+"px"
      });
    });
    $("html").on("mouseup",function(){
      $("html").unbind("mousemove mouseup touchend touchmove");
    });
  });
  $(ele).on("touchstart",function(event){
    var divX = event.touches[0].clientX - $(ele).parent().css("left").slice(0,-2);
    divX = divX.toFixed(0);
    var divY = event.touches[0].clientY - $(ele).parent().css("top").slice(0,-2);
    divY = divY.toFixed(0);
    $("html").on("touchmove",function(event){
      $(ele).parent().css({
        "left" : Number(event.touches[0].clientX - divX)+"px",
        "top" : Number(event.touches[0].clientY - divY)+"px"
      });
    });
    $("html").on("touchend",function(){
      $("html").unbind("mousemove mouseup touchend touchmove");
    });
  });
}
