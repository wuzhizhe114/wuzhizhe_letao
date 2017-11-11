/**
 * Created by Administrator on 2017/11/11.
 */
$(function () {
  //发送ajax请求,渲染数据
  // 定义页码和每页的数量
  var pageCurrent = 1;
  var pageSize = 5;

  //模态框表单
  var $form = $('#form');

  // 渲染数据
  render();

  //发送 ajax 请求,获取数据
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: pageCurrent,
        pageSize: pageSize
      },
      success: function (data) {
        console.log(data);
        $('tbody').html(template('shopManageTemp', data));

        // 初始化分页插件
        $('#paginator').bootstrapPaginator({
          //声明bootstrap的版本
          bootstrapMajorVersion: 3,
          currentPage: pageCurrent,
          totalPages: Math.ceil(data.total / pageSize),
          onPageClicked: function (a, b, c, page) {
            pageCurrent = page;
            render();
          }
        });
      }
    });
  }
});