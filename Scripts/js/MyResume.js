//"use strict";
//请求接口
var titleUrl = "/My/GetTitles",
	addTitleUrl = "/My/SubmitUserTitle",
	userTitleUrl = "/My/GetUserTitles";
//拖动技能进度条相关初始化变量
var tag = false,
	ox = 0,
	left = 100,
	bgleft = 0,
	num=0;

//格式化后的教育背景日期
var dateList=formatDate(EducationBackround);

//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:'#app',
	data:{							
		tagBoxShow:false,
		totalTags:[],
		userTags:extendList(UserTitleList),
		selectedTags:[],
		//个人基本信息
		userInfoShow:ResumeBasic.Name!==""&&ResumeBasic.Gender!==""&&ResumeBasic.Tel!==""&&ResumeBasic.AddressInfo!==""&&ResumeBasic.Email!=="",
		editOnce:!(ResumeBasic.Name!==""&&ResumeBasic.Gender!==""&&ResumeBasic.Tel!==""&&ResumeBasic.AddressInfo!==""&&ResumeBasic.Email!==""),
		userInfo:{
			ID:ResumeBasic.ID,
			PicturePath:ResumeBasicPicturePaths,
			Name:ResumeBasic.Name,
			Gender:ResumeBasic.Gender,							
			AddressInfo:ResumeBasic.AddressInfo,
			Tel:ResumeBasic.Tel,
			Email:ResumeBasic.Email
		},
		userEditInfo:{
			ID:ResumeBasic.ID,
			PicturePath:ResumeBasicPicturePaths,
			Name:ResumeBasic.Name,
			Gender:ResumeBasic.Gender,							
			AddressInfo:ResumeBasic.AddressInfo,
			Tel:ResumeBasic.Tel,
			Email:ResumeBasic.Email
		},
		userPhoneShow:false,
		userEmailShow:false,
		headEditEnable:false,
		clickEnable:true,
		
		ModuleShow_1:false,
		ModuleShow_2:false,
		ModuleShow_3:false,
		ModuleShow_4:false,
		ModuleShow_5:false,
		currentModule:0,
		
		//编辑简历
		resumeEditKey:false,
		resumeEditIndex:-1,
		resumeEditID:-1,

		//教育经历模块
		currrentDate:new Date().getFullYear(),
		dateListKey:false,
		educationDate:dateList,
		educationLists:EducationBackround,
		educationEditBackgrounds:[
			{
				id:10,
				background:"大专"
			},
			{
				id:11,
				background:"本科"
			},
			{
				id:12,
				background:"硕士"
			},
			{
				id:13,
				background:"博士"
			},
			{
				id:14,
				background:"其他"
			}
		],
		educationEditgraduatesYear:[
			{
				graduate:"2019",
			},
			{
				graduate:"2018",
			},
			{
				graduate:"2017",
			},
			{
				graduate:"2016",
			},
			{
				graduate:"2015",
			},
			{
				graduate:"2014",
			},
			{
				graduate:"2013",
			},
			{
				graduate:"2012",
			},
			{
				graduate:"2011",
			}
		],
        educationEditgraduatesMonth:[
			{
				graduate:"01",
			},
			{
				graduate:"02",
			},
			{
				graduate:"03",
			},
			{
				graduate:"04",
			},
			{
				graduate:"05",
			},
			{
				graduate:"06",
			},
			{
				graduate:"07",
			},
			{
				graduate:"08",
			},
			{
				graduate:"09",
			},
			{
				graduate:"10",
			},
			{
				graduate:"11",
			},
			{
				graduate:"12",
			}
		],
		
		//post教育背景参数
		educationmajor:"",
		educationschool:"",
		educationBackgroundid:"",
		educationbackground:"",
		educationgraduate_year:"",
        educationgraduate_month:"",
		educationmonth:"",
		
		//荣誉经历模块
		awardgraduates_year:[
			{
				year:"2019",
			},
			{
				year:"2018",
			},
			{
				year:"2017",
			},
			{
				year:"2016",
			},
			{
				year:"2015",
			},
			{
				year:"2014",
			},
			{
				year:"2013",
			},
			{
				year:"2012",
			},
			{
				year:"2011",
			}
		],
        awardgraduates_month:[
			{
				month:"01",
			},
			{
				month:"02",
			},
			{
				month:"03",
			},
			{
				month:"04",
			},
			{
				month:"05",
			},
			{
				month:"06",
			},
			{
				month:"07",
			},
			{
				month:"08",
			},
			{
				month:"09",
			},
			{
				month:"10",
			},
			{
				month:"11",
			},
			{
				month:"12",
			}
		],
		awardLists:Award,
		//post荣誉参数
		awardname:"",
		awardgraduate_year:"",
        awardgraduate_month:"",
		
		//实习经历模块
		practiceYears:[
			{
				year:2019
			},
			{
				year:2018
			},
			{
				year:2017
			},
			{
				year:2016
			},
			{
				year:2015
			},
			{
				year:2014
			},
			{
				year:2013
			},
			{
				year:2012
			},
			{
				year:2011	
			},
			{
				year:2010
			}
		],
		practiceLists:InternshipExperience,
		//post实习经历参数
		practicecompanyname:"",
		practicepositionname:"",
		practicesite:"",
		practicebegin_year:"",
        practicebegin_month:"",
		practiceend_year:"",
        practiceend_month:"",
		practicecontent:"",
		
		//技能模块
		skillLists:Sepcilty,
		//post技能参数
		skillname:"",
		skillbar:"",
		skilldec:"",
		
		//课外活动模块
		activityLists:Activity,
		activityYears:[
			{
				year:2019
			},
			{
				year:2018
			},
			{
				year:2017
			},
			{
				year:2016
			},
			{
				year:2015
			},
			{
				year:2014
			},
			{
				year:2013
			},
			{
				year:2012
			},
			{
				year:2011	
			},
			{
				year:2010
			}
		],
		//post课外活动参数
		activitysite:"",
		activitydec:"",
		activitydate_year:"",
        activitydate_month:"",
		activityname:""
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
	beforeMount:function(){
		
	},
	mounted:function(){
		
	},
	updated:function(){
		//重新绘制带有用户标签的列表
		if(this.tagBoxShow){
			this.resetTags();
		}
	},
	computed:{
		phoneFilter:function(){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if(this.userEditInfo.Tel===""){
				this.userPhoneShow=true;
				return "必填";
			}else if(!myreg.test(this.userEditInfo.Tel)){
				this.userPhoneShow=true;
				return "请输入有效的手机号";
			}else{
				this.userPhoneShow=false;
			}
		},
		emailFilter:function(){
			var myreg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(this.userEditInfo.Email===""){
				this.userEmailShow=true;
				return "必填";
			}else if(!myreg.test(this.userEditInfo.Email)){
				this.userEmailShow=true;
				return "请输入有效的邮箱地址";
			}else{
				this.userEmailShow=false;
			}
		}
	},
	methods:{
		imgError:function(){
			var oImg=event.srcElement;
		    oImg.src="../../Content/img/head.png";
		    oImg.onerror=null;
		},
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
			var userTitleNameList = "";
            $.each(app.selectedTags,function(index,item){
				tags.push(String(item.ID));
				if(!!userTitleNameList){
					userTitleNameList+="  ";
				}
				userTitleNameList+=item.TitleName;
            })
			var myParams = {
                arrayTltleID:tags
            };
            var mySuccessFun = function(result){
            	if(result.Success){
                    app.userTagList();
                    app.selectedTags=[];
					app.tagBoxShow=false;
					$('.entrance-tag').text(userTitleNameList);
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
		},
		infoEdit:function(){
			if(!this.headEditEnable){
				this.clickEnable=false;
				this.userInfoShow=false;
			}
		},
		infoSave:function(){
			
			if(this.currentModule!==0){
				return;
			}
			
			if(this.userEditInfo.Name===""){
				$(".info-name").focus();
				return;
			}
			
			if(this.userEditInfo.Gender===""){
				return;
			}
			
			if(this.userPhoneShow){
				$(".info-phone").focus();
				return;
			}
			
			if(this.userEmailShow){
				$(".info-email").focus();
				return;
			}
			
			if(this.userEditInfo.AddressInfo===""){
				$(".info-address").focus();
				return;
			}
			this.userInfo={
				ID:app.userEditInfo.ID,
				PicturePath:app.userInfo.PicturePath,
				Name:app.userEditInfo.Name,
				Gender:app.userEditInfo.Gender,							
				AddressInfo:app.userEditInfo.AddressInfo,
				Tel:app.userEditInfo.Tel,
				Email:app.userEditInfo.Email
			}

			var myParams=app.userInfo;

			var mySuccessFun = function (result) {
                if (result.Success) {
					if(!app.userInfo.ID){
						app.userInfo.ID=result.Data;
					}
					app.editOnce=false;
					app.clickEnable=true;
					app.userInfoShow=true;
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}

            //提交简历信息
            myAjax("post", "/Resume/SubmitResumeBasic", JSON.stringify(myParams), mySuccessFun, myErrorFun);
		},
		infoCancel:function(){
			
			if(this.editOnce){
				return;
			}else{
				this.userEditInfo={
					ID:this.userInfo.ID,
					PicturePath:this.userInfo.PicturePath,
					Name:this.userInfo.Name,
					Gender:this.userInfo.Gender,							
					AddressInfo:this.userInfo.AddressInfo,
					Tel:this.userInfo.Tel,
					Email:this.userInfo.Email
				}
				this.clickEnable=true;
				this.userInfoShow=true;
			}
		},
        floClick:function(){
			if(app.editOnce){
                alert("请先完善个人简历基本信息");
                return;
            }
		},
		addModule:function(type){
			
            if(app.editOnce){
                alert("请先完善个人简历基本信息");
                return;
            }

			if(this.clickEnable){
				if(this.currentModule===0){
					this.moduleActiveShow(type);
					if(type===1){
						this.educationDate.unshift({year:"",month:""});
					}
					this.currentModule=type;
					this.clickEnable=false;
					this.headEditEnable=true;
				}
			}else{
				if(type===this.currentModule){
					if(type===1){
						app.educationCancel();
					}
					
					if(type===2){
						app.awardCancel();
					}
					
					if(type===3){
						app.practiceCancel();
					}
					
					if(type===4){
						app.skillCancel();
					}
					
					if(type===5){
						app.activityCancel();
					}
				}
			}
		},
		moduleActiveShow:function(type){
			switch(type){
				case 1:
					this.ModuleShow_1=true;
				break;
				case 2:
					this.ModuleShow_2=true;
				break;
				case 3:
					this.ModuleShow_3=true;
				break;
				case 4:
					this.ModuleShow_4=true;
				break;
				case 5:
					this.ModuleShow_5=true;
				break;
			}
		},
		moduleActiveHide:function(type){
			switch(type){
				case 1:
					this.ModuleShow_1=false;
				break;
				case 2:
					this.ModuleShow_2=false;
				break;
				case 3:
					this.ModuleShow_3=false;
				break;
				case 4:
					this.ModuleShow_4=false;
				break;
				case 5:
					this.ModuleShow_5=false;
				break;
			}
		},
		resumeEditInit:function(){
			app.resumeEditKey=false;
			app.resumeEditIndex=-1;
			app.resumeEditID=-1;
		},
		selectgraduateyear:function(graduate){
			this.educationgraduate_year=graduate;
		},
        selectgraduatemonth:function(graduate){
			this.educationgraduate_month=graduate;
		},
		selectbackground:function(background,id){
			this.educationbackground=background;
			this.educationbackgroundid=id;
		},
		educationCancel:function(type){
			this.educationmajor="";
			this.educationschool="";
			this.educationbackground="";
			this.educationgraduate_year="";
            this.educationgraduate_month="";
			this.educationDate.splice(0,1);
			this.moduleActiveHide(1);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		//教育背景
		educationSave:function(type){

			if($.trim(this.educationmajor)===""){
				return;
			}
			if($.trim(this.educationschool)===""){
				return;
			}
			if($.trim(this.educationbackground)===""){
				return;
			}
			if($.trim(this.educationgraduate_year)===""){
				return;
			}

            //添加参数
			var Obj={
				ResumeID:app.userEditInfo.ID,
				Major:app.educationmajor,
				Education:app.educationbackgroundid,
				SchoolName:app.educationschool,
				EndDate:app.educationgraduate_year+"-"+app.educationgraduate_month+"-"+"01"
			}

            //编辑参数
//            var Obj={
//              ID:app.resumeEditID,
//              ResumeID:app.userEditInfo.ID,
//				Major:app.educationmajor,
//				Education:app.educationbackgroundid,
//				SchoolName:app.educationschool,
//				EndDate:app.educationgraduate_year+"-"+app.educationgraduate_month+"-"+"01"
//            }
            
			var oYear=app.educationgraduate_year;
			var oMonth=formatMonth(app.educationgraduate_month);
			var oDate={
				year:oYear,
				month:oMonth
			}
			
            //添加编辑item的ID
			if(app.resumeEditKey){
				Obj.ID=app.resumeEditID;
			}else{

			}
			
            var mySuccessFun = function (result) {
				
                if (result.Success) {
					app.educationCancel();
					if(app.resumeEditKey){
						app.educationLists.splice(app.resumeEditIndex,1,Obj);
						app.educationDate.splice(app.resumeEditIndex,1,oDate);
						app.resumeEditInit();
					}else{
						Obj.ID=result.Data;
						app.educationLists.unshift(Obj);
						app.educationDate.unshift(oDate);
					}
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}
			
            //提交教育背景
            myAjax("post", "/Resume/SubmitEducationBackround", JSON.stringify(Obj), mySuccessFun, myErrorFun);
			
		},
		educationDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
                    app.educationLists.splice(index,1);
			        app.educationDate.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteEducationBackround?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);
		},
		educationEdit:function(item,index){

			app.addModule(1);
			app.resumeEditKey=true;
			app.resumeEditIndex=index;
			app.resumeEditID=item.ID;

			app.userEditInfo.ID=item.ResumeID;
			app.educationmajor=item.Major;
			app.educationbackground=item.Education>=14?'其他':(item.Education>=13?'博士':(item.Education>=12?'硕士':(item.Education>=11?'本科':(item.Education>=10?'大专':''))));
			app.educationbackgroundid=item.Education;
			app.educationschool=item.SchoolName;
			app.educationgraduate_year=item.EndDate.substr(0,4);
			app.educationgraduate_month=item.EndDate.substr(5,2);

		},
		awardselect_year:function(year){
			this.awardgraduate_year=year;
		},
        awardselect_month:function(month){
			this.awardgraduate_month=month;
		},
        //所获荣誉
		awardSave:function(type){
			if($.trim(this.awardname)===""){
				return;
			}
			if($.trim(this.awardgraduate_year)===""){
				return;
			}
			
            //修改参数
			var Obj={
				ResumeID:app.userEditInfo.ID,
				HonorName:app.awardname,
				GetTime:app.awardgraduate_year + "-" +app.awardgraduate_month
			}

            //编辑参数
//			var Obj={
//              ID:app.resumeEditID,
//				ResumeID:app.userEditInfo.ID,
//				HonorName:app.awardname,
//				GetTime:app.awardgraduate_year + "-" +app.awardgraduate_month
//			}

            //添加编辑item的ID
			if(app.resumeEditKey){
				Obj.ID=app.resumeEditID;
			}else{

			}
			
			var mySuccessFun = function (result) {
				
                if (result.Success) {
					app.awardCancel();
					if(app.resumeEditKey){
						app.awardLists.splice(app.resumeEditIndex,1,Obj);
						app.resumeEditInit();
					}else{
						Obj.ID=result.Data;
						app.awardLists.unshift(Obj);
					}
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}

            //提交所获荣誉
            myAjax("post", "/Resume/SubmitHonor", JSON.stringify(Obj), mySuccessFun, myErrorFun);
 			
			
		},
		awardCancel:function(type){
			this.awardname="";
			this.awardgraduate_year="";
            this.awardgraduate_month= "";
			this.moduleActiveHide(2);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		awardDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.awardLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteHonor?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);
		
		},
		awardEdit:function(item,index){

			app.addModule(2);
			app.resumeEditKey=true;
			app.resumeEditIndex=index;
			app.resumeEditID=item.ID;

			app.userEditInfo.ID=item.ResumeID;
			app.awardname=item.HonorName;
			app.awardgraduate_year=item.GetTime.substr(0,4);
			app.awardgraduate_month=item.GetTime.substr(5,2);

		},
		//实习经历
		practiceSave:function(type){
			if($.trim(this.practicecompanyname)===""){
				return;
			}
			if($.trim(this.practicepositionname)===""){
				return;
			}
			if($.trim(this.practicesite)===""){
				return;
			}
			if($.trim(this.practicebegin_year)===""){
				return;
			}
			if($.trim(this.practiceend_year)===""){
				return;
			}
			if($.trim(this.practicecontent)===""){
				return;
			}
			
            //添加参数
			var Obj={
				CompanyLogo:$("#CompanyLogoImg").attr('src'),
				ResumeID:app.userEditInfo.ID,
				CompanyName:app.practicecompanyname,
				PositionName:app.practicepositionname,
				AddressInfo:app.practicesite,
				BeginDate:app.practicebegin_year +"-" + app.practicebegin_month,
				EndDate:app.practiceend_year+"-" + app.practiceend_month,
				JobDescription:app.practicecontent
			}

            //编辑参数
//            var Obj={
//              ID:app.resumeEditID,
//				CompanyLogo:$("#CompanyLogoImg").attr('src'),
//				ResumeID:app.userEditInfo.ID,
//				CompanyName:app.practicecompanyname,
//				PositionName:app.practicepositionname,
//				AddressInfo:app.practicesite,
//				BeginDate:app.practicebegin_year +"-" + app.practicebegin_month,
//				EndDate:app.practiceend_year+"-" + app.practiceend_month,
//				JobDescription:app.practicecontent
//			}

            //添加编辑item的ID
			if(app.resumeEditKey){
				Obj.ID=app.resumeEditID;
			}else{

			}

			var mySuccessFun = function (result) {
                app.practiceCancel();
				if(app.resumeEditKey){
					app.practiceLists.splice(app.resumeEditIndex,1,Obj);
					app.resumeEditInit();
				}else{
					Obj.ID=result.Data;
					app.practiceLists.unshift(Obj);
				}
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}
            
            myAjax("post", "/Resume/SubmitInternshipExperience", JSON.stringify(Obj), mySuccessFun, myErrorFun);
 
		},
		practiceCancel:function(type){
			this.practicecompanyname="";
			this.practicepositionname="";
			this.practicesite="";
			this.practicebegin_year="";
            this.practicebegin_month="";
			this.practiceend_year="";
            this.practiceend_month="";
			this.practicecontent="";
			
			this.moduleActiveHide(3);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		practiceDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.practiceLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteInternshipExperience?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);
		},
		practiceEdit:function(item,index){
			app.addModule(3);
			app.resumeEditKey=true;
			app.resumeEditIndex=index;
			app.resumeEditID=item.ID;

			$("#CompanyLogoImg").attr('src',item.CompanyLogo);
			app.userEditInfo.ID=item.ResumeID;
			app.practicecompanyname=item.CompanyName;
			app.practicepositionname=item.PositionName;
			app.practicesite=item.AddressInfo;
			app.practicebegin_year=item.BeginDate.substr(0,4);
			app.practicebegin_month=item.BeginDate.substr(5,2);
			app.practiceend_year=item.EndDate.substr(0,4);
			app.practiceend_month=item.EndDate.substr(5,2);
			app.practicecontent=item.JobDescription;

		},
		practiceselectbegin_year:function(year){
			this.practicebegin_year=year;
		},
        practiceselectbegin_month:function(month){
			this.practicebegin_month=month;
		},        
		practiceselectend_year:function(year){
			this.practiceend_year=year;
		},
        practiceselectend_month:function(month){
			this.practiceend_month=month;
		},
        skillBarInit:function(){
			$(".skill-edit-progress_bar").css("width","100px");
			$(".skill-edit-progress_btn").css("left","100px");
			$(".skill-edit-degree").html("一般");
			tag = false;
			ox = 0;
			left = 100;
			bgleft = 0;
			num=0;
		},
        //特殊技能
		skillSave:function(type){
			if($.trim(this.skillname)===""){
				return;
			}
			if($.trim(this.skilldec)===""){
				return;
			}
			
            //添加参数
			var Obj={
				ResumeID:app.userEditInfo.ID,
				SepciltyName:app.skillname,
				SkillDescription:app.skilldec,
				Skilled:app.skillbar
			}

            //编辑参数
//            var Obj={
//              ID:app.resumeEditID,
//				ResumeID:app.userEditInfo.ID,
//				SepciltyName:app.skillname,
//				SkillDescription:app.skilldec,
//				Skilled:app.skillbar
//			}

            //添加编辑item的ID
			if(app.resumeEditKey){
				Obj.ID=app.resumeEditID;
			}else{

			}
            console.log(Obj);

			var mySuccessFun = function (result) {
                if (result.Success) {
					app.skillCancel();
					if(app.resumeEditKey){
						app.skillLists.splice(app.resumeEditIndex,1,Obj);
						app.resumeEditInit();
					}else{
						Obj.ID=result.Data;
						app.skillLists.unshift(Obj);
					}
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}

            myAjax("post", "/Resume/SubmitSepcilty", JSON.stringify(Obj), mySuccessFun, myErrorFun);
		},
		skillCancel:function(type){
			this.skillname="";
			this.skilldec="";
			app.skillBarInit();
			
			this.moduleActiveHide(4);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		skillDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.skillLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteSepcilty?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);	
		},
		skillEdit:function(item,index){
			app.addModule(4);
			app.resumeEditKey=true;
			app.resumeEditIndex=index;
			app.resumeEditID=item.ID;
			
			//写入程度条
			$(".skill-edit-progress_bar").css("width",item.Skilled+"px");
			$(".skill-edit-progress_btn").css("left",item.Skilled+"px");
			if(item.Skilled>=0&&item.Skilled<200){
				$(".skill-edit-degree").html("一般");
			}
			if(item.Skilled>=200&&item.Skilled<300){
				$(".skill-edit-degree").html("熟练");
			}
			if(item.Skilled>=300&&item.Skilled<350){
				$(".skill-edit-degree").html("良好");
			}
			if(item.Skilled>=350){
				$(".skill-edit-degree").html("优秀");
			}
			tag = false;
			ox = 0;
			left = item.Skilled;
			bgleft = 0;
			num=0;

			app.userEditInfo.ID=item.ResumeID;
			app.skillname=item.SepciltyName;
			app.skilldec=item.SkillDescription;
			app.skillbar=item.Skilled;
		},
		//课外活动
		activityselect_year:function(year){
			this.activitydate_year=year;
		},
        activityselect_month:function(month){
			this.activitydate_month=month;
		},
		activitySave:function(type){
			if($.trim(this.activityname)===""){
				return;
			}
			if($.trim(this.activitydec)===""){
				return;
			}
			if($.trim(this.activitysite)===""){
				return;
			}
			if($.trim(this.activitydate_year)===""){
				return;
			}

            //添加参数
			var Obj={
				ResumeID:app.userEditInfo.ID,
				ActivityName:app.activityname,
				Description:app.activitydec,
				AttendTime:app.activitydate_year+"-"+app.activitydate_month,
				AddressInfo:app.activitysite
			}
			
            //编辑参数
//            var Obj={
//              ID:app.resumeEditID,
//				ResumeID:app.userEditInfo.ID,
//				ActivityName:app.activityname,
//				Description:app.activitydec,
//				AttendTime:app.activitydate_year+"-"+app.activitydate_month,
//				AddressInfo:app.activitysite
//			}

            //添加编辑item的ID
			if(app.resumeEditKey){
				Obj.ID=app.resumeEditID;
			}else{

			}

			var mySuccessFun = function (result) {
                if (result.Success) {
					app.activityCancel();
					if(app.resumeEditKey){
						app.activityLists.splice(app.resumeEditIndex,1,Obj);
						app.resumeEditInit();
					}else{
						Obj.ID=result.Data;
						app.activityLists.unshift(Obj);
					}
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}

            myAjax("post", "/Resume/SubmitActivity", JSON.stringify(Obj), mySuccessFun, myErrorFun);
			
		},
		activityCancel:function(type){
			this.activityname="";
			this.activitydec="";
			this.activitydate_year="";
            this.activitydate_month="";
			this.activitysite="";
			this.moduleActiveHide(5);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		activityDelete:function(index,ID){
			app.activityLists.splice(index,1);
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.activityLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteActivity?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);	
		},
		activityEdit:function(item,index){
			app.addModule(5);
			app.resumeEditKey=true;
			app.resumeEditIndex=index;
			app.resumeEditID=item.ID;
			
			app.userEditInfo.ID=item.ResumeID;
			app.activityname=item.ActivityName;
			app.activitydec=item.Description;
			app.activitydate_year=item.AttendTime.substr(0,4);
			app.activitydate_month=item.AttendTime.substr(5,2);
			app.activitysite=item.AddressInfo;
		},
		imgClick:function(){
			$('#CompanyLogo').click();
		}
	}
})


$(function(){
	
    //拖动进度条
	(function($){
		
        $('.skill-edit-progress_btn').mousedown(function(e) {
            ox = e.pageX-left;
            tag = true;
        });
        $(document).mouseup(function() {
            tag = false;
        });
        $("html,body").mouseup(function() {
            tag = false;
        });
        $('.skill-edit-progress').mousemove(function(e) {//鼠标移动
            if (tag) {
                left = e.pageX - ox;
                if (left <= 12) {
                    left = 10;
                }else if (left > 404) {
                    left = 404;
                }

                if(left>=0&&left<200){
                	$(".skill-edit-degree").html("一般");
                }
                if(left>=200&&left<300){
                	$(".skill-edit-degree").html("熟练");
                }
                if(left>=300&&left<350){
                	$(".skill-edit-degree").html("良好");
                }
                if(left>=350){
                	$(".skill-edit-degree").html("优秀");
                }
                $('.skill-edit-progress_btn').css('left', left);
                $('.skill-edit-progress_bar').width(left);
                
                app.skillbar=left;
                
            }
        });
	}(jQuery));
	
	//页面初始化
	(function(){
       
	}(jQuery));

	//事件注册
	(function(){
		
		$("body").on("click",".resume-nav-item",function(event){
			var oKey=$(this).hasClass("resume-nav-active");
			var oList=$(".resume-nav-item");
			if(!oKey){
				for(var i=0;i<oList.length;i++){
					if(oList.eq(i).hasClass("resume-nav-active")){
						oList.eq(i).removeClass("resume-nav-active");
						break;
					}
				}
				$(this).addClass("resume-nav-active");
			}
		})
		
		$("body").on("click",".add-education-btn",function(event){
			$(".education-edit-container").show();
		})
		
		$("body").on("click",".education-save-btn",function(event){
			$(".education-edit-container").hide();
		})
		
		$("body").on("click",".education-cancel-btn",function(event){
			$(".education-edit-container").hide();
		})
		//教育背景
		var oBack=false;
		$("body").on("click",".background-select",function(event){
			if(!oBack){
				$(this).css("borderColor","#ffbf00");
				$(".background-select-list").show();
				oBack=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".background-select-list").hide();
				oBack=false;
			}
		})
		
		$("body").on("click",".background-item",function(event){
			var oContent=$(this).text();
			$(".background-select").css("border","1px solid #e3e3e3");
			$(".background-content").text(oContent);
			$(".background-select-list").hide();
			oBack=false;
		})
		
		var oGraduateYear=false;
		$("body").on("click",".graduate-select-year",function(event){
			if(!oGraduateYear){
				$(this).css("borderColor","#ffbf00");
				$(".graduate-select-list-year").show();
				oGraduateYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".graduate-select-list-year").hide();
				oGraduateYear=false;
			}
		})
		
		$("body").on("click",".graduate-item-year",function(event){
			$(".graduate-select-year").css("border","1px solid #e3e3e3");
			$(".graduate-select-list-year").hide();
			oGraduateYear=false;
		})

        var oGraduateMonth=false;
		$("body").on("click",".graduate-select-month",function(event){
			if(!oGraduateMonth){
				$(this).css("borderColor","#ffbf00");
				$(".graduate-select-list-month").show();
				oGraduateMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".graduate-select-list-month").hide();
				oGraduateMonth=false;
			}
		})
		
		$("body").on("click",".graduate-item-month",function(event){
			$(".graduate-select-month").css("border","1px solid #e3e3e3");
			$(".graduate-select-list-month").hide();
			oGraduateMonth=false;
		})

//      所获荣誉
		var oAwardYear=false;
		$("body").on("click",".award-select-year",function(event){
			if(!oAwardYear){
				$(this).css("borderColor","#ffbf00");
				$(".award-select-list-year").show();
				oAwardYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".award-select-list-year").hide();
				oAwardYear=false;
			}
		})
		
		$("body").on("click",".award-year-item-year",function(event){
			$(".award-select-year").css("border","1px solid #e3e3e3");
			$(".award-select-list-year").hide();
			oAwardYear=false;
		})

        var oAwardMonth=false;
		$("body").on("click",".award-select-month",function(event){
			if(!oAwardMonth){
				$(this).css("borderColor","#ffbf00");
				$(".award-select-list-month").show();
				oAwardMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".award-select-list-month").hide();
				oAwardMonth=false;
			}
		})
		
		$("body").on("click",".award-year-item-month",function(event){
			$(".award-select-month").css("border","1px solid #e3e3e3");
			$(".award-select-list-month").hide();
			oAwardMonth=false;
		})
		
		//实习经历
		var oPracticeBeginYear=false;
		$("body").on("click",".practice-select-begin-year",function(event){
			if(!oPracticeBeginYear){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-begin-year").show();
				oPracticeBeginYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-begin-year").hide();
				oPracticeBeginYear=false;
			}
		})
		
		$("body").on("click",".practice-year-begin-year",function(event){
			$(".practice-select-begin-year").css("border","1px solid #e3e3e3");
			$(".practice-date-list-begin-year").hide();
			oPracticeBeginYear=false;
		})

        var oPracticeBeginMonth=false;
		$("body").on("click",".practice-select-begin-month",function(event){
			if(!oPracticeBeginMonth){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-begin-month").show();
				oPracticeBeginMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-begin-month").hide();
				oPracticeBeginMonth=false;
			}
		})
		
		$("body").on("click",".practice-year-begin-month",function(event){
			$(".practice-select-begin-month").css("border","1px solid #e3e3e3");
			$(".practice-date-list-begin-month").hide();
			oPracticeBeginMonth=false;
		})
		
		var oPracticeEndYear=false;
		$("body").on("click",".practice-select-end-year",function(event){
			if(!oPracticeEndYear){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-end-year").show();
				oPracticeEndYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-end-year").hide();
				oPracticeEndYear=false;
			}
		})
		
		$("body").on("click",".practice-year-end-year",function(event){
			$(".practice-select-end-year").css("border","1px solid #e3e3e3");
			$(".practice-date-list-end-year").hide();
			oPracticeEndYear=false;
		})
        
		var oPracticeEndMonth=false;
		$("body").on("click",".practice-select-end-month",function(event){
			if(!oPracticeEndMonth){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-end-month").show();
				oPracticeEndMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-end-month").hide();
				oPracticeEndMonth=false;
			}
		})
		
		$("body").on("click",".practice-year-end-month",function(event){
			$(".practice-select-end-month").css("border","1px solid #e3e3e3");
			$(".practice-date-list-end-month").hide();
			oPracticeEndMonth=false;
		})

		//课外活动
		var oActivityYear=false;
		$("body").on("click",".activity-select-year",function(event){
			if(!oActivityYear){
				$(this).css("borderColor","#ffbf00");
				$(".activity-select-list-year").show();
				oActivityYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".activity-select-list-year").hide();
				oActivityYear=false;
			}
		})
		
		$("body").on("click",".activity-year-item-year",function(event){
			$(".activity-select-year").css("border","1px solid #e3e3e3");
			$(".activity-select-list-year").hide();
			oActivityYear=false;
		})


        var oActivityMonth=false;
		$("body").on("click",".activity-select-month",function(event){
			if(!oActivityMonth){
				$(this).css("borderColor","#ffbf00");
				$(".activity-select-list-month").show();
				oActivityMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".activity-select-list-month").hide();
				oActivityMonth=false;
			}
		})
		
		$("body").on("click",".activity-year-item-month",function(event){
			$(".activity-select-month").css("border","1px solid #e3e3e3");
			$(".activity-select-list-month").hide();
			oActivityMonth=false;
		})
		
		$(document).on("click",function(e){
			var b1=$(e.target).hasClass("background-select");
			var b2=$(e.target).hasClass("background-content");
			var g1=$(e.target).hasClass("graduate-select-year");
			var g2=$(e.target).hasClass("graduate-content-year");
            var g1_month=$(e.target).hasClass("graduate-select-month");
			var g2_month=$(e.target).hasClass("graduate-content-month");
			var a1=$(e.target).hasClass("award-select-year");
			var a2=$(e.target).hasClass("award-content-year");
            var a1_month=$(e.target).hasClass("award-select-month");
			var a2_month=$(e.target).hasClass("award-content-month");
			var c1=$(e.target).hasClass("activity-select-year");
			var c2=$(e.target).hasClass("activity-content-year");
            var c1_month=$(e.target).hasClass("activity-select-month");
			var c2_month=$(e.target).hasClass("activity-content-month");
			var d1=$(e.target).hasClass("practice-select-begin-year");
			var d2=$(e.target).hasClass("practice-content-begin-year");
            var d1_month=$(e.target).hasClass("practice-select-begin-month");
			var d2_month=$(e.target).hasClass("practice-content-begin-month");
			var e1=$(e.target).hasClass("practice-select-end-year");
			var e2=$(e.target).hasClass("practice-content-end-year");
            var e1_month=$(e.target).hasClass("practice-select-end-month");
			var e2_month=$(e.target).hasClass("practice-content-end-month");
			
			if(!(b1||b2)){
				$(".background-select").css("border","1px solid #e3e3e3");
				$(".background-select-list").hide();
				oBack=false;
			}
			
			if(!(g1||g2)){
				$(".graduate-select-year").css("border","1px solid #e3e3e3");
				$(".graduate-select-list-year").hide();
				oGraduateYear=false;
			}

            if(!(g1_month||g2_month)){
				$(".graduate-select-month").css("border","1px solid #e3e3e3");
				$(".graduate-select-list-month").hide();
				oGraduateMonth=false;
			}
			
			if(!(a1||a2)){
				$(".award-select-year").css("border","1px solid #e3e3e3");
				$(".award-select-list-year").hide();
				oAwardYear=false;
			}

            if(!(a1_month||a2_month)){
				$(".award-select-month").css("border","1px solid #e3e3e3");
				$(".award-select-list-month").hide();
				oAwardMonth=false;
			}
			
			if(!(c1||c2)){
				$(".activity-select-year").css("border","1px solid #e3e3e3");
				$(".activity-select-list-year").hide();
				oActivityYear=false;
			}

            if(!(c1_month||c2_month)){
				$(".activity-select-month").css("border","1px solid #e3e3e3");
				$(".activity-select-list-month").hide();
				oActivityMonth=false;
			}

			
			if(!(d1||d2)){
				$(".practice-select-begin-year").css("border","1px solid #e3e3e3");
				$(".practice-date-list-begin-year").hide();
				oPracticeBeginYear=false;
			}

            if(!(d1_month||d2_month)){
				$(".practice-select-begin-month").css("border","1px solid #e3e3e3");
				$(".practice-date-list-begin-month").hide();
				oPracticeBeginMonth=false;
			}
			
			if(!(e1||e2)){
				$(".practice-select-end-year").css("border","1px solid #e3e3e3");
				$(".practice-date-list-end-year").hide();
				oPracticeEndYear=false;
			}

            
			if(!(e1_month||e2_month)){
				$(".practice-select-end-month").css("border","1px solid #e3e3e3");
				$(".practice-date-list-end-month").hide();
				oPracticeEndMonth=false;
			}
		})
		
		//侧边导航
		$(window).scroll(function() {
			//获取文档滚动高度
		    var top = $(document).scrollTop();
		    var scrollHeight = $(document).height();
　　			var windowHeight = $(this).height();

		    if(top>=530){
		    	$(".resume-nav-box").addClass("resume-nav-scroll");
		    }else{
		    	$(".resume-nav-box").removeClass("resume-nav-scroll");
		    }
		})

		//侧边导航滚动
		$("body").on("click",".nav-href",function(event){
			var oActive=$(this).parent(".resume-nav-item").hasClass("resume-nav-active");
			var oList=$(".resume-nav-item");
			if(!oActive){
				$.each(oList,function(index,item){
					if($(item).hasClass("resume-nav-active")){
						$(item).removeClass("resume-nav-active");
						return;
					}
				})
				$(this).parent(".resume-nav-item").addClass("resume-nav-active");
			}
			
			$("html, body").animate({
		      	scrollTop: ($($(this).attr("href")).offset().top -30)+ "px"
		    }, {
		      	duration: 500,
		      	easing: "swing"
		    });
		    return false;
		})

		$("body").on("click",".empty-btn",function(){
			window.location.href="../Job/List";
		})
	}());
})

