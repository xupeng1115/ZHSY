
/*******0.5px兼容************/
//if (window.devicePixelRatio && devicePixelRatio >= 2) {
//    document.querySelector("body").classList.add("hairline");
//}

/***获取Get参数***/
function getParam(paramName) {
    var paramValue = "";
    var isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        var arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        var i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

//获取根目录
function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
    return (localhostPaht + projectName);
}

$(function() {
    $(".btnToRegister")
        .on("click",
            function() {
                location.href = getRootPath_web() + "/Register";
            });
});


/************微信分享***************/
(function(obj) {
    function setConfig(config) {
        wx.config({
            debug: false,
            appId: config.WxAppId,
            timestamp: config.WxTimes,
            nonceStr: config.WxNonceStr,
            signature: config.WxSignature,
            jsApiList: [
                "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideOptionMenu"
            ]
        });

    }

    function setShare(shareInfo) {
        wx.ready(function() {
            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage({
                title: shareInfo.wxShareTitle,
                desc: shareInfo.wxShareDesc,
                link: shareInfo.wxShareLinkFriend,
                imgUrl: shareInfo.wxShareImgUrl,
                trigger: function(res) {
                },
                success: function(res) {
                },
                cancel: function(res) {
                },
                fail: function(res) {
                }
            });
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline({
                title: shareInfo.wxShareTitle,
                desc: shareInfo.wxShareDesc,
                link: shareInfo.wxShareLink,
                imgUrl: shareInfo.wxShareImgUrl,
                trigger: function(res) {
                },
                success: function(res) {
                },
                cancel: function(res) {
                },
                fail: function(res) {
                }
            });
        });
    }
    obj.init  = function(config,shareInfo) {
        setConfig(config);
        setShare(shareInfo);
    }

})(window.vxshare = {});



function CommonDataValidate(type, value) {
    var strVal = false;
    var reg = "";
    switch (type.toLowerCase()) {
        case "mobilenumber": //手机号+小灵通
            reg = /^([0-9]{8})$|^((0|1)[0-9]{10})$/;
            break;
        case "phonenumber": //固定电话
            reg = /^0\d{2,3}-?\d{7,8}$/;
            break;
        case "email": //邮件
            reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
            //reg = /^(\w|-)+(\.(\w|-)+)*@(\w|-)+((\.\w{2,3}){1,3})$/;
            break;
        case "isletter": //英文
            reg = /^[A-Za-z\s]+$/;
            break;
        case "ischinese": //中文
            reg = /^[\u4e00-\u9fa5]+$/;
            break;
        case "iscode": //英文字母、数字、下划线
            reg = /^[0-9a-zA-Z_]*$/; 

            break;
        case "idcard": //身份证
            reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            break;
        case "password": //密码
            reg = /^[^\s]{6,20}$/;
        default:
            break;
    }
    if (reg !== "" && reg.test(value))
        strVal = true;
    else
        strVal = false;
    return strVal;
}

