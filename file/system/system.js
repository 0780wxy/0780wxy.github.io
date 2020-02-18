//变更标题
$("title").html("HTMLOS-system");
//加载自定义函数
os = new Object();
//加载变量
iniFun = [];
//登陆
userName = "admin";
loginWay = "local";
userPassword = undefined;
if(localStorage.loginWay == "id"){
  //id登陆
  userName = localStorage.userName;
  loginWay = "id";
  userPassword = localStorage.userPassword;
}else{
  //本地登陆
  userName = "admin";
  loginWay = "local";
  userPassword = undefined;
}
//加载系统配置文件
os.ini = function(fileHref,key,value){
  //
  if(!fileHref){
    return null;
  }else{
    if(file.read(fileHref) != null){
      if(!key){
        var iniWork = JSON.parse(file.read(fileHref));
        $.extend(iniWork,JSON.parse(file.read(fileHref+".con")));
        return iniWork;
      }else{
        if(!value){
          var iniWork = JSON.parse(file.read(fileHref));
          $.extend(iniWork,JSON.parse(file.read(fileHref+".con")));
          var keyP = key.replace(/\./g,'"]["');
          return eval('iniWork["'+keyP+'"]');
        }else{
          var iniWork = JSON.parse(file.read(fileHref));
          $.extend(iniWork,JSON.parse(file.read(fileHref+".con")));
          var keyP = key.replace(/\./g,'"]["');
          eval('iniWork["'+keyP+'"] = value');
          return file.write(fileHref+".con",JSON.stringify(iniWork));
        }
      }
    }else{
      return null;
    }
  }
  return "error";
}
//加载系统配置
refreshCon = function(){
  os.size = os.ini("/system/con/index.json","size");
  os.effect = os.ini("/system/con/index.json","effect");
  os.lang = os.ini("/system/con/index.json","lang");
}
//加载已安装函数
refreshFun = function(){
  var funList = file.read("/system/function/");
  var funNum = funList.length;
  var nowNum = 0;
  while(nowNum < funNum){
    eval(funList[nowNum].slice(0,funList[nowNum].lastIndexOf("."))+"="+file.read("/system/function/"+funList[nowNum]));
    nowNum++;
  }
  funList = file.read("/data/"+userName+"/function/");
  funNum = funList.length;
  nowNum = 0;
  while(nowNum < funNum){
    eval(funList[nowNum].slice(0,funList[nowNum].lastIndexOf("."))+"="+file.read("/data/"+userName+"/function/"+funList[nowNum]));
    nowNum++;
  }
}
//执行启动项
refreshRun = function(){
  var funList = file.read("/system/run/");
  var funNum = funList.length;
  var nowNum = 0;
  while(nowNum < funNum){
    eval(file.read("/system/run/"+funList[nowNum]));
    nowNum++;
  }
  funList = file.read("/data/"+userName+"/run/");
  funNum = funList.length;
  nowNum = 0;
  while(nowNum < funNum){
    eval(file.read("/data/"+userName+"/run/"+funList[nowNum]));
    nowNum++;
  }
}
refreshAll = function(){
  refreshCon();
  refreshFun();
  refreshRun();
}
refreshAll();
//等待1秒
setTimeout(function(){
  //关闭开机特效
  loadingEffects = "";
  delete loadingEffects;
  $(".loading").stop(true);
  //后置函数
  var funNum = iniFun.length;
  var nowNum = 0;
  while(nowNum < funNum){
    eval(iniFun[nowNum]+"();"+iniFun[nowNum]+"='';delete "+iniFun[nowNum]);
    nowNum++;
  }
},1000);
//变更标题
$("title").html("HTMLOS-"+userName);
