/**
 * Created by Administrator on 2017/11/14.
 */

$(function () {
  //获取商品id
  var productId = tools.getParam('productId');

  //右上角刷新按钮操作
  $('.btn_reload').on('click', function () {
    //console.log(1);
    $('.btn_reload').addClass('now');
    setTimeout(function () {
      window.location.reload();
    }, 800);
  });

  // 获取当前id信息,渲染页面
  $.ajax({
    url:'/product/queryProductDetail',
    type:'get',
    data:{
      id:productId
    },
    success:function (data) {
      //console.log(data);
      $('.mui-scroll').html(template('productTemp',data));

      //手动开启轮播图播放
      mui('.mui-slider').slider({
        interval:1000
      })

      // 手动开启 数字输入框
      mui('.mui-numbox').numbox();

      // 注册事件 选择尺码
      $('.list_item .size span').on('click',function () {
        $(this).addClass('now').siblings().removeClass('now');
      });
    }
  });

  // 添加到购物车
  $('.lt_footer .mui-btn-danger').on('click',function () {
    //获取选中的码数
    var size = $('.list_item .size span.now').html();
    if(!size){
      mui.toast('请选择尺码数');
      return false;
    }

    // 获取 选中的数量
    var num = mui('.mui-numbox').numbox().getValue();
    //console.log(num);
    //发送ajax请求,加入到当前用户的购物车中
    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:{
        productId:productId,
        num:num,
        size:size
      },
      success:function (data) {
        //console.log(data);
        if(data.error){
          location.href = 'login.html?retUrl='+location.href;
        }
        if(data.success){
          mui.confirm('添加商品成功','温馨提示',['去购物车','继续浏览'],function (e) {
            if(e.index===0){
              location.href = 'cart.html';
            }
          });
        }
      }
    });
  });
});