/**
 * Created by Administrator on 2017/11/10.
 */

$(function () {
  // 定义页码和每页的数量
  var pageCurrent = 1;
  var pageSize = 10;
  // 渲染数据
  render();

  $('tbody').on('click','tr .btn',function () {
    $('#statusModal').modal('show');
    // 获取id值
    var id = $(this).parent().data('id');
    // 要更改为哪种状态值
    var status = $(this).hasClass('btn-danger')?0:1;
    //console.log(id+":"+status);

    $('.btn_verify').off().on('click',function () {
        $.ajax({
          url:'/user/updateUser',
          type:'post',
          data:{
              id:id,
              isDelete:status
          },
          success:function (data) {
            //console.log(data);
            if(data.success){
              $('#statusModal').modal('hide');
              render();
            }
          }
        });
    });
  });

  //发送 ajax 请求,获取数据
  function render() {
    $.ajax({
      url:'/user/queryUser',
      data:{
        page:pageCurrent || 1,
        pageSize:pageSize || 5
      },
      success:function (data) {
        //console.log(data);
        $('tbody').html(template('tableTemp',data));

        // 初始化分页插件
        $('#paginator').bootstrapPaginator({
          //声明bootstrap的版本
          bootstrapMajorVersion:3,
          currentPage:pageCurrent,
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function (a,b,c,page) {
            pageCurrent = page;
            render();
          }
        });
      }
    });
  }
});