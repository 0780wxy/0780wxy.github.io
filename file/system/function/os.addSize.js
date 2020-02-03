function(ele,wdsH){
  $(ele).on("mousedown",function(event){
    var divX = event.pageX - $(ele).parent().css("left").slice(0,-2);
    var divX = $(ele).parent().css("width").slice(0,-2) - divX;
    divX = divX.toFixed(0);
    var divY = event.pageY - $(ele).parent().css("top").slice(0,-2);
    var divY = $(ele).parent().css("height").slice(0,-2) - divY;
    divY = divY.toFixed(0);
    divX = Number(divX);
    divY = Number(divY);
    eval("var windowsH = "+wdsH);
    $("html").on("mousemove",function(event){
      $(ele).parent().css({
        "width" : Number(event.pageX - $(ele).parent().css("left").slice(0,-2) + divX)+"px",
        "height" : Number(event.pageY - $(ele).parent().css("top").slice(0,-2) + divY)+"px"
      });
      windowsH.width = Number(event.pageX - $(ele).parent().css("left").slice(0,-2) + divX);
      windowsH.height = Number(event.pageY - $(ele).parent().css("top").slice(0,-2) + divY);
    });
    $("html").on("mouseup",function(){
      $("html").unbind("mousemove mouseup touchend touchmove");
    });
  });
  $(ele).on("touchstart",function(event){
    var divX = event.touches[0].clientX - $(ele).parent().css("left").slice(0,-2);
    var divX = $(ele).parent().css("width").slice(0,-2) - divX;
    divX = divX.toFixed(0);
    var divY = event.touches[0].clientY - $(ele).parent().css("top").slice(0,-2);
    var divY = $(ele).parent().css("height").slice(0,-2) - divY;
    divY = divY.toFixed(0);
    divX = Number(divX);
    divY = Number(divY);
    eval("var windowsH = "+wdsH);
    $("html").on("touchmove",function(event){
      $(ele).parent().css({
        "width" : Number(event.touches[0].clientX - $(ele).parent().css("left").slice(0,-2) + divX)+"px",
        "height" : Number(event.touches[0].clientY - $(ele).parent().css("top").slice(0,-2) + divY)+"px"
      });
      windowsH.width = Number(event.touches[0].clientX - $(ele).parent().css("left").slice(0,-2) + divX);
      windowsH.height = Number(event.touches[0].clientY - $(ele).parent().css("top").slice(0,-2) + divY);
    });
    $("html").on("touchend",function(){
      $("html").unbind("mousemove mouseup touchend touchmove");
    });
  });
}
