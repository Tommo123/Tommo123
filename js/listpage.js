$(function(){
	$(window).scroll(function(){
		//获取滚动条的滑动距离
		var scroH = $(this).scrollTop();
		//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
		if(scroH>=100){
			$(".toptop").css('display','block');
		}else if(scroH<100){
			$(".toptop").css('display','none');
		}
	});

	var username=Cookie.get('username');

	if (username) {
		$('.toolbar .nav .qq').remove();
		$('.toolbar .nav li').eq(2).html(`<a href="javascript:;"><span style="color:red;margin-right:5px;">您好,${username}</span><b>退出</b></a>`)
	}
	
	$('.toolbar .nav').on('click','li',function(){
		if ($(this).find('a b').text()=='退出') {
			var res=confirm('确定要退出吗？');
			if (res) {
				console.log(1);
				Cookie.remove('username','/src');
				location.href='listpage.html';
			}
		}
	});

	function update(arr){
		$('#list').html(arr.map(function(item){
				return `<li data-id="${item.id}">
							<img src="../${item.url1}" alt="">
							<div>
								<a href="javascript:;" title="">${item.name}</a>
								
							</div>
							<div>
								<span>￥${item.xianjia}</span>
								<span>收藏品牌</span>
								<del>￥${item.yuan}</del>
							</div>
						</li>`;
		}).join(''));
	}
	function getcontent(listname,method){
		$.ajax({
			type:"POST",//请求方式
			url:"../api/query.php",//接口路径
			async:true,//异步
			data:{//传输数据
				'qty':qty,
				'page':num,
				'method':method,
				'listname':listname
			},
			success:function(str){
				var arr=JSON.parse(str);
				update(arr.content);
			}
		});
	}

	var qty=12;
	var firstpage=1;
	var lastpage=0;
	var num=1;

	var isok=[true,false,false,false];
	getcontent('table','listshow');

	$.ajax({
		type:"POST",//请求方式
		url:"../api/query.php",//接口路径
		async:true,//异步
		data:{//传输数据
			'method':'alllist',
			'listname':'table'
		},
		success:function(str){
			// console.log(str);
			var arr=JSON.parse(str);
			lastpage=Math.ceil(arr.num/qty);
			$('#page').html(function(){
				var html='';
				for(var i=0;i<lastpage;i++){
					html+=`<span>${i+1}</span>`;
				}
				return html;
			});
			
		}
	});

	$('#sort_module').find('a:lt(4)').click(function(){
		$('#sort_module').find('a:lt(4)').removeClass('color');
		$(this).addClass('color');
		isok=[false,false,false,false];
		isok[$(this).index()]=true;
		switch($(this).index()){
			case 0:
				getcontent('table','listshow');
				break;
			case 1:
				getcontent('table','ascSort');
				break;
			case 2:
				getcontent('table','desSort');
				break;
			case 3:
				break;
			default:;	
		}
	});
	
	$('#page').on('click','span',function(){
		num=parseInt($(this).html());
		
		if (num==firstpage) {
			$('.page_list .prev').css('background-position','-46px -123px');
		}
		else{
			$('.page_list .prev').css('background-position','0px -91px');
		}
		if (num==lastpage) {
			$('.page_list .next').css('background-position','0 -122px');
		}else{
			$('.page_list .next').css('background-position','-46px -91px');
		}

		$(this).parent().find('span').css('color','#999');
		$(this).css({
			'color':'red'
		});
		if (isok[0]) {
			getcontent('table','listshow');
		}
		if (isok[1]) {
			getcontent('table','ascSort');
		}
		if (isok[2]) {
			getcontent('table','desSort');
		}
	});

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
		if (isok[0]) {
			getcontent('table','listshow');
		}
		if (isok[1]) {
			getcontent('table','ascSort');
		}
		if (isok[2]) {
			getcontent('table','desSort');
		}
	});
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
		if (isok[0]) {
			getcontent('table','listshow');
		}
		if (isok[1]) {
			getcontent('table','ascSort');
		}
		if (isok[2]) {
			getcontent('table','desSort');
		}
	});

	$('#list').on('click','li',function(){
		location.href=`detpage.html?${$(this).attr('data-id')}`;
	});

});