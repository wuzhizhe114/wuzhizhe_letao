/**
 * Created by Administrator on 2017/11/15.
 */

$(function () {

  // 初始下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          //获取购物车信息
          $.ajax({
            url: '/cart/queryCart',
            success: function (data) {
              //console.log(data);
              if(data.error){
                location.href = 'login.html?retUrl='+location.href;
              }

              $('.mui-table-view').html(template('productInfoTemp', {data: data}));

              // 刷新时,重置总金额
              $('.lt_cart_total .total').text('0.00');
              //结束下拉刷新
              setTimeout(function () {
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              }, 1000)
            }
          });
        }
      }
    }
  });

  // 删除
  $('.mui-table-view').on('tap', '.btn_delete', function () {
    //console.log(1);
    var id = $(this).data('id');
    mui.confirm('您确定要删除这件商品吗?', '温馨提示', ['否', '是'], function (e) {
      if (e.index === 1) {
        $.ajax({
          url: '/cart/deleteCart',
          data: {
            id: id
          },
          success: function (data) {
            console.log(data);
            if (data.success) {
              // 手动下拉刷新
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    });
  });

  // 编辑
  $('.mui-table-view').on('tap','.btn_edit',function () {
    console.log(this.dataset);
    // 获取所有的自定义属性,作为模板的数据来源
    var data = this.dataset;
    var temp = template('editTemp',data);
    temp = temp.replace(/\n/g,'');
    //console.log(temp);
    mui.confirm(temp,'编辑商品',['取消','确定'],function (e) {
      if(e.index===1){
        var id = data.id;
        var size = $('.size span.now').text();
        var num = $('.mui-numbox [type="number"]').val();
        //console.log(id+":"+size+":"+num);
        $.ajax({
          url:'/cart/updateCart',
          type:'post',
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function (data) {
            console.log(data);
            if(data.success){
              // 手动下拉刷新
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });

    // 给数字方块注册点击事件
    $('.list_item .size span').on('tap',function () {
      $(this).addClass('now').siblings().removeClass('now');
    });

    // 手动开启 数字输入框
    mui('.mui-numbox').numbox();
  });

  // 给复选框注册事件

  $('.mui-table-view').on('click','.ck',function () {
    //保存总价
    var total = 0;
    //获取到被选中的复选框
    // each (index:索引,element:dom元素);
    $('.ck:checked').each(function (index,ele) {
      //此处可以用this来指代当前的dom元素
      total += ele.dataset.num * this.dataset.price;
    });
    //console.log(total);
    //设置给总金额
    $('.lt_cart_total .total').text(total.toFixed(2));
  });
});