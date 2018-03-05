//数据绑定
var app=new Vue({
    el:"#app",
    data:{
        positionDetail:resumeDetail,
        positionTags:resumeDetail.Tag
    }
});

(function(){

    $(document).ready(function(){
        //初始化地图尺寸
        $("#address-container").css("height",parseInt(($(window).width()-30)/3.45)+"px");
        //当文档窗口发生改变地图尺寸
        $(window).resize(function(){
            if($(window).width()<=800){
                $("#address-container").css("height",parseInt(($(window).width()-30)/3.45)+"px");
            }
        });  
        //绘制百度地图
        (function(){
            //自定义地图标注图标
            function addMarker(point, index){  // 创建图标对象   
                var myIcon = new BMap.Icon("../../Content/img/m_positioning2.png", new BMap.Size(15, 20), { 
                    //图片相对于地图中心的定位位置       
                    anchor: new BMap.Size(10, 15),    
                    // 设置图片偏移量   
                    imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移    
                });      
                // 创建标注对象并添加到地图   
                var marker = new BMap.Marker(point, {icon: myIcon});    
                map.addOverlay(marker);    
            }
            
            // 创建地图实例
            var map = new BMap.Map("address-container");
            //map.centerAndZoom(new BMap.Point(121.48, 31.22), 11);    //默认上海市经纬度
            // 创建地址解析器实例     
            var myGeo = new BMap.Geocoder();      
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint(app.positionDetail.Address, function(point){      
                if (point) {   
                    map.clearOverlays();      
                    map.centerAndZoom(point, 11);       // 初始化地图，设置中心点坐标和地图级别
                    addMarker(point,0)          //添加自定义标注图标  
                }      
            }, 
            "上海市");
            //监听地图加载完毕事件
            map.addEventListener("tilesloaded",function(){$(".anchorBL").hide()});
        }());
    });
}());

//logo没有成功加载出来时处理
function noFindLogo() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/position_head.png";
    oImg.onerror = null;
}
