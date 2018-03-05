
//Vue数据模型（交互逻辑和事件绑定）
var app = new Vue({
    el: "#app",
    data: {
        loginKey: isLogin,
        sendKey: false,
        recommendList: JSON.parse(recommendList),
        resumeDetail: JSON.parse(resumeDetail)
    },
    methods: {
        nameLen: function () {
            var re = /[\u4E00-\u9FA5]/g;
            var sum = 0;
            var totalLen = app.resumeDetail.Name.length;
            var len = app.resumeDetail.Name.match(re).length;
            var resultLen = len + parseInt((totalLen - len) / 1.5);

            if (resultLen>=0&&resultLen<=18) {
                return true;
            }else{
                return false;
            }
        },
        ImgError: function () {
            var oImg = event.srcElement;
            oImg.src = "../../Content/image/job_list_company01.png";
            oImg.onerror = null;
        },
        bannerMailing: function (ID, IS) {
            if (this.loginKey) {
                if (IS == 0) {
                    var mySuccessFun = function () {
                        app.sendKey = true;
                        app.resumeDetail.IsMailings = 1;
                    }
                    var myErrorFun = function (error) {
                        alert("网络出错了！");
                    }
                    myAjax("post", "/Job/SubmitUserResumeMailing?id="+ID, "", mySuccessFun, myErrorFun);
                } else {

                }
            } else {
                getStorage();
            }
        },
        Mailing: function (ID, IS, index) {
            if (this.loginKey) {
                if (IS == 0) {
                    var mySuccessFun = function () {
                        app.sendKey = true;
                        app.recommendList[index].IsMailings = 1;
                        app.recommendList = $.extend([], app.recommendList);
                    }
                    var myErrorFun = function (error) {
                        alert("网络出错了！");
                    }
                    
                    myAjax("post", "/Job/SubmitUserResumeMailing?id="+ID, "", mySuccessFun, myErrorFun);
                } else {

                }
            } else {
                getStorage();
            }
        },
        colseSend: function () {
            this.sendKey = false;
        }
    }
})

$(function(){
   
	//圆形进度条
	(function(){
		$('#indicatorContainer').radialIndicator({
	        barColor: '#ffbf00',
	        barWidth: 8,
	        initValue: 0,
	        fontFamily:'"PingFang SC","Microsoft Yahei"',
	        fontWeight:'normal',
	        fontSize:20,
	        fontColor:"#666666",
	        roundCorner : true,
	        percentage: true
	    });
	    
	    //进度从零运动到指定位置
	    var radObj = $('#indicatorContainer').data('radialIndicator');
		radObj.animate(app.resumeDetail.Match);
	}());
	
	//页面初始化执行
	(function(){
		
	}());
	
	//事件注册
	(function(){
		var topBanner=$(".top-banner").height();
		//侧边导航
		$(window).scroll(function() {
            
			//获取文档滚动高度
		    var top = $(document).scrollTop();
		    if(top>=(topBanner+65)){
		    	$(".content-nav").addClass("nav-scroll");
		    }else{
		    	$(".content-nav").removeClass("nav-scroll");
		    }
		})
		
		//模块导航滚动
		$("body").on("click",".nav-href",function(event){
			var oActive=$(this).parent(".content-nav-item").hasClass("content-nav-active");
			var oNum=$(this).attr("num");
			var oList=$(".content-nav-item");
			var TOP=60;
			if(!oActive){
				$.each(oList,function(index,item){
					if($(item).hasClass("content-nav-active")){
						$(item).removeClass("content-nav-active");
						return;
					}
				})
				$(this).parent(".content-nav-item").addClass("content-nav-active");
			}
			
			$("html, body").animate({
		      	scrollTop: ($($(this).attr("href")).offset().top -TOP)+ "px"
		    }, {
		      	duration: 500,
		      	easing: "swing"
		    });
		    return false;
		})
		
	}());
	
})
