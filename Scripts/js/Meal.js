$(function(){
	
	//轮播滚动
	(function(){
		var mySwiper = new Swiper ('.swiper-container', {
			autoplay:3000,
			speed:1600,
		    loop: true,
		    
		    // 如果需要前进后退按钮
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		    
		})
	}());
	
	//事件注册
	(function(){
		
		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},300);
		})
		
		$("body").on("click",".introduce-btn",function(){
			$(this).css("color","#ffbf00");
			$(".detail-btn").css("color","#6d6d6d");
			$(".introduce-btn").hover(function(){
				$(this).css("color","#ffbf00");
			},function(){
				$(this).css("color","#333");
			});
			
			$(".detail-btn").hover(function(){
				$(this).css("color","#ffbf00");
			},function(){
				$(this).css("color","#6d6d6d");
			});
			$(".detail-box").hide();
			$(".introduce-box").show();
		})
		
		$("body").on("click",".detail-btn",function(){
			$(this).css("color","#ffbf00");
			$(".introduce-btn").css("color","#6d6d6d");
			$(".detail-btn").hover(function(){
				$(this).css("color","#ffbf00");
			},function(){
				$(this).css("color","#333");
			});
			
			$(".detail-btn").hover(function(){
				$(this).css("color","#ffbf00");
			},function(){
				$(this).css("color","#6d6d6d");
			});
			$(".introduce-box").hide();
			$(".detail-box").show();
		})
		
		
	}());
	
})