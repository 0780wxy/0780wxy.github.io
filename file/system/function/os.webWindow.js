<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        <link rel="Shortcut Icon" href="/favicon.ico" type="image/x-icon" />
        <title></title>
        <script src='jquery.js'></script>
        <link rel="stylesheet" href="css.css" />
        <script type="text/javascript">
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
                    console.log("找不到文件夹"+fileURL+"\n"+error);
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
                        console.log("找不到文件"+fileURL+"\n"+error);
                        return null;
                      }
                    }else{
                      folderUrl = 'fileList["?'+folderUrl+'"]';
                      try{
                        return localStorage.getItem("file_"+eval(folderUrl+'["'+fileName+'"]["?"]'));
                      }catch(error){
                        console.log("找不到文件"+fileURL+"\n"+error);
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
        </script>
    </head>
    <body></body>
    <script type="text/javascript">
      var webURL = window.location.href;
      webURL = webURL.slice(webURL.indexOf("#")+1);
      $("body").html(file.read(webURL));
    </script>
</html>
