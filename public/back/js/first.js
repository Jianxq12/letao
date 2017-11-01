
$(function(){

	var currentPage = 1;
	var pageSize = 3;

	function render(){
		$.ajax({
			type:'get',
			url:'/category/queryTopCategoryPaging',
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(data){
				console.log(data);
				$('tbody').html(template('tpl',data));

				// 分页功能
				$('#paginator').bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:currentPage,
					totalPages:Math.ceil(data.total/pageSize),
					size:'small',
					onPageClicked(a,b,c,page){
						currentPage=page;
						render();
					}
				})
			}

		})
	}

	render();


	$('.btn_add').on('click',function(){
		$('#addModal').modal('show');

	})

	// 给表单做校验
	var $form = $('#form');
	$form.bootstrapValidator({
		feedbackIcons:{
			valid:'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
      		validating: 'glyphicon glyphicon-refresh'
		},
		fields:{
			categoryName:{
				validators:{
					notEmpty:{
						message:'一级分类名称不能为空'
					}
				}
			}
		}
	})


	// 阻止表单默认提交 发送ajax请求
	$form.on('success.form.bv',function(e){
		// console.log('hehe');
		e.preventDefault();

		$.ajax({
			type:'post',
			url:'/category/addTopCategory',
			data:$form.serialize(),
			success:function(data){
				// console.log(data);
				
				if(data.success){
					// 关闭模态框
					$('#addModal').modal('hide');
					// 重新渲染第一页
					currentPage=1;
					render();
					// 重置表单
					$form.data('bootstrapValidator').resetForm();
					$form[0].reset();
				}
				
			}
		})
	})

})