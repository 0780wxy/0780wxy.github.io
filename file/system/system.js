//变更标题
$("title").html("HTMLOS-system");
//加载自定义函数
os = new Object({
  "size" : 40,
  "effect" : 100
});
//加载变量
userName = "admin";
loginWay = "local";
userPassword = undefined;
iniFun = [];
//加载配置文件
refreshCon = function(){
  var funList = file.read("/system/con/");
  var funNum = funList.length;
  var nowNum = 0;
  while(nowNum < funNum){
    eval(funList[nowNum].slice(0,funList[nowNum].lastIndexOf("."))+"=new Object("+file.read("/system/con/"+funList[nowNum])+")");
    nowNum++;
  }
  funList = file.read("/data/"+userName+"/con/");
  funNum = funList.length;
  nowNum = 0;
  while(nowNum < funNum){
    eval(funList[nowNum].slice(0,funList[nowNum].lastIndexOf("."))+"=new Object("+file.read("/data/"+userName+"/con/"+funList[nowNum])+")");
    nowNum++;
  }
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
    eval(iniFun[nowNum]+"()");
    nowNum++;
  }
},1000);
//变更标题
$("title").html("HTMLOS-"+userName);
