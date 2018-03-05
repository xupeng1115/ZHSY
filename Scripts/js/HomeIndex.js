//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:"#app",
	data:{
		loginKey:isLogin
	}
})

$(function(){
	
	//轮播滚动
	(function(){
		var mySwiper = new Swiper ('.swiper-container', {
			autoplay:3000,
			speed:1600,
		    loop: true,
			slidesPerView : 3,
			slidesPerGroup : 1,
			spaceBetween :20,
			autoplayDisableOnInteraction : false,
		    
		    // 如果需要前进后退按钮
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		    
		})
	}());
	
	//初始化操作
	(function(){
		
	}());
	
	//事件注册
	(function(){
		//搜索
		$("body").on("click",".search-btn",function(){
			window.location.href="/Job/List?Position="+$('#Position').val();
		})
		
	}());
	
})


