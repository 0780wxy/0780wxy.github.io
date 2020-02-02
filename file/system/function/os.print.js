function(text){
  var uuid = file.uuid();
  $(".body").append("<div class='"+uuid+"' style='position:fixed;width:"+os.size*5+"px;height:"+os.size*3+"px;background:#fff;top:calc(50% - "+os.size*1.5+"px);left:calc(50% - "+os.size*2.5+"px);border:1px solid #666;border-radius:"+os.size*0.1+"px;box-shadow:2px 2px 4px;'><div style='width:90%;height:60%;margin:5% 5% 0 5%;cursor:default;' class='text'>"+text+"</div><div style='height:25%;width:25%;background:#17f;color:#fff;border-radius:"+os.size*0.1+"px;text-align:center;float:right;margin:0 5%;;line-height:"+os.size*0.7+"px;font-size:"+os.size*0.3+"px;cursor:pointer;' class='button' onclick='$(\"."+uuid+"\").remove();'>确定</div></div>");
  os.addMove("."+uuid+" .text");
  return true
}
