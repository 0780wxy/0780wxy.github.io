$('.kuangs').fadeOut(50);
$(".leftBar").html("none");
function getApp(url){
  $.ajax({
    type : "get",
    url : url+"list.json",
    dataType : "text",
    cache : false,
    success : function(text){
      var appFileList = JSON.parse(text);
      fileAllNum = appFileList.length;
      nowNum = 0;
      nowDown = 0;
      $('.kuangs').fadeIn(50);
      $('.kuangs .ok').hide();
      $('.kuangs .title').html("正在下载");
      $(".kuangs .runBar").html('<div class="runBars" style="overflow:hidden;width:160px;height:2px;border:0.5px #ccc solid;margin:24px 20px;background:#ccc;"><div class="rb" style="width:160px;height:2px;background:#fff;position: relative;right:100%;"></div></div>');
      while(nowNum < fileAllNum){
        eval('$.ajax({type:"get",url:"'+appFileList[nowNum][0]+'",dataType:"text",cache:false,success:function(text){file.write("'+appFileList[nowNum][1]+'",text);nowDown++;var runBarNum = nowDown/fileAllNum;runBarNum = runBarNum*100;runBarNum = 100 - runBarNum;runBarNum = runBarNum.toFixed(2)+"%";$(".kuangs .rb").css("right",runBarNum);if(nowDown == fileAllNum){$(".kuangs .ok").show();$(".kuangs .title").html("正在完成");$(".kuangs .runBar").html("请手动刷新网页");}}});');
        nowNum++;
      }
    }});
}
$.ajax({
  type : "get",
  url : "./home.json",
  dataType : "text",
  cache : false,
  success : function(text){
    var storeHome = "<div style='width:100%;height:100%;overflow-y:auto;'>";
    var iconRun = "";
    var applist = JSON.parse(text);
    var partNum = applist.home.length;
    var nowPartNum = 0;
    while(partNum > nowPartNum){
      storeHome = storeHome + "<div style='width:100%;margin:0 0 20px;'><div style='width:100%;font-size:15px;height:20px;line-height:20px;'>"+applist.home[nowPartNum].name+"</div>";
      var listAll = applist.home[nowPartNum].app.length;
      var nowListAll = 0;
      while(listAll > nowListAll){
        var newuuid = file.uuid();
        storeHome = storeHome + "<div class='"+newuuid+"' style='width:80px;height:90px;'><div class='icon' style='width:60px;height:60px;margin:10px 10px 0 10px;'></div><div style='width:100%;height:15px;line-height:15px;text-align:center;font-size:12px'>"+applist.home[nowPartNum].app[nowListAll].name+"</div></div>";
        iconRun = iconRun + '$.ajax({type:"get",url:"'+applist.home[nowPartNum].app[nowListAll].url+'icon.svg",dataType:"text",success:function(text){$(".'+newuuid+' .icon").html(text);}});$(".'+newuuid+'").click(function(){getApp("'+applist.home[nowPartNum].app[nowListAll].url+'")});';
        nowListAll++;
      }
      storeHome = storeHome + "</div>";
      nowPartNum++;
    }
    storeHome = storeHome + "</div>";
    $(".appStore").html(storeHome);
    eval(iconRun);
  }
});
