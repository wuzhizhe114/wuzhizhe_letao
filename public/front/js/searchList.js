/**
 * Created by Administrator on 2017/11/13.
 */

$(function () {
  //当前页数
  var currentPage = 1;
  var pageSize = 10;

  // 获取地址栏中的key
  var key = tools.getParam('key');

  //设置给搜索框
  $('.lt_search input').val(key);
  //console.log(key);

  //渲染数据函数
  function render() {
    //判断是否有选择排序的参数
    var type = $('a[data-type].now').data('type');
    var value = $('a[data-type].now').find('span').hasClass('fa-angle-down')?2:1;

    var obj = {
      proName:key,
      page:currentPage,
      pageSize:pageSize
    }

    //判断排序参数是否有值
    if(type){
      //console.log(value);
      obj[type] = value;
    }
    //延迟执行 显示加载效果
    setTimeout(function () {
      $.ajax({
        url:'/product/queryProduct',
        data:obj,
        success:function (data) {
          //console.log(data);
          $('.lt_product').html(template('productTemp',data));
        }
      });
    },1000)
  }

  // 首次渲染
  render();

  // 点击搜索框,再次搜索内容
  $('.btn_search').on('click',function () {
    key = $('.lt_search input').val().trim();

    if(key === ''){
      mui.toast('请输入关键字');
      return false;
    }

    // 设置加载标签
    $('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');

    // 重新渲染数据
    render();
  });

  // 价格和库存的事件绑定
  $('a[data-type]').on('click',function () {
    //判断当前项是否有now类
    if($(this).hasClass('now')){
      $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      $(this).addClass('now').parent().siblings().find('a').removeClass('now');
      $('a[data-type]').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    // 设置加载标签
    $('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');

    // 重新渲染数据
    render();
  });
});