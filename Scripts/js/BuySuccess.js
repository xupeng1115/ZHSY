
//Vue数据绑定与事件绑定
var app = new Vue({
    el: "#app",
    data: {
        loginKey: isLogin,
        OrderNo: OrderNo,
        OrderPrice: OrderPrice
    },
    computed: {
        
    },
    watch: {

    },
    methods: {
        
    }
})

$(function () {

    //页面初始化执行操作
    (function () {

    } ());

    //jQuery事件注册
    (function () {

        //查看订单
        $("body").on("click", ".order-view", function () {
            if (app.loginKey){
                window.location.href = "/My/MyOrder";
            }else{
                getStorage();
            }
         
        });

    } ());
})









