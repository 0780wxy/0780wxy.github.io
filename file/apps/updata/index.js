$("body").append("<div class='updataBox' style='position:fixed;width:300px;height:200px;top:calc(50% - 100px);left:calc(50% - 150px);background:#fff;'><div class='text' style='height:150px;width:100%'>您确定要更新吗？<br>如果更新失败，您的数据将丢失。</div><div style='width:100%;height:50px;border-top:solid 1px #ccc;line-height:50px;text-align:center;'><div style='width:calc(50% - 1px);height:100%;border-right:solid 1px #ccc;' class='runUpData'>确定</div><div style='width:50%;height:100%;' onclick='$(\".updataBox\").remove();'>取消</div></div></div>");
if(typeof verCheck!=="undefined"){
  $(".updataBox .text").html("检测到新版本，是否更新？");
}
$(".updataBox .runUpData").click(function(){
  function setup(){
    //重置系统
    console.log("正在获取文件列表...");
    /*$.ajax({
      type : "get",
      url : "",
      dataType : "text",
      cache : false,
      success : function(text){
      }
    });*/
    $.ajax({
      type : "get",
      url : "list.json",
      dataType : "text",
      cache : false,
      success : function(FL){
        fl = JSON.parse(FL);
        setupSuccess = function(){
          $.ajax({
            type : "get",
            url : fl.guideFile,
            dataType : "text",
            cache : false,
            success : function(text){
              nowPs++;
              progressBar(nowPs,Number(allPs+1));
              $.ajax({
                type : "get",
                url : "version.txt",
                dataType : "text",
                cache : false,
                success : function(text){
                  var ver = text;
                  ver = ver.slice(0,ver.indexOf("\n"));
                  localStorage.setItem("osVer",ver);
                }
              });
              console.log("完成，正在启动...");
              delete fl;
              delete nowPs;
              delete allPs;
              localStorage.setItem("file_guide",text);
              eval(localStorage.getItem("file_guide"));
            }
          });
        }
        $.ajax({
          type : "get",
          url : fl.setupUI,
          dataType : "text",
          cache : false,
          success : function(setupUI){
            eval(setupUI);
            allPs = fl.fileList.length;
            nowPs = 0;
            var nowP = 0;
            while(nowP < allPs){
              if(fl.fileList[nowP][1] != ":folder"){
                eval('$.ajax({type : "get",url : "'+fl.fileList[nowP][1]+'",dataType : "text",cache : false,success : function(text){nowPs++;file.write("'+fl.fileList[nowP][0]+'",text);progressBar(nowPs,Number(allPs+1));if(nowPs == allPs){setupSuccess();}}});');
              }else{
                nowPs++;
                file.write(fl.fileList[nowP][0]);
                progressBar(nowPs,Number(allPs+1));
              }
              nowP++;
            }
          }
        });
      },
      error : function(error){
        var userChoose = window.confirm("获取文件列表失败，是否再次尝试\n错误:"+error.status+" "+error.statusText);
        if(userChoose){
          setup();
        }
      }
    });
  }
  setup();
});
