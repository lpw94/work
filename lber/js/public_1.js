function count_cart(){
	jQuery.ajax({
	    type: "POST",
		cache: false,
		url: "/ishop/web/?app_act=cart/count_cart",
		dataType:'json',
		success: function(data){
			$('#count_cart').html(data.message);
		}
	});
}

$(function(){
	count_cart();
	/*底部样式*/
	$(".footer_middle ul li:last").css("border-right","none");
	
	//点击导航，背景变化
	$('.header_nav li').click(function(){
		if($(this).index() == 0){}else{ $(this).addClass("current").siblings().removeClass("current");}
	})
	
	//二级导航悬浮效果
	$(".nav_title li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	})
	
	//商品数量加，减
	/*$(".plus").click(function() {
		$obj = $(this).prev("input[type='text']");
		var num = parseInt($obj.val());
		if (isNaN(num)) {
			$obj.val(1);
		} else {
			$obj.val(num+1);
		}
	});
	
	$(".subtract").click(function() {
		$obj = $(this).next("input[type='text']");
		var num = parseInt($obj.val());
		if (num <= 1)
		{
		return false;
		}
		if (isNaN(num)) {
			$obj.val(1);
		} else {
			$obj.val(num-1);
		}
	});
	*/
	
	
	
	
	//结算中心 设置默认收货地址
	$(".orderinfo_con .td1").click(function(){
		if($(this).hasClass("receiver_selected")){
			$(this).removeClass("receiver_selected");
		}else{
			$(this).addClass("receiver_selected");
			$(this).parent().parent().parent().siblings().find(".td1").removeClass("receiver_selected");
		}
	});
	$(".orderinfo_con .spread").click(function(){
		$(".more_address").css("display","block");
		$(this).css("display","none");
		$(".shrink").css("display","block");
	});
	
	$(".orderinfo_con>table").hover(
		function(){
			if(!$(this).hasClass("confirm_info")){
			$(this).find(".default_address,.colorBlue").show();
			$(this).addClass("pink_bg");
			}
		},
		function(){
			$(this).find(".default_address,.colorBlue").hide();
			$(this).removeClass("pink_bg");
		}
		)
	
	$(".orderinfo_con .shrink").click(function(){
		$(".more_address").css("display","none");
		$(this).css("display","none");
		$(".spread").css("display","block");
	});
	
	//支付方式
	$(".orderinfo_con .method").click(function(){
		if($(this).hasClass("method_selected")){
			$(this).removeClass("method_selected");
		}else{
			$(this).addClass("method_selected");
			$(this).siblings().removeClass("method_selected");
		}
	});
	//优惠券勾选效果
    $(".discount_ways .coupon").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).attr("class", "selected");
			$(".coupons_box").show();
        } else {
            $(this).attr("class", "unselected");
			$(".coupons_box").hide();
        }
        refresh_order();
        return false;
    })
	$(".coupons_box a").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).attr("class", "selected").parent().parent().siblings().find("a").attr("class", "unselected");
        } else {
            $(this).attr("class", "unselected");
        }
        refresh_order();
        return false;
    })
	//积分勾选效果
    $(".discount_ways .credit").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).attr("class", "selected");
			$(".credit1").hide();
			$(".credit2").show();
        } else {
            $(this).attr("class", "unselected");
			$(".credit2").hide();
			$(".credit1").show();
        }
        refresh_order();
        return false;
    })
	//输入框默认文字
	//$(".credit_txt").setDefauleValue("#f0667a","#f0667a");
	//$(".address_edit input").setDefauleValue("#333333","#333333");
	//$(".box_con .txt").setDefauleValue("#d4d4d4","#000");
	//$(".order_search_txt").setDefauleValue("#4d4d4d","#000");
	
	$(".editAddress .close").live('click',function(){
		$(this).parent().parent().hide();
		$(".greyborder1").hide();
		$(".greybg1").hide();
	});
	
	
	//地址选择弹出框
	$(".address_edit .district_style").live('click',function(){
		var thisinput=$(this);
		var bomb_con=thisinput.next();
		bomb_con.show();
		bomb_con.hover(
				function(){$(this).show();},
				function(){$(this).fadeOut("fast");}
				)
	});
	$(".address_edit dd,.box_con dd").live('click',function(){
		var con = $(this).parent().parent();
		con.hide();
		con.prev().attr('alt',$(this).attr('id'));
		con.prev().val($(this).text());
		if(con.hasClass("province_con")){
			con.parent().find(".city_input,.area_input").val("请选择：")
		}
		if(con.hasClass("city_con")){
			con.parent().find(".area_input").val("请选择：")
		}
	});
	  
	
	//价格勾选效果
    $(".value_list em,.box_con em").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).attr("class", "selected");
			
        } else {
            $(this).attr("class", "unselected");
        }
        return false;
    })

	//更多价格
	$(".option .more").click(function() {
        $(".value_list .value_hidden").show();
		$(this).hide();
		$(".option .less").show();
		$("#value_list").addClass("value_border");
    })
	$(".option .less,.cate_btns .cancel_btn").click(function() {
        $(".value_list .value_hidden").hide();
		$(".option .less").hide();
		$(".value_list em").css("display","none");
		$(".option .more").show();
		$(".option .multiple").show();
		$(".cate_btns").hide();
		$("#value_list").removeClass("value_border");
    })
	$(".option .multiple").click(function() {
        $(".value_list .value_hidden").show();
		$(this).hide();
		$(".option .more").hide();
		$(".value_list em").show();
		$(".value_list em").addClass("unselected");
		$(".cate_btns").show();
		$(".option .less").show();
		$("#value_list").addClass("value_border");
    })
	
	//更多选项
	$(".nav_category #selectMoreBox").click(function() {
		$(this).hide();
		$(".nav_category #selectLessBox").show();
	})
	$(".nav_category #selectLessBox").click(function() {
		$(this).hide();
		$(".nav_category #selectMoreBox").show();
	})

	//用户中心-个人信息
	//性别勾选
	$(".my_fuanna_right_con .myinfo_table em").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).attr("class", "selected").siblings().removeClass("selected").addClass("unselected");
        } else {
        }
        return false;
    })
	$(".myinfo_table .select_style").click(function(){
		var thisinput=$(this);
		var bomb_con=thisinput.next().next();
		var offset=thisinput.offset();
		bomb_con.css("top",offset.top+20);
		bomb_con.css("left",offset.left);
		bomb_con.show();
		bomb_con.hover(
				function(){$(this).show();},
				function(){$(this).fadeOut("fast");}
				)
	});
	$(".myinfo_table dd").live('click',function(){
		var con = $(this).parent().parent();
		$(this).addClass("selected").siblings().removeClass("selected");
		con.hide();
		con.prev().prev().val($(this).parent().find("dd.selected").text());
		if(con.hasClass("province_con")){
			con.parent().find(".city_input,.area_input").val("")
		}
		if(con.hasClass("city_con")){
			con.parent().find(".area_input").val("")
		}
		if(con.hasClass("year_con")){
			con.parent().find(".month_input,.day_input").val("");
		}
		if(con.hasClass("month_con")){
			con.parent().find(".day_input").val("");
		}
    });
	$('.myinfo_table input[name=day]').live('click',function(){
        var year = $("#year>.selected").html();
        if (year == undefined ) year = $('input[name=year]').val();
        var month = $("#month>.selected").html();
        if (month == undefined ) month = $('input[name=month]').val();
        //通过年月获取日
        var day = getDay(year, month);
        var html = '';
        for (var i=1; i<=day; i++ ){
            if (i<10) i = '0' + i.toString();
            html += " <dd>" + i + "</dd>";
        }
        $("#day").html(html);
    });
	$(".box_con form .select_style").click(function(){
		var thisinput=$(this);
		var bomb_con=thisinput.next();
		var offset=thisinput.offset();
		bomb_con.css("top",offset.top+30);
		bomb_con.css("left",offset.left);
		bomb_con.show();
		bomb_con.hover(
				function(){$(this).show();},
				function(){$(this).fadeOut("fast");
				}
				)
	});

	//设为默认地址行
	$(".address_table tbody tr").hover(
		function(){
			$(this).children('td').eq(6).find(".set_default").css("display","inline-block").parent().parent().addClass("pink_bg");
		},
		function(){
		$(this).children('td').eq(6).find(".set_default").css("display","none");
		$(this).removeClass("pink_bg");
			}
		)
			
	//用户中心--我的订单
	//按下单日期排序
	$(".orderinfo_table #sort_by_time").click(function(){
		if ($(this).hasClass("down")) {
            $(this).addClass("up").removeClass("down");
		}else{
			$(this).addClass("down").removeClass("up");
		}
	});
	//订单状态下拉框
	$(".orderinfo_table #order_state,.orderinfo_table #apply_date,.orderinfo_table #order_date").click(function(){
		var states = $(this).parent().next();
		if ($(this).hasClass("down")) {
            $(this).attr("class", "up");
			$(this).parent().addClass("states_show");
			var offset=$(this).parent().offset();
			states.css("top",offset.top+23);
			states.css("left",offset.left);
			states.css("display","block");
		}else{
			$(this).attr("class", "down");
			$(this).parent().removeClass("states_show");
			states.css("display","none");
		}
	});
	
	$(".orderinfo_table #back_reason").click(function(){
		var states = $(this).parent().next();
		if ($(this).hasClass("down")) {
            $(this).attr("class", "up");
			$(this).parent().addClass("statesback_show");
			var offset=$(this).parent().offset();
			states.css("top",offset.top+23);
			states.css("left",offset.left);
			states.css("display","block");
		}else{
			$(this).attr("class", "down");
			$(this).parent().removeClass("statesback_show");
			states.css("display","none");
		}
	});
	//下拉框中的状态鼠标经过显示粉红背景
	$(".orderinfo_table .order_states dd").hover(
		function(){
			$(this).addClass("pink_bg");
		},
		function(){
			$(this).removeClass("pink_bg");
		}
	)
	$(".orderinfo_table .order_states dd").click(function(){
		$(this).parent().css("display","none");
		$("#order_state").addClass("down").removeClass("up");
		$("#back_reason").addClass("down").removeClass("up");
		$("#apply_date").addClass("down").removeClass("up");
		$("#order_date").addClass("down").removeClass("up");
		$(this).parent().prev().removeClass("states_show");
		$(this).parent().prev().removeClass("statesback_show");
	});
	
	//查看积分记录下拉框
	//地址选择弹出框
	$(".check_input").live('click',function(){
		var thisinput=$(this);
		var bomb_con=thisinput.next();
		var offset=thisinput.offset();
		bomb_con.css("top",offset.top+25);
		bomb_con.css("left",offset.left);
		bomb_con.show();
		bomb_con.hover(
				function(){$(this).show();},
				function(){$(this).fadeOut("fast");}
				)
	});
	$(".check_con dd").live('click',function(){
		var con = $(this).parent().parent();
		$(this).addClass("selected").siblings().removeClass("selected");
		con.hide();
		con.prev().val($(this).parent().find("dd.selected").text());
	});
	//用户中心-账户安全
	$(".confirm_box .modify_btn").click(
		function(){
			$(this).hide();
			$(this).next().show();
			$(this).next().next().show();
	});
	$(".confirm_box .shrink1").click(
		function(){
			$(this).hide();
			$(this).prev().show();
			$(this).next().hide();
	});

	/*$(".safetyCheck_box .pwd_set").click(function(){
		$(this).parent().parent().find(".default_info").hide();
		$(this).parent().parent().find(".seted_value").show();
		$(this).parent().parent().addClass("yes_bg");
		$(this).parent().hide();
		$(this).parent().prev().hide();
		$(this).parent().prev().prev().show();
	});*/
	
	//邮件发送成功弹框
	$(".confirm_box #send_email").live('click',function(){
		var send_email = $(this);
		$(".send_success").show();
		$(".greyborder3").show();
		$(".greybg1").show();
		
		$(".send_success .pop_check,.send_success .close").live('click',function(){
			$(this).parent().parent().hide();
			$(".greyborder3").hide();
			$(".greybg1").hide();
			send_email.parent().parent().find(".default_info").hide();
			send_email.parent().parent().find(".seted_value").show();
			send_email.parent().parent().addClass("yes_bg");
			send_email.parent().hide();
			send_email.parent().prev().hide();
			send_email.parent().prev().prev().show();
		});
		
	});
	//用户中心-我的评价
	//鼠标移动至图片上显示删除
	$(".show_pic1").mouseenter(function(){
    $(this).find(".deldel_photo").parent().show();
	})

	$(".show_pic1").mouseleave(function(){
		$(this).find(".deldel_photo").parent().hide();
	})
	
	
	//用户中心-我的优惠券排序方式选择
	$(".box_tit #deadline_sort,.box_tit #account_sort,.box_tit #discount_sort").click(function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current");
		}else{
			$(this).addClass("current");
			$(this).parent().siblings().find("a").removeClass("current");
		}
	});
	
	$('.nav_service').prev('a').hover(function(){
		$('.nav_service').show();
	},function(){
		//$('.nav_service').hide();
	});
	$('.nav_service').hover(function(){},
	function(){
		$(this).hide();
	});
    //分类
    $('.goods_cate dl.cate_content').on('mouseenter',function(){ 
        $(this).find(".cate_item").show();
        $(this).find(".cate_top").addClass("current").siblings().removeClass("current");
    }).on('mouseleave',function(){
        $(this).find(".cate_item").hide();
        $(this).find(".cate_top").removeClass("current");
    });

    //价格区间
	$(".price_search .txt").click(function(event){
		$(this).parent().find(".price_btn").show();
	});
	$(".price_search").click(function(event){
		var e=window.event || event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	});
	document.onclick = function(){
		$(".price_btn").hide();
	};
	//搜索结果页小图看大图
	$('.search_goods_box .scroll-list img').click(function(){
    	if($(this).attr('source')!='')
		$(this).parents(".search_goods_box").find('.currentImg').attr('src', $(this).attr('source'));
    	if($(this).attr('original')!='')
        $(this).parents(".search_goods_box").find('.currentImg').parent().attr('href', $(this).attr('original'));
		$(this).parent().parent().addClass('current');
		$(this).parent().parent().siblings().removeClass('current');
		return false;
    }); 
	$(".scroll-list").each(function(){
		var $liLength = $(this).find("li").length;
		if( $liLength < 6){
			$(this).prev().hide();
			$(this).next().hide();
		}
	})
	
	//输入框默认文字
	$(".price_search .txt").setDefauleValue("#999","#000");
	//$(".search_form .txt").setDefauleValue("#999","#333");
	//$(".form_item .txt").setDefauleValue("#999","#000");
	
	
	//tab选项卡
    tabFun(".login_tab a",".login_info>form","current");
    tabFun2(".index_tab1 li",".house_list>li","current");
    tabFun2(".home_tab span",".home_content>div","current");
    tabFun3(".index_tab2 li","current");
	tabFun(".recommend_tit a",".recommend_con>div","current");
	tabFun(".orderlist_title>li",".orderlist_con>div","current");
	tabFun(".userlist_title>li",".customer_info>div","current");
	
	tabFun(".recommend_scroll_box li",".rush_list>div","current");
	//tabFun(".no_indent_head li",".no_indent_article>div","current");
	tabFun(".conpon_head li",".conpon_article>div","current");
	//tabFun(".pruch_head li",".pruch_title>div","current");
	//模拟单选框，复选框
	radio_checkbox($('.check input:checkbox'));
	radio_checkbox($('.radio input:radio'));


    //勾选效果
    $("a[name=agreement]").click(function() {
        if ($(this).hasClass("uncheck_agreement")) {
            $(this).attr("class", "check_agreement");
        } else {
            $(this).attr("class", "uncheck_agreement");
        }
        return false;
    })
	//头部导航居中
	$(".header_nav li").hover(function(){
		if($(this).has(".nav_sub").length){
			$(this).addClass("hover");
			$(this).find(".nav_sub").css("left",(1200-$(this).find(".nav_sub").outerWidth(true))/2);
		}
	},function(){
		if($(this).has(".nav_sub").length){
			$(this).removeClass("hover");
		}
	});
	$(".header_nav li").eq(-2).hover(function(){
		if($(this).has(".nav_sub").length){
			$(this).addClass("hover");
			$(this).find(".nav_sub").css({"right":"0px","left":"auto"});
		}
	},function(){
		if($(this).has(".nav_sub").length){
			$(this).removeClass("hover");
		}
	});	
	$(".header_nav li").eq(-1).hover(function(){
		if($(this).has(".nav_sub").length){
			$(this).addClass("hover");
			$(this).find(".nav_sub").css({"right":"0px","left":"auto"});
		}
	},function(){
		if($(this).has(".nav_sub").length){
			$(this).removeClass("hover");
		}
	});	
	//间隔线高度
	$("li>a",".header_nav").hover(function(){
		$(this).next().find(".last_nav_sub").height($(this).next().height());
	});
	//底部导航居中显示 高度自适应
	//$(".last_guide").height($(".last_guide").parent().height()-100);
	//var guide_num = $(".guide_list dl").length;
	//var guide_w = $(".guide_list dl").outerWidth(true);
	//$(".guide_list").width(guide_num*guide_w);
	//首页logo切换
	$(".brand_list li").hover(function(){
		$(this).find("img").eq(1).fadeOut();
	},function(){
		$(this).find("img").eq(1).fadeIn();
	});
	//首页移上去图片放大
		$(".hot_list,.hotList").find("li").hover(function(){
			 good_w = $(this).width();
			 good_h = $(this).height();
			$(this).find("img").stop(true,true).animate({width:good_w*1.1,height:good_h*1.1,left:-good_w*0.05,top:-good_h*0.05});
		},function(){
			$(this).find("img").stop(true,true).animate({width:good_w,height:good_h,left:0,top:0})		
	})
	//首页切换
	$(".default_tit").mouseenter(function(){
		$(this).parents(".column").find(".hot_list").show();
		$(this).parents(".column").find(".index_tab li").removeClass("current");
		$(this).parents(".column").find(".column_con ul").hide();
    });
	$(".index_tab li").mouseenter(function(){
        $(this).parents(".column").find(".hot_list").hide();
    });
	//返回顶部
	if($(document).scrollTop() != 0){ $(".back_top").css('display','block');}
	$(window).scroll(function (){
		var st=$(document).scrollTop();
		(st > 0)?$(".suspend,.suspend_bg").css('display','block'):$(".suspend,.suspend_bg").hide();
		(st > 500)?$("a.back_top").css('display','block'):$("a.back_top").hide();
		(st > 500)?$(".nav_side_md").css('display','block'):$(".nav_side_md").hide();
	});
	$(".back_top").click(function(){
		$('html,body').animate({scrollTop:'0px'},200);
		return false;
	});
	//加入收藏，计入购物车成功弹框
	$("#btnAddCar").click(function(){
		$(".popup_add_cart").show();
	});
	
	$(".success_popup .close").click(function(){
		$(this).parent().hide();
	});
	
	//立即购买 登录弹框
	$("#buy_now").click(function(){
		$(".log_on").show();
		$(".greyborder").show();
		$(".greybg").show();
	});
	$(".log_on .close").click(function(){
		$(this).parent().parent().hide();
		$(".greyborder").hide();
		$(".greybg").hide();
	});
	
	//商品数量加，减
	/*$(".plus").click(function() {
		$obj = $(this).prev("input[type='text']");
		var num = parseInt($obj.val());
		if (isNaN(num)) {
			$obj.val(1);
		} else {
			$obj.val(num+1);
		}
	});
	$(".subtract").click(function() {
		$obj = $(this).next("input[type='text']");
		var num = parseInt($obj.val());
		if (num <= 1)
		{
		return false;
		}
		if (isNaN(num)) {
			$obj.val(1);
		} else {
			$obj.val(num-1);
		}
	});*/
});

