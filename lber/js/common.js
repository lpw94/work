/***手机版js ***/
$(function(){
    /*自动判断设备显示大小
	var meta = document.getElementsByTagName("meta")[1];
	if( window.devicePixelRatio == 1.5){
		var num =   window.devicePixelRatio * 94.8;
		meta["content"] = "width=640, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5,target-densitydpi = "+num;
	}
	var reg = /MI\s+1S/;
	if( reg.test( navigator.userAgent ) ){
		var meta = document.getElementsByTagName("meta")[1];	
		meta["content"] = "width=640, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5,target-densitydpi =medium-dpi";
	}
	
	//头部导航
	var isShown = 0;
	var $layer=$(".mask_layer")
	$("#nav").click(function(e){
		e.stopPropagation();
		if( isShown == 0 ){
			$layer.show();
			isShown = 1;
			$('body').click(function(){
				$layer.hide();
				isShown = 0;
			}); 	
		}else{
			$layer.hide();
			isShown = 0;
		}
	});
	
	function layerheight(){
		if($(".wrapper").height() < $(document).height()-$(".main_header").height()){
				$layer.height($(document).height()-$(".main_header").height());
		}else{
				$layer.height($(".wrapper").height());
		}
	}
    //setTimeout(layerheight, 500);
	
	$(".bannerList").width(611/640*100+'%');
	//$(".bannerListPic a").width(300/611*100+'%');
	var $payli=$(".pay_select li,.applyInfo li");
	$payli.last().addClass("last");
	$payli.click(function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
	
	$(".rememberState span").click(function(){
		$(this).toggleClass("current");
	});

	//$(".wrapper").css("min-height",$(document).height()-$(".main_header").height());
*/
	//商品评论
	tabFun(".comment_tit li",".comment_box>div","current");
	//用户中心
	tabFun(".user_tab li",".user_product>ul","current");
	tabFun(".myOrderTitle a",".orderTab>.orderTabList","current");
	
	//详情页图片滚
	var $good_pic = $(".good_pic ul"); 
	var imgwidth = $good_pic.find("img").width()+20;
	var lenght = $good_pic.find('li').size();
	var gogo = document.getElementById("scroll_good");
	$good_pic.width( imgwidth * lenght);
	function scrollimg(){
		var startX, endX;
             gogo.ontouchstart = function (event) {
       		 startX = event.touches[0].pageX;
             }
 		    gogo.ontouchmove = function (event) {
             endX = event.touches[0].pageX;
			 event.preventDefault();
             }
			gogo.ontouchend = function (event) {
				if((startX - endX) > 0){//左滑动
							$good_pic.animate({'left':-imgwidth*1},function()
							{
								$good_pic.find('li:first').appendTo($good_pic);
								$good_pic.css({'left':0});
								});
				}else if((startX - endX) < 0){//右滑动
							$good_pic.find('li:last').prependTo($good_pic);
							$good_pic.css({'left':-imgwidth*1});
							$good_pic.animate({'left':0});
				}
            }
	}
	if($good_pic.width() > $(window).width()){
		scrollimg();
	}
	//加入收藏
	$(".good_collect").click(function(){
		$(this).addClass("selected");
	})
	//商品详情选择颜色尺码
	$(".good_color, .good_size").find("a").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
	//选项卡宽度
	function tabwidth(){
		var tab_num = $(".comment_tit").find("li").size();
		$(".comment_tit").find("li").width( $(window).width() / tab_num );
	}
		tabwidth();
		$(window).resize(function() {
			tabwidth();
	});
	//勾选
	$(".radio").click(function(){
		$(this).toggleClass("selected");
	})
	
	//搜索删除
	$(".search_delete").click(function(){
		$(this).siblings(".search_input").val("");
	});
	//用户中心首页勾选删除
	$(".user_product_con").find("i").click(function(){
		$(this).parents("li").remove();
	});
	//count_cart();
	//count_cart2();//数量为0时不隐藏
});
$.fn.smart_float = function() {
    var position = function(element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function() {
        position($(this));
    });
};
var ivdwindow = this.window;
var ivdjs = {
    window: ivdwindow,
    getcookie: function(name) {
        var result = null,
                myCookie = document.cookie + ";",
                searchName = name + "=",
                start = myCookie.indexOf(searchName),
                end;
        if (start > -1) {
            start += searchName.length;
            end = myCookie.indexOf(";", start);
            result = this.urldecode(myCookie.substring(start, end));
        }
        return result;
    },
    setcookie: function(name, value, expires, path, domain, secure) {
        return this.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
    },
    setrawcookie: function(name, value, expires, path, domain, secure) {
        if (typeof expires === 'string' && (/^\d+$/)
                .test(expires)) {
            expires = parseInt(expires, 10);
        }
        if (expires instanceof Date) {
            expires = expires.toGMTString();
        } else if (typeof expires === 'number') {
            expires = (new Date(expires * 1e3))
                    .toGMTString();
        }
        var r = [name + '=' + value],
                s = {},
                i = '';
        s = {
            expires: expires,
            path: path,
            domain: domain
        };
        for (i in s) {
            if (s.hasOwnProperty(i)) {
                // Exclude items on Object.prototype
                s[i] && r.push(i + '=' + s[i]);
            }
        }
        return secure && r.push('secure'), this.window.document.cookie = r.join(';'), true;
    },
    urldecode: function(str) {
        return decodeURIComponent(str.replace(/\+/g, '%20'));
    },
    array_shift: function(inputArr) {
        var props = false,
                shift = undefined,
                pr = '',
                allDigits = /^\d$/,
                int_ct = -1,
                _checkToUpIndices = function(arr, ct, key) {
                    if (arr[ct] !== undefined) {
                        var tmp = ct;
                        ct += 1;
                        if (ct === key) {
                            ct += 1;
                        }
                        ct = _checkToUpIndices(arr, ct, key);
                        arr[ct] = arr[tmp];
                        delete arr[tmp];
                    }
                    return ct;
                };
        if (inputArr.length === 0) {
            return null;
        }
        if (inputArr.length > 0) {
            return inputArr.shift();
        }
    },
    array_push: function(inputArr) {
        var i = 0,
                pr = '',
                argv = arguments,
                argc = argv.length,
                allDigits = /^\d$/,
                size = 0,
                highestIdx = 0,
                len = 0;
        if (inputArr.hasOwnProperty('length')) {
            for (i = 1; i < argc; i++) {
                inputArr[inputArr.length] = argv[i];
            }
            return inputArr.length;
        }
        // Associative (object)
        for (pr in inputArr) {
            if (inputArr.hasOwnProperty(pr)) {
                ++len;
                if (pr.search(allDigits) !== -1) {
                    size = parseInt(pr, 10);
                    highestIdx = size > highestIdx ? size : highestIdx;
                }
            }
        }
        for (i = 1; i < argc; i++) {
            inputArr[++highestIdx] = argv[i];
        }
        return len + i - 1;
    },
    array_reverse: function(array, preserve_keys) {
        var isArray = Object.prototype.toString.call(array) === '[object Array]',
                tmp_arr = preserve_keys ? {} : [],
                key;
        if (isArray && !preserve_keys) {
            return array.slice(0)
                    .reverse();
        }
        if (preserve_keys) {
            var keys = [];
            for (key in array) {
                keys.push(key);
            }
            var i = keys.length;
            while (i--) {
                key = keys[i];
                tmp_arr[key] = array[key];
            }
        } else {
            for (key in array) {
                tmp_arr.unshift(array[key]);
            }
        }
        return tmp_arr;
    },
    trim: function(str, charlist) {
        var whitespace, l = 0,
                i = 0;
        str += '';

        if (!charlist) {
            whitespace =
                    ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
        } else {
            // preg_quote custom list
            charlist += '';
            whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
        }
        l = str.length;
        for (i = 0; i < l; i++) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break;
            }
        }
        l = str.length;
        for (i = l - 1; i >= 0; i--) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    }
};
function ajax_page (page,url,div){
	if( url =="" ){
		return alert("必要参数缺少");
	}
	if( page <=0 ){
		page = 1;
	}
	url +="&params[params][page_no]="+page;
	$.post( url,{},function( data ){
		if( $("#"+div).size()<=0 ){
			return alert("缺少元素");
		}
		$("#"+div).html( data );
	} )
	
}
//tab切换
function tabFun(tab,content,current){
	var conNum = 0;
	$(tab).click(function(){
		$(this).addClass(current).siblings().removeClass(current);
		conNum =$(this).index();
		$(content).eq(conNum).show().siblings().hide();
	});
} 
function showErrors(){
	var t = this;
	for ( var i = 0; this.errorList[i]; i++ ) {
		var error = this.errorList[i];
		this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
		var elename = this.idOrName(error.element);
		/*var obj = jQuery('#check'+elename);
		if(obj.parent().parent().hasClass('right')){
			obj.parent().parent().removeClass('right') ;
		}*/
		/*obj.parent().parent().addClass('error') ;
		obj.html('');
		obj.show();*/
		var errsdiv = jQuery('span[htmlfor='+ elename + ']'); 
		if(errsdiv.length == 0){
			alert(error.message);break;
			/*errsdiv = jQuery('<span class="error_img" id="errmsg'+elename+'"></span>');
			errsdiv.attr({"for":  this.idOrName(error.element), generated: true})
			errsdiv.appendTo(jQuery('#check'+elename));*/
		}
		//errsdiv.html(error.message || "");
		//jQuery('#'+elename).parent().;
		// 错误信息div
		// 错误信息div		
	}

	// 校验成功的去掉错误提示
	/*
	for ( var i = 0; this.successList[i]; i++ ) {
		if(this.idOrName(this.successList[i])=='nickname'|| this.idOrName(this.successList[i])=='email'){
			timeout = setTimeout("showRight('"+ this.idOrName(this.successList[i]) +"')",1000); 
		}else{
			showRight(this.idOrName(this.successList[i]));
		}
	}
	*/
}
function showRight(dd){
     jQuery('#check'+dd).parent().parent().addClass('right') ;
     jQuery('#check'+dd).html('');
     jQuery('#check'+dd).show();
}
function count_cart(){
	jQuery.ajax({
	    type: "POST",
		cache: false,
		url: "/ishop/web/?app_act=cart/count_cart",
		dataType:'json',
		success: function(data){
			if(data.status==1 && data.message){
				$('#count_cart').html(data.message).show();
				if( $('#count_cart2').size()>0 ) $('#count_cart2').html(data.message);
			}else{
				$('#count_cart').hide();
			}
		}
	});
}

