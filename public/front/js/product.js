
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
})