function BindEnter(obj){
	if( obj.keyCode == 13 ){
		if( $('#search_1').size()>0 && $('#search_1').is(':focus') ){
			$('#search_1').next().click();
			obj.returnValue = false;
		}
		if( $('#login_tel').size()>0 && $('#login_password').size()>0 && $('.login_info form').eq(0).is(':visible') ){
			$('#login_button').click();
		}
		if( $('#mobile').size()>0 && $('#dyzm').size()>0 && $('.login_info form').eq(1).is(':visible') ){
			$('#res_login_button').click();
		}
		if( $('#phone').size()>0 && $('#yzm').size()>0 && $('#pwd').size()>0 && $('#again_pwd').size()>0 ){
			$('#login_button').click();
		}
		if( $('.order_search_btn').size()>0 && $('.order_search_txt').size()>0 && $('.order_search_txt').is(':focus') ){
			$('.order_search_btn').click();
		}
		if( $('[name=search_key]').size()>0 && $('[name=search_key]').is(':focus') && $('#cart_search_input').size()>0 ){
			$('#cart_search_input').click();
		}
	}
}

function tabFun(tab,content,current){
    var conNum = 0;
    $(tab).click(function(){
        $(this).addClass(current).siblings().removeClass(current);
        conNum =$(this).index();
        $(content).eq(conNum).show().siblings().hide();
        return false;
    });
}