/*function count_cart2(){//数量为0时不隐藏
	jQuery.ajax({
	    type: "POST",
		cache: false,
		url: "/?app_act=cart/count_cart",
		dataType:'json',
		success: function(data){
			if(data.status==1){
				$('#count_cart2').html(data.message).show();
			}else{
				$('#count_cart2').hide();
			}
		}
	});
}*/

function get_redirect_url( url,params){
	//可扩展
	
	//判断是否启用url seo 
	if( typeof enable_url_seo =="undefined" || enable_url_seo !=1 ){
		var tmp_pam = '';
		for(var x in params){
			if( tmp_pam !="" ){
				tmp_pam +='&'+x+'='+params[x];
			}else{
				tmp_pam += '&'+x+'='+params[x];
			}
		}
		if( /\?app_act=/.test( url ) ){
			return site_url + url + tmp_pam ;
		}else{
			return site_url +'?app_act='+ url + tmp_pam ;
		}
	}
	var tp = '';
	for( var x in params ){
		if( tp !="" ){
			tp +='-'+params[x];
		}else{
			tp = params[x];
		}
	}
	//如果存在mobile/，替换成空
	url = url.replace('mobile/','');
	if( tp !='' ){
		if( url == 'lists/search' ){
			return site_url + 'search-'+tp+'.html';
		}
		return site_url + url + '-'+tp+'.html';
	}else{
		//是否存在客制化规则
		if( url == "lists/" ){
			url  = "all";
		}
		if( url == "order/confirm" ){
			return site_url + "shopping/confirm.html";
		}
		return site_url + url+'.html' ;
	}
}

