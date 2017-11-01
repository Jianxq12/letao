
$(function(){

	var currentPage = 1;
	var pageSize = 5;

	function render(){
		$.ajax({
		url:'/user/queryUser',
		type:'get',
		data:{
			page:currentPage,
			pageSize:pageSize
		},
		success:function(data){
			// console.log(data);
			var html = template('tpl',data);
			$('tbody').html(html);

			$("#paginator").bootstrapPaginator({
			  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
			  currentPage:currentPage,//当前页
			  totalPages:Math.ceil(data.total/pageSize),//总页数
			  size:"small",//设置控件的大小，mini, small, normal,large
			  onPageClicked:function(event, originalEvent,type,page){
			    //为按钮绑定点击事件 page:当前点击的按钮值
			    currentPage = page;

			    render();

			  }
			});
		}
	})
	}
	

	render();


	$('tbody').on('click','.btn',function(){
		$('#userModal').modal('show');
		var id = $(this).parent().data('id');
		var isDelete = $(this).parent().data('isDelete');
		isDelete = isDelete==1?0:1;

		$('.btn_confirm').off().on('click',function(){
			$.ajax({
				type:'post',
				url:'/user/updateUser',
				data:{
					id:id,
					isDelete:isDelete
				},
				success:function(data){
					if(data.success){
						$('#userModal').modal('hide');
						render();
					}
				}
			})
		})
	})
})