function tabFun2(tab,content,current){
    var conNum = 0;
    $(tab).mouseenter(function(){
        $(this).addClass(current).siblings().removeClass(current);
        conNum =$(this).index();
        $(content).eq(conNum).show().siblings().hide();
        return false;
    });
}

function tabFun3(tab,current){
    var conNum = 0;
    $(tab).mouseenter(function(){
        $(this).addClass(current).siblings().removeClass(current);
        conNum =$(this).index();
        $(this).parents(".column").find(".column_con ul").eq(conNum).show().siblings().hide();
        return false;
    });
}


//倒计时


//文本框输入
jQuery.fn.setDefauleValue = function(color1,color2) {
	return this.each(function() {
	   $(this).val(this.defaultValue).css("color",color1);
	   $(this).focus(function() {
			if ($(this).val() == this.defaultValue) {
				$(this).val("").css("color",color2);;
			}
		}).blur(function() {
			if ($(this).val() == "") {
				$(this).val(this.defaultValue).css("color",color1);
			}
		});
	});
}

//模拟单选框、复选框
function radio_checkbox(obj){
	obj.each(function(){
		if(this.checked){
			$(this).parent().addClass(this.type+'_check');
		}	
	});
	obj.live('click',function(){
		var cur_span = $(this).parent();
		var type = this.type;
		if(this.checked){
			cur_span.addClass(type+'_check');
			if(type=='radio'){
				cur_span.parents('.'+type+'_box').find('span').not(cur_span).removeClass(type+'_check');	
			}
		}else{
			cur_span.removeClass(type+'_check');
		}
	});
}
function AddFavorite(title, url) {
	 try {
	   window.external.addFavorite(url, title);
	 }
	catch (e) {
	   try {
	    window.sidebar.addPanel(title, url, "");
	  }
	   catch (e) {
	     alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请进入新网站后使用Ctrl+D进行添加");
	   }
	 }
}


