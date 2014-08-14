/*
 * File: app/view/PositionSubscribeByIndustry.js
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

Ext.define('ZJ02.view.PositionSubscribeByIndustry', {
  extend: 'Ext.Container',
  alias: 'widget.positionsubscribebyindustry',

  requires: [
    'Ext.Panel',
    'Ext.Button',
    'Ext.Label',
    'Ext.XTemplate',
    'Ext.TitleBar',
    'Ext.dataview.List'
  ],

  config: {
    layout: 'fit',
    items: [
      {
        xtype: 'panel',
        scrollable: 'vertical',
        items: [
          {
            xtype: 'button',
            hidden: false,
            id: 'pos_sub_by_in_btn_industry',
            itemId: 'mybutton106',
            margin: '10px',
            ui: 'confirm',
            text: '选择行业类别，一键订阅！'
          },
          {
            xtype: 'label',
            cls: 'detail_content content_con',
            html: '<h4>当前的订阅</h4>',
            margin: '20px 10px 0'
          },
          {
            xtype: 'dataview',
            cls: 'zjs-listview-booked-position',
            id: 'pos_sub_by_in_list_sub',
            itemId: 'mydataview6',
            scrollable: false,
            disableSelection: true,
            itemTpl: [
              '<div class="li">',
              '  <div class="icon">',
              '  	<span></span>',
              '    已订阅',
              '  </div>',
              '  <div class="c">',
              '    <div class="cw">',
              '    	{searchName}',
              '    </div>',
              '  </div>',
              '  <!--<div class="i i_edit"> <span></span> </div>-->',
              '  <div class="i i_delete"> <span></span> </div>',
              '</div>',
              '',
              '',
              ''
            ],
            store: 'Subscription'
          }
        ]
      },
      {
        xtype: 'container',
        centered: true,
        height: 250,
        hidden: true,
        itemId: 'cnl_pop_industry_sbi',
        width: 280,
        layout: 'fit',
        modal: true,
        items: [
          {
            xtype: 'titlebar',
            docked: 'top',
            title: '行业',
            items: [
              {
                xtype: 'button',
                itemId: 'cnl_pop_back_industry_sbi',
                text: '返回'
              },
              {
                xtype: 'button',
                align: 'right',
                itemId: 'cnl_pop_cancel_industr_sbi',
                text: '取消'
              }
            ]
          },
          {
            xtype: 'list',
            itemId: 'cnl_industry_sbi',
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
        fn: 'onPos_sub_by_in_btn_industryTap',
        event: 'tap',
        delegate: '#pos_sub_by_in_btn_industry'
      },
      {
        fn: 'onMydataview5ItemTap1',
        event: 'itemtap',
        delegate: '#pos_sub_by_in_list_sub'
      },
      {
        fn: 'onMybutton23Tap31112',
        event: 'tap',
        delegate: '#cnl_pop_back_industry_sbi'
      },
      {
        fn: 'onMybutton14Tap12',
        event: 'tap',
        delegate: '#cnl_pop_cancel_industr_sbi'
      }
    ]
  },

  onPos_sub_by_in_btn_industryTap: function(button, e, eOpts) {
    var _this = this;

    var x$pop =  _this.down('#cnl_pop_industry_sbi');
    x$pop.show();
    _this.CNL_industry_sbi.reset();
  },

  onMydataview5ItemTap1: function(dataview, index, target, record, e, eOpts) {
    var _this = this;


    if( event_on(e,'.i_delete') ){

      Ext.Msg.confirm("删除确认","您确认删除这条订阅吗？",function(result){
        if( result=='yes' ){
          send_request( {
            api:'sub_del',
            method:'POST',
            params:{
              subscriptionId:record.data.subscriptionId
            },
            success:function(result, request){
              if( result.success ){
                switch( result.code ){
                  case '0000':
                    //成功
                    //console.log(result);
                    toast("订阅删除成功。");
                    _this.update_list();
                    break;
                  case '1001':
                    //失败
                    break;
                  default:
                    toast("errCode:"+result.code);
                    break;
                }
              }else{

              }
            },
            fail:function(result){
              toast("您的网络似乎有点问题，请稍候再试！");
            },
            text:'加载中',
            silent:false,
            trigger:dataview,
            check_login:false
          } );

        }
      });

    }
  },

  onMybutton23Tap31112: function(button, e, eOpts) {
    var _this = this;

    if( !_this.CNL_industry_sbi.pop() ){
      window.setTimeout(function(){
        _this.down('#cnl_pop_industry_sbi').hide();
      },120);
    }

  },

  onMybutton14Tap12: function(button, e, eOpts) {
    var _this = this;

    window.setTimeout(function(){
      _this.down('#cnl_pop_industry_sbi').hide();
    },120);
  },

  initialize: function() {
    this.callParent();

    var _this = this;

    var $list = x$('pos_sub_by_in_list');


    send_request( {
      api:'opt_industry',
      method:'POST',
      params:{
        pageSize:100
      },
      success:function(result, request){
        if( result.success ){
          switch( result.code ){
            case '0000':
              //成功
              _this.init_industry(result.data);
              break;
            case '1001':
              //失败
              break;
            default:
              toast("errCode:"+result.code);
              break;
          }
        }else{

        }
      },
      fail:function(result){
        toast("您的网络似乎有点问题，请稍候再试！");
      },
      text:'加载中',
      silent:false,
      trigger:_this,
      check_login:false,
      group:'p_s_b_p'
    } );




    this.update_list();
  },

  update_list: function(_p) {
    var $list = x$('pos_sub_by_in_list_sub');


    var _this = this;

    send_request( {
      api:'msg.job_subscribe.list',
      method:'POST',
      params:{
        pageSize:100,
        subscriptionType:2
      },
      success:function(result, request){
        if( result.success ){
          switch( result.code ){
            case '0000':
              //成功
              set_store_data( $list,result.data );
              $list.setHeight(result.data.length*59);
              break;
            case '1001':
              //失败
              break;
            default:
              toast("errCode:"+result.code);
              break;
          }
        }else{

        }
      },
      fail:function(result){
        toast("您的网络似乎有点问题，请稍候再试！");
      },
      text:'加载中',
      silent:false,
      trigger:_this,
      check_login:false,
      group:'p_s_b_p'
    } );



  },

  init_industry: function(data) {

    var _this = this;

    data = make_nested_data(data,0,'industryId','industryName');

    var x$pop =  _this.down('#cnl_pop_industry_sbi');
    var x$list = _this.down('#cnl_industry_sbi');


    _this.CNL_industry_sbi = new LD_Nested_List( x$list,data,'items',function(data){

      send_request( {
        api:'sub_add',
        method:'POST',
        params:{
          subscriptionType:2,
          industryId:data.record.industryId
        },
        success:function(result, request){
          if( result.success ){
            switch( result.code ){
              case '0000':
                //成功
                toast('恭喜您，您已订阅成功。');
                x$pop.hide();
                _this.CNL_industry_sbi.reset();
                _this.update_list();
                break;
              case '1001':
                //失败
                break;
              default:
                toast("errCode:"+result.code);
                break;
            }
          }else{

          }
        },
        fail:function(result){
          toast("您的网络似乎有点问题，请稍候再试！");
        },
        text:'加载中',
        silent:false,
        trigger:_this,
        check_login:false
      } );


    } );



  }

});