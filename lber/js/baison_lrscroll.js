;(function($){
	$.fn.scrollList = function(o){
		var o = $.extend(
			{
			prev:null,
			next:null,
			list:null,
			visible:4,
			scroll:4,
			vertical:false,
			speed:800
			},
			o||{}
		);	
		return this.each(function(){
			var animCss,sizeCss,c,list,box,item,prev,next,size,v,style,scroll=0,scrolled=0;
			animCss = o.vertical ? "top": "left";
			sizeCss = o.vertical ? "height": "width";
			c = $(this);
			prev = $(o.prev,c);
			next = $(o.next,c);
			list = $(o.list,c);
			box = list.children();
			item = box.children(":visible");
			size = item.size();
			v = o.visible;
			style = o.vertical ? item.outerHeight(true):item.outerWidth(true);
			list.css(sizeCss,v*style);
			box.css(sizeCss,size*style);
			scroll = size*style-v*style;
			prev.unbind();
			next.unbind();
			if(scroll>0){
				next.addClass("next-disabled");
				prev.bind("click",prevFun);
				next.bind("click",nextFun);
			}else{
				prev.addClass("prev-disabled");
				next.addClass("next-disabled");
				return;
			}
			function prevFun(){
				if(scrolled  < scroll){
					box.stop(false,true).animate(animCss == 'left' ? {'left':"-="+(o.scroll*style)}:{'top':"-="+(o.scroll*style)},o.speed);
					next.removeClass('next-disabled');
					scrolled += o.scroll*style;
					if(scrolled >= scroll){
						$(this).addClass('prev-disabled');
					}
				}
			}
			function nextFun(){
				if(scrolled > 0){
					box.stop(false,true).animate(animCss == 'left' ? {'left':"+="+(o.scroll*style)}:{'top':"+="+(o.scroll*style)},o.speed);
					prev.removeClass('prev-disabled');
					scrolled -= o.scroll*style;
					if(scrolled <= 0){
						next.addClass('next-disabled');
					}
				}
			}
		});
		
	}
})(jQuery);

$(function(){
	var option = {
		prev:'.btnPrevious',//向前滚动按钮
		next:'.btnNext',//向后滚动按钮
		list:'.recommend_scroll_box',
		visible:7,//设置图片显示的张数，默认为4
		scroll:1,//设置每次图片滚动的次数，默认为4
		vertical:false,//设置滚动的方向，默认为水平（false）
		speed:600//设置图片滚动的速度，默认为600
	};
	$(".recommend_list").scrollList(option);
	var groupw = $(".recommend_scroll_box").find("li").outerWidth(true);
	$(".recommend_scroll_box").width(7*groupw);
	$(".recommend_list").not(":first").hide();


})