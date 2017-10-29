
// 检测用户是否登录
// if(location.href.indexOf('login.html')<0){
//     $.ajax({
//         url:'/employee/checkRootLogin',
//         type:'get',
//         success:function (data) {
//             console.log(data);
//             if(data.error==400){
//                 location.href = 'login.html';
//             }
//         }
//     })
// }

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