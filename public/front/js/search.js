
mui('.mui-scroll-wrapper').scroll({
	indicators:false
})

// 获取缓存中的数据，转换成数组，返回
function getHistory(){
	var search_history = localStorage.getItem('lt_search_history')||'[]';
	var arr = JSON.parse(search_history);
	return arr;
}

function render(){
	var arr = getHistory();
	$('.lt_history').html(template('tpl',{arr:arr}));

}
render();

// 清空功能
// 按钮注册委托事件 删除缓存 重新渲染
$('.lt_history').on('click','.icon_empty',function(){
	localStorage.removeItem('lt_search_history');
	render();
})

// 删除功能
// 删除按钮绑定点击事件 获取当前自定义属性index 删除对应记录
// 数组重新存储到缓存中 重新渲染
$('.lt_history').on('click','.mui-icon-closeempty',function(){
	var btnArray = ['是','否'];
	var $this=$(this);
	mui.confirm('你确定要删除这条记录吗','警告',btnArray,function(data){

		// console.log(data);
		if(data.index==0){
			var arr = getHistory();
			var index = $this.data('index');
			console.log(index);
			arr.splice(index,1);

			localStorage.setItem('lt_search_history',JSON.stringify(arr));
			render();
			mui.toast('操作成功');
		}else{
			mui.toast('操作取消');
		}

	})
})


// 添加功能
$('.search_btn').on('click',function(){
	// 获取文本框的值 去掉空格
	var key = $('.search_text').val().trim();

	if(key == ''){
		mui.alert('亲，你想买啥','温馨提示')
		return;
	}

	// 把value值存储到缓存中
	// 先从缓存中获取数组
	var arr = getHistory();
	var index = arr.indexOf(key);

	if(index>-1){
		// 数组中已存在记录
		arr.splice(index,1);
	}

	// 数组长度超过10，删除最后一条
	if(arr.length>=10){
		arr.pop();
	}

	// 把key存到数组第一条
	arr.unshift(key);

	// 存储到缓存中
	localStorage.setItem('lt_search_history',JSON.stringify(arr));

	// 页面跳转
	location.href = 'searchList.html?key='+key;
})