/**
 * Created by Thinkpad on 2016/6/24.
 */
//选项卡
console.log(utils.getElementsByClass("xxk"))

var xxk = utils.getElementsByClass("xxk");

for (var i = 0; i < xxk.length; i++) {
    (function (i) {
        xxk[i].onmouseenter = function (e) {
            fn.call(this, "block");
        };
        xxk[i].onmouseleave = function (e) {
            fn.call(this, "none");
        }
    })(i)
}

function fn(attr) {
    var ary = this.className.split(/\s+/);
    this.className = "";
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === "frame") {
            ary[i] = "frame1";
            fn.call(this, "block");
        } else if (ary[i] == "frame1") {
            ary[i] = "frame";
            fn.call(this, "none");
        }
        this.className += ary[i] + " "
    }
    function fn(ds) {
        var child = this.firstChild;
        while (child) {
            if (child.className) {
                var ary = child.className.split(/\s+/);
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] === "xxk1") {
                        child.style.display = ds;
                    }
                    if (ary[i] === "arrow") {
                        child.className = "arrow1"
                    } else if (ary[i] === "arrow1") {
                        child.className = "arrow"
                    }
                }
            }
            child = child.nextSibling
        }
    }
}

/*
 var jFloor=document.getElementsByClassName("jd-floor");

 for(var i=0;i<jFloor.length;i++){
 var xxkF=[];
 xxkF[i]=jFloor[i].getElementsByClassName("xxkF");
 for(var j=0;j<xxkF[i].length;j++){
 console.log(xxkF[j])
 xxkF[i][j].onmouseenter=function(){
 fn2.call(this);
 fn1.call(this)
 }
 }
 }
 fn2.call(xxkF[0][0]);
 fn1.call(xxkF[0][0]);
 function fn1(){
 //var ary = this.className.split(/\s+/);
 var chile=this.firstChild;
 while(chile){
 if(chile.className!=null){
 //if(ds==="none"){
 //    fn2.call(this,"block")
 //}
 chile.style.display="block";
 this.className+=" xxkF-bg1"
 //console.log(chile.display)
 //console.log(utils.css(chile,"display"))
 }
 chile=chile.nextSibling;
 }
 }
 function fn2(ds){
 var a=this.parentNode;
 a= a.firstChild;
 while(a){
 var b= a.firstChild;
 while(b){
 if(b.tagName==="DIV"){
 utils.css(b,"display")==="block"? b.style.display="none":null;
 utils.removeClass(b.parentNode,"xxkF-bg1")
 }
 b= b.nextSibling;
 }
 a= a.nextSibling;
 }

 }
 */

var xxkF=utils.getElementsByClass("XXK11");
var xxf=utils.getElementsByClass("jd-floor-bottom-right")[0]
for(var i=0;i<xxkF.length;i++){
    (function(i){
        xxkF[i].onmouseenter=function(){
            fn1.call(this,i+1)
            fn2.call(this)
        }
    })(i)
}

fn2.call(xxkF[0])
function fn2(){
    for(var i=0;i<xxkF.length;i++){
        if(xxkF[i]===this){
            utils.addClass(xxkF[i],"bg-f")
            utils.removeClass(xxkF[i],"bg-f1")

        }else{
            utils.removeClass(xxkF[i],"bg-f")
            utils.addClass(xxkF[i],"bg-f1")
        }

    }
}
function fn1(i){
    var a=xxf.className+"-"+i;
    var child=xxf.firstChild;
    while(child){
        if(child.className=== a){
            child.style.display="block";
        }else if(child.className){
            child.style.display="none";
        }
        child=child.nextSibling;
    }

}


var oBox = utils.getElementsByClass("jd-subject-middle")[0],
    oImgWrap = oBox.getElementsByTagName("div")[0],
    oDiv = oImgWrap.getElementsByTagName("div"),
    oUl = oBox.getElementsByTagName("ul")[0],
    oLi = oUl.getElementsByTagName("li");

var autoTimer = null,
    step = 0,
    interval = 3000;

oBox.onmouseover = function (e) {
    e = e.target || window.event;
    clearInterval(autoTimer);
    if (e.nodeName == "LI") {
        step = e.innerHTML - 1;
        autoMove();
    }
};
oBox.onmouseout = function () {
    clearInterval(autoTimer);
    autoTimer = setInterval(autoMove, interval);
};
oBox.onclick = function (e) {
    e = e.target || window.event;
    clearInterval(autoTimer);
    if (e.nodeName == "A") {
        e.className == "left" ? step-- : step++;
        if (step >= oDiv.length - 1) {
            step = -1;
        } else if (step <= -1) {
            step = oDiv.length - 1;
        }
        setBanner();
    }
};
oDiv[0].style.opacity = 1;
autoTimer = setInterval(autoMove, interval);
function autoMove() {
    if (step >= oDiv.length - 1) {
        step = -1;
    }
    step++;
    setBanner();
}
function setBanner() {
    for (var i = 0; i < oDiv.length; i++) {
        var curDiv = oDiv[i];
        if (i === step) {
            utils.css(curDiv, 'zIndex', 1);
            move(curDiv, {'opacity': 1}, 600);
            continue;
        }
        utils.css(curDiv, 'zIndex', 0)
    }
    bannerTip();
}
function bannerTip() {
    for (var i = 0; i < oLi.length; i++) {
        var curLi = oLi[i];
        i === step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
    }
}

//动画
function move(curEle, target, duration) {
    clearInterval(curEle.timer);

    var time = null,
        begin = {},
        change = {};
    duration = duration || 3000;
    for (var attr in target) {
        begin[attr] = utils.css(curEle, attr);
        change[attr] = target[attr] - begin[attr];
    }
    curEle.timer = setInterval(function () {
        time += 10;
        if (time >= duration) {
            utils.css(curEle, target);
            //callback && callback.call(curEle)
            window.clearInterval(curEle.timer);
            window.clearTimeout(curEle.timer);

            return;
        }
        for (var attr in change) {
            var curPos = time * change[attr] / duration + begin[attr]
            utils.css(curEle, attr, curPos)
        }
    }, 10);
}


//账号登录
var useP={"123456":"654321"};
var useTmp={};
var load=document.getElementById("load");

//var but=load.getElementsByClassName("input");
var but=load.getElementsByTagName("input",load)
but[3].onclick=function(){
    if(but[0].value){
        if(but[1].value){
            if(!useTmp[but[0].value]||useTmp[but[0].value]<=3){
                if(useP[but[0].value]==but[1].value){
                    alert("登录成功");
                    load.style.display="none";
                }else if(!useTmp[but[0].value]){
                    useTmp[but[0].value]=1;
                    alert("您还有"+3+"次机会")

                }else{
                    useTmp[but[0].value]+=1;
                    console.log(useTmp[but[0].value])
                    alert("您还有"+(4-useTmp[but[0].value])+"次机会")
                }
            }else{
                alert("为了您的账户安全\n请明天登录或者修改密码")
            }
        }else{
            alert("您好！请输入您的密码")
        }
    }else{
        alert("您好！请输入您的账户")
    }

    but[1].value="";
    but[1].focus();
};
but[4].onclick=function(){
    console.log(111)
    if(but[0].value){
        if(but[0].value&&but[0].value.length>5){
            if(!useP[but[0].value]){
                useP[but[0].value]=but[1].value;
                alert("注册成功")
            }else{
                alert("对不起您的账户被别人抢注了，请更换用户名重新注册")
            }
        }else{
            alert("请输入您的六位密码")
        }
    }else{
        alert("请输入你要注册的账户")
    }
    but[1].value="";
    but[1].focus();
};