//上传简历头像
function filePictureChange(){
	if(document.getElementById("PictureFile").value.length<=0){
		return false;
	}
	$.ajaxFileUpload({
		url: "/Resume/UserPhotoImport", //用于文件上传的服务器端请求地址
		type: "post",
		secureuri: false, //一般设置为false
		fileElementId: "PictureFile", //文件上传控件的id属性
		dataType: "json", //返回值类型 一般设置为json
		success: function (result) {
			if (result.Success) {
				app.userInfo.PicturePath = result.Data;
                $(".success-img").attr("src",result.Data);
                $(".entrance-img").attr("src",result.Data);
			} else {
				alert(result.Message);
			}
		},
		error: function (data, status, e) { //服务器响应失败处理函数
			alert(e);
		}
	});
}

//上传公司logo
function fileCompanyLogoChange() {
	
	if(document.getElementById("CompanyLogo").value.length<=0){
		return false;
	}
	$.ajaxFileUpload({
		url: "/Resume/CompanyLogoImport", //用于文件上传的服务器端请求地址
		type: "post",
		secureuri: false, //一般设置为false
		fileElementId: "CompanyLogo", //文件上传控件的id属性
		dataType: "json", //返回值类型 一般设置为json
		success: function (result) {
			if (result.Success) {
				$("#CompanyLogoImg").attr('src',result.Data);
			} else {
				alert(result.Message);
			}
		},
		error: function (data, status, e) { //服务器响应失败处理函数
			alert(e);
		}
	});
}

//触发点击上传图片
function imgClick(){
	$('#CompanyLogo').click();
}

//深拷贝数组
function extendList(arr){
	return $.extend([],arr);
}

//格式化日期
function formatDate(arr){
	var result=[];
	$.each(arr,function(index,item){
		var obj={};
		obj.year=Number(item.EndDate.substr(0,4));
		obj.month=formatMonth(item.EndDate.substr(5,2));
		result.push(obj);
	})
	return result;
}

//格式化月分
function formatMonth(month){
	switch(month){
		case "01":
			month="1月";
			break;
		case "02":
			month="2月";
			break;
		case "03":
			month="3月";
			break;
		case "04":
			month="4月";
			break;
		case "05":
			month="5月";
			break;
		case "06":
			month="6月";
			break;
		case "07":
			month="7月";
			break;jian
		case "08":
			month="8月";
			break;
		case "09":
			month="9月";
			break;
		case "10":
			month="10月";
			break;
		case "11":
			month="11月";
			break;
		case "12":
			month="12月";
			break;
	}
	return month;
}

