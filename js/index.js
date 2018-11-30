$(function(){

	//判断是否有cookie,username
	var username=Cookie.get('username');

	if (username) {
		$('.toolbar .nav .qq').remove();
		$('.toolbar .nav li').eq(2).html(`<a href="javascript:;"><span style="color:red;margin-right:5px;">您好,${username}</span><b>退出</b></a>`)
	}
	
	$('.toolbar .nav').on('click','li',function(){
		if ($(this).find('a b').text()=='退出') {
				Cookie.remove('username');
				location.href='lulu.html';
		}
	});


	$('#phone').hover(function(){
		$('#phone .qrcode').css('display','block');
	},function(){
		$('#phone .qrcode').css('display','none');
	});

	$('.show').hover(function(){
		$('.show .money').css({
			'display':'block',
			'z-index':'9999'
		});
	},function(){
		$('.show .money').css('display','none');
	});

	var index=0;
	$('#index_nav li').on('mouseover mouseout',function(ev){
		// console.log(ev);
		if (ev.type == 'mouseover') {
			$(this).find('.on').css('display','block');
		}
		else{

			$(this).find('.on').css('display','none');
		}
	});


	 
	//滚动条事件
	$(window).scroll(function(){
	//获取滚动条的滑动距离
	var scroH = $(this).scrollTop();
	//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
	if(scroH>=500){
		$(".toptop").css('display','block');
	}else if(scroH<500){
		$(".toptop").css('display','none');
		}
	});

	function update(arr){
		$('#list').html(arr.map(function(item){
				return `<li data-id="${item.id}">
							<img src="${item.url1}" alt="">
							<div>
								<a href="javascript:;" title="">${item.name}</a>
							
							</div>
							<div>
								<span>${item.msg}</span>
								<span>收藏品牌</span>
							</div>
						</li>`;
			}).join(''));
	}


	function next(){//动画时间间隔：5000-2000
		$('#flashSale .flashMove ul').animate({'left':-iw},500,function(){
			//出去的图片，剪切放到末尾
			$('#flashSale .flashMove ul li:lt(6)').insertAfter($('#flashSale .flashMove ul li:last'));
			//ul归位
			$('#flashSale .flashMove ul').css('left',0);
		});
	}
	

	function prev(){
		//先剪切最后的四个图插入到ul首位
		for(var i=0;i<4;i++){
			$('#flashSale .flashMove ul li:last').insertBefore($('#flashSale .flashMove ul li:first'));
		}
		//预留4个图位置
		$('#flashSale .flashMove ul').css('left',-iw);
		//挪到可视区
		$('#flashSale .flashMove ul').animate({'left':0},500);
	}

	var qty=12;
	var page=1;
	var num=1;
	var firstpage=1;
	var lastpage=0;
	function getcontent(listname,method){
		$.ajax({
			type:"POST",//请求方式
			url:"api/query.php",//接口路径
			async:true,//异步
			data:{//传输数据
				'qty':qty,
				'page':num,
				'method':method,
				'listname':listname
			},
			success:function(str){
				// console.log(str);
				var arr=JSON.parse(str);
				update(arr.content);
			}
		});
	}


	var iw=0;
	getcontent('table','listshow');
	$.ajax({
			type:"POST",//请求方式
			url:"api/query.php",//接口路径
			async:true,//异步
			data:{//传输数据
				'method':'alllist',
				'listname':'table'
			},
			success:function(str){
				
				var arr=JSON.parse(str);
				// console.log(arr);
				lastpage=Math.ceil(arr.num/qty);
				$('#page').html(function(){
					var html='';
					for(var i=0;i<lastpage;i++){
						html+=`<span>${i+1}</span>`;
					}
					return html;
				});

				var content=JSON.parse(arr.content);
				console.log(content);
				$('#flashSale .flashMove ul').html(content.map(function(item){
					return `<li data-id="${item.id}">
								<img src="${item.url1}">
								<p>￥ <em>${item.xianjia}</em></p>
								<p class="word">${item.name}</p>
								<div class="msg">
									fdsaf
								</div>
							</li>`;
				}).join(''));
				var ww=$('#flashSale .flashMove ul li').eq(0).outerWidth()+18;
				var width=content.length*ww;
				console.log(iw*6);
				// var iW=($('#flashSale .flashMove ul li').eq(0).outerWidth()+18)*6;
				// console.log(iw);
				iw=ww*6;
				$('#flashSale .flashMove ul').css('width',width+'px');
			}
	});

	// 限时秒杀数据渲染
	$('#flashSale .flashMove').on('click','a',function(){
		if ($(this).html() == '&lt;') {
			prev();
		}else if($(this).html() == '&gt;'){
			next();
		}
	});

	//限时秒杀数据跳转详情页
	$('#flashSale .flashMove ul').on('click','li',function(){
		var id=$(this).attr('data-id');
		console.log(id);
		location.href='html/detpage.html?'+id;
	});

	$('#list').on('click','li',function(){
		location.href='html/listpage.html';
	});
	// 点击页数
	$('#page').on('click','span',function(){
		var page=parseInt($(this).html());
		num=page;
		if (page==1) {
			$('.page_list .prev').css('background-position','-46px -123px');
		}
		else{
			$('.page_list .prev').css('background-position','0px -91px');
		}
		$(this).parent().find('span').css('color','#999');
		$(this).css({
			'color':'red'
		});
		$.ajax({
			type:"POST",//请求方式
			url:"api/query.php",//接口路径
			async:true,//异步
			data:{//传输数据
				'qty':qty,
				'page':page,
				'method':'listshow',
				'listname':'table'
			},
			success:function(str){
				var arr=JSON.parse(str);
				update(arr.content);	
			}
		});
	});

	// 上一页
	$('.page_list .prev').click(function(){
		num--;
		if (num<=firstpage) {
			num=firstpage;
			$('.page_list .prev').css('background-position','-46px -123px');
		}
		else{
			$('.page_list .next').css('background-position','-46px -91px');
			$('.page_list .prev').css('background-position','0px -91px');
		}
		
		$(this).next().find('span').css('color','#999').eq(num-1).css('color','red');
		getcontent('table','listshow')
	});

	// 下一页
	$('.page_list .next').click(function(){
		num++;
		if (num>=lastpage) {
			num=lastpage;
			$('.page_list .next').css('background-position','0 -122px');
		}else{
			$('.page_list .prev').css('background-position','0px -91px');
			$('.page_list .next').css('background-position','-46px -91px');
			
		}
		$(this).prev().find('span').css('color','#999').eq(num-1).css('color','red');
		getcontent('table','listshow')
	});
});

