/**
 * Created by Administrator on 2017/11/14.
 */


$(function () {
  //获取用户信息
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function (data) {
      //console.log(data);
      if(data.error){
        location.href = 'login.html';
      }

      //console.log(template('userInfoTemp',{data:data}));
      $('.user_info img').after(template('userInfoTemp',data));
    }
  });

  $('.btn_logout').on('click',function () {
    mui.confirm('您确定要退出当前账号吗?','温馨提示',['否','是'],function (e) {
      if(e.index===1){
        $.ajax({
          url:'/user/logout',
          type:'get',
          success:function (data) {
            //console.log(data);
            if(data.success){
              location.href = 'login.html';
            }
          }
        });
      }
    });
  });
});