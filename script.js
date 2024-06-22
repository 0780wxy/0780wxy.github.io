//题库
var data = {};

//当前题目正确选项个数
var allTrueCount = 0;

//当前用户选择正确答案个数
var userTrueCount = 0;

//新题计数器
var newQuestionCount = 0;

//错题计数器
var falseQuestionCount = 0;

//新题数组
var newQuestionList = [];

//错题数组
var falseQuestionList = [];

//正确数组
var trueQuestionList = [];

//当前题目指针
var nowPoint = 0;

//历史题目
var historyQuestion = [];

//答题计数器
var answerQuestionCount = 0;

//答对计数器
var answerTrueCount = 0;

//当前是否回答错误
var nowAnswerFalse = false;

//检查是否选择题库
if (location.href.indexOf("?") == -1) {
    //未选择题库
    $("#title").text("欢迎");
    $("title").text("选择题练习-欢迎");
    $("#helloPage").show();
} else {
    //已选择题库
    $("title").text("选择题练习-加载中...");
    $("#question,#choose").show();
    //获取题库
    let url = location.href.slice(location.href.lastIndexOf("?") + 1);
    if (url.indexOf(":") == -1) {
        url = location.href.slice(0,location.href.indexOf("?")) + url;
    }
    console.log(url);
    $.ajax({
        "url": url,
        "type": "get",
        "dataType": "text",
        "cache": "false",
        "success": (d)=>{
            try{
                data = JSON.parse(d);
            }catch(e){
                console.error(e);
                alert("当前题库格式无法正确识别，即将回到欢迎页\n"+e);
                location.href = location.href.slice(0,location.href.indexOf("?"));
                return;
            }
            $("#title").text(data.name);
            $("title").text("选择题练习-"+data.name);
            //加载记录
            falseQuestionList = JSON.parse(localStorage.getItem(data.uuid+"-false"));
            if(falseQuestionList == null || falseQuestionList == undefined){
                falseQuestionList = [];
            }
            trueQuestionList = JSON.parse(localStorage.getItem(data.uuid+"-true"));
            if(trueQuestionList == null || trueQuestionList == undefined){
                trueQuestionList = [];
            }
            for (let i = 0; i < data.data.length; i++) {
                if(falseQuestionList.indexOf(i) == -1 && trueQuestionList.indexOf(i) == -1){
                    newQuestionList.push(i);
                }
            }
            //开始
            addQuestion();
            loadQuestion(historyQuestion[0]);
        },
        "error": (e)=>{
            console.error(e);
            alert("当前题库存在网络错误，即将回到欢迎页。\n错误: "+e.status+" "+e.statusText);
            location.href = location.href.slice(0,location.href.indexOf("?"));
        }
    })
}

$("#start").click(() => {
    location.href = location.href + "?" + $("#url").val();
})

$("#url").keydown((e)=>{
    if(e.keyCode == 13){
        $("#start").click();
    }
})

//作答
$("#choose").click((e)=>{
    if($(e.target).attr("class") == "fullButton"){
        //点击了未作答的题目
        $(e.target).addClass("select");
        //更新答题情况
        if($(e.target).attr("answer") == "true"){
            userTrueCount++;
            //检查是否选出全部正确答案
            if(userTrueCount >= allTrueCount){
                //修改题目分类
                if(newQuestionList.indexOf(historyQuestion[nowPoint]) != -1){
                    newQuestionList.splice(newQuestionList.indexOf(historyQuestion[nowPoint]),1);
                }
                if(falseQuestionList.indexOf(historyQuestion[nowPoint]) != -1){
                    falseQuestionList.splice(newQuestionList.indexOf(historyQuestion[nowPoint]),1);
                }
                if(trueQuestionList.indexOf(historyQuestion[nowPoint]) != -1){
                    trueQuestionList.splice(newQuestionList.indexOf(historyQuestion[nowPoint]),1);
                }
                //更改计数器
                answerQuestionCount++;
                if(!nowAnswerFalse){
                    answerTrueCount++;
                    trueQuestionList.push(historyQuestion[nowPoint]);
                }else{
                    falseQuestionList.push(historyQuestion[nowPoint]);
                }
                $("#accuracy").text(`近${answerQuestionCount}题正确率${Math.round((answerTrueCount/answerQuestionCount)*1000)/10}%`);
                //保存分类
                localStorage.setItem((data.uuid+"-true"),JSON.stringify(trueQuestionList));
                localStorage.setItem((data.uuid+"-false"),JSON.stringify(falseQuestionList));
                //检查是否追加题目到列表
                // nowPoint++;
                if(nowPoint+1 >= historyQuestion.length){
                    addQuestion();
                    loadCount();
                }
                //等待一段时间进入下一题
                if(!nowAnswerFalse){
                    setTimeout(() => {
                        // loadQuestion(historyQuestion[nowPoint]);
                        // loadCount();
                        $("#next").trigger("click");
                    }, 500);
                }
            }
        }else if($(e.target).attr("answer") == "false"){
            nowAnswerFalse = true;
        }
    }
})

