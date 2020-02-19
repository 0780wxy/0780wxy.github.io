$.ajax({
  type : "get",
  url : "version.txt",
  dataType : "text",
  cache : false,
  success : function(text){
    var ver = text;
    ver = ver.slice(0,ver.indexOf("\n"));
    if(ver > localStorage.getItem("osVer")){
      verCheck = true;
      eval(file.read("/apps/updata/index.js"));
    }
  }
});
