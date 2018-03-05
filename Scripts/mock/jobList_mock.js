//职位列表
// var positionList=[
// 	{
// 		ID:0,
// 		ImgUrl:'../../Content/img/job_list_company01.png',
// 		Name:'有鱼金融科技',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:23,
// 	},
// 	{
// 		ID:1,
// 		ImgUrl:'../../Content/img/job_list_company02.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:18,
// 	},
// 	{
// 		ID:2,
// 		ImgUrl:'../../Content/img/job_list_company03.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:2,
// 		Comment:20232,
// 		Like:23423,
// 		Match:95,
// 	},
// 	{
// 		ID:3,
// 		ImgUrl:'../../Content/img/job_list_company04.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:3,
// 		Comment:20232,
// 		Like:23423,
// 		Match:67,
// 	},
// 	{
// 		ID:4,
// 		ImgUrl:'../../Content/img/job_list_company05.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:53,
// 	},
// 	{
// 		ID:5,
// 		ImgUrl:'../../Content/img/job_list_company06.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:96,
// 	}
// ]

// //推荐职位列表
// var recommendList=[
// 	{
// 		ID:6,
// 		ImgUrl:'../../Content/img/job_list_company03.png',
// 		Name:'有鱼金融科技',
// 		Company:'有鱼金融科技',
// 		Experience:'1-3年',
// 		Education:'学历',
// 		Area:'上海-浦东新区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:89,
// 	},
// 	{
// 		ID:7,
// 		ImgUrl:'../../Content/img/job_list_company05.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:23,
// 	},
// 	{
// 		ID:8,
// 		ImgUrl:'../../Content/img/job_list_company02.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:2,
// 		Comment:20232,
// 		Like:23423,
// 		Match:87,
// 	},
// 	{
// 		ID:9,
// 		ImgUrl:'../../Content/img/job_list_company06.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:3,
// 		Comment:20232,
// 		Like:23423,
// 		Match:34,
// 	},
// 	{
// 		ID:10,
// 		ImgUrl:'../../Content/img/job_list_company02.png',
// 		Name:'新媒体运营',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:12,
// 	},
// 	{
// 		ID:11,
// 		ImgUrl:'../../Content/img/job_list_company01.png',
// 		Name:'有鱼金融科技',
// 		Company:'有鱼金融科技',
// 		Experience:'3-5年',
// 		Education:'学历',
// 		Area:'北京-丰台区',
// 		Tag:[
// 			{
// 				ID:0,
// 				TagName:'运营'
// 			},
// 			{
// 				ID:1,
// 				TagName:'数据分析'
// 			},
// 			{
// 				ID:2,
// 				TagName:'微信开发'
// 			}
// 		],
// 		Star:5,
// 		Comment:20232,
// 		Like:23423,
// 		Match:67,
// 	}
// ]


//可选区域
var areas = [
    {
        ID: 0,
        Name: "请选择"
    },
	{
		ID:1,
		Name:"上海"
	},
	{
		ID:2,
		Name:"深圳"
	},
	{
		ID:3,
		Name:"广州"
	},
	{
		ID:4,
		Name:"北京"
	}
]

//可选行业
var industrys = [
    {
        ID: 0,
        Name: "请选择"
    },
	{
		ID:1,
		Name: "销售/客服/快消"
	},
	{
		ID:2,
		Name: "银行/保险/证券/金融"
	},
	{
		ID:3,
		Name: "教育/法律/人力/咨询"
	},
	{
		ID:4,
		Name: "产品/技术/IT互联科技"
    },
    {
        ID: 5,
        Name: "房地产"
    }
]

//可选职位
var positions = [
    {
        ID: 0,
        Name: "请选择"
    },
	{
		ID:1,
		Name:"销售"
	},
	{
		ID:3,
		Name:"管理"
	},
	{
		ID:4,
		Name:"研发"
	}
]

// var pageCount1=100;

// var pageCount2=50;



