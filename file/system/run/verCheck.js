$.ajax({
  type : "get",
  url : "version.txt",
  dataType : "text",
  cache : false,
  success : function(text){
    var ver = text;
    ver = ver.slice(0,ver.indexOf("\n"));
    if(ver > localStorage.getItem("osVer")){
      if(confirm("检测到新版本，是否更新")){
        eval(file.read("/apps/updata/index.js"));
      }
    }
  }
});
