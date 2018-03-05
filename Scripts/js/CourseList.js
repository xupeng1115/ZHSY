
var oScrollLists=[
	{
		title:"高效沟通",
	},
	{
		title:"志存当高远，目标需行动"
	},
	{
		title:"激活你的信息CPU",
	},
	{
		title:"创新这件大事儿",
	},
	{
		title:"从学习开始的“蜕变之旅”",
	},
	{
		title:"神沟通秘籍",
	},
	{
		title:"面试技巧",
	},
	{
		title:"情商修炼指南",
	}
]

//Vue.js绑定数据和事件函数
var app=new Vue({
	el:"#app",
	data:{
		scrollIndex:1,
		scrollLists:oScrollLists,
	},
	methods:{
		ClickScrollItem:function(index){
			mySwiper.slideTo(index, 1000, false);//切换到第index个slide，速度为1秒
			this.scrollIndex=index;
		}
	}
})




//banner滚动轮播
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    autoplay : 5000,
    speed:1000,
    loop: true,

    //分页器
    pagination: '.swiper-pagination',
    paginationClickable :true,
    
    //slide切换完成后事件执行
   	onSlideChangeStart: function(swiper){
      	app.scrollIndex=swiper.activeIndex;//切换结束时，告诉我现在是第几个slide
    }
})    

$(function(){
	
	//初始化操作
	(function(){
		$(".back-top").hide();
	}());
	
	
	//事件注册
	(function(){
		
		//自定义滚动条
		$('.scroll-list').niceScroll({
            cursorcolor: "#000",//#CC0071 光标颜色
            cursoropacitymax: 0.3, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior:false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "7px", //像素光标的宽度
            cursorborder: "0", // 	游标边框css定义
            cursorborderradius: "5px",//以像素为光标边界半径
            autohidemode: false //是否隐藏滚动条
       	});
		
	}());
})



