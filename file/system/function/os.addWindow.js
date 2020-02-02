function(windowsInfo){
  if(!windowsInfo){
    return false;
  }else{
    if(!windowsInfo.name){windowsInfo.name="undefined";}
    if(!windowsInfo.width){windowsInfo.width=document.body.clientWidth*0.6;}
    if(!windowsInfo.height){windowsInfo.height=document.body.clientHeight*0.6;}
    if(!windowsInfo.left){
      if(!windowsInfo.X){windowsInfo.X=document.body.clientWidth*0.1;}
      windowsInfo.left = windowsInfo.X;
    }
    if(!windowsInfo.top){
      if(!windowsInfo.Y){windowsInfo.Y=document.body.clientHeight*0.1+os.size;}
      windowsInfo.top = windowsInfo.Y;
    }
    if(!windowsInfo.mode){windowsInfo.mode="normal";}
    if(!windowsInfo.id){windowsInfo.id=file.uuid().slice(0,8);}
    if(!windowsInfo.class){windowsInfo.class="undefined";}
    if(!windowsInfo.app){windowsInfo.app="undefined";}
    if(!windowsInfo.icon){windowsInfo.icon="/system/image/unknown.svg";}
    if(!windowsInfo.body){
      windowsInfo.body="";
    }else{
      windowsInfo.body=file.read(windowsInfo.body);
    }
    if(!windowsInfo.type){windowsInfo.type=0x00000000;}
    $(".body").append("<div class='window_"+windowsInfo.id+" app_"+windowsInfo.app+" class_"+windowsInfo.class+"' style='position:fixed;top:"+windowsInfo.top+"px;left:"+windowsInfo.left+"px;width:"+windowsInfo.width+"px;height:"+windowsInfo.height+"px;background:#fff;border:1px solid #666;border-radius:"+os.size*0.1+"px;box-shadow:2px 2px 4px;'></div>");
    $(".window_"+windowsInfo.id).html("<div class='icon' style='width:"+os.size*0.75+"px;height:"+os.size*0.75+"px;'>"+file.read(windowsInfo.icon)+"</div><div class='title' style='cursor:default;width:calc(100% - "+os.size*3+"px);height:"+os.size*0.75+"px;line-height:"+os.size*0.75+"px;font-size:"+os.size*0.3+"px;'>"+windowsInfo.name+"</div><div class='conBar' style='float:right;width:"+os.size*2.25+"px;height:"+os.size*0.75+"px;line-height:"+os.size*0.75+"px;text-align:center;font-size:"+os.size*0.5+"px;cursor:pointer;'><div class='min' style='width:"+os.size*0.75+"px;height:"+os.size*0.75+"px;'>-</div><div class='max' style='width:"+os.size*0.75+"px;height:"+os.size*0.75+"px;' onclick='os.maxWindow(\""+windowsInfo.id+"\");'>❒</div><div class='off' style='width:"+os.size*0.75+"px;height:"+os.size*0.75+"px;' onclick='$(\".window_"+windowsInfo.id+"\").remove();'>×</div></div><div class='text' style='width:100%;height:calc(100% - "+os.size*0.5+"px);overflow-x:auto;overflow-y:auto;'>"+windowsInfo.body+"</div>");
    os.addMove(".window_"+windowsInfo.id+" .title");
    os.zIndex++;
    $(".window_"+windowsInfo.id).css("z-index",os.zIndex);
    eval("window_"+windowsInfo.id+"=windowsInfo");
    if(windowsInfo.mode == "max"){
      windowsInfo.mode = "max";
      windowsInfo.left = $(".window_"+windowsInfo.id).css("left").slice(0,-2);
      windowsInfo.top = $(".window_"+windowsInfo.id).css("top").slice(0,-2);
      $(".window_"+windowsInfo.id).animate({
        "width" : "100%",
        "height" : document.body.clientHeight - os.size+"px",
        "top" : os.size,
        "left" : 0
      },os.effect*0.25);
    }
    return true;
  }
}
