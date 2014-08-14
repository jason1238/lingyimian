/*
 * File: app/view/TabFrame.js
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

Ext.define('ZJ02.view.TabFrame', {
  extend: 'Ext.tab.Panel',

  requires: [
    'ZJ02.view.NavTab1',
    'ZJ02.view.NavTab2',
    'ZJ02.view.NavTab3',
    'ZJ02.view.NavTab4',
    'ZJ02.view.NavTab5',
    'Ext.navigation.View',
    'Ext.tab.Bar'
  ],

  config: {
    cls: 'zjs-tabview',
    id: 'TabFrame',
    ui: 'zjs',
    layout: {
      type: 'card',
      animation: false
    },
    items: [
      {
        xtype: 'container',
        title: '首页',
        iconCls: 'zjs-icon-home',
        id: 'tab_home',
        layout: 'card',
        items: [
          {
            xtype: 'nav_tab_1'
          }
        ]
      },
      {
        xtype: 'container',
        title: '求职锦囊',
        iconCls: 'zjs-icon-job',
        hidden: true,
        id: 'tab_article',
        layout: 'card',
        items: [
          {
            xtype: 'navtab2'
          }
        ]
      },
      {
        xtype: 'container',
        title: '个人中心',
        iconCls: 'zjs-icon-people',
        id: 'tab_user',
        layout: 'card',
        items: [
          {
            xtype: 'navtab3'
          }
        ]
      },
      {
        xtype: 'container',
        title: '消息',
        iconCls: 'zjs-icon-mail',
        id: 'tab_msg',
        layout: 'card',
        items: [
          {
            xtype: 'navtab4'
          }
        ]
      },
      {
        xtype: 'container',
        title: '更多',
        iconCls: 'zjs-icon-more',
        id: 'tab_more',
        layout: 'card',
        items: [
          {
            xtype: 'navtab5'
          }
        ]
      }
    ],
    tabBar: {
      cls: 'zjs-tabview-bar',
      docked: 'bottom',
      height: 60,
      padding: '0 5px',
      ui: 'zjs',
      defaults: {
        flex: 1
      }
    },
    listeners: [
      {
        fn: 'onTabFrameActiveItemChange',
        event: 'activeitemchange'
      }
    ]
  },

  onTabFrameActiveItemChange: function(container, value, oldValue, eOpts) {
    console.log(value.id);


    var items = value.getItems();
    var x$cur_nav = items.items[0];


    window.CURRENT_TAB = value;
    window.CURRENT_NAV = x$cur_nav;





    console.log(x$cur_nav);

    switch( value.id ){
      case 'tab_home':
        x$cur_nav.removeAll();
        change_page( 'Home',x$cur_nav );
        break;
      case 'tab_user':
        x$cur_nav.removeAll();
        change_page( 'UserCenter',x$cur_nav );
        break;
      case 'tab_msg':
        x$cur_nav.removeAll();
        change_page( 'PG_Message',x$cur_nav );
        break;
      case 'tab_more':
        x$cur_nav.removeAll();
        change_page( 'More',x$cur_nav );
        break;
    }
  },

  initialize: function() {
    this.callParent();

    window.CURRENT_TAB = this.getItems().items[0];
    window.CURRENT_NAV = CURRENT_TAB.getItems().items[0];


    change_page('Home',window.CURRENT_NAV);
  }

});