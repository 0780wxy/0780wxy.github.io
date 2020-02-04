function(fun = function(){},type = "file"){
  var windowName;
  if(type == "file"){
    windowName = "请选择文件";
  }else if(type == "folder"){
    windowName = "请选择文件夹";
  }else if(type == "href"){
    windowName = "保存文件";
  }
  os.addWindow({
    "width" : 500,
    "height" : 300,
    "name" : windowName,
    "app" : "system",
    "icon" : "/system/image/folderManager.svg"
  });
  delete windowName;
  $("."+os.hotWindow+" .text").html("<div class='bar'><div class='back' style='width:"+os.size*0.75+"px;height:"+os.size*0.75+"px;text-align:center;'>←</div><div style='width:calc(100% - "+os.size*1.5+"px - 1px);height:"+os.size*0.75+"px;'><input class='href' value='/user/"+userName+"/' style='width:calc(100% - 2px);height:calc(100% - 2px);border:1px solid #eee;margin:1px;' type='text'></div><div class='ok' style='width:"+os.size*0.75+"px;height:calc("+os.size*0.75+"px - 2px);text-align:center;margin:1px 0 0;border-top:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;'>></div></div><div class='allFile' style='auto;overflow-y:auto;width:100%;height:calc(100% - "+os.size*2.28+"px);'></div><div class='bottomBar'><div style='width:100%;height:"+os.size*0.6+"px;' class='names'><div style='height:100%;width:18%;line-height:"+os.size*0.6+"px;'><p style='float:right;'>文件名</p></div><input class='name' style='width:calc(80% - 2px);height:calc(100% - 2px);border:1px solid #666;margin:1px;background:rgba(255,255,255,0);' type='text'></div><div class='bottom' style='height:"+os.size*0.7+"px;width:"+os.size*1.5+"px;background:#17f;color:#fff;border-radius:"+os.size*0.1+"px;text-align:center;float:right;margin:"+os.size*0.1+"px "+os.size*0.2+"px;;line-height:"+os.size*0.75+"px;font-size:"+os.size*0.3+"px;cursor:pointer;'>保存</div></div>");
  if(type != "href"){
    $("."+os.hotWindow+" .text .names").html("");
    $("."+os.hotWindow+" .text .bottom").html("打开");
  }
  $("."+os.hotWindow+" .text .bar").css({
    "width" : "100%",
    "height" : os.size*0.75+"px",
    "background" : "#fff",
    "border-bottom" : "solid 1px #eee",
    "font-size" : os.size*0.4+"px",
    "line-height" : os.size*0.75+"px",
  });
  function dirFile(cdHref = ''){
    var fileL = file.read($("."+os.hotWindow+" .text .href").val()+cdHref);
    //$("."+os.hotWindow+" .text .allFile").html("<div onclick='"$(\"."+os.hotWindow+" .text .href\").val($(\"."+os.hotWindow+" .text .href\").val()+\""+"desktop/"+"\");$(\"."+os.hotWindow+" .text .ok\").trigger(\"click\");"'>23333</div>");
    $("."+os.hotWindow+" .text .allFile").html("");
    var allF = fileL.length;
    var nowF = 0;
    while(nowF < allF){
      var fileName = fileL[nowF];
      var ico = "/apps/edit/icon.svg";
      var events = "$(\"."+os.hotWindow+" .text .name\").val(\""+""+fileName+"\");$(\"."+os.hotWindow+" .text .bottom\").trigger(\"click\");";
      if(fileName.slice(0,1) == "?"){
        fileName = fileName.slice(1);
        ico = "/system/image/folderManager.svg";
        events = "$(\"."+os.hotWindow+" .text .href\").val($(\"."+os.hotWindow+" .text .href\").val()+\""+""+fileName+"/"+"\");$(\"."+os.hotWindow+" .text .ok\").trigger(\"click\");";
      }
      $("."+os.hotWindow+" .text .allFile").append("<div onclick='"+events+"' style='text-align:center;font-size:"+os.size*0.25+"px;line-height:"+os.size*0.3+"px;width:"+os.size*2+"px;height:"+os.size*1.7+"px;'><div style='width:60%;height:60%;margin:5% 20%;'>"+file.read(ico)+"</div>"+fileName+"</div>");
      nowF++;
    }
  }
  $("."+os.hotWindow+" .text .href").keyup(function(event){
    if(event.keyCode == 13){
      if(file.read($("."+os.hotWindow+" .text .href").val()) != null){
        dirFile();
      }else{
        os.print("找不到对象");
      }
    }
  });
  $("."+os.hotWindow+" .text .name").keyup(function(event){
    if(event.keyCode == 13){
      fun($("."+os.hotWindow+" .text .href").val() + $("."+os.hotWindow+" .text .name").val());
      $("."+os.hotWindow+",.runIcon_"+os.hotWindow.slice(7)).remove();
    }
  });
  $("."+os.hotWindow+" .text .bottom").click(function(){
    if($("."+os.hotWindow+" .text .name").val() == ""){
      $("."+os.hotWindow+" .text .name").val("未命名文件");
    }
    fun($("."+os.hotWindow+" .text .href").val() + $("."+os.hotWindow+" .text .name").val());
    $("."+os.hotWindow+",.runIcon_"+os.hotWindow.slice(7)).remove();
  });
  $("."+os.hotWindow+" .text .ok").click(function(){
    if(file.read($("."+os.hotWindow+" .text .href").val()) != null){
      dirFile();
    }else{
      os.print("找不到对象");
    }
  });
  $("."+os.hotWindow+" .text .back").click(function(){
    if($("."+os.hotWindow+" .text .href").val() != "/"){
      $("."+os.hotWindow+" .text .href").val($("."+os.hotWindow+" .text .href").val().slice(0,$("."+os.hotWindow+" .text .href").val().slice(0,-1).lastIndexOf("/")+1));
      dirFile();
    }
  });
  $("."+os.hotWindow+" .text .bottomBar").css({
    "width" : "100%",
    "height" : os.size*1.5+"px",
    "background" : "#eee",
    "font-size" : os.size*0.3+"px",
    "line-height" : os.size*0.5+"px"
  });
  dirFile();
}