//下拉
$(function(){
	function select_simulated(select_style,bomb_con_style){
		$(document).click(function(){
			$(bomb_con_style).hide();
			})
		$(select_style).live('click',function(e){
			var thisinput=$(this);
			var local=$(this).position();
			var bomb_con=$(bomb_con_style);
				$(this).parents("li").siblings().find(bomb_con_style).hide();
				$(this).parent().find(bomb_con_style).width($(this).width());//下拉框的宽度
				$(this).parent().find(bomb_con_style).show();
				e?e.stopPropagation():event.cancelBubble = true;
				bomb_con.find("dd").click(function(e){
				var bomb_text=$(this).text();
				$(this).addClass("selected").siblings().removeClass("selected");
				$(this).parents(bomb_con_style).hide();
				$(this).parents("li").find(select_style).val(bomb_text);
				e?e.stopPropagation():event.cancelBubble = true;
				
		});	
		});
		 return false;
	}
	select_simulated(".provin_select",".provin_con");
	
	  
	$(".local").focus(function(){
		$(this).addClass("local3");
	});
	$(".local").blur(function(){
		$(this).removeClass("local3");
	});
	})

//下拉2
$(function(){
	function select_simulated(select_style,bomb_con_style){
		$(select_style).live('click',function(){
			var thisinput=$(this);
			var local=$(this).position();
			var bomb_con=$(bomb_con_style);
				$(this).parent().find(bomb_con_style).width($(this).width());//下拉框的宽度
				$(this).parent().find(bomb_con_style).show();
				
				bomb_con.find("dd").click(function(){
				var bomb_text=$(this).text()
				$(this).addClass("selected").siblings().removeClass("selected");
				$(this).parents(bomb_con_style).hide();
				$(this).parents(".return_request").find(select_style).val(bomb_text)
				
		});	
		});
		 return false;
	}
	select_simulated(".provin_select",".provin_con");
	
	  
	$(".local").focus(function(){
		$(this).addClass("local3");
	});
	$(".local").blur(function(){
		$(this).removeClass("local3");
	});
	})
