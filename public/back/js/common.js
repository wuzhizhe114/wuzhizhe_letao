/**
 * Created by Administrator on 2017/11/8.
 */

//绑定ajax开始发送请求时,开始进度条插件
$(document).ajaxStart(function () {
  NProgress.start();
});

//绑定ajax结束请求时,结束进度条插件
$(document).ajaxComplete(function () {

  // 设置延迟,模拟网络进度
  //setTimeout(function () {
    NProgress.done();
  //},500);
});

// 验证用户是否已登录
if(location.href.indexOf('login.html') == -1){
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    success:function (data) {
      //console.log(data);
      //若是错误码有值,即用户没有登录,跳转回登录页
      if(data.error){
        location.href = 'login.html';
      }
    }
  });
}

// 处理侧边栏 分类管理一二级菜单的显示隐藏
$('.slide_manage.category').on('click',function () {
  $('.category_content').slideToggle();
});

// 侧边栏的显示隐藏
$('.main_topbar .pull-left').on('click',function () {
  $('.lt_slide').toggleClass('now');
  $('.lt_main').toggleClass('now');
  $('.main_topbar').toggleClass('now');
});

//登出按钮 阻止默认事件跳转
//$('#logout').on('click',function (e) {
//  //console.log("1");
//  //e.preventDefault();
//})
//登出
$('#btnVerify').on('click',function () {
  $.ajax({
    url:'/employee/employeeLogout',
    success:function (data) {
      //console.log(data);
      if(data.success){
        location.href = 'login.html';
      }
    }
  });
});
