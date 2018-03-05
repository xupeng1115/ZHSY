//判断浏览器版本是否低于IE9
(function () {
    var DEFAULT_VERSION = 8;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie") > -1;
    var safariVersion, numVerson;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
        numVerson = parseInt(safariVersion);
        if ((numVerson > 5) && (numVerson <= DEFAULT_VERSION)) {
            document.documentElement.style.display = "none";
            $("body").css("display", "none");
            alert("您的浏览器版本低于IE9，请升级您的浏览器！");
            return;
        } else {

        }
    } else {

    }
} ());

$(function () {

    //自定义变量
    var oRegisterUrl = "/User/Register",
        oLoginUrl = "/User/Login",
        oCodeUrl = "/User/SendVerificationCode",
        oLoginExitUrl = "/User/LoginExit",
        onlyPhoneUrl = "/User/IsExistTel",
        onlyNameUrl = "/User/IsExistUserName",
        onlyPhone = true;     //是否是唯一注册手机号,true:唯一的，false：已经注册过了
        registerKey = false,
        loginKey = false,
        codeKey = false,
        smsID = 0,
        remeberKey = true,      //是否记住密码，true:记住，false:不记住
        protocolKey = true,
        timer = 60,
        isSendCode = false,
        myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    //事件注册
    (function () {

        $("body").on("click", ".aside-back-top", function (event) {
            $('body,html').animate({ scrollTop: 0 }, 300);
        });

        //登陆手机号验证
        $("body").on({
            blur: function () {
                if ($.trim($(this).val()).length > 0) {
                    if (!myreg.test($.trim($(this).val()))) {
                        $(".login-phone-tips").text("请输入有效的手机号").show();
                    }
                } else {
                    $(".login-phone-tips").text("手机号码不能为空").show();
                }
            },
            focus: function () {
                $(".login-phone-tips").text("").hide();
            }
        }, ".login-phone");

        //登录密码验证
        $("body").on({
            blur: function () {
                if ($.trim($(this).val()).length > 0) {
                    if ($.trim($(this).val()).length < 6) {
                        $(".login-password-tips").text("密码长度不能少于6位").show();
                        return;
                    }
                    if ($.trim($(this).val()).length > 16) {
                        $(".login-password-tips").text("密码长度不能大于16位").show();
                        return;
                    }
                    $(".login-password-tips").text("").hide();
                } else {
                    $(".login-password-tips").text("密码不能为空").show();
                }
            },
            focus: function () {
                $(".login-password-tips").text("").hide();
            }
        }, ".login-password");

        //是否记住密码
        $("body").on("click", ".rp-no", function () {
            $(this).hide();
            $(".rp-yes").show();
            remeberKey = true;
        });

        $("body").on("click", ".rp-yes", function () {
            $(this).hide();
            $(".rp-no").show();
            remeberKey = false;
        });

        $("body").on("click", ".lr-cancel", function () {
            $(".lr-container").hide();
        });

        //顶部登陆注册
        $("body").on("click", ".login-register", function () {
            getStorage();
        });

        //忘记密码
        $("body").on("click", ".forget-password-box", function () {
            window.location.href = "../User/FindPassword";
        });

        //注册用户名
        $("body").on({
            blur: function () {
                if ($.trim($(this).val()).length > 0) {
                    //唯一注册用户名验证
                    isOnlyName();
                } else {
                    $(".register-username-tips").text("用户名不能为空").show();
                }
            },
            focus: function () {
                $(".register-username-tips").text("").hide();
            }
        }, ".register-username");

        //注册手机号
        $("body").on({
            blur: function () {
                if ($.trim($(this).val()).length > 0) {
                    if (!myreg.test($.trim($(this).val()))) {
                        $(".register-phone-tips").text("请输入有效的手机号").show();
                    } else {
                        //唯一注册手机号验证
                        isOnlyPhone();
                    }
                } else {
                    $(".register-phone-tips").text("手机号码不能为空").show();
                }
            },
            focus: function () {
                $(".register-phone-tips").text("").hide();
                $(".get-code-btn").addClass("yes-code-btn");
                $(".get-code-btn").removeClass("no-code-btn");
                onlyPhone = true;
            },
            input: function () {
                $(".register-phone-tips").text("").hide();
                $(".get-code-btn").addClass("yes-code-btn");
                $(".get-code-btn").removeClass("no-code-btn");
                onlyPhone = true;
            }
        }, ".register-phone");

        //验证注册验证码
        $("body").on({
            blur: function () {
                if ($.trim($(this).val()).length > 0) {
                    $(".code-tips").text("").hide();
                } else {
                    $(".code-tips").text("验证码不能为空").show();
                }
            },
            focus: function () {
                $(".code-tips").text("").hide();
            }
        }, ".test-code");

        //注册密码
        $("body").on({
            blur: function () {
                if ($.trim($(this).val()).length > 0) {
                    if ($.trim($(this).val()).length < 6) {
                        $(".register-password-tips").text("密码长度不能少于6位").show();
                        return;
                    }
                    if ($.trim($(this).val()).length > 16) {
                        $(".register-password-tips").text("密码长度不能大于16位").show();
                        return;
                    }
                    $(".register-password-tips").text("").hide();
                } else {
                    $(".register-password-tips").text("密码不能为空").show();
                }
            },
            focus: function () {
                $(".register-password-tips").text("").hide();
            }
        }, ".register-password");

        //是否同意注册协议
        $("body").on("click", ".protocol-no", function () {
            $(this).hide();
            $(".protocol-yes").show();
            $(".register-protocol-tips").hide();
            protocolKey = true;
        });

        $("body").on("click", ".protocol-yes", function () {
            $(this).hide();
            $(".protocol-no").show();
            protocolKey = false;
        });

        //退出登陆
        $("body").on("click", ".login-exit", function () {
            loginExit();
        });

        //获取验证码
        $("body").on("click", ".get-code-btn", function () {
            if (onlyPhone) {
                isOnlyPhone();
                if (onlyPhone) {
                    getcode();
                }
            }
        });

        //登陆
        $("body").on("click", ".lr-login-btn", function () {
            //验证key值
            var loginPhoneKey = false,
                loginPasswordKey = false;

            var oPhone = $(".login-phone").val();
            var oPassword = $(".login-password").val();

            if ($.trim(oPhone).length === 0) {
                $(".login-phone-tips").text("手机号码不能为空").show();
                loginPhoneKey = false;
            } else {
                if (!myreg.test($.trim(oPhone))) {
                    $(".login-phone-tips").text("请输入有效的手机号").show();
                    loginPhoneKey = false;
                } else {
                    loginPhoneKey = true;
                }
            }

            var passwordLength = $.trim(oPassword).length;
            if (passwordLength === 0) {
                $(".login-password-tips").text("密码不能为空").show();
                loginPasswordKey = false;
            } else if (passwordLength > 0 && passwordLength < 6) {
                $(".login-password-tips").text("密码长度不能少于6位").show();
                loginPasswordKey = false;
            } else if (passwordLength > 16) {
                $(".login-password-tips").text("密码长度不能大于16位").show();
                loginPasswordKey = false;
            } else {
                loginPasswordKey = true;
            }

            if (!(loginPhoneKey && loginPasswordKey)) {
                return;
            }

            var myParams = {
                Tel: oPhone,
                Password: oPassword
            };
            var mySuccessFun = function (result) {
                if (result.Success) {
                    if (remeberKey) {
                        localStorage.setItem('Phone', $.trim(oPhone));
                        localStorage.setItem('Password', $.trim(oPassword));
                    } else {
                        localStorage.removeItem('Phone');
                        localStorage.removeItem('Password');
                    }
                    $(".lr-success").show();
                    location.href = "/Resume/Index";
                } else {
                    alert(result.Message);
                    loginKey = false;
                }
            };
            var myErrorFun = function () {
                alert("网络出错了！");
                loginKey = false;
            };
            //发送登陆信息
            if (!loginKey) {
                loginKey = true;
                myAjax("post", oLoginUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {

            }

        });

        //注册
        $("body").on("click", ".complate-msg-btn", function () {
            //验证key值
            var regNameKey = false,
                regPhoneKey = false,
                regCodeKey = false,
                regPasswordKey = false;

            var oUserName = $(".register-username").val();
            var oPhone = $(".register-phone").val();
            var oFormatNum = $(".test-code").val();
            var oPassword = $(".register-password").val();

            if ($.trim(oUserName).length === 0) {
                $(".register-username-tips").text("用户名不能为空").show();
                regNameKey = false;
            } else {
                regNameKey = true;
            }
            if ($.trim(oPhone).length === 0) {
                $(".register-phone-tips").text("手机号码不能为空").show();
                regPhoneKey = false;
            } else {
                if (!myreg.test($.trim(oPhone))) {
                    $(".register-phone-tips").text("请输入有效的手机号").show();
                    regPhoneKey = false;
                } else {
                    regPhoneKey = true;
                }
            }
            if ($.trim(oFormatNum).length === 0) {
                $(".code-tips").text("验证码不能为空").show();
                regCodeKey = false;
            } else {
                regCodeKey = true;
            }

            var passwordLength = $.trim(oPassword).length;
            if (passwordLength === 0) {
                $(".register-password-tips").text("密码不能为空").show();
                regPasswordKey = false;
            } else if (passwordLength > 0 && passwordLength < 6) {
                $(".register-password-tips").text("密码长度不能少于6位").show();
                regPasswordKey = false;
            } else if (passwordLength > 16) {
                $(".register-password-tips").text("密码长度不能大于16位").show();
                regPasswordKey = false;
            } else {
                regPasswordKey = true;
            }
            if (!protocolKey) {
                $(".register-protocol-tips").text("您还未同意《Career Success注册协议》").show();
            }

            if (!(regNameKey && regPhoneKey && regCodeKey && regPasswordKey && protocolKey)) {
                return;
            }

            var myParams = {
                UserName: oUserName,
                VerificationCode: oFormatNum,
                Tel: oPhone,
                Password: oPassword,
                SMSID: smsID
            };
            var mySuccessFun = function (result) {
                if (result.Success) {
                    alert("注册成功，请登录！");
                    $('.login-btn').click();
                    $(".lr-success").show();
                } else {
                    alert(result.Message);
                    registerKey = false;
                }
            };
            var myErrorFun = function (error) {
                alert("网络出错了！");
                registerKey = false;
            };
            //发送注册信息
            if (!registerKey) {
                registerKey = true;
                myAjax("post", oRegisterUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {

            }

        });

        //切换登陆
        $("body").on("click", ".login-btn", function () {
            $(this).css("color", "#ffbf00");
            $(this).find(".btn-line").show();
            $(".register-btn").css("color", "#6d6d6d");
            $(".register-btn").find(".btn-line").hide();
            $(".register-box").hide();
            $(".login-box").show();
        });

        //切换注册
        $("body").on("click", ".register-btn", function () {
            $(this).css("color", "#ffbf00");
            $(this).find(".btn-line").show();
            $(".login-btn").css("color", "#6d6d6d");
            $(".login-btn").find(".btn-line").hide();
            $(".login-box").hide();
            $(".register-box").show();
        });

        //        $(window).scroll(function () {
        //            //获取文档滚动高度
        //            var top = $(document).scrollTop();
        //            if (top >= 200) {
        //                $("aside").show();
        //            } else {
        //                $("aside").hide();
        //            }
        //        })

        //侧边咨询弹窗
        $("body").on("click", ".consult", function (event) {
            showConsult();
        });

        $("body").on("click", ".consult-close-btn", function (event) {
            hideConsult();
        });

        $("body").on("click", ".consult-know-btn", function () {
            hideConsult();
        });

        $("body").on("click", ".consult-login-btn", function () {
            hideConsult();
            getStorage();
        });

    } ());

    //唯一手机号验证
    function isOnlyPhone() {
        var oPhone = $(".register-phone").val();
        var myParams = {
            tel: oPhone
        };
        var mySuccessFun = function (result) {
            if (result.Success) {
                $(".get-code-btn").addClass("yes-code-btn");
                $(".get-code-btn").removeClass("no-code-btn");
                onlyPhone = true;
            } else {
                $(".register-phone-tips").text(result.Message).show();
                //禁止获取验证码
                $(".get-code-btn").addClass("no-code-btn");
                $(".get-code-btn").removeClass("yes-code-btn");
                onlyPhone = false;
            }
        };
        var myErrorFun = function () {

        };

        //发送注册手机号信息
        myAjax("post", onlyPhoneUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
    }

    //唯一用户名验证
    function isOnlyName() {
        var oName = $(".register-username").val();
        var myParams = {
            userName: oName
        };
        var mySuccessFun = function (result) {
            if (result.Success) {

            } else {
                $(".register-username-tips").text(result.Message).show();
            }
        };
        var myErrorFun = function () {

        };

        //发送注册用户名信息
        myAjax("post", onlyNameUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
    }

    function getcode() {
        if (isSendCode) return false;

        var oPhone = $(".register-phone").val();

        if ($.trim(oPhone).length === 0) {
            $(".register-phone-tips").text("手机号码不能为空").show();
            return;
        }
        if (!myreg.test($.trim(oPhone))) {
            $(".register-phone-tips").text("请输入有效的手机号").show();
            return;
        }

        var myParams = {
            tel: oPhone,
            type: "Register"
        };
        var mySuccessFun = function (result) {
            if (result.Success) {
                smsID = result.Data;
                isSendCode = true;
                countDown();
            } else {
                alert(result.Message);
                isSendCode = false;
            }
        };
        var myErrorFun = function () {
            alert("网络出错了！");
            isSendCode = false;
        };

        //发送验证码信息
        myAjax("post", oCodeUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);

    }

    //退出登陆
    function loginExit() {
        var myParams = {

        };
        var mySuccessFun = function (result) {
            if (result.Success) {
                location.href = "/Home/Index";
            } else {
                alert(result.Message);
                loginKey = false;
            }
        };
        var myErrorFun = function () {
            alert("网络出错了！");
            loginKey = false;
        };
        //发送登陆信息
        if (!loginKey) {
            loginKey = true;
            myAjax("post", oLoginExitUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
        } else {

        }
    }

    function countDown() {
        if (timer >= 1) {
            $('.get-code-btn').text("重新获取(" + timer + ")");
            $('.get-code-btn').addClass("get-code-success-btn");
            timer -= 1;
            setTimeout(function () {
                countDown();
            }, 1000);
        } else {
            timer = 60;
            isSendCode = false;
            $('.get-code-btn').text("获取验证码");
            $('.get-code-btn').removeClass("get-code-success-btn");
        }
    }

})

//判断是否保存有用户名和密码
function getStorage() {
    $(".lr-container").show();
    if (localStorage.getItem('Phone') && localStorage.getItem('Password')) {
        $(".login-phone").val(localStorage.getItem('Phone'));
        $(".login-password").val(localStorage.getItem('Password'));

        $(".rp-no").hide();
        $(".rp-yes").show();
        remeberKey = true;
    } else {

    }
}

//图片没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/head.png";
    oImg.onerror = null;
}

//logo没有成功加载出来时处理
function noFindLogo() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/position_head.png";
    oImg.onerror = null;
}

//测评图片没有成功加载出来时处理
function noFindBanner() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/position_list_banner.png";
    oImg.onerror = null;
}

//Ajax
function myAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun) {
    var params = {
        "controller": myUrl,
        data: myParams,
        contentType: "application/json; charset=utf-8"
    };

    var successFun = mySuccessFun;
    var errorFun = myErrorFun;

    if (myType.toLocaleUpperCase() === "GET") {
        communication.get(params, successFun, errorFun);
    } else {
        communication.post(params, successFun, errorFun);
    }
}

//判断当前浏览类型
function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0"
        } //IE版本过低
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}

//显示侧边咨询弹窗
function showConsult() {
    var widthValue = document.body.clientWidth;
    var browserType = BrowserType();
    if (widthValue > 1500) {
        $("html,body").addClass("no-scroll-high");
    } else {
        if (browserType === "IE9" || browserType === "Chrome" || browserType === "Safari" || browserType === "Opera") {
            $("html,body").addClass("no-scroll-low");
        } else {
            $("html,body").addClass("no-scroll-high");
        }
    }

    $(".flo-consult").show();
}
//隐藏侧边咨询弹窗
function hideConsult() {
    var widthValue = document.body.clientWidth;
    var browserType = BrowserType();

    $(".flo-consult").hide();
    if (widthValue > 1500) {
        $("html,body").removeClass("no-scroll-high");
    } else {
        if (browserType === "IE9" || browserType === "Chrome" || browserType === "Safari" || browserType === "Opera") {
            $("html,body").removeClass("no-scroll-low");
        } else {
            $("html,body").removeClass("no-scroll-high");
        }
    }
}
