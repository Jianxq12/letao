
mui('.mui-scroll-wrapper').scroll({
	indicators:false
})

var data = {
	proName:'',
	brandId:'',
	price:'',
	num:'',
	page:1,
	pageSize:10
}

	function render(data){
			$.ajax({
			type:'get',
			url:'/product/queryProduct',
			data:data,
			success:function(data){
				setTimeout(function(){
					// console.log(data);
					$('.lt_product').html(template('tpl',data));
				},1000)
			}
		})
	}
	
	// 获取地址栏参数
	var key = tools.getParam('key');
	// console.log(key);
	// 设置到文本框中
	$('.search_text').val(key);

	data.proName = key;
	// 自动渲染页面
	render(data);

	// 点击搜索按钮
	$('.search_btn').on('click',function(){

		// 清除排序
		$('.lt_sort a').removeClass('now');
		$('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
		data.price='';
		data.num='';

		var key = $('.search_text').val().trim();

		if(key==''){
			mui.toast('请输入搜索的内容');
		}

		$('.lt_product').html('<div class="loading"></div>');

		data.proName = key;
		render(data);
	})

	// 排序功能
	$('.lt_sort>a[data-type]').on('click',function(){
		var $this = $(this);
		var $span = $(this).find('span');

		if($this.hasClass('now')){
			$span.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
		}else{
			$(this).addClass('now').siblings().removeClass('now');
			$('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
		}

		var  type = $this.data('type');
		var value = $span.hasClass('fa-angle-down')?2:1;

		data[type]=value;
		render(data);
	})
