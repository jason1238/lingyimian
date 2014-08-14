/*
 * File: app/view/PushSettings.js
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

Ext.define('ZJ02.view.PushSettings', {
  extend: 'Ext.Container',

  requires: [
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Toggle',
    'Ext.field.Text',
    'Ext.TitleBar',
    'Ext.Button',
    'Ext.dataview.List',
    'Ext.XTemplate'
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
            xtype: 'fieldset',
            items: [
              {
                xtype: 'togglefield',
                itemId: 'pushsettings_toggle',
                label: '推送设置'
              },
              {
                xtype: 'textfield',
                itemId: 'pushsettings_time',
                label: '推送时间',
                placeHolder: '请选择',
                readOnly: true
              }
            ]
          }
        ]
      },
      {
        xtype: 'titlebar',
        cls: 'zjs-bg-green',
        docked: 'top',
        ui: 'zjs',
        title: '推送设置',
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
        xtype: 'container',
        centered: true,
        height: 200,
        hidden: true,
        itemId: 'cnl_pop_pushtime',
        width: 280,
        layout: 'fit',
        modal: true,
        items: [
          {
            xtype: 'titlebar',
            docked: 'top',
            title: '推送时间',
            items: [
              {
                xtype: 'button',
                itemId: 'cnl_pop_back_pushsettings_time',
                text: '返回'
              },
              {
                xtype: 'button',
                align: 'right',
                itemId: 'cnl_pop_reset_pushsettings_time',
                text: '重置'
              }
            ]
          },
          {
            xtype: 'list',
            itemId: 'cnl_pushtime',
            disableSelection: true,
            itemCls: 'leaf_list',
            itemTpl: [
              '<div class="{__leaf_cls}">{text}</div>'
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
        fn: 'onMybutton23Tap31111111',
        event: 'tap',
        delegate: '#cnl_pop_back_pushsettings_time'
      },
      {
        fn: 'onMybutton23Tap311111111',
        event: 'tap',
        delegate: '#cnl_pop_reset_pushsettings_time'
      }
    ]
  },

  onMybutton23Tap: function(button, e, eOpts) {
    button.up('navigationview').pop();
  },

  onMybutton23Tap31111111: function(button, e, eOpts) {
    var _this = this;

    if( !_this.CNL_pushtime.pop() ){
      window.setTimeout(function(){
        _this.down('#cnl_pop_pushtime').hide();
      },320);
    }

  },

  onMybutton23Tap311111111: function(button, e, eOpts) {
    var _this = this;


    var x$input = _this.down('#pushsettings_time');
    x$input.setValue('');
    x$input.field_val = '';
    set_s('_PUSH_TIME','');


    window.setTimeout(function(){
      _this.down('#cnl_pop_pushtime').hide();
    },320);

  },

  update: function(_p) {
    var _this = this;

    var toggle = _this.down('#pushsettings_toggle');
    var time = _this.down('#pushsettings_time');


    var check_toggle = function(){
      var val = toggle.getValue();

      if( val ){
        time.show();
        //set_s('_PUSH_TIME',nselect_get_val(time));
      }else{
        time.hide();
        time.setValue('');
        time.field_val = '';
        set_s('_PUSH_TIME','');
      }


    };



    toggle.on( 'change',function(field, newValue, oldValue) {
      check_toggle();
    });




    var time_options = [
      {text: '8:00 - 14:00',  value: '8-14'},
      {text: '14:00 - 22:00',  value: '14-22'},
      {text: '8:00 - 22:00',  value: '8-22'}
    ];




    var x$input = _this.down('#pushsettings_time');
    var x$pop =  _this.down('#cnl_pop_pushtime');
    var x$list = _this.down('#cnl_pushtime');


    x$input.addListener('focus',function(){
      x$pop.show();
    });


    _this.CNL_pushtime = new LD_Nested_List( x$list,time_options,'items',function(data){
      x$input.setValue(data.text);
      x$input.field_val = data.value;
      set_s('_PUSH_TIME',data.value);
      window.setTimeout(function(){
        x$pop.hide();
      },320);
    } );


    //init
    var push_time = get_s('_PUSH_TIME');

    //var time_options = time.getOptions();
    //console.log(push_time);

    if( push_time ){
      toggle.setValue(1);
      for( var i=0;i<time_options.length;i++ ){
        if( time_options[i].value == push_time ){
          x$input.setValue(time_options[i].text);
          x$input.field_val = time_options[i].value;
        }
      }

    }else{
      toggle.setValue(0);
      time.hide();
    }
  }

});