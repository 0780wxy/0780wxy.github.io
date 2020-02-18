//去掉注释开启调试模式
//localStorage.clear();
//检测文件列表是否存在
localStorage.removeItem("null");
if(localStorage.file_fileList == localStorage.null){
  //创建文件列表
  localStorage.file_fileList = '{"?":[]}';
}
//加载文件列表
var fileList = JSON.parse(localStorage.file_fileList);
var fileLists = JSON.stringify(fileList);
var file = new Object({
  "read" : function(fileURL){
    //文件读取
    if(fileURL.slice(0,1) == "/"){
      //初始分页
      var fileUrl = fileURL;
      fileUrl = fileUrl.slice(1);
      if(fileUrl.slice(-1) == "/"){
        //文件夹
        fileUrl = fileUrl.slice(0,-1);
        fileUrl = fileUrl.replace(/\//g,'"]["?');
        fileUrl = 'fileList["?'+fileUrl+'"]';
        try{
          return eval(fileUrl+'["?"]');
        }catch(error){
          //console.log("找不到文件夹"+fileURL+"\n"+error);
          return null;
        }
      }else{
        if(fileUrl != ""){
          //文件
          var folderUrl = fileUrl.slice(0,fileUrl.lastIndexOf("/"));
          var fileName = fileUrl.slice(fileUrl.lastIndexOf("/")+1);
          folderUrl = folderUrl.replace(/\//g,'"]["?');
          if(folderUrl == ""){
            try{
              return localStorage.getItem("file_"+eval('fileList["'+fileName+'"]["?"]'));
            }catch(error){
              //console.log("找不到文件"+fileURL+"\n"+error);
              return null;
            }
          }else{
            folderUrl = 'fileList["?'+folderUrl+'"]';
            try{
              return localStorage.getItem("file_"+eval(folderUrl+'["'+fileName+'"]["?"]'));
            }catch(error){
              //console.log("找不到文件"+fileURL+"\n"+error);
              return null;
            }
          }
        }else{
          //直接读取根目录下的文件夹
          return fileList["?"];
        }
      }
    }else{
      //其它分页
    }
  },
  "write" : function(fileURL,text){
    //文件写入
    if(fileURL.slice(0,1) == "/"){
      //初始分页
      var fileUrl = fileURL;
      fileUrl = fileUrl.slice(1);
      if(fileUrl.slice(-1) == "/"){
        //文件夹
        if(fileUrl != "/"){
          var nowUrl = "fileList";
          while(fileUrl.indexOf("/") != -1){
            var folderName = fileUrl.slice(0,fileUrl.indexOf("/"));
            if(eval(nowUrl+"['?"+folderName+"']") == undefined){
              eval(nowUrl+"['?'].push('?"+folderName+"')");
              eval(nowUrl+"['?"+folderName+"'] = {'?':[]}");
            }
            nowUrl = nowUrl+"['?"+folderName+"']";
            fileUrl = fileUrl.slice(fileUrl.indexOf("/")+1);
          }
          fileLists = JSON.stringify(fileList);
          localStorage.file_fileList = fileLists;
          return true;
        }else{
          return false;
        }
      }else{
        //文件
        folderUrl = fileUrl.slice(0,fileUrl.lastIndexOf("/")+1);
        fileName = fileUrl.slice(fileUrl.lastIndexOf("/")+1);
        var nowUrl = "fileList";
        if(folderUrl != ""){
          while(fileUrl.indexOf("/") != -1){
            var folderName = fileUrl.slice(0,fileUrl.indexOf("/"));
            if(eval(nowUrl+"['?"+folderName+"']") == undefined){
              eval(nowUrl+"['?'].push('?"+folderName+"')");
              eval(nowUrl+"['?"+folderName+"'] = {'?':[]}");
            }
            nowUrl = nowUrl+"['?"+folderName+"']";
            fileUrl = fileUrl.slice(fileUrl.indexOf("/")+1);
          }
        }
        //删除重复文件(如果)
        file.delete(fileURL);
        eval(nowUrl+"['?'].push('"+fileName+"')");
        var fileID = file.id();
        eval(nowUrl+"['"+fileName+"']={'?':'"+fileID+"'}");
        localStorage.setItem("file_"+fileID,text);
        fileLists = JSON.stringify(fileList);
        localStorage.file_fileList = fileLists;
        return true;
      }
    }else{
      //其它分页
    }
  },
  "uuid" : function(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
    //CC 4.0 BY-SA(CSDN博主「mr_raptor」,https://blog.csdn.net/mr_raptor/article/details/52280753)
  },
  "id" : function(){
    var uuid = file.uuid();
    while(localStorage.getItem("file_"+uuid) != localStorage.null){
      alert("128位随机数字与之前发生重复，如果一瞬间多次弹出此提示框，请刷新本标签页");
      uuid = file.uuid();
    }
    return uuid;
  },
  "delete" : function(fileURL){
    if(fileURL.slice(0,1) == "/"){
      //初始分页
      var fileUrl = fileURL;
      if(fileUrl.slice("-1") == "/"){
        //删文件夹
        fileUrl = fileUrl.slice(0,-1);
        fileName = fileUrl.slice(fileUrl.lastIndexOf("/")+1);
        fileUrl = fileUrl.slice(0,fileUrl.lastIndexOf("/")+1);
        //return file.read(fileURL);
        if(file.read(fileURL).length == 0){
          //空文件夹
          fileUrl = fileUrl.slice(1);
          fileUrl = 'fileList["?'+fileUrl.replace(/\//g,'"]["?');
          eval("delete "+fileUrl+fileName+'"]');
          fileUrl = fileUrl + '"]';
          folderObj = eval(fileUrl);
          folderObj.splice(folderObj.indexOf("?"+fileName),1);
          fileLists = JSON.stringify(fileList);
          localStorage.file_fileList = fileLists;
          return true;
        }else{
          //非空文件夹
          fileUrl = fileUrl.slice(1);
          fileUrl = 'fileList["?'+fileUrl.replace(/\//g,'"]["?');
          var a = 0;
          var b = file.read(fileURL);
          var c = b.length;
          while(0 != c){
            eval("file.delete('"+fileURL+b[a]+"')");
            c = b.length;
          }
          file.delete(fileURL);
        }
        return true;
      }else{
        //删文件
        fileUrl = fileUrl.slice(0,fileUrl.lastIndexOf("/")+1);
        fileName = fileURL.slice(fileURL.lastIndexOf("/")+1);
        //检测文件是否存在
        if(file.read(fileUrl).indexOf(fileName) != -1){
          fileUrl = fileUrl.slice(1,-1);
          fileUrl = 'fileList["?'+fileUrl.replace(/\//g,'"]["?')+'"]';
          var fileU = eval(fileUrl+"['"+fileName+"']['?']");
          eval("delete "+fileUrl+"['"+fileName+"']");
          fileUrl = fileUrl + '["?"]';
          folderObj = eval(fileUrl);
          folderObj.splice(folderObj.indexOf(fileName),1);
          localStorage.removeItem("file_"+fileU);
          fileLists = JSON.stringify(fileList);
          localStorage.file_fileList = fileLists;
          return true;
        }else{
          return false;
        }
      }
    }else{
      //其它分页
    }
  }
});
//检查更新和初始化函数
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
if(localStorage.file_guide == localStorage.null){
  console.log("正在准备系统文件...");
  setup();
}else{
  eval(localStorage.getItem("file_guide"));
}
