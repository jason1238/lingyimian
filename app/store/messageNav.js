/*
 * File: app/store/messageNav.js
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

Ext.define('ZJ02.store.messageNav', {
  extend: 'Ext.data.Store',

  requires: [
    'ZJ02.model.messageNav'
  ],

  config: {
    data: [
      {
        title: '我的提醒',
        badge: '',
        action: 'my_notice'
      },
      {
        title: '职位订阅',
        badge: '',
        action: 'job_book'
      },
      {
        title: '面试通知',
        badge: '',
        action: 'interview'
      }/* , {title: '跟帖回复',
      badge: '20',
      action: 'reply'
    }*/],
    model: 'ZJ02.model.messageNav',
    storeId: 'messageNav'
  }
});