/*
 * File: app/store/moreNav.js
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

Ext.define('ZJ02.store.moreNav', {
  extend: 'Ext.data.Store',

  requires: [
    'ZJ02.model.moreNav'
  ],

  config: {
    data: [
      {
        title: '推送设置',
        action: 'push_setting'
      },
      {
        title: '账号绑定',
        action: 'account_bind'
      },
      {
        title: '意见反馈',
        action: 'feedback'
      },
      {
        title: '清除缓存',
        action: 'clear_cache'
      },
      {
        title: '检查更新',
        action: 'check_update'
      },
      {
        title: 'APP介绍',
        action: 'app_introduction'
      },
      {
        title: '退出当前账号',
        action: 'account_quit'
      }/*, {title: 'App Config',
      action: 'app_config'
    }*/
  ],
    model: 'ZJ02.model.moreNav',
    storeId: 'moreNav'
  }
});