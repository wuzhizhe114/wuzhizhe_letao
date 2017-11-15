/**
 * Created by Administrator on 2017/11/14.
 */

$(function () {

  //注册
  $('.btn_register').on('click', function (e) {
    e.preventDefault();
    // 获取输入数据
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    var repassword = $('input[name=repassword]').val();
    var mobile = $('input[name=mobile]').val();
    var vCode = $('input[name=vCode]').val();
    if (!username) {
      mui.toast('请输入用户名');
      return false;
    }
    if (!password) {
      mui.toast('请输入密码');
      return false;
    }
    if (!repassword) {
      mui.toast('请输入确认密码');
      return false;
    }
    if (password != repassword) {
      mui.toast('两次输入的密码不一致');
      return false;
    }
    if (!mobile) {
      mui.toast('请输入手机号');
      return false;
    }
    if (!/^1[34578]\d{9}$/.test(mobile)) {
      mui.toast('请输入正确的手机号');
      return false;
    }
    if (!vCode) {
      mui.toast('请输入验证码');
      return false;
    }

    $.ajax({
      url:'/user/register',
      type:'post',
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function (data) {
        //console.log(data);
        if(data.success){
          $('.form')[0].reset();
          mui.toast('注册成功,1秒后到登陆页');
          setTimeout(function () {
            location.href = 'login.html'
          },1000);
        }
        if(data.error){
          //console.log(data.message);
          mui.toast(data.message);
        }
      }
    });
  });

  // 获取验证码
  $('.btn_vCode').on('click', function (e) {
    e.preventDefault();
    $('input[name=vCode]').val('');

    var self = $(this);
    self.addClass('now').text('正在发送中...').prop('disabled', true);

    var current = 4;
    $.ajax({
      url:'/user/vCode',
      success:function (data) {
        //console.log(data.vCode);
        var timer = setInterval(function () {
          current --;
          self.text(current+'秒后可重新发送');
          if(current <= 0){
            self.removeClass('now').text('获取验证码').prop('disabled',false);
            $('input[name=vCode]').val(data.vCode);
            clearInterval(timer);
          }
        },1000);
      }
    })
  });
});