// 加载题号计数器
function loadCount() {
    $("#title").text(data.name+" "+trueQuestionList.length+"/"+falseQuestionList.length+"/"+(data.data.length-trueQuestionList.length-falseQuestionList.length));
    $("#count").text(nowPoint+1+"/"+historyQuestion.length);
    if(nowPoint == 0){
        $("#before").addClass("disable");
    }else{
        $("#before").removeClass("disable");
    }
    if(nowPoint+1 == historyQuestion.length){
        $("#next").addClass("disable");
    }else{
        $("#next").removeClass("disable");
    }
}

//上一题
$("#before").click(()=>{
    if(nowPoint > 0){
        nowPoint--;
        loadQuestion(historyQuestion[nowPoint]);
        loadCount();
    }
})

//下一题
$("#next").click(()=>{
    if(nowPoint < historyQuestion.length - 1){
        nowPoint++;
        loadQuestion(historyQuestion[nowPoint]);
        loadCount();
    }
})

//加载题目函数
function loadQuestion(i) {
    // 获取题目类型
    headText = "[单选题] ";
    if(data.data[i].true.length>1){
        headText = "[多选题] ";
    }

    //加载题目
    $("#question").text(headText+data.data[i].question);

    //初始化
    allTrueCount = data.data[i].true.length;
    userTrueCount = 0;
    nowAnswerFalse = false
    let lis = [];

    //载入正确选项
    for (let j = 0; j < data.data[i].true.length; j++) {
        const e = data.data[i].true[j];
        e.replace(/&/g,'&amp;');
        e.replace(/</g,'&lt;');
        e.replace(/>/g,'&gt;');
        lis.push(`<div answer="true" class="fullButton">${e}</div>`);
    }

    //载入错误选项
    for (let j = 0; j < data.data[i].false.length; j++) {
        const e = data.data[i].false[j];
        e.replace(/&/g,'&amp;');
        e.replace(/</g,'&lt;');
        e.replace(/>/g,'&gt;');
        lis.push(`<div answer="false" class="fullButton">${e}</div>`);
    }

    //随机打乱
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < lis.length; i++) {
            let r = Math.floor(Math.random() * lis.length);
            let x = lis[r];
            lis[r] = lis[i];
            lis[i] = x;
        }
    }

    //填充
    $("#choose").empty();
    for (let j = 0; j < lis.length; j++) {
        $("#choose").append(lis[j]);
    }
}

//追加题目函数
function addQuestion() {
    if(newQuestionList.length > 0 && newQuestionCount < 5){
        //抽一道新题目到末尾
        let r = Math.floor(Math.random() * newQuestionList.length);
        historyQuestion.push(newQuestionList[r]);
        newQuestionCount++;
        return;
    }
    if(falseQuestionList.length > 0 && falseQuestionCount < 5){
        //抽一道错题到末尾
        let r = Math.floor(Math.random() * falseQuestionList.length);
        historyQuestion.push(falseQuestionList[r]);
        falseQuestionCount++;
        newQuestionCount = 0;
        return;
    }
    //抽一道正确题到末尾
    let r = Math.floor(Math.random() * trueQuestionList.length);
    historyQuestion.push(trueQuestionList[r]);
    falseQuestionCount = 0;
    newQuestionCount = 0;
}