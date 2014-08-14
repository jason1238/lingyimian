/*
 * File: app/view/CompanyDetail.js
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

Ext.define('ZJ02.view.CompanyDetail', {
  extend: 'Ext.Container',

  requires: [
    'ZJ02.view.CompanyDetailIntro',
    'ZJ02.view.CompanyDetailPosition',
    'Ext.TitleBar',
    'Ext.Button',
    'Ext.tab.Panel',
    'Ext.tab.Bar'
  ],

  config: {
    cls: 'zjs',
    layout: 'fit',
    items: [
      {
        xtype: 'titlebar',
        cls: 'zjs-bg-green',
        docked: 'top',
        ui: 'zjs',
        title: '企业详情',
        items: [
          {
            xtype: 'button',
            height: 30,
            itemId: 'mybutton24',
            ui: 'plain',
            width: 30,
            icon: '',
            iconCls: 'zjs-icon-back',
            text: 'back'
          }
        ]
      },
      {
        xtype: 'tabpanel',
        activeItem: 1,
        cls: 'zjs-tab-top',
        hidden: false,
        id: 'co_detail_tab',
        itemId: 'co_detail_tab',
        items: [
          {
            xtype: 'container',
            title: '企业简介',
            layout: 'fit',
            items: [
              {
                xtype: 'companydetailintro'
              }
            ]
          },
          {
            xtype: 'container',
            hidden: true
          },
          {
            xtype: 'container',
            title: '企业职位',
            layout: 'fit',
            items: [
              {
                xtype: 'companydetailposition'
              }
            ]
          }
        ],
        tabBar: {
          cls: 'zjs-bg-green',
          docked: 'top',
          itemId: 'mytabbar',
          ui: 'zjs',
          defaults: {
            flex: 1
          }
        }
      }
    ],
    listeners: [
      {
        fn: 'onMybutton23Tap3111',
        event: 'tap',
        delegate: '#mybutton24'
      }
    ]
  },

  onMybutton23Tap3111: function(button, e, eOpts) {
    button.up('navigationview').pop();
  },

  initialize: function() {
    this.callParent();


    var x$tab = x$('co_detail_tab');
    x$tab.setActiveItem(0);
  },

  update: function(_p) {
    var _this = this;

    if( _p && _p.companyId ){

      send_request( {
        api:'c_detail',
        method:'POST',
        params:{
          pageSize:100,
          companyId:_p.companyId
        },
        success:function(result, request){
          if( result.success ){
            switch( result.code ){
              case '0000':
                //成功
                console.log(result);
                _this.build_detail(result.data);
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
        check_login:true
      } );


      send_request( {
        api:'p_list',
        method:'POST',
        params:{
          pageSize:100,
          companyId:_p.companyId
        },
        success:function(result, request){
          if( result.success ){
            switch( result.code ){
              case '0000':
                //成功
                console.log(result);
                _this.build_poslist(result.data);
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
        check_login:true
      } );


    }



  },

  build_detail: function(data) {
    //update company detail
    var x$content = x$('content_c_detail');

    var html = ' <p><strong>企业名称</strong>：'+(data.companyName||'')+'</p> <p><strong>企业介绍</strong>：'+(data.profile||'')+'</p> <p><strong>联系方式</strong><br>   联系人：'+(data.linkmanName||'')+'<br>   电话：'+(data.phone||'')+'<br>   email：'+(data.email||'')+'<br>   地址：'+(data.address||'')+'</p>';
    x$content.setHtml(html);



    refresh_scroll(x$('content_c_detail'));
  },

  build_poslist: function(data) {
    //update position list
    var x$list = x$('list_c_detail_pos_list');



    if(data && data.length){

      for( var i=0;i<data.length;i++ ){
        var date_ra = parse_date(data[i].publishTime,'date_');
        jQuery.extend( data[i],date_ra );
      }

      x$list.removeCls('zj-list-no-data');
      set_store_data( x$list,data );
    }else{
      x$list.addCls('zj-list-no-data');
      set_store_data( x$list,[] );
    }


    refresh_scroll(x$list);
  }

});