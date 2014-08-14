/*
 * File: app/view/PublishedArticle.js
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

Ext.define('ZJ02.view.PublishedArticle', {
  extend: 'Ext.Container',

  requires: [
    'ZJ02.view.PublishedArticleList',
    'ZJ02.view.RepliedArticleList',
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
        cls: 'zjs-bg-blue',
        docked: 'top',
        ui: 'zjs',
        title: '我的发布',
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
        xtype: 'tabpanel',
        cls: 'zjs-tab-top',
        items: [
          {
            xtype: 'container',
            title: '我发布的文章',
            layout: 'fit',
            scrollable: 'vertical',
            items: [
              {
                xtype: 'publishedarticlelist'
              }
            ]
          },
          {
            xtype: 'container',
            title: '我参与的评论',
            layout: 'fit',
            scrollable: 'vertical',
            items: [
              {
                xtype: 'repliedarticlelist'
              }
            ]
          }
        ],
        tabBar: {
          cls: 'zjs-bg-blue',
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
        fn: 'onMybutton23Tap',
        event: 'tap',
        delegate: '#mybutton23'
      }
    ]
  },

  onMybutton23Tap: function(button, e, eOpts) {
    button.up('navigationview').pop();
  }

});