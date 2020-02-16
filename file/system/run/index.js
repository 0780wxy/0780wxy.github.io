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
  $(".top").append("<div class='runApp'></div><div class='rightColumn'><div class='tool'></div><div class='user'><div class='userAvatar'></div><!--<div class='userName'></div>--></div><div class='message'></div></div>");
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
  //$(".userName").html(userName);
  $(".message").html(file.read("/system/image/message.svg"));
  $(".message").click(function(){os.print("抱歉，消息模块并没有写好");});
  os.zIndex = 0;
  //刷新应用列表
  $(".apps").css({"text-align":"center","overflow-y":"auto","color":"#fff"}).html("<div class='appList' style=''></div>");
  var appList = file.read("/apps/");
  var appNum = appList.length;
  var nowNum = 0;
  while(nowNum < appNum){
    var appInfo = appList[nowNum];
    appInfo = JSON.parse(file.read("/apps/"+appInfo.slice(1)+"/lang.json"));
    $(".apps .appList").append("<div class='app' onclick='$(\".apps\").stop().fadeToggle(os.effect);os.app(\""+appList[nowNum].slice(1)+"\");'><div class='icon' style='width:70%;height:70%;margin:0 15% 0 15%;'>"+file.read("/apps/"+appList[nowNum].slice(1)+"/icon.svg")+"</div><div class='name' style='width:100%;height:30%;font-size:"+os.size*0.3+"px;'>"+appInfo[os.lang]["appName"]+"</div></div>");
    nowNum++;
  }
  $(".apps .appList .app").css({
    "width" : 2*os.size+"px",
    "height" : 2*os.size+"px",
    "margin" : 0.2*os.size+"px "+0.25*os.size+"px",
    "cursor" : "pointer"
  });
  appListF = function(){
    var width = document.body.clientWidth;
    var divWidth = 2.5*os.size;
    width = width/divWidth;
    width = width.toFixed(0);
    if(width > 10){
      width = width - 3;
    }else if(width > 8){
      width = width - 2;
    }else if(width > 6){
      width = width - 1;
    }
    width = width*divWidth;
    marginLR = document.body.clientWidth - width;
    marginLR = marginLR/2;
    $(".apps .appList").css({
      "width" : width+"px",
      margin : "0 "+marginLR+"px"
    });
  };
  reWindow = ["appListF"];
  $(window).resize(function(){
    var funNum = reWindow.length;
    var nowNum = 0;
    while(nowNum < funNum){
      eval(reWindow[nowNum]+"();");
      nowNum++;
    }
  });
  var funNum = reWindow.length;
  var nowNum = 0;
  while(nowNum < funNum){
    eval(reWindow[nowNum]+"();");
    nowNum++;
  }
  //加载头像
  if(localStorage.loginWay == "id"){
    $("body .top .user .userAvatar").html("<img src='serve/infomation.php?type=avatar&uid="+userName+"' style='height:100%;widt:100%;border-radius:100%;'>");
  }
}
iniFun.push("systemUI");
