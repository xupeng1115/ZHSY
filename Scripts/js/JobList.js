//Vue数据绑定与事件绑定
var app=new Vue({
	el:"#app",
	data:{
		loginKey:isLogin,
        sendKey: false,
		areaKey:false,
		industryKey:false,
		positionKey:false,
		pageKey:false,
		
		positionList:positionData.Data,
		recommendList:recommendData,
		areaList:areas,
		industryList:industrys,
		PostList:positions,
		
		positionName:PositionTitle,
		selectType:"",
		areaValue:"",
		positionValue:"",
		industryValue:"",
		payFrom:3000,
		payTo:13000,
		
		pageCount:positionData.PageCount
	},
	computed:{
		
	},
	watch:{
		//监听对象和对象
		positionList:{
			handler(newVal){
				this.pageKey=true;
			},
			deep:true
		},
		pageCount:function(val){
			//重新生成分页UI
			this.getPage(val);
		},
		selectType:function(val){
			this.selectType=val;
			this.getList(1,1);
		}
	},
	mounted:function(){
		
	},
	updated:function(){
		//职位列表生成元素并数据更新后重新绘制匹配度进度条
		if(this.pageKey&&this.loginKey){
			this.getCircle(this.recommendList);
			this.pageKey=false;
		}
	},
	methods:{
		ImgError:function(){
			var oImg=event.srcElement;
		    oImg.src="../../Content/image/job_list_company01.png";
		    oImg.onerror=null;
		},
		viewMatch:function(ID){
			getStorage();
		},
		emptyLogin:function(){
			getStorage();
		},
		likeCut:function(ID,IS,index,event){
            var oEle=$(event.target);
			if(this.loginKey){
                app.collectPosition(ID,IS,index,oEle);
			}else{
				getStorage();
			}
		},
		Mailing:function(ID,IS,index){
            if(this.loginKey){
                if (IS == 0) {
                    var mySuccessFun = function () {
                        app.sendKey = true;
                        app.positionList[index].IsMailings = 1;
                        app.positionList = $.extend([], app.positionList);
                    }
                    var myErrorFun = function (error) {
                        alert("网络出错了！");
                    }
                    myAjax("post", "/Job/SubmitUserResumeMailing?id="+ID, "", mySuccessFun, myErrorFun);
                } else {

                }
            }else{
                getStorage();
            }
			
		},
        recommendMailing: function (ID, IS, index) {
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
        collectPosition:function(ID,IS,index,Ele){
           
            var Obj={
//              type:IS,
//				PositionID:ID
			}
			if(IS==1){
                console.log(IS);
				//取消收藏
				var mySuccessFun=function(){
                    Ele.removeClass("yes-like");
				    Ele.addClass("no-like");
				    app.positionList[index].Like-=1;
				    app.positionList[index].IsLike=0;
                    app.positionList=$.extend([],app.positionList);
				}
				var myErrorFun = function (error) {
					alert("网络出错了！");
				}
				myAjax("post", "/Job/PositionCollection?id="+ID+"&type=0", "", mySuccessFun, myErrorFun);
				
				
			}else{
				//进行收藏
				
				var mySuccessFun=function(){
                    Ele.removeClass("no-like");
				    Ele.addClass("yes-like");
				    app.positionList[index].Like+=1;
				    app.positionList[index].IsLike=1;
				    app.positionList=$.extend([],app.positionList);
				}
				var myErrorFun = function (error) {
					alert("网络出错了！");
				}
				myAjax("post", "/Job/PositionCollection?id="+ID+"&type=1", "", mySuccessFun, myErrorFun);
			}	
        },
		searchArea:function(){
			this.industryKey=false;
			this.positionKey=false;
			if(this.areaKey){
				this.areaKey=false;
			}else{
				this.areaKey=true;
			}
		},
		searchIndustry:function(){
			this.areaKey=false;
			this.positionKey=false;
			if(this.industryKey){
				this.industryKey=false;
			}else{
				this.industryKey=true;
			}
		},
		searchPosition:function(){
			this.areaKey=false;
			this.industryKey=false;
			if(this.positionKey){
				this.positionKey=false;
			}else{
				this.positionKey=true;
			}
		},
		areaItem:function(item){
			if(item.Name!==this.areaValue){
				this.areaValue=item.Name;
				app.getList(1,1);
			}
		},
		industryItem:function(item){
			if(item.Name!==this.industryValue){
				this.industryValue=item.Name;
				app.getList(1,1);
			}
		},
		positionItem:function(item){
			if(item.Name!==this.positionValue){
				this.positionValue=item.Name;
				app.getList(1,1);
			}
		},
		getCircle:function(list){
			if(app.loginKey){
				var percents=this.getPercents(list);
				$.each(percents,function(index,item){
					$('#indicatorContainer'+item.ID).radialIndicator({
				        barColor: '#ffbf00',
				        barWidth: 7,
				        initValue: 0,
				        fontFamily:'"PingFang SC","Microsoft Yahei"',
				        fontWeight:'normal',
				        fontSize:22,
				        fontColor:"#333",
				        roundCorner : true,
				        percentage: true
				    });
				    
				    //进度从零运动到指定位置
				    var radObj = $('#indicatorContainer'+item.ID).data('radialIndicator');
				    if($('#indicatorContainer'+item.ID).length===1){
				    	radObj.animate(item.Match);
				    }
				})
			}
		},
		getPercents:function(list){
			var arr=[];
			$.each(list,function(index,item){
				var obj={};
				obj.ID=item.ID;
				obj.Match=item.Match;
				arr.push(obj);
			})
			return arr;
		},
		getPage:function(count){
			$(".tcdPageCode").createPage({
		        pageCount:count,
		        current:1
		    });
		},
        getList:function(p,type){
            if(type===0){
                app.searchObj.selectType="";
			    app.searchObj.areaValue="";
			    app.searchObj.positionValue="";
			    app.searchObj.industryValue="";
			    app.payFrom=3000;
			    app.payTo=13000;
            }

            var myParams={
				Title:app.positionName,
				JobType:app.searchObj.selectType,
				Area:app.searchObj.areaValue,
				PositionName:app.searchObj.positionValue,
				Industry:app.searchObj.industryValue,
				BeginPay:app.payFrom,
				EndPay:app.payTo,
				PageIndex:p,
				PageSize:pageSize
			}

            var pageUrl="/Job/PositionList";
			var mySuccessFun=function(result){
                if(result!==null){
				    app.positionList=result.Data;
                    if(p===1){
                        app.pageCount=result.PageCount;
                    }
                }
			}
			var myErrorFun = function (error) {
                alert("网络出错了！");
           	}
			myAjax("post", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
        },
		clearSelect:function(){
            app.getList(1,0);
		},
		searchBtn:function(){
            app.getList(1,1);
		},
        colseSend: function () {
            this.sendKey = false;
        }
	}
})

$(function(){
	
	//可拖动价钱区域
	(function(){
		var $range = $("#range");
		var track = function (data) {
//			delete data.input;
//			delete data.slider;
			
			app.payFrom=data.from;
			app.payTo=data.to;
		};
		
		$range.ionRangeSlider({
			type: "double",
			min:0,
			max: 20000,
			from:3000,
			to:13000,
			step: 100,
			grid: false,
			onStart: track,
			onChange: track,
			onFinish: track,
			onUpdate: track
		});
	}());
	
	//页面初始化执行操作
	(function(){
		//页面初次加载绘制圆形匹配度进度条
		if(app.loginKey){
			app.positionList =positionData.Data;
			app.getCircle(app.positionList);
		}
		
		//初始生成分页
		$(".tcdPageCode").createPage({
	        pageCount:app.pageCount,
	        current:1,
	        //切换页码时列表刷新
	        backFn:function(p){
                app.getList(p,1);
	        }
	    });

		//重新生成分页
		if(app.pageCount>1){
			app.getPage(app.pageCount);
		}


	}());
	
	//jQuery事件注册
	(function(){
		
		//对比价钱区间是否变化中间量
		var payFromVal,payToVal;
		
		//隐藏下拉框
		$(document).on("click",function(e){
			if(e.target.className.indexOf("search-select-value")<0){
				app.positionKey=false;
				app.industryKey=false;
				app.areaKey=false;
			}
		})
		
		//鼠标点下记录价钱区间
		$("body").on("mousedown",".irs-slider",function(){
			payFromVal=app.payFrom,
			payToVal=app.payTo;
		})
		
		//鼠标抬起获取价钱区间
		$("body").on("mouseup",".irs-slider",function(){
			if(payFromVal!==app.payFrom||payToVal!==app.payTo){
				app.getList(1,1);
			}
		})

	}());
})

//图片没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/head.png";
    oImg.onerror = null;
}



