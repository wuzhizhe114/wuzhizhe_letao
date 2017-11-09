/**
 * Created by Administrator on 2017/11/8.
 */

// 获取表单
var $form = $('.panel-body form');
//console.log($form);

// 配置校验属性 bootstrapValidator 初始化方法
$form.bootstrapValidator({
  //配置校验时的小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    username: {
      validators: {
        notEmpty: {
          message: "用户名不能为空"
        },
        callback:{
          message:'用户名错误'
        }
      }
    },
    password: {
      validators: {
        notEmpty: {
          message: "密码不能为空"
        },
        stringLength:{
          min:6,
          max:12,
          message:'长度在6-12'
        },
        callback:{
          message:'密码错误'
        }
      }
    }
  }
});

//获取 表单校验实例 validator
var validator = $form.data('bootstrapValidator');

//注册表单校验成功事件 插件方法
$form.on('success.form.bv',function (e) {
  //阻止浏览器默认行为
  e.preventDefault();
  //通过序列化表单值，创建 URL 编码文本字符串。
  //console.log($form.serialize());

  // 发送ajax请求,判断用户名密码是否正确
  $.ajax({
    url:'/employee/employeeLogin',
    type:'post',
    data:$form.serialize(),
    success:function (data) {
      //console.log(data);
      if(data.error === 1000){// 错误码1000 提示账号错误
        validator.updateStatus('username','INVALID','callback');
      }else if(data.error === 1001 ){// 错误码1001 提示密码错误
        validator.updateStatus('password','INVALID','callback');
      }else{// 正确,跳转到首页
        location.href = 'index.html';
      }
    }
  });
});

// 给重置按钮绑定事件
$('button[type=reset]').on('click',function () {
  //console.log("1");
  //点击重置按钮 清除掉校验样式
  validator.resetForm();
});