$(function () {

    //自定义变量
    var oFindPasswordUrl = "/User/FindPassword",
        findKey = false,
        oCodeUrl = "/User/SendVerificationCode",
        smsID = 0,
        timer = 60,
        isSendCode = false,
        myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    //事件注册
    (function () {
        $("body").on("click", ".login-back-btn", function () {
            window.location.href = "../Home/Index";
        })

        $("body").on("click", ".back-index-btn", function () {
            window.location.href = "../Home/Index";
        })

        //获取验证码
        $("body").on("click", ".get-code-btn", function () {
            getcode();
        })

        //提交新密码
        $("body").on("click", ".confirm-btn", function () {
            //验证的key
            var phoneKey = false,
                codeKey = false,
                passwordKey = false,
                repeatPasswordKey = false;

            var oPhone = $(".phone-number").val();
            var oFormatNum = $(".test-code").val();
            var oNewPassword = $(".new-password").val();
            var oRepeatPassword = $(".repeat-password").val();

            if ($.trim(oPhone).length === 0) {
                $(".phone-tips").text("手机号码不能为空");
                $(".phone-tips").show();
                phoneKey = false;
            } else {
                if (!myreg.test($.trim(oPhone))) {
                    $(".phone-tips").text("请输入有效的手机号");
                    $(".phone-tips").show();
                    phoneKey = false;
                } else {
                    phoneKey = true;
                }
            }
            if ($.trim(oFormatNum).length === 0) {
                $(".code-tips").text("验证码不能为空");
                $(".code-tips").show();
                codeKey = false;
            } else {
                codeKey = true;
            }

            var passwordLength = $.trim(oNewPassword).length;
            if (passwordLength === 0) {
                $(".password-tips").text("密码不能为空");
                $(".password-tips").show();
                passwordKey = false;
            } else if (passwordLength > 0 && passwordLength < 6) {
                $(".password-tips").text("密码长度不能少于6位");
                $(".password-tips").show();
                passwordKey = false;
            } else if (passwordLength > 16) {
                $(".password-tips").text("密码长度不能大于16位");
                $(".password-tips").show();
                passwordKey = false;
            } else {
                passwordKey = true;
            }

            var repeatPasswordLength = $.trim(oRepeatPassword).length;
            if (repeatPasswordLength === 0) {
                $(".repeat-tips").text("密码不能为空");
                $(".repeat-tips").show();
                repeatPasswordKey = false;
            } else if (repeatPasswordLength > 0 && repeatPasswordLength < 6) {
                $(".repeat-tips").text("密码长度不能少于6位");
                $(".repeat-tips").show();
                repeatPasswordKey = false;
            } else if (repeatPasswordLength > 16) {
                $(".repeat-tips").text("密码长度不能大于16位");
                $(".repeat-tips").show();
                repeatPasswordKey = false;
            } else {
                if ($.trim(oNewPassword) !== $.trim(oRepeatPassword)) {
                    $(".repeat-tips").text("两次输入密码不一致");
                    $(".repeat-tips").show();
                    repeatPasswordKey = false;
                } else {
                    repeatPasswordKey = true;
                }
            }

            if(!(phoneKey && codeKey && passwordKey && repeatPasswordKey)){
                return;
            }

            var myParams = {
                Tel: oPhone,
                VerificationCode: oFormatNum,
                NewPassword: oNewPassword,
                ConfirmPassword: oRepeatPassword,
                SMSID: smsID
            }
            var mySuccessFun = function (result) {
                console.log(result);
                if (result.Success) {
                    $(".line-three").css("background", "#ffbf00");
                    $(".step-two").css("color", "#6d6d6d");
                    $(".step-two").find(".step-number").css({
                        "color": "#ffbf00",
                        "borderColor": "#ffbf00"
                    })
                    $(".form-box").hide();
                    $(".find-success-box").show();
                } else {
                    alert(result.Message);
                    findKey = false;
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
                findKey = false;
            }
            //发送找回密码信息
            if (!findKey) {
                findKey = true;
                myAjax("post", oFindPasswordUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {

            }
        })

        $("body").on("input", ".phone-number", function () {
            if ($.trim($(this).val()).length > 0) {
                if (!myreg.test($.trim($(this).val()))) {
                    $(".phone-tips").text("请输入有效的手机号");
                    $(".phone-tips").show();
                } else {
                    $(".phone-tips").text("");
                    $(".phone-tips").hide();
                }
            } else {
                $(".phone-tips").text("手机号码不能为空");
                $(".phone-tips").show();
            }
        })

        $("body").on("input", ".test-code", function () {
            if ($.trim($(this).val()).length > 0) {
                $(".code-tips").text("");
                $(".code-tips").hide();
            } else {
                $(".code-tips").text("验证码不能为空");
                $(".code-tips").show();
            }
        })

        $("body").on("input", ".new-password", function () {
            if ($.trim($(this).val()).length > 0) {
                if ($.trim($(this).val()).length < 6) {
                    $(".password-tips").text("密码长度不能少于6位");
                    $(".password-tips").show();
                    return;
                }
                if ($.trim($(this).val()).length > 16) {
                    $(".password-tips").text("密码长度不能大于16位");
                    $(".password-tips").show();
                    return;
                }
                $(".password-tips").text("");
                $(".password-tips").hide();
            } else {
                $(".password-tips").text("密码不能为空");
                $(".password-tips").show();
            }
        })

        $("body").on("input", ".repeat-password", function () {
            if ($.trim($(this).val()).length > 0) {
                if ($.trim($(this).val()).length < 6) {
                    $(".repeat-tips").text("密码长度不能少于6位");
                    $(".repeat-tips").show();
                    return;
                }
                if ($.trim($(this).val()).length > 16) {
                    $(".repeat-tips").text("密码长度不能大于16位");
                    $(".repeat-tips").show();
                    return;
                }
                $(".repeat-tips").text("");
                $(".repeat-tips").hide();
            } else {
                $(".repeat-tips").text("密码不能为空");
                $(".repeat-tips").show();
            }
        })

    } ());

    function getcode() {
        if (isSendCode) return false;

        var oPhone = $(".phone-number").val();

        if ($.trim(oPhone).length === 0) {
            $(".phone-tips").text("手机号码不能为空");
            $(".phone-tips").show();
            return;
        }
        if (!myreg.test($.trim(oPhone))) {
            $(".phone-tips").text("请输入有效的手机号");
            $(".phone-tips").show();
            return;
        }

        var myParams = {
            tel: oPhone,
            type: "FindPassword"
        }
        var mySuccessFun = function (result) {
            console.log(result);
            if (result.Success) {
                alert("验证码已发送");
                smsID = result.Data;
                isSendCode = true;
                countDown();
            } else {
                alert(result.Message);
                isSendCode = false;
            }
        }
        var myErrorFun = function () {
            alert("网络出错了！");
            isSendCode = false;
        }
        //发送验证码信息
        myAjax("post", oCodeUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
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
})