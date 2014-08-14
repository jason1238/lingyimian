/*
 * File: app/view/PositionSubscribe.js
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

Ext.define('ZJ02.view.PositionSubscribe', {
  extend: 'Ext.Container',

  requires: [
    'ZJ02.view.PositionSubscribeByPosition',
    'ZJ02.view.PositionSubscribeByCompany',
    'ZJ02.view.PositionSubscribeByIndustry',
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
        title: '职位订阅',
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
        cls: 'zjs-tab-top',
        id: 'pos_sub_tab',
        itemId: 'mytabpanel',
        items: [
          {
            xtype: 'container',
            title: '按职位',
            layout: 'fit',
            items: [
              {
                xtype: 'positionsubscribebyposition'
              }
            ]
          },
          {
            xtype: 'container',
            title: '按企业',
            layout: 'fit',
            items: [
              {
                xtype: 'positionsubscribebycompany'
              }
            ]
          },
          {
            xtype: 'container',
            title: '按行业',
            layout: 'fit',
            items: [
              {
                xtype: 'positionsubscribebyindustry'
              }
            ]
          }
        ],
        tabBar: {
          cls: 'zjs-bg-green',
          docked: 'top',
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
      },
      {
        fn: 'onPos_sub_tabActiveItemChange',
        event: 'activeitemchange',
        delegate: '#pos_sub_tab'
      }
    ]
  },

  onMybutton23Tap3111: function(button, e, eOpts) {
    button.up('navigationview').pop();
  },

  onPos_sub_tabActiveItemChange: function(container, value, oldValue, eOpts) {


    console.log('ACTIVE ITEM CHANGE');
  },

  update: function(_p) {


    var x$tab = x$('pos_sub_tab');
    x$tab.setActiveItem(0);


    this.down('positionsubscribebyposition').update();
  }

});