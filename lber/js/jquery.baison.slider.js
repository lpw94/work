;(function($){
	$.fn.baisonSlider = function(o){
		var o = $.extend(
			{
			animation:'slide', //轮显方式，两种：'slide（左右滑动）'和'fade（淡入淡出）'；
			uniform:false,//左右滑动方式，ture为匀速，false为渐变
			s_interval:20,//滑动方式为"渐变"时，每次运动的时间间隔（考虑到动画效果，取值为1-100为宜）
			prev:null, //上一张按钮
			next:null,//下一张按钮
			box:'ul',//滚动元素
			nav:null,//轮播导航，null为自动生成。
			speed:800,//速度
			level:true,//是否水平滚动
			auto:true,//是否自动轮显
			interval:6000//定时器时间间隔，
			},
			o||{}
		);	
		return this.each(function(){
			var c,cUl,list,cOl,btn_prev,btn_next,style,margin,ID,n=0,nli ='',index,len;
			c = $(this);
			cUl = $(o.box,c);
			btn_prev = $(o.prev,c);
			btn_next = $(o.next,c)
			ID = new Date().getTime()+Math.random(1,99)
			cUl.attr('id',ID);
			list = cUl.children();
			list.css('float','left');
			style = o.level ? list.outerWidth():list.outerHeight();
			margin = o.level ? 'marginLeft':'marginTop';
			len = list.size();
			//轮播导航
			if(o.nav == null){
				for(var i=1;i<=len;i++){
					nli+="<li>"+i+"</li>"
				}
				cOl = document.createElement('ol');
				cOl.className = 'scroll_nav';
				cOl.innerHTML = nli;
				nli = $("li",cOl)
				$(cOl).appendTo(c).find('li:first').addClass("current");
			}else{
				cOl = $(o.nav,c);
				nli = $("li",cOl)
			}
			
			if(o.animation == 'slide'){
				c.css('position','relative');
				cUl.css(o.level ? {
					'width':style*len*2,
					'overflow':'hidden',
					'marginLeft':0
				}:{
					'height':style*len*2,
					'overflow':'hidden',
					'marginTop':0
				}).append(list.clone(true));
				var xpos = parseInt(cUl.css(o.level ? 'marginLeft':'marginTop'));
				nli.hover(
					function(){
						if(o.auto){
							clearInterval(c[0].Interval);
						};
						navFun1($(this));
							
					},
					function(){
						if(o.auto){
							c[0].Interval =  setInterval(nextFun,o.interval);
						}
					}
				);
			}else{
				list.css({
					'width':'100%',
					'margin-right':'-100%'
				}).not(":first").hide();
				nli.hover(
					function(){
						if(o.auto){
							clearInterval(c[0].Interval);
						};
						navFun2($(this));
							
					},
					function(){
						if(o.auto){
							c[0].Interval =  setInterval(nextFun,o.interval);
						}
					}
				);
			}
			function navFun1(obj){//滑动
				index = obj.index();
				obj.addClass('current').siblings().removeClass('current');
				var nxpos1= -index*style-len*style;
				var nxpos2 = -index*style;
				if(n>=len){
					if(!o.uniform){
						moveElement(ID,nxpos1,o.s_interval,o.level);
					}else{
						cUl.stop().animate(o.level ? {marginLeft:nxpos1}:{marginTop:nxpos1},o.speed);
					};
					xpos = nxpos1;
					n = index+len;
				}else{
					if(!o.uniform){
						moveElement(ID,nxpos2,o.s_interval,o.level);
					}else{
						cUl.stop().animate(o.level ? {marginLeft:nxpos2}:{marginTop:nxpos2},o.speed);
					};
					xpos = nxpos2;
					n = index;
				};
				nxpos1 = null;
				nxpos2 = null;
			};
			function navFun2(obj){//淡入淡出
				n = index = obj.index();
				obj.addClass('current').siblings().removeClass('current');
				list.stop(false,true).fadeOut(o.speed).eq(index).fadeIn(o.speed);
			}
			btn_prev.click(function(){
				if(o.auto){
					clearInterval(c[0].Interval);
					prevFun();
					c[0].Interval =  setInterval(nextFun,o.interval);
				}else{
					prevFun();
				}
			});
			function prevFun(){
				n--;
				var f = -len*style;
				if(o.animation == 'slide'){
					if(xpos == 0){
						cUl.prepend($("list:gt("+(len-1)+")",cUl)).css(o.level ? "marginLeft":"marginTop",f+"px");
						xpos= f;
					} ;
					if(n==-1){
						n = 2*len-1;
					};
					if(!o.uniform){
						moveElement(ID,xpos += style,o.s_interval,o.level);
					}else{
						cUl.stop().animate(o.level ? {marginLeft:xpos += style}:{marginTop:xpos += style},o.speed);
					};
				}else{
					list.eq(n+1).stop(false,true).fadeOut(o.speed);
					if(n==-1){
						n=len-1;
					};
					list.eq(n).stop(false,true).fadeIn(o.speed);
				}
				nli.eq(n%len).addClass('current').siblings().removeClass("current");
				f = null;
			};
			
			btn_next.bind('click',function(){
				if(o.auto){
					clearInterval(c[0].Interval);
					nextFun();
					c[0].Interval = setInterval(nextFun,o.interval);
				}else{
					nextFun();
				}
			});
			function nextFun(){
				n++;
				var g = -(len-1)*style;
				var h = 2*len;
				if(o.animation == 'slide'){
					if(xpos == -(h-1)*style){
						cUl.append($("list:lt("+len+")",cUl)).css(o.level ? "marginLeft":"marginTop",g+"px");
						xpos = g;
					}
					if(!o.uniform){
						moveElement(ID,xpos -= style,o.s_interval,o.level);
					}else{
						cUl.stop().animate(o.level ? {marginLeft:xpos -= style}:{marginTop:xpos -= style},o.speed);
					};
				}else{
					list.eq(n-1).stop(false,true).fadeOut(o.speed);
					if(n==len){
						n=0;
					}
					list.eq(n).stop(false,true).fadeIn(o.speed);
				}
				if(n==h){
					n=0;
				}
				nli.eq(n%len).addClass('current').siblings().removeClass("current");
				g = null;
				h =null;
			}
			//定时器
			if(o.auto){
				c[0].Interval =  setInterval(nextFun,o.interval);
			}
		});
	};
})(jQuery);
function moveElement(elementID,gap,s_interval,level) {
	var elem = document.getElementById(elementID);
	if(elem == null) {return false;}
	if(elem.movement) {
		clearTimeout(elem.movement);
	}
	var xpos = parseInt(level ? elem.style.marginLeft:elem.style.marginTop);
	if(xpos == gap) return true;
	if(xpos > gap) {
		var glist = Math.ceil((xpos-gap)/10);
		xpos = xpos - glist;
	}
	if(xpos < gap) {
		var glist = Math.ceil((gap - xpos)/10);
		xpos = xpos + glist;
	}
	level ? elem.style.marginLeft= xpos + "px":elem.style.marginTop= xpos + "px"; 
	var move = "moveElement('"+elementID+"',"+gap+","+s_interval+","+level+")";
	elem.movement = setTimeout(move,s_interval);
}


