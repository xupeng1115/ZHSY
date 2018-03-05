
//Vue数据绑定与事件绑定
var app = new Vue({
    el: "#app",
    data: {
        loginKey: isLogin,
        phone: "",
        email: "",
        name: "",
        phoneTip: "",
        emailTip: "",
        nameTip: "",
        nameTipShow: false,
        phoneTipShow: false,
        emailTipShow: false,
        argeement: true,

        positionDetail: {
            PositionID: Product.ID,
            Price: Product.Price,
            Name: Product.ProductName,
            Remark:Product.Remark
        },
        OrderNo: OrderNo,
        OrderID: OrderID
    },
    computed: {
        formatName:function(){
            if (this.loginKey) {
                var oName = $(".entrance-name").text();
                return oName;
            } else {
                return "";
            }
        }
    },
    watch: {

    },
    methods: {
        phoneFilter: function () {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (this.phone === "") {
                this.phoneTip = "手机号必填";
                this.phoneTipShow = true;
                return false;
            } else if (!myreg.test(this.phone)) {
                this.phoneTip = "请输入有效的手机号";
                this.phoneTipShow = true;
                return false;
            } else {
                return true;
            }
        },
        emailFilter: function () {
            var myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (this.email === "") {
                this.emailTip = "邮箱必填";
                this.emailTipShow = true;
                return false;
            } else if (!myreg.test(this.email)) {
                this.emailTip = "请输入有效的邮箱地址";
                this.emailTipShow = true;
                return false;
            } else {
                return true;
            }
        },
        nameFilter: function () {
            if ($.trim(this.name) === '') {
                this.nameTip = "姓名必填";
                this.nameTipShow = true;
                return false;
            } else {
                return true;
            }
        },
        nameBlur: function () {
            app.nameFilter();
        },
        phoneBlur: function () {
            app.phoneFilter();
        },
        emailBlur: function () {
            app.emailFilter();
        },
        //打印订单
        printClick: function () {
            app.nameFilter();
            app.phoneFilter();
            app.emailFilter();
            if (!app.argeement) {
                alert("您还没同意支付协议");
                return;
            }

            if (!app.nameTipShow && !app.phoneTipShow && !app.emailTipShow) {
                window.print();
            }
        },
        //支付订单
        payClick: function () {
            app.nameFilter();
            app.phoneFilter();
            app.emailFilter();
            if (!app.argeement) {
                alert("您还没同意支付协议");
                return;
            }

//            if (!app.nameTipShow && !app.phoneTipShow && !app.emailTipShow) {
//                var payUrl = "/Home/SubmitUserOrder";
//                var myParams = {
//                    Contacts: $.trim(app.name),
//                    Tel: $.trim(app.phone),
//                    Email: $.trim(app.email),
//                    PositionID: app.positionDetail.PositionID
//                };
//                var mySuccessFun = function (result) {
//                    if (result.Success) {
//                        //订单支付成功后的处理
//                        window.location.href = "/Order/SubmitToAli";
//                    } else {
//                        alert(result.Message);
//                    }
//                }
//                var myErrorFun = function () {
//                    alert("网络出错了！");
//                }

//                //发送请求获取用户标签列表
//                myAjax("post", payUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun, "application/json; charset=utf-8");
//            }
        },
        nameFocus: function () {
            app.nameTipShow = false;
        },
        phoneFocus: function () {
            app.phoneTipShow = false;
        },
        emailFocus: function () {
            app.emailTipShow = false;
        }
    }
})

//验证提交
function check() {
    app.nameFilter();
    app.phoneFilter();
    app.emailFilter();
    if (!app.argeement) {
        alert("您还没同意支付协议");
        return;
    }
    //验证提交
    if (!app.nameTipShow && !app.phoneTipShow && !app.emailTipShow) {
        $(".flo-order").show();
        document.myform.submit();
    }
}

$(function () {

    //页面初始化执行操作
    (function () {

    } ());

    //jQuery事件注册
    (function () {

        //关闭支付弹窗
        $("body").on("click", ".flo-order-close", function () {
            $(".flo-order").hide();
        });

        //重新支付
        $("body").on("click", ".flo-order-reset", function () {
            check();
        });

        //支付成功
        $("body").on("click", ".flo-order-success", function () {
            $(".flo-order").hide();
        });

    } ());
})









