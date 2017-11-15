/**
 * Created by Administrator on 2017/11/15.
 */
$(function () {
  //一级分类数据渲染
  $.ajax({
    url:'/category/queryTopCategory',
    success:function (data) {
      //console.log(data);
      $('.first_category').html(template('firstCategoryTemp',data));

      //二级分类首次渲染
      render();
    }
  });

  //二级分类数据渲染 函数

  function render() {
    //console.log($('.first_category li.now').data('id'));
    $.ajax({
      url:'/category/querySecondCategory',
      data:{
        id:$('.first_category li.now').data('id')
      },
      success:function (data) {
        console.log(data);
        $('.lt_right .mui-scroll').html(template('secendCategoryTemp',data));
      }
    });
  }

  // 给一级分类项注册点击事件(委托)
  $('.first_category').on('click','li',function () {
    $(this).addClass('now').siblings().removeClass('now');

    //滚动到顶部
    //获取页面中的滚动实例，有两个，我们需要第二个
    var temp = mui('.lt_right .mui-scroll-wrapper').scroll();
    //滚动0，0位置
    temp.scrollTo(0,0,300);//100毫秒滚动到顶
    render();
  });
});