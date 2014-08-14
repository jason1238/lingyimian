//global 
if( typeof window._G == 'undefined' ){
  window._G = {};
}



_G.DEBUG = false;



_G.VER_STR = '1.2.2.9';
_G.VER = 1020209;


_G.PLATFORM = 'android';


_G._AJAX_ROOT = 'http://www.eyoudu.com/jobapi';
//_G._AJAX_ROOT = 'http://127.0.0.1/ZJ02_STAPP/ZJ02/_ajax';
_G.BAIDU_AK = 'XWV87PbnVsMGnrRU3nEBRvnG';
_G.BAIDU_SCRIPT = 'http://api.map.baidu.com/getscript?v=2.0&ak='+_G.BAIDU_AK;

_G._cityId = 2;
_G._cityName = '上海市';

_G.default_location = {lat:31.24916171,lng:121.48789948};

_G.APP = 'ZJ02';

_G.LAST_GEO_UPDATE = 0;
_G.GEO_UPDATE_INTERVAL = 600;


_G.ENUM = null;
_G.CITYS = null;


_G.API_MAP = {
  'login':'/login',
  'register':'/register',
  'reset_pwd':'/findPwd',
  'home_search':'/position/searchPosition',
  'feedback':'/saveFeedBack',
  'logout':'/logout',
  'check_ver':'/checkUpdateVersion',
  
  
  /*选项查询*/
  'opt_functions':'/loadFunctions',
  'opt_industry':'/loadIndustry',
  'opt_school':'/loadSchool',
  'opt_skill':'/loadSkill',
  'opt_salary':'/getSalaryInfoList',
  'enum':'/getAllEnumMap',
  'area_list':'/area/loadAreaList',
  'provice_city':'/area/loadProviceAndCity',

  /*企业*/
  'c_hot':'/company/hotCompany',
  'c_near':'/company/nearbyCompany',
  'c_detail':'/company/detailCompany',

  /*职位*/
  'p_intern':'/position/listInternshipPosition',
  'p_list':'/position/listPosition',
  'p_detail':'/position/detailPosition',
  'p_fav':'/position/favoritePosition',
  'p_apply':'/position/applyPosition',
  'p_search':'/position/searchPosition',
  
  /*个人中心*/
  'user_center':'/user/userCenter',//个人中心
  'apply_list':'/apply/list',//申请记录
  'fav_job_list':'/collect/list',//职位收藏
  'fav_job_del':'/collect/cancelFavorite',//职位收藏
  'who_see_me':'/resume/selectJobWiwLog',//谁看过我
  
  /*简历中心*/
  'resume_center':'/resume/center',
  'resume_delete':'/resume/deleteResume',
  'resume_update':'/resume/updateResume',
  'resume_set_open_status':'/resume/updateResumeOpenStatus',
  'resume_view':'/resume/viewResume',
  'resume_qrcode':'/getQRCode',
  'resume_list':'/resume/getResumeList',
  
  /*宣讲招聘会*/
  'recruit_list':'/recruit/getRecruitmentList',
  'recruit_detail':'/recruit/getRecruitmentDetail',
  'recruit_remind_add':'/recruit/addRemind',
  
  /*消息 - 跟帖回复暂无*/
  'msg.pull':'/pullMessage',
  
  'msg.remider.list':'/remind/listRemind',
  'msg.job_subscribe.list':'/subscribe/selectSubscriptionList',
  'msg.job_subscribe.pos_list':'/subscribe/selectSubscribePosList',
  'sub_add':'/subscribe/addSubscription',
  'sub_del':'/subscribe/delSubscription',
  
  'msg.interview.list':'/audition/listAudition',
  'msg.interview.detail':'/audition/detailAudition',
  
  //'register':_AJAX_ROOT+'/register',
  
  
  /* 账号绑定相关 */
  'bind_sina':'/sina/login', //参数：token,flag
  'bind_qq':'/qq/login',
  'bind_renren':'/renren/login',
  'get_bind':'/getAccessToken', //参数：token,platform
  'del_bind':'/revokeToken', //参数：token,platform
  'check_bind':'/checkBindState', //参数：token,platform  (sina)
  
  
  'bind_iframe_sina':'/sina/bind'
  
};







if( get_s('_AJAX_ROOT') ){
  _G._AJAX_ROOT = get_s('_AJAX_ROOT');
}
if( get_s('_cityId') ){
  _G._cityId = get_s('_cityId');
}




Ext.Ajax.setTimeout(60000);


function get_array_from_store(store){
  
  var ra=[];
  
  var ia = store.getRange();
  
  for( var i=0;i<ia.length;i++ ){
    var data = ia[i].data;
    ra.push(data);
  }
  
  return ra;
}


//jQuery UI Datepicker Lang zhcn
jQuery(function($){
  $.datepicker.regional['zh-CN'] = {
    closeText: '关闭',
    prevText: '&#x3c;上月',
    nextText: '下月&#x3e;',
    currentText: '今天',
    monthNames: ['一月','二月','三月','四月','五月','六月',
    '七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort: ['一','二','三','四','五','六',
    '七','八','九','十','十一','十二'],
    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
    dayNamesMin: ['日','一','二','三','四','五','六'],
    weekHeader: '周',
    dateFormat: 'yy-mm-dd',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: true,
    yearSuffix: '年'};
  $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});
