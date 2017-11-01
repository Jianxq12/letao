
// 检测用户是否登录
if(location.href.indexOf('login.html')<0){
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function (data) {
            console.log(data);
            if(data.error==400){
                location.href = 'login.html';
            }
        }
    })
}

$(document).ajaxStart(function () {
    // console.log('呵呵');
    NProgress.start();
})

$(document).ajaxStop(function () {
    setTimeout(function () {
        // console.log('hehe');
        NProgress.done();
    },1000)
})

// 点击分类管理，显示或隐藏二级分类
$('.child').prev().on('click',function(){
	$(this).next().slideToggle();
})

// 点击菜单，显示或隐藏侧边栏
$('.icon_menu').on('click',function(){
	$('.lt_aside').toggleClass('now');
	$('.lt_main').toggleClass('now');
    $('.lt_header').toggleClass('now');
})

// 共用的退出功能
$('.icon_logout').on('click',function(){
	$('#logoutModal').modal('show');
})

$('.btn_logout').on('click',function(){
	$.ajax({
		url:'/employee/employeeLogout',
		type:'get',
		success:function(data){
			if(data.success){
				location.href = 'login.html';
			}
		}
	})
})