$(function(){
		var option1 = {
			animation:'fade', //轮显方式，两种：'slide（左右滑动）'和'fade（淡入淡出）'；默认为'slide'
			prev:".prev", //上一张按钮，默认为null
			next:".next",//下一张按钮，默认为null
			speed:1000,//速度，默认为800
			level:true,//是否水平滚动,true为水平滚动，false为垂直滚动
			auto:true,//是否自动轮显，默认为true
			interval:5000//定时器时间间隔，默认为6000
		};
		$(".scroll_box").baisonSlider(option1);
		var option2 = {
			animation:'fade', //轮显方式，两种：'slide（左右滑动）'和'fade（淡入淡出）'；默认为'slide'
			prev:".prev", //上一张按钮，默认为null
			next:".next",//下一张按钮，默认为null
			speed:1000,//速度，默认为800
			level:true,//是否水平滚动,true为水平滚动，false为垂直滚动
			auto:true,//是否自动轮显，默认为true
			interval:5000//定时器时间间隔，默认为6000
		};
		$(".scroll_box2").baisonSlider(option2);
		var option3 = {
			animation:'fade', //轮显方式，两种：'slide（左右滑动）'和'fade（淡入淡出）'；默认为'slide'
			prev:".prev", //上一张按钮，默认为null
			next:".next",//下一张按钮，默认为null
			speed:1000,//速度，默认为800
			level:true,//是否水平滚动,true为水平滚动，false为垂直滚动
			auto:true,//是否自动轮显，默认为true
			interval:5000//定时器时间间隔，默认为6000
		};
		$(".classify_silde").baisonSlider(option3);
		$(".scroll_nav").each(function(){
			$(this).css("margin-left",-($(this).find("li").length*$(this).find("li").outerWidth(true))/2);
		});

})