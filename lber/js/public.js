/* *
 * 调用此方法发送HTTP请求。
 *
 * @public
 * @param   {string}    url             请求的URL地址
 * @param   {mix}       params          发送参数
 * @param   {Function}  callback        回调函数
 * @param   {string}    transferMode     请求的方式，有"GET"和"POST"两种
 * @param   {string}    responseType    响应类型，有"JSON"、"XML"和"TEXT"三种
 * @param   {boolean}   asyn            是否异步请求的方式
 * @param   {boolean}   quiet           是否安静模式请求
 */
var Ajax = jQuery;
Ajax.call = function (url, params, callback, transferMode, responseType, asyn, quiet){
	this.ajax({
		url: url+'&t='+Math.random()+'&is_ajax',
		async: asyn,
		data: params,
		type: transferMode,
		dataType: responseType,
		success: callback
	});	
}
var mainNavHover={
	showSubContent:function(){ //导航二级菜
        //Register Hover Event
         $('.mainNav li').hover(
			function(){
				if($(this).find('div.subContent').length>0){
					$(this).find('div.subContent').width(jQuery(this).find('div.subContent').width()).css({"left":"50%","marginLeft":-jQuery(this).find('div.subContent').width()/2+"px"});
					$(this).find('div.subContent').stop(true,true).fadeIn();
				}
            },
			function(){
                $(this).find('div.subContent').stop(true,true).fadeOut();
            });
    }
};

//tab切换
function tabFun(tab,content,current){
	var conNum = 0;
	$(tab).click(function(){
		$(this).addClass(current).siblings().removeClass(current);
		conNum =$(this).index();
		$(content).eq(conNum).show().siblings().hide();	
	});	
}
 
 
//方法调用
$(function(){
	//ie下a标签消除虚线
	$("a").click(function(){
		$(this).blur();					  
	});
	
	//侧栏去最后元素下边框
	$(".sidebarBoxContent .borderBot:last-child").removeClass("borderBot");
	/*头部购物车删除商品后的显示控制*/
	$(".head_cart .cart_good .delete").click(function(){
		$(".head_cart").addClass("de");
		$('.head_cart').hover(function() {
        $(this).removeClass("de");
		})	
	})
	//导航二级菜
	 mainNavHover.showSubContent();
	 
	//首页banner切换
	(function(){
		var curr = 0;
		var num = $(".indexBanner>a").length;
		$("#jsNav .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$(".indexBanner>a").eq(i).fadeIn("slow").siblings("a").hide();
				$(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
				return false;
			});
		});
		//自动翻
		var timer = setInterval(function(){
			todo = (curr + 1) % num;
			$("#jsNav .trigger").eq(todo).click();
		},6000);
				
		//鼠标悬停在触发器上时停止自动翻
		$("#jsNav a").hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % num;
					$("#jsNav .trigger").eq(todo).click();
				},6000);			
			}
		);
	})();
	
	//商品详细页商品介绍、商品评论、商品咨询、售后服务tab切换
	tabFun(".informationTitle li",".informationCon>div","current");
	//秒杀列表所有活动、正在进行、即将开场、往期活动
	tabFun(".groupButtonBox a",".seckillMainContent>div","groupCurrentBtn");
	//我的订单tab切换
	tabFun(".myOrdersTab li",".myOrdersCon>div","current");
	tabFun("#reg_tab h3","#reg_con>ul","current");
	
	//调用星级评价
	//$(".rateBox").rate();

	//返回顶部
	var $top,$left,$window;
	$top = $("#return-top");
	$window = $(window);
	$left = ($window.width()-980)/2+980;
	$top.css('left',$left);
	$window.scroll(function(){
		var st = $(this).scrollTop();
		if(st>500){
			$top.fadeIn();
		}else{
			$top.fadeOut();
		}
	});
})

//rate快速评价
; (function($) {
    $.fn.rate = function() {
        var obj = $(this);
        //starRate
        var rateFlag = true;
        obj.find("img").click( function() {
				rateFlag = false;
                var $oldSrc = $(this).attr("src");
                var $newSrc = $oldSrc.replace("starE", "starF");
                var $oldSrc = $oldSrc.replace("starF", "starE");
                $(this).attr("src", $newSrc).prevAll("img").attr("src", $newSrc).end().nextAll("img").attr("src", $oldSrc);
                obj.attr("rate",$(this).parent().find("img").index(this) + 1);
            })
        obj.find("img").mouseover(function() {
                if (rateFlag) {
                    var $oldSrc = $(this).attr("src");
                    var $newSrc = $oldSrc.replace("starE", "starF");
                    $(this).attr("src", $newSrc).prevAll("img").attr("src", $newSrc);
                }
            });
       	obj.find("img").mouseleave(function() {
                if (rateFlag) {
                    var $oldSrc = $(this).attr("src");
                    var $newSrc = $oldSrc.replace("starF", "starE");
                    $(this).attr("src", $newSrc).prevAll("img").attr("src", $newSrc);
                }
            });
    };
})(jQuery);

//列表页侧边栏二级导航菜单
$(function(){
$(".sider_item").hover(function(){
	if($(this).has("ul").length ){
			$(this).addClass("hover");
		}
	},function(){
		$(this).removeClass("hover");
	})
});

function checkPass(pass){
	if(pass.length < 6){  
		return 0;  
	}
	var ls = 0;
	if(pass.match(/^[a-zA-Z]+([0-9]|[._])+[a-zA-Z]*$/)){  
		ls++;    
	}
	if(pass.match(/^[0-9]+([a-zA-Z]|[._])+[0-9]*$/)){  
		ls++;    
	}  
    return ls;
}   