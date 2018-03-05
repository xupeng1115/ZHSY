//Vue数据模型（交互逻辑和事件绑定）
var app = new Vue({
    el: "#app",
    data: {
        loginKey: isLogin
    }
})

$(function () {

    //页面初始化执行
    (function () {

    } ());

    //事件注册
    (function () {
        //了解服务详情
        $("body").on("click", ".pay-serve-btn", function () {
            showConsult();
        })

    } ());

})
