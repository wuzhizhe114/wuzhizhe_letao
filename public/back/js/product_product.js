/**
 * Created by Administrator on 2017/11/11.
 */
$(function () {
  //发送ajax请求,渲染数据
  // 定义页码和每页的数量
  var pageCurrent = 1;
  var pageSize = 5;

  //定义图片数组名称下标
  var picIndex = 1;

  //模态框表单
  var $form = $('#form');

  // 定义一个数组变量,保存图片地址
  var picArr = [];

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
        //console.log(data);
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

  // 给添加分类按钮绑定事件
  $('.addProduct').on('click', function () {
    $('#addproductModal').modal('show');

    // 获取下拉菜单数据
    $.ajax({
      url:'/category/querySecondCategoryPaging',
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
    $('.category_second').text($(this).text());
    $('#brandId').val($(this).data('id'));

    //让categoryId校验成功
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  // 初始化表单校验插件
  $form.bootstrapValidator({
    //设置不校验的内容，[]空值表示所有的都校验
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入正确的库存数量'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入正确的价格'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入正确的价格'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码(例:30-50)"
          },
          regexp:{
            regexp:/^[1-9]\d-[1-9]\d$/,
            message:'请输入正确的商品尺码(例:30-50)'
          }
        }
      },
      productLogo:{
        validators:{
          notEmpty:{
            message:"请选择三张图片"
          }
        }
      }
    }
  });

  //初始化上传图片插件
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //判断是否超过三张图片
      if(picArr.length >=3){
        return false;
      }
      //console.log(data.result.picAddr);
      //图片预览
      $('.img_box').append('<img src="'+data.result.picAddr+'" width="80" alt=""/>');

      //将地址和图片名字保存到数组中
      //var picIndex =1;
      picArr.push('&picName'+picIndex+'='+data.result.picName+'&picAddr'+picIndex+'='+data.result.picAddr);
      console.log(picArr);
      picIndex++;
      if(picArr.length==3){
        //达到三张,将数组中的元素拼凑成字符串,赋值给productLogo的隐藏域
        $('#productLogo').val(picArr.join('&'));

        console.log(picArr);
        picArr = [];
        picIndex = 1;
        console.log($form.serialize());
        //让productLogo校验成功
        $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
      } else {
        $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }

    }
  });

  //注册表单校验成功事件 插件方法
  $form.on('success.form.bv', function (e) {

    e.preventDefault();
    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: $form.serialize(),
      success: function (data) {
        //console.log(data);
        if (data.success) {
          // 隐藏模态框
          $('#addproductModal').modal('hide');
          // 重置校验样式
          $form.data('bootstrapValidator').resetForm();
          // 重置表单内容
          $form[0].reset();
          //重置下拉菜单显示文本
          $('.category_second').text('请选择二级分类');
          // 重置图片
          $('.box_img img').remove();
          //重置二级分类id隐藏域
          $('#brandId').val('');
          // 重置图片路径隐藏域
          $('#productLogo').val('');


          //返回最新页
          pageCurrent = 1;
          // 渲染数据
          render();
        }
      }
    });
  });
});