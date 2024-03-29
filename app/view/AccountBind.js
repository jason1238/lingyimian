/*
 * File: app/view/AccountBind.js
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

Ext.define('ZJ02.view.AccountBind', {
  extend: 'Ext.Container',

  requires: [
    'Ext.TitleBar',
    'Ext.Button',
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Toggle'
  ],

  config: {
    cls: 'zjs',
    layout: 'card',
    items: [
      {
        xtype: 'titlebar',
        cls: 'zjs-bg-green',
        docked: 'top',
        ui: 'zjs',
        title: '账户绑定',
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
      },
      {
        xtype: 'formpanel',
        id: 'a_b_scp',
        scrollable: 'vertical',
        items: [
          {
            xtype: 'fieldset',
            items: [
              {
                xtype: 'togglefield',
                id: 'toggle_ab_sina',
                itemId: 'toggle_ab_sina',
                label: '新浪微博'
              },
              {
                xtype: 'togglefield',
                hidden: true,
                id: 'toggle_ab_qq',
                label: '腾讯微博'
              },
              {
                xtype: 'togglefield',
                hidden: true,
                id: 'toggle_ab_renren',
                label: '人人网'
              }
            ]
          }
        ]
      }
    ],
    listeners: [
      {
        fn: 'onMybutton23Tap',
        event: 'tap',
        delegate: '#mybutton23'
      },
      {
        fn: 'onToggle_ab_sinaChange',
        event: 'change',
        delegate: '#toggle_ab_sina'
      }
    ]
  },

  onMybutton23Tap: function(button, e, eOpts) {
    button.up('navigationview').pop();
  },

  onToggle_ab_sinaChange: function(togglefield, newValue, oldValue, eOpts) {


    if( newValue === 1 ){
      change_page('AccountBindSinaWeibo',togglefield);
    }else{
      unbind_sns(function(result,success){
        if(success){
          toast('绑定移除成功！');
        }else{
          toast('绑定移除失败，请稍候再试！');
          set_value_silent( togglefield,1 );
        }
      },'sina',false);
    }

  },

  update: function(_p) {
    var _this = this;


    //toast('lunched 5');

    x$toggle_ab_sina = x$('toggle_ab_sina');
    x$toggle_ab_qq = x$('toggle_ab_qq');
    x$toggle_ab_renren = x$('toggle_ab_renren');


    //toast(typeof get_access_token);

    get_access_token(function(result,success){

      _this.reset();

      console.log('get_access_token');

      if(success){
        if(result){

          if( result.sina ){
            set_value_silent( x$toggle_ab_sina,1 );
          }

          if( result.qq ){
            set_value_silent( x$toggle_ab_qq,1 );
          }

          if( result.renren ){
            set_value_silent( x$toggle_ab_renren,1 );
          }

        }
      }


      refresh_scroll(x$('a_b_scp'));


    });

  },

  reset: function() {

    x$toggle_ab_sina = x$('toggle_ab_sina');
    x$toggle_ab_qq = x$('toggle_ab_qq');
    x$toggle_ab_renren = x$('toggle_ab_renren');

    set_value_silent( x$toggle_ab_sina,0 );
    set_value_silent( x$toggle_ab_qq,0 );
    set_value_silent( x$toggle_ab_renren,0 );
  }

});