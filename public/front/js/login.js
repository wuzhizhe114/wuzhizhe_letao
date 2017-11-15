/**
 * Created by Administrator on 2017/11/14.
 */

$(function () {

  //给登录按钮注册点击事件
  $('form button[type=button]').on('click', function () {
    //获取输入信息,校验是否输入,发送ajax请求,接受返回值,判断是否成功
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();

    if (!username) {
      mui.toast('请输入用户名');
      return false;
    }

    if (!password) {
      mui.toast('请输入密码');
      return false;
    }

    $.ajax({
      url: '/user/login',
      type: 'post',
      data: $('form').serialize(),
      success: function (data) {
        //console.log(data);
        if(data.success){
          mui.toast('登录成功,请稍候...');
          setTimeout(function () {
            var search = location.search;

            if(search.indexOf('retUrl') == -1){
              location.href = 'user.html'
            } else{
              search = search.replace('?retUrl=','');
              location.href = search;
            }
          },1000);
        }
        if(data.error){
          mui.toast(data.message);
        }
      }
    });
  });
});