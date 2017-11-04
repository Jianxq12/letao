
$(function(){
	mui(".mui-scroll-wrapper").scroll({
    indicators:false
  })

	var id = tools.getParam('productId');
	$.ajax({
		type:'get',
		url:'/product/queryProductDetail',
		data:{id:id},
		success:function(data){
			// console.log(data);
			var temp = data.size.split('-');
			var sizeArray = [];
			for(var i=temp[0];i<temp[1];i++){
				sizeArray.push(i);
			}
			data.sizeArray=sizeArray;
			console.log(data);
			$('.mui-scroll').html(template('tpl',data));

			
			mui('.mui-slider').slider({
	        interval:1000//自动轮播周期
	      	});

			mui('.mui-numbox').numbox()
		}
	})

	$('.mui-scroll').on('click','.size',function(){
		$(this).addClass('now').siblings().removeClass('now');
	})

	// 添加到购物车
	$('.btn_add_cart').on('click',function(){
		var size = $('.size.now').html();
		var num = $('.mui-numbox-input').val();

		if(!size){
			mui.toast('请选择尺码');
			return;
		}

		$.ajax({
			type:'post',
			url:'/cart/addCart',
			data:{
				productId:id,
				num:num,
				size:size
			},
			success:function(data){
				if(data.success){
					mui.toast('添加成功');
				}
				if(data.error==400){
					location.href = 'login.html?retUrl='+location.href;
				}
			}
		})
	})
})
