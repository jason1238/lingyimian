/*
 * File: app/view/WhoSeeMe.js
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

Ext.define('ZJ02.view.WhoSeeMe', {
  extend: 'Ext.Container',

  requires: [
    'Ext.TitleBar',
    'Ext.Button',
    'Ext.dataview.DataView',
    'Ext.XTemplate'
  ],

  config: {
    cls: 'zjs',
    layout: 'card',
    items: [
      {
        xtype: 'titlebar',
        cls: 'zjs-bg-blue',
        docked: 'top',
        ui: 'zjs',
        title: '谁看过我',
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
        xtype: 'dataview',
        cls: 'zjs-listview-3line-c',
        id: 'list_uc_who_see_me',
        itemId: 'mydataview4',
        minHeight: 180,
        scrollable: 'vertical',
        disableSelection: true,
        itemTpl: [
          '<div class="li">',
          '  <div class="c list_c_who_see_me">',
          '    <div class="cw">',
          '      <h4>{enterpriseName}</h4>',
          '      <div class="cp">',
          '        <div class="cl">',
          '          <p>{industry} {enterpriseTypeName}</p>',
          '          <p><em>查看时间：{date_fullyeardate}</em></p>',
          '        </div>',
          '        <div class="cr">',
          '          <p>&nbsp;</p>',
          '          <p>操作：{viewTypeName}</p>',
          '        </div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '  <div class="i"> <span></span> </div>',
          '</div>',
          ''
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
        fn: 'onList_uc_who_see_meItemTap',
        event: 'itemtap',
        delegate: '#list_uc_who_see_me'
      }
    ]
  },

  onMybutton23Tap: function(button, e, eOpts) {
    button.up('navigationview').pop();
  },

  onList_uc_who_see_meItemTap: function(dataview, index, target, record, e, eOpts) {

    var item_data = record.data;

    console.log(item_data);

    change_page('CompanyDetail',dataview,{companyId:item_data.enterpriseId});


  },

  initialize: function() {
    this.callParent();
  },

  update: function(_p) {
    var _this = this;


    //if( _p && _p.keywords ){

      send_request( {
        api:'who_see_me',
        method:'POST',
        params:{
          pageSize:100,
          resumeId:_p.resumeId
        },
        success:function(result, request){
          if( result.success ){
            switch( result.code ){
              case '0000':
                //成功
                console.log(result);
                _this.build_list(result.data);
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

    //}



  },

  build_list: function(data) {
    var x$list = x$('list_uc_who_see_me');


    if(data && data.length){

      for( var i=0;i<data.length;i++ ){
        var date_ra = parse_date(data[i].viewTime,'date_');
        jQuery.extend( data[i],date_ra );
      }

      x$list.removeCls('zj-list-no-data');
      x$list.setData(data);
    }else{
      x$list.addCls('zj-list-no-data');
      x$list.removeAll();
    }


    refresh_scroll(x$list);
  }

});