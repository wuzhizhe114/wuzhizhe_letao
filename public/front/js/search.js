/**
 * Created by Administrator on 2017/11/13.
 */

$(function () {

  //获取localstorage函数
  function getHistory() {
    var history = localStorage.getItem('lt_search_history') || '[]';
    return JSON.parse(history)
  }

  //数据渲染函数
  function render() {
    var arr = getHistory();
    $('.lt_search-content .content').html(template('historyTemp',{arr:arr}));
  }
  render();

  //清空操作
  $('.btn_empty').on('click',function () {
    mui.confirm('您确定要清空历史记录吗?','温馨提示',['否','是'],function (e) {
      if(e.index===1){
        localStorage.removeItem('lt_search_history');

        //重新渲染数据
        render();
      }
    });
  });

  //删除操作
  $('.lt_search-content .content').on('click','span[data-type]',function () {
    var self = $(this);

    mui.confirm('您确定要删除此项记录吗?','温馨提示',['否','是'],function (e) {
        if(e.index === 1){
            //获取自定义下标值
            var index = self.data('type');
            //获取localStorage数据
            var arr = getHistory();

            //执行删除操作
            arr.splice(index,1);

            //重新设置localStorage
            localStorage.setItem('lt_search_history',JSON.stringify(arr));

            //重新渲染
            render();
        }
    });

  });

  // 新增操作
  $('.btn_search').on('click',function () {
    //去除前后空格
    var key = $('.lt_search input').val().trim();
    //去除内容
    $('.lt_search input').val('');
    //判断是否为空字符串
    if(key==''){
      mui.toast('请输入搜索关键字');
      return false;
    }

    //获取localstorage
    var arr = getHistory();
    //console.log(key);

    //判断arr中是否存在key
    if(arr.indexOf(key) != -1){
      // 存在就删除它
      arr.splice(arr.indexOf(key),1);
    }

    // 判断arr的长度是否超过10
    if(arr.length >= 10){
      arr.pop();
    }

    // 把搜索框输入的内容添加到最前面
    arr.unshift(key);

    // 重新设置localstorage
    localStorage.setItem('lt_search_history',JSON.stringify(arr));

    // 重新渲染数据
    render();

    //页面跳转到商品列表页 并把数据传送过去
    location.href = 'searchList.html?key='+key;
  });
});

