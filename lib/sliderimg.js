$(function(){
	
	/*
		步骤：一定要掌握的版本
			1.把所有的图片放在右侧，第一个图片放到可视区
			2.开定时器：每次轮播一个图
			3.焦点跟随
			4.点击上下按钮可以切图
			5.点击焦点可以跳转
	
	 */
	
	//1.把所有的图片放在右侧，第一个图片放到可视区
	//获取图片宽度
	var iW=$('.view li').eq(0).outerWidth();//JS offsetwidth
	
	$('.wbox').css({
		'display':'none'
	});
	$('.view li').css('left',iW);
	$('.view li').eq(0).css('left',0);
	
	
	//2.开定时器：每次轮播一个图
	var timer=null;
	clearInterval(timer);
	var now=0;
	
	timer=setInterval(next,3000);//每隔2秒钟切换一个图
	
	function next(){
		//旧的挪走
		$('.wbox').css({
			'display':'block',
			'opacity':1
		});
		$('.view li').eq(now).css({'left':-iW});
		now=++now>=$('.view li').size()?0:now;
		//新的快速放在右侧，再挪进可视区
		$('.view li').eq(now).css('left',iW);
		$('.view li').eq(now).css({'left':0});
		$('.wbox').animate({'opacity':0},400,function(){
			$('.wbox').css({
			'display':'none',
			});
		});
		light();
	}
	
	//3.焦点跟随
	function light(){
		$('.light span').removeClass('active');
		$('.light span').eq(now).addClass('active');
	}
	

	
	//鼠标经过停止，鼠标离开继续运动
	$('#slideimg').hover(function(){
		clearInterval(timer);
	},function(){
		clearInterval(timer);
		timer=setInterval(next,3000);
	});
	
	
	
	//5.点击焦点可以跳转
	
	$('.light span').hover(function(){
		//旧 ：now
		//新：index() 新的
		var index=$(this).index();
		if(index>now){
			$('.wbox').css({
			'display':'block',
			'opacity':1
			});
			//从右边切入
			//旧 now：挪到左边
			$('.view li').eq(now).css({'left':-iW});
			//新的
			$('.view li').eq(index).css('left',iW);
			$('.view li').eq(index).css({'left':0});
			now=index;//最新的一张变成index
			$('.wbox').animate({'opacity':0},300,function(){
				$('.wbox').css({
				'display':'none',
				});
			});
			
		}
		if(index<now){
			//从左边切入
			//旧 now：挪到左边
			$('.wbox').css({
			'display':'block',
			'opacity':1
			});
			$('.view li').eq(now).css({'left':iW});
			//新的
			$('.view li').eq(index).css('left',-iW);
			$('.view li').eq(index).css({'left':0});
			now=index;//最新的一张变成index
			$('.wbox').animate({'opacity':0},300,function(){
				$('.wbox').css({
				'display':'none',
				});
			});
			
		}
		
		light();
	});
	
});
