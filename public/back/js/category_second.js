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

  //发送 ajax 请求,获取数据
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: pageCurrent,
        pageSize: pageSize
      },
      success: function (data) {
        //console.log(data);
        $('tbody').html(template('categorySecondTemp', data));

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

    // 获取下拉菜单数据
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (data) {
        //console.log(data);
        $('.dropdown-menu').html(template('dropDownTemp',data));
      }
    });
  });

  // 给模态框中的下拉菜单中的子元素注册事件(委托)
  $('.dropdown-menu').on('click','li a',function () {
      $('.category_first').text($(this).text());
      $('#categoryId').val($(this).data('id'));

      //让categoryId校验成功
      $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });

  //初始化上传图片插件
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data.result.picAddr);
      $('.box_img img').attr('src',data.result.picAddr);
      $('#brandLogo').val(data.result.picAddr);

      //让brandLogo校验成功
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  // 初始化表单校验插件
  $form.bootstrapValidator({
    //设置不校验的内容，所有的都校验
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      },
    }
  });

  //注册表单校验成功事件 插件方法
  $form.on('success.form.bv', function (e) {

    e.preventDefault();
    $.ajax({
      url: '/category/addSecondCategory',
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
          //重置下拉菜单显示文本
          $('.category_first').text('请选择一级分类');
          // 重置图片
          $('.box_img img').attr('src','imgage/none.png');
          //重置一级分类id隐藏域
          $('#categoryId').val('');
          // 重置图片路径隐藏域
          $('#brandLogo').val('');


          //返回最新页
          pageCurrent = 1;
          // 渲染数据
          render();
        }
      }
    });
  });
});