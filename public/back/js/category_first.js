/**
 * Created by Administrator on 2017/11/10.
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

  //$('tbody').on('click', 'tr .btn', function () {
  //  $('#statusModal').modal('show');
  //  // 获取id值
  //  var id = $(this).parent().data('id');
  //  // 要更改为哪种状态值
  //  var status = $(this).hasClass('btn-danger') ? 0 : 1;
  //  //console.log(id+":"+status);
  //
  //  $('.btn_verify').off().on('click', function () {
  //    $.ajax({
  //      url: '/user/updateUser',
  //      type: 'post',
  //      data: {
  //        id: id,
  //        isDelete: status
  //      },
  //      success: function (data) {
  //        //console.log(data);
  //        if (data.success) {
  //          $('#statusModal').modal('hide');
  //          render();
  //        }
  //      }
  //    });
  //  });
  //});

  //发送 ajax 请求,获取数据
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: pageCurrent,
        pageSize: pageSize
      },
      success: function (data) {
        //console.log(data);
        $('tbody').html(template('categoryFirstTemp', data));

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


  // 给添加分类按钮绑定事件
  $('.addCategory').on('click', function () {
    $('#addcategoryModal').modal('show');
  });

  //添加一级分类表单校验
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "分类名不能为空"
          }
        }
      }
    }
  });

  //注册表单校验成功事件 插件方法
  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    //给添加一级分类表单的确认按钮注册事件
    //$('.btn_verify').on('click', function () {
      $.ajax({
        url: '/category/addTopCategory',
        type: 'post',
        data: $form.serialize(),
        success: function (data) {
          //console.log(data);
          if (data.success) {
            // 隐藏模态框
            $('#addcategoryModal').modal('hide');
            // 重置校验样式
            $form.data('bootstrapValidator').resetForm();
            // 重置表单内容
            $form[0].reset();

            //返回最新页
            pageCurrent = 1;
            // 渲染数据
            render();
          }
        }
      });
    //});
  });

});