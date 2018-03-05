//"use strict";
//请求接口
var titleUrl = "/My/GetTitles",
	addTitleUrl = "/My/SubmitUserTitle",
	userTitleUrl = "/My/GetUserTitles";

//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:'#app',
	data:{							
		tagBoxShow:false,
		totalTags:[],
		userTags:extendList(UserTitleList),
		selectedTags:[],
		userName:UserName,
        orderList:UserOrderList,
        isShow:IsOrder
	},
	watch:{
		//监听对象和数组
		totalTags:{
			handler(newVal){
				this.tagBoxShow=true;
			},
			deep:true
		}
	},
	updated:function(){
		//重新绘制带有用户标签的列表
		if(this.tagBoxShow){
			this.resetTags();
		}
	},
	computed:{
		
	},
	methods:{
        userTagList:function(){
			var myParams = {};
            var mySuccessFun = function(result){
            	if(result.Success){
            		app.userTags=result.Data;
            	}else{
            		alert(result.Message);
            	}
            }
            var myErrorFun=function(){
            	alert("网络出错了！");
            }
			
			//发送请求获取用户标签列表
            myAjax("get",userTitleUrl,JSON.stringify(myParams),mySuccessFun,myErrorFun,"application/json; charset=utf-8");
		},
		addTags:function(){
			var myParams = {};
            var mySuccessFun = function(result){
            	if(result.Success){
            		app.totalTags=result.Data;
            	}else{
            		alert(result.Message);
            	}
            }
            var myErrorFun=function(){
            	alert("网络出错了！");
            }
			
			//发送请求获取所有的标签列表
            myAjax("get",titleUrl,JSON.stringify(myParams),mySuccessFun,myErrorFun,"application/json; charset=utf-8");
		},
		tagConfirm:function(){
			var tags=[];
            $.each(app.selectedTags,function(index,item){
                tags.push(String(item.ID));
            })
			var myParams = {
                arrayTltleID:tags
            };
            var mySuccessFun = function(result){
            	if(result.Success){
                    app.userTagList();
                    app.selectedTags=[];
					app.tagBoxShow=false;
            	}else{
            		alert(result.Message);
            	}
            }
            var myErrorFun=function(){
            	alert("网络出错了！");
            }
			
			//发送请求获取标签列表
            myAjax("Post",addTitleUrl,JSON.stringify(myParams),mySuccessFun,myErrorFun,"application/json; charset=utf-8");
			
		},
		tagClick:function(tag,event){
			var oSelected=$(event.target).hasClass("selected");
			
			if(this.selectedTags.length<=5){
				if(oSelected){
					var oIndex;
					$(event.target).removeClass("selected");
					$.each(this.selectedTags, function (index, item){
						if(item.TitleName===tag.TitleName){
							oIndex=index;
							return;
						}
					})
					this.selectedTags.splice(oIndex,1);
				}else{
					if(this.selectedTags.length<5){
						$(event.target).addClass("selected");
						this.selectedTags.push(tag);
					}else{
						alert("最多选择5个标签");
					}
				}
			}
		},
		tagCancel:function(){
			this.selectedTags=[];
			this.tagBoxShow=false;
		},
		tagReset:function(){
			this.selectedTags=[];
			$.each($(".select-item"),function(a,item){
				$(item).removeClass("selected");
			})
		},
		resetTags:function(){
			$.each($(".select-item"),function(a,item){
				$(item).removeClass("selected");
			})
			
			$.each(app.userTags,function(i,userItem){
    			$.each(app.totalTags,function(j,totalItem){
    				if(userItem.TitleName===totalItem.TitleName){
  						$(".select-item").eq(j).addClass("selected");
                        app.selectedTags.push(totalItem);
    				}
    			})
    		})
		}
	}
})


$(function(){
	//页面初始化
	(function(){
       
	}(jQuery));

	//事件注册
	(function(){
		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},300);
		})
	}());
})

//深拷贝数组
function extendList(arr){
	return $.extend([],arr);
}