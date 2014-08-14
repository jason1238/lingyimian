/*
 * File: app/view/ResetPassword.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('ZJ02.view.ResetPassword', {
  extend: 'Ext.Container',

  requires: [
    'Ext.form.Panel',
    'Ext.Label',
    'Ext.form.FieldSet',
    'Ext.field.Email',
    'Ext.Button',
    'Ext.TitleBar'
  ],

  config: {
    cls: 'zjs',
    layout: 'card',
    items: [
      {
        xtype: 'formpanel',
        scrollable: 'vertical',
        items: [
          {
            xtype: 'label',
            html: '  请输入登录邮箱，用于找回密码。',
            padding: '0.5em'
          },
          {
            xtype: 'fieldset',
            items: [
              {
                xtype: 'emailfield',
                id: 'resetpassword.fe_email',
                label: '邮箱',
                required: true,
                placeHolder: 'email@example.com'
              }
            ]
          },
          {
            xtype: 'button',
            itemId: 'mybutton30',
            margin: '10px 0.5em 0',
            ui: 'action',
            text: '找回密码'
          }
        ]
      },
      {
        xtype: 'titlebar',
        cls: 'zjs-bg-green',
        docked: 'top',
        ui: 'zjs',
        title: '找回密码',
        items: [
          {
            xtype: 'button',
            height: 30,
            itemId: 'mybutton23',
            ui: 'plain',
            width: 30,
            icon: '',
            iconCls: 'zjs-icon-back',
            text: 'back'
          }
        ]
      }
    ],
    listeners: [
      {
        fn: 'onMybutton30Tap',
        event: 'tap',
        delegate: '#mybutton30'
      },
      {
        fn: 'onMybutton23Tap',
        event: 'tap',
        delegate: '#mybutton23'
      }
    ]
  },

  onMybutton30Tap: function(button, e, eOpts) {
    var fe_email= x$('resetpassword.fe_email');

    var email_val = fe_email.getValue();



    var email_preg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if( email_val.length === 0 ){
      toast('请输入邮箱地址');
      return ;
    }else if( email_val.length < 6 || email_val.length > 50  ){
      toast('账户名为长度6-50的邮箱地址');
      return ;
    }else if( !email_preg.test(email_val) ){
      toast('请输入正确的邮箱地址');
      return ;
    }




    if( email_val ){

      send_request( {
        api:'reset_pwd',
        method:'POST',
        params:{
          email:email_val
        },
        success:function(result, request){
          //if( result.success ){
            switch( result.code ){
              case '0000':
                //成功
                toast("申请成功。请查看邮箱继续操作！");
                go_home();
                break;
              case '1002':
                //无此邮箱
                toast("抱歉，未找到此邮箱。");
                break;
              default:
                toast("errCode:"+result.code);
                break;
            }
          //}else{

          //}
        },
        fail:function(result){
          toast("您的网络似乎有点问题，请稍候再试！");
        },
        text:'加载中',
        silent:false,
        trigger:button,
        check_login:false
      } );

    }else{
      toast("请输入注册邮箱。");
    }






    //Ext.Msg.alert("一封邮件已发送到您的注册邮箱，请查看邮件继续操作。");
    //button.up('navigationview').pop();
  },

  onMybutton23Tap: function(button, e, eOpts) {
    button.up('navigationview').pop();
  }

});