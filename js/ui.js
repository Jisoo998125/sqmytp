/**
 * contains
 * @param {*} needle 查看是否包含的元素
 * @returns {boolean} 包含返回true不包含返回false
 */
Array.prototype.contains = function(needle) {
    for (i in this) {
        if (this[i] == needle) {
            return true;
        }
    }
    return false;
}

/**
 * replaceAll
 * @param {string} s1 需要被替换的字符
 * @param {string} s2 想要替换成的字符
 * @returns 返回替换后的值
 */
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}


var scripts = document.getElementsByTagName("script");
var thisScript = scripts[scripts.length - 1];
//http: //192.168.1.149:8080/brzs/
var appUrl = "https://szzx.huzhou.gov.cn:6443/hzzx/";
var dfsUrl = appUrl + "/DFS";
if (!appUrl) {
    var lastUrl = thisScript.src;
    appUrl = lastUrl.replace("front/ui/boshan/ui.js", "");
    if (appUrl.indexOf("?") > 0) {
        appUrl = appUrl.substring(0, appUrl.indexOf("?"));
    }
    dfsUrl = appUrl + "/DFS";
}
initUI();

//跳转登录页面
var isDebug = true;
if (!isDebug) {
    //权限检查
    $.ajax({
        type: "post",
        url: appUrl + "/loginstate.do",
        dataType: "json",
        async: false,
        success: function(data) {
            if (data.success == false) {
                location.href = appUrl + '/login.do?type=2';
            }
        }
    });
}

function initUI() {
    if (appUrl == "") {
        return;
    }
    var uis = thisScript.getAttribute("data-ui");
    //兼容ajaxpage
    importantJs("jquery/jquery.js");
    importantJs("layui/layui.js");
    importantCss("layui/css/layui.css");
    importantJs("flexible/flexible.js");
    if (!uis) {
        return;
    }
    var uiList = uis.split(",");

    if (uiList.contains("echarts")) {
        importantJs("echarts/echarts.min.js");
    }
    if (uiList.contains("swiper")) {
        importantJs("swiper/swiper-bundle.min.js");
        importantCss("swiper/swiper-bundle.min.css");
    }
    if (uiList.contains("sky")) {
        importantJs("skyAnimate/sky.js");
    }
    if (uiList.contains("number")) {
        importantJs("numberAnimate/jquery.animateNumber.min.js");
    }
    // if (uiList.contains("editor")) {
    //     importantCss("umeditor/themes/default/css/umeditor.min.css");
    //     importantJs("umeditor/umeditor.min.js");
    //     importantJs("umeditor/umeditor.config.js");
    // }
    // if (uiList.contains("tree")) {
    //     importantJs("ztree/js/jquery.ztree.all-3.5.js");
    //     importantCss("ztree/css/zTreeStyle/zTreeStyle.css");
    // }
    // if (uiList.contains("mobile")) {
    //     importantCss("mobile/mui/css/mui.min.css");
    //     importantJs("mobile/mui/js/mui.min.js");
    //     importantCss("mobile/boshan/mui.css");
    // }
}

function importantJs(path) {
    document.write("<script type='text/javascript' src='./modules/" + path + "'></script>");
}

function importantCss(path) {
    document.write("<link type='text/css' rel='stylesheet' href='./modules/" + path + "'/>");
}

function getQueryString(name, url) {
    if (url == undefined) {
        url = window.location.search.substr(1);
    } else if (url.indexOf("?") != -1) {
        url = url.substr(url.indexOf("?") + 1)
    } else {
        url = "";
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return "";
}

/**
 * post
 * @param {string} url 接口地址
 * @param {object} setting 
 */
function post(url, setting) {
    var opt = {
        type: 'json',
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function(XMLHttpRequest) {},
        error: function(a, b, msg) { alert('操作失败'); },
        success: function() {},
        data: null,
        async: false
    };
    opt = $.extend(opt, setting);
    if (url.indexOf("http") != 0) {
        url = appUrl + url;
    }
    //定义一个新的，防止引引用问题被修改
    // var data = {};
    // if(opt.data != null){
    // 	$.base64.utf8encode = true;
    // 	for (key in opt.data){
    // 		var value = $.base64.btoa(opt.data[key] + "");	
    // 		data[key] = value;
    // 	}
    // }
    for (key in opt.data) {
        opt.data[key] = encodeURI(opt.data[key]);
    }
    if (isDebug) {
        url = "./post.jsp?url=" + url;
    }
    $.ajax({
        type: "post",
        url: url,
        dataType: opt.type,
        beforeSend: opt.beforeSend,
        error: opt.error,
        contentType: opt.contentType,
        data: opt.data,
        success: opt.success,
        async: opt.async
    });
}

// 通过fonSize方法来实现echarts字体转换为rem
function fontSize(res) {
    let docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}

//深拷贝
function deepClone(obj, result) {
    var result = result || {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] == 'object' && obj[prop] !== null) {
                // 引用值(obj/array)且不为null
                if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
                    // 对象
                    result[prop] = {};
                } else {
                    // 数组
                    result[prop] = [];
                }
                deepClone(obj[prop], result[prop])
            } else {
                // 原始值或func
                result[prop] = obj[prop]
            }
        }
    }
    return result;
}

/**
 * changeNum
 * @param {string} id 容器的id
 * @param {number} newNum 需要数字滚动效果的数字
 */
function changeNum(id, newNum) {
    newNum = parseInt(newNum);
    $("#" + id).attr("data-value", newNum);
    var num = parseInt($("#" + id).html());
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
    $("#" + id).animateNumber({
        number: newNum,
        numberStep: comma_separator_number_step
    });
}

/**
 * @method openDialog
 * @param {Array} area 
 * @param {string} content 
 */
function openDialog(area, content) {
    var res = {
        closeBtn: 1,
        anim: 0,
        type: 2,
        area: area,
        content: content,
    };
    top.layer.open(res);
};

// 获取当前时分秒
function getNowTime() {
    let dateTime
    let hh = new Date().getHours()
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
        new Date().getMinutes()
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
        new Date().getSeconds()
    dateTime = hh + ':' + mf + ':' + ss
    console.log(dateTime)
    return dateTime
}