function get_static_url( url,params,type,ignore_site,url_ext){
	//可扩展
	//判断是否启用url seo 
	if( typeof enable_url_seo =="undefined" || enable_url_seo !=1 || type == 'ignore' ){
		var tmp_pam = '';
		for(var x in params){
			if( tmp_pam !="" ){
				tmp_pam +='&'+x+'='+params[x];
			}else{
				tmp_pam += '&'+x+'='+params[x];
			}
		}
		if( /\?app_act=/.test( url ) ){
			if( ignore_site == 1 ) return url + tmp_pam;
			return site_url + url + tmp_pam ;
		}else{
			if( ignore_site == 1 ) return '/?app_act='+ url + tmp_pam ;
			return site_url +'?app_act='+ url + tmp_pam ;
		}
	}
	var tp = '';
	for( var x in params ){
		if( tp !="" ){
			tp +='-'+params[x];
		}else{
			tp = params[x];
		}
	}
	//如果存在mobile/，替换成空
	url = url.replace('mobile/','');
	
	if( tp !='' ){
		if( ignore_site == 1 ) return url +'-'+tp+'.'+url_ext;
		return site_url + url +'-'+tp+'.'+url_ext;
	}
	if( ignore_site == 1 ) return url+'.'+url_ext;
	return site_url + url+'.'+url_ext; 
}
//倒计时
function interval1(day, hour, minute, second,divid){
	if(second>0) second--;
	if(second==0){
		if(minute==0){
			if(hour==0) minute=0;second=0;
		}else{
			second=60;minute-=1;
		}
	}
	if(minute==0){
		if(hour==0){
			minute=0;hour=0;
		}else{
			minute=60;hour-=1;
		}
	}
	$("#"+divid).val(day+"天"+hour+"小时"+minute+"分"+second+"秒 开始");
	window.setTimeout(function (){interval1(day, hour, minute, second, divid)},1000);
}
function load_widget_js( widget_id,widget_tpl,param,div,callback ){
	var data = {};
	data.params = {};
    data.params.id = widget_id;
    data.params.params = {};
    data.params.params.tpl = widget_tpl;
    for( var x in param ){
    	if( x != 'widget_type' ){
    		eval("data.params.params."+x+"=param['"+x+"'];");
    	}else{
    		var tmp = param[x];
    		eval("data."+tmp+"=1;");
    	}
    }
    
	$.ajax({
       type: 'GET',
       url: site_url+'lists/load_goods',
       data: data,
       dataType: 'html',
       success: function(data) {
           //刷新左侧内容
           if (data) {
               $('#'+div).html(data);
           }
           //执行回调方法
           if( typeof callback !="undefined" ){
        	   callback();
           }
       }
   });
	
}