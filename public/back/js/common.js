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
  setTimeout(function () {
    NProgress.done();
  },500);
});

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