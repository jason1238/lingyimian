/*
 * File: app/store/optIndustry.js
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

Ext.define('ZJ02.store.optIndustry', {
  extend: 'Ext.data.Store',

  requires: [
    'ZJ02.model.optIndustry'
  ],

  config: {
    data: [
      {
        industryId: 1,
        industryName: '计算机',
        industryType: 1,
        parentId: 0
      },
      {
        industryId: 2,
        industryName: '互联网',
        industryType: 1,
        parentId: 0
      },
      {
        industryId: 3,
        industryName: '计算机 lv2',
        industryType: 1,
        parentId: 1
      },
      {
        industryId: 4,
        industryName: '计算机 lv2',
        industryType: 1,
        parentId: 1
      },
      {
        industryId: 5,
        industryName: '互联网 lv2',
        industryType: 1,
        parentId: 2
      },
      {
        industryId: 6,
        industryName: '互联网 lv2',
        industryType: 1,
        parentId: 2
      }
    ],
    model: 'ZJ02.model.optIndustry',
    storeId: 'optIndustry'
  }
});