systemUI = function(){
  //加载UI
  $("body").html('<div class="background">'+file.read("/data/"+userName+"/background.htm")+'</div><div class="body"></div><div class="apps"></div><div class="top"></div>');
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
  $(".top").append("<div class='runApp'></div><div class='rightColumn'><div class='tool'></div><div class='user'><div class='userAvatar'></div><div class='userName'></div></div><div class='message'></div></div>");
  $(".top .os").css({
    "width" : os.size+"px",
    "height" : os.size+"px"
  }).click(function(){
    $(".apps").stop().fadeToggle(os.effect);
  });
  $(".message,.userAvatar").css({
    "width" : os.size+"px",
    "height" : os.size+"px"
  });
  $(".runApp,.rightColumn,.tool,.user,.message,.userName").css({
    "height" : os.size+"px",
    "line-height" : os.size+"px",
    "text-align" : "center",
    "font-size" : Number(os.size * 0.5)+"px",
    "cursor" : "default"
  });
  $(".rightColumn").css({
    "float" : "right"
  });
  $(".userAvatar").html(file.read("/system/image/user.svg"));
  $(".userName").html(userName);
  $(".message").html(file.read("/system/image/message.svg"));
  $(".message").click(function(){os.print("抱歉，消息模块并没有写好");});
}
iniFun.push("systemUI");
