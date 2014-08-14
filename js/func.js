// JavaScript Document


window.x$ = Ext.getCmp;
window.s$ = Ext.getStore;



window.i$ = function( item_id,_this ){
  if( _this ){
    return _this.down('#'+item_id);
  }else{
    return null;
  }
};


window.v$ = function( c,_this,value ){
  
  if( typeof c == 'string' ){
    if( _this ){
      c = i$(c,_this);
    }else{
      return null;
    }
  }
  
  if(typeof value != 'undefined'){
    c.setValue(value);
  }
  
  return jQuery.trim(c.getValue());
};



window.j$ = function( item ){
  return jQuery('#'+item.getId());
};



//https://github.com/marcuswestin/store.js/issues/42
function isLocalStorageNameSupported() {
  var testKey = 'test', storage = window.sessionStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return localStorageName in win && win[localStorageName];
  } catch (error) {
    return false;
  }
}


window.local_storage_supported = true;

window.get_s = function(key){
  if( local_storage_supported ){
    return window.localStorage.getItem(key);
  }else{
    return false;
  }
  
};

window.set_s = function(key,value){
	if( local_storage_supported ){
    return window.localStorage.setItem(key,value);
  }else{
    return false;
  }
};

window.get_o = function (key){
	return JSON.parse(get_s(key));
};

window.set_o = function (key,value){
	return set_s(key,JSON.stringify(value));
};


window.set_value_silent = function(cmp,value){
  cmp.suspendEvents();
  cmp.setValue(value);
  cmp.resumeEvents(true);  
};


window.change_city = function(id,name){
  
  x$city_btn = x$('btn-home-nav-city');
  
  x$city_btn.setText(name);
  
  $city_btn = j$(x$city_btn);
  
  
  $city_btn.attr('style',false);
  
  set_s('_cityId',id);
  set_s('_cityName',name);
  
  _G._cityId = id;
  _G._cityName = name;

};

window.get_city = function(){
  var city_id = get_s('_cityId') || _G._cityId;
  var city_name = get_s('_cityName') || _G._cityName;
  return {id:city_id,name:city_name};
};



window.cut_time = function(time_str){
  return time_str.slice(0,10);
};



window.build_api =function(name){
  var rs = '';
  if( typeof _G.API_MAP[name] == 'undefined' ){
    toast("API 未定义");
    return false;
  }else{
    return _G._AJAX_ROOT + _G.API_MAP[name];// + '/';
  }
};


/*
send_request( {
  api:null,
  method:'GET',
  params:null,
  success:null,
  fail:null,
  complete:null,
  error:null,
  text:'加载中',
  silent:false,
  trigger:null,
  check_login:true
} );
*/

window.send_request_list = {};

window.in_request = function(){
  var count = 0;
  for( var key in send_request_list ){
    count++;
  }
  return count ? true : false;
};

window.triggle_request = function(){
  var sum_key = 1;
  for( var key in send_request_list ){
    sum_key += parseInt(key);
  }
  send_request_list[sum_key]=window.setTimeout(function(){
    clear_request(sum_key);
  },29000);
  return sum_key;
};

window.clear_request = function(key){
  clearTimeout(send_request_list[key]);
  delete send_request_list[key];
};

window.send_request = function( _p ){
  
  var default_p = {
    api:null,
    method:'GET',
    params:null,
    success:null,
    fail:null,
    complete:null,
    error:null,
    text:'加载中',
    silent:false,
    trigger:null,
    check_login:true,
    group:null
  };
  
  var timeout = 15;
  
  _p = jQuery.extend( default_p,_p );
  
  
  _p.check_login = true;
  
  
  if( _p.force_no_login ){
    _p.check_login = false;
  }
  
  //var request_key = null;
  
  
  if( !_p.silent ){
    //if( !in_request() ){
      Ext.Viewport.setMasked({
          xtype: 'loadmask',
          message: _p.text,
          transparent:true
      });
    //}
    //request_key = triggle_request();
  }
  
  var params = {
    
  };
  
  var token = get_s('token');
  if(token){
    params.token = token;
  }
  params.cityId = _G._cityId;
  params = jQuery.extend( params,_p.params );
  
  //console.log(params);
  
  var request = Ext.data.JsonP.request({
      url: build_api(_p.api),
      callbackKey: 'callback',
      params:params,
      timeout:10000,
      success: function(result, req) {
        
        //console.log('REQ SUCCESS');
        //console.log(window.send_request_callname_list[req.callbackName].status);
        
        if( window.send_request_callname_list[req.callbackName].status == 'timeout' ){
          console.log('TIMEOUT RETURN');
          return;
        }
        
        window.send_request_callname_list[req.callbackName].status = 'success';
        //console.log('REQ SUCCESS Change');
        //console.log(window.send_request_callname_list[req.callbackName].status);
        
        
        var group_name = send_request_callname_2_group[req.callbackName];
        if( group_name ){
          window.send_request_group_da[group_name][req.callbackName] = 0;
        }
        
        
        if( !_p.silent ){

          if (!check_group(group_name) ){
            Ext.Viewport.unmask();
          }
          
        }
        
        
        if( _p.check_login && result && result.code == '0004' ){
          show_login(_p.trigger);
          return;
        }
        
        if( typeof _p.success == 'function' ){
          _p.success.apply(req,[result]);
        }
        
        if( typeof _p.complete == 'function' ){
          _p.complete.apply(req,[result]);
        }
        
        
        //console.log('UNMASK');
        
        
        check_group(group_name);
        
      },failure:function(result, req){
        
        
        //console.log('REQ FAILURE');
        //console.log(window.send_request_callname_list[req.callbackName].status);
        
        
        if( window.send_request_callname_list[req.callbackName].status == 'success' ){
          console.log('SUCCESS RETURN');
          return;
        }
        
        
        var group_name = send_request_callname_2_group[req.callbackName];
        if( group_name ){
          window.send_request_group_da[group_name][req.callbackName] = 0;
        }
        
        //console.log('failure');
        
        if( !_p.silent ){
          
          if( send_request_callname_list[req.callbackName].status == 'timeout' ){
            toast('您的网络似乎有点问题，请稍候再试！');
          }
        
          if (!check_group(group_name) ){
            Ext.Viewport.unmask();
          }
          
        }
        
        
        if( typeof _p.fail == 'function' ){
          _p.fail.apply(req,[result]);
        }
        
        if( typeof _p.complete == 'function' ){
          _p.complete.apply(req,[result]);
        }
        
        
      }
  });
  
  
  // request management
  if( typeof window.send_request_callname_list == 'undefined' ){
    window.send_request_callname_list = {};
  }
  
  window.send_request_callname_list[request.callbackName] = {
    'status':'pending',
    'request':request
  };
  
  (function(){
    var _request = request;
    
    window.setTimeout(function(){
      
      console.log('TIMEOUT TEST');
      console.log(window.send_request_callname_list[_request.callbackName].status == 'pending');
      
      if( window.send_request_callname_list[_request.callbackName].status == 'pending' ){
        window.send_request_callname_list[_request.callbackName].status = 'timeout';
        _request.failure( 'timeout',_request );
        console.log('TIMEOUT REQUEST');        
      }
    },timeout*1000);
  })();
  
  
  if( typeof window.send_request_callname_2_group == 'undefined' ){
      window.send_request_callname_2_group = {};
  }
  if(_p.group){
    send_request_callname_2_group[request.callbackName] = _p.group;
    
    if( typeof window.send_request_group_da == 'undefined' ){
      window.send_request_group_da = {};
    }
    
    if( typeof window.send_request_group_da[_p.group] == 'undefined' ){
      window.send_request_group_da[_p.group] = {};
    }
    
    //console.log(request.callbackName);
    
    window.send_request_group_da[_p.group][request.callbackName] = 1;
    
  }
  
    
  var check_group = function( group_name ){
    if( typeof group_name == 'undefined' || typeof window.send_request_group_da[group_name] == 'undefined' ){
      return 0;
    }else{
      var sum = 0;
      for(var k in send_request_group_da[group_name]){
        sum += send_request_group_da[group_name][k];
      }
      
      //console.log('GROUP '+group_name+' SUM ' + sum);
      return sum;  
    }
  };
  
  
  
  //console.log('SEND REQUEST');
  //console.log(request);
  
  
};




window.clear_data = function(){
	window.localStorage.clear();
};



window.toast = function(msg,fadeout){
  if( typeof window.pgtoast == 'undefined' ){
    window.pgtoast = new PG_Toast({ prefix:'zjs-' });
  }
  window.pgtoast.clear();
  window.pgtoast.add(msg,fadeout);
};


window.change_page = function( page,x$trigger,params_obj ){
  
  
  console.log('CHANGE PAGE ' + page);
  
  var x$page = x$(page);
  
  if( !x$page ){
    x$page = Ext.create(_G.APP + '.view.' + page, {fullscreen: true});
    //console.log( 'CHANGE PAGE TO CLASS ' + page );
  }else{
    //console.log( 'CHANGE PAGE TO OBJ ' + page );
  }
  
  
  if(x$trigger){
    var x$nav_view;
    if( x$trigger.isXType('navigationview') ){
      x$nav_view = x$trigger;
    }else{
      x$nav_view = x$trigger.up('navigationview');
    }
    
    if(x$nav_view){
      x$nav_view.push(x$page);    
    }else{
      Ext.Viewport.setActiveItem(x$page);
    }
  }else{
    Ext.Viewport.setActiveItem(x$page);
  }
  
  
  if(typeof x$page.update == 'function'){
    x$page.update.apply(x$page,[params_obj]);
  }
  
};



window.set_alert = function( id,msg,time ){
  
  if( !window.alert_list ){
    window.alert_list = {};
  }
  
  var alert_date = window.parse_date(time);
  var alert_ts = alert_date.timestamp;
  
  var now_date = window.parse_date(new Date());
  var now_ts = now_date.timestamp;
  
  var ts_diff = alert_ts - now_ts;
  
  if( ts_diff > 0 && ts_diff < 300 ){
    
    (function(){
      
      var d_msg = msg;
      
      window.alert_list[id] = setTimeout(function(){
        console.log('提醒');
        Ext.Msg.alert('提醒',d_msg);
      },ts_diff*1000);
      
    })();
    
  }
  
  //console.log(alert_ts - now_ts);
  
};



window.alert_update = function(){
  
  
  send_request( {
    api:'msg.remider.list',
    method:'POST',
    params:{
      pageSize:999
    },
    success:function(result, request){
      if( result.success ){
        switch( result.code ){
          case '0000':

            for( var i in window.alert_list ){
              clearTimeout( window.alert_list[i] );
            }
            
            if( result.data && result.data.length ){
              for( var i=0;i<result.data.length;i++ ){
                var cur_item = result.data[i];
                var msg = cur_item.remindTitle+' 即将开始。请做好准备。';
                set_alert( cur_item.remindId,msg,cur_item.remindTime );
              }
            }
            
            
            break;
        }
      }else{

      }
    },
    fail:function(result){
      //toast("您的网络似乎有点问题，请稍候再试！");
    },
    text:'加载中',
    silent:true,
    trigger:null,
    force_no_login:true
  } );  
  
  
  
};


window.go_home = function(){
  var x$TabFrame = x$('TabFrame');
  var x$NavTab1 = x$('NavTab1');
  var x$Home = x$('Home');
  x$TabFrame.setActiveItem(0);
  x$NavTab1.reset();
  x$Home.update.apply(x$Home);
  Ext.Viewport.setActiveItem(x$TabFrame);
};


window.logout = function(callback,callback_e){
  
  var silent = true;
  if( typeof callback == 'function' ){
    silent = false;
  }
  
  console.log(silent);
  
  send_request( {
    api:'logout',
    method:'POST',
    params:{},
    success:function(result, request){
      if( result.success ){
        switch( result.code ){
          case '0000':
            //成功
            set_s('token','');
            
            if( typeof callback == 'function' ){
              callback(result);
            }
            
            break;
          default:
            if( typeof callback_e == 'function' ){
              callback_e(result);
            }
            break;
        }
      }else{

      }
    },
    fail:function(result){
      if(!silent){
        toast("您的网络似乎有点问题，请稍候再试！");
      }
    },
    text:'加载中',
    silent:silent,
    trigger:null,
    check_login:false
  } );  
  
  
  
};

window.is_login = function(){
  var token = get_s('token');
  if( token ){
    return true;
  }
  return false;
};




window.parse_date = function( str_time,_prefix ){
  
  if( !str_time ) return '';
  
  
  var prefix = _prefix?_prefix:'';
  
  var ro = {};
  
  var time = str_time;
  if( str_time instanceof Date ){
  }else{
    
    str_time = str_time.replace(/-/g,'/');
    //console.log(str_time);
    time = new Date( str_time );
  }
  
  var local_day_da = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
  var local_month_da = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  
  ro[prefix+'year'] = time.getFullYear();
  ro[prefix+'month'] = ('00' + (time.getMonth()+1)).slice(-2);
  ro[prefix+'date'] = ('00' + time.getDate()).slice(-2);
  ro[prefix+'day'] = ('00' + (time.getDay()+1)).slice(-2);
  ro[prefix+'localmonth'] = local_month_da[time.getMonth()];
  ro[prefix+'localday'] = local_day_da[time.getDay()];
  ro[prefix+'hour'] = ('00' + time.getHours()).slice(-2);
  ro[prefix+'minute'] = ('00' + time.getMinutes()).slice(-2);
  ro[prefix+'second'] = ('00' + time.getSeconds()).slice(-2);
  ro[prefix+'time'] = ro[prefix+'hour']+':'+ro[prefix+'minute']+':'+ro[prefix+'second'];
  ro[prefix+'fullyeardate'] = ro[prefix+'year']+'-'+ro[prefix+'month']+'-'+ro[prefix+'date'];
  ro[prefix+'fullyeardatetime'] = ro[prefix+'year']+'-'+ro[prefix+'month']+'-'+ro[prefix+'date']+' '+ro[prefix+'time'];
  ro[prefix+'localfulldate'] = (time.getMonth()+1)+'月'+time.getDate()+'日';
  ro[prefix+'dateobj'] = time;
  ro[prefix+'timestamp'] = (''+time.getTime()).slice(0,-3);
  
  
  if( time.getHours()>=12 ){
    ro[prefix+'am'] = 'PM';
  }else{
    ro[prefix+'am'] = 'AM';
  }
  
  
  //console.log(ro);
  return ro;
};


window.has_class = function( cmp,classname ){
  var cls = cmp.getCls();
  if ( jQuery.inArray( classname,cls ) >= 0 ){
    return true;
  }else{
    return false;
  }  
};

window.is_active = function( button ){
  var cls = button.getCls();
  if ( jQuery.inArray( 'btn-active',cls ) >= 0 && jQuery.inArray( 'x-button-pressed',cls ) >= 0 ){
    return true;
  }else{
    return false;
  }
};

window.set_active = function( button ){
  button.addCls('x-button-pressed');
  button.addCls('btn-active');
};

window.clr_active = function( button ){
  button.removeCls('x-button-pressed');
  button.removeCls('btn-active');
};


window.set_data = function(id,key,value){
  var $obj = null;
  if( id instanceof Object ){
    $obj = jQuery('#'+id.id);
  }else{
    $obj = jQuery('#'+id);
  }
  $obj.data(key,value);
};

window.get_data = function(id,key){
  var $obj = null;
  if( id instanceof Object ){
    $obj = jQuery('#'+id.id);
  }else{
    $obj = jQuery('#'+id);
  }
  return $obj.data(key);
};


window.set_store_data = function(cmp,data){
  var store = cmp.getStore();
  if(store){
    store.setData(data);
  }else{
    if(data.length){
      cmp.setData(data);
    }    
  }
};


window.event_on = function(event,selector){
  var $target = jQuery(event.target);
  if( $target.is(selector) || $target.parents(selector).length ){
    return true;
  }
  return false;
};


window.reload_app = function(){
  window.location.reload();
};


window.fix_cn = function(value){
  return encodeURI(encodeURI(value));
};





window.make_nested_data = function( data,parent_id,id_key,text_key,_parent_key ){
  
  var parent_key = _parent_key || 'parentId';
  
  var ra = [];
  for( var i=0;i<data.length;i++ ){
    if( data[i][parent_key] == parent_id ){
      
      var childs = make_nested_data( data,data[i][id_key],id_key,text_key,_parent_key );
      
      var item = {
        'text':data[i][text_key],
        'record':data[i]
      };
      
      
      if( childs.length === 0 ){
        item.leaf = true;
      }else{
        item.items = childs;
        
         
        
      }
      
      ra.push(item);
    }
  }
  
  
  //console.log(ra);
      
  return ra;
  
};


window.get_map_api = function(_cb,_silent){
	
	var timeout_handler = window.setTimeout(function(){
		!_silent || toast('地图API加载超时，请重试。');
		_cb(null);
	},10000);
	
	console.log(_G.BAIDU_SCRIPT);
	
	
	if( typeof BMap == 'undefined' ){
		jQuery.getScript(_G.BAIDU_SCRIPT,function(data,status,xhr){
			console.log( 'BAIDU MAP API LOADED ' + status );
			console.log(BMap);
			if( typeof _cb == 'function' ) _cb(BMap);
			window.clearTimeout(timeout_handler);
		});
	}else{
		if( typeof _cb == 'function' ) _cb(BMap);
		window.clearTimeout(timeout_handler);
	}
	
};



window.get_ip_location = function(_cb_success,_cb_fail){
  
  var ak = _G.BAIDU_AK;
  var api_url = 'http://api.map.baidu.com/location/ip';
  
  var request_url = api_url + '?ak='+ak + '&coor=bd09ll';
  
  
  Ext.data.JsonP.request({
    url: request_url,
    callbackKey: 'callback',
    timeout:10000,
    success: function(result, request) {
      
      console.log(result);
      
      if( typeof result.content.point == 'undefined' ){
        if( typeof _cb_fail == 'function' ){
          _cb_fail(result);
        }
      }else{
        if( typeof _cb_success == 'function' ){
          var result_obj = {
            point:{
              lat:result.content.point.y,
              lng:result.content.point.x
            }
          };
          _cb_success(result_obj);
        }
      }
    },
    failure: function(result, request) {
      if( typeof _cb_fail == 'function' ){
        _cb_fail(result);
      }
    }
  });
  
};



window.update_location = function(callback,params){
	
	console.log('update_location');
	
  var default_params = {
    silent:true
  };
  
  var _p = jQuery.extend(default_params,params);
  
  
	get_map_api(function(BMap){
		
		console.log('get_map_api');
		console.log(BMap);
		if(BMap){
			
			if(!_p.silent){
				Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: '定位中，请稍候。',
						transparent:true
				});
			}
			
			var found_pos = function(position){
	
				if(!_p.silent){
					Ext.Viewport.unmask();
				}
				
				window.lat=position.point.lat;
				window.lng=position.point.lng;
				
				_G.LAST_GEO_UPDATE = parseInt((new Date()).getTime()/1000);
				
				console.log('Location Update: lat:'+lat+' lng:'+lng);
				if ( typeof callback == 'function' ){
					callback.apply(this,[{lat:position.point.lat,lng:position.point.lng},'SUCCESS'],position);
				}
				
			};
			
			
			
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
							//console.log(r);
							found_pos(r);
							//var mk = new BMap.Marker(r.point);
							//map.addOverlay(mk);
							//map.panTo(r.point);
							//toast('您的位置：'+r.point.lng+','+r.point.lat);
					}
					else {
						//toast('failed '+this.getStatus());
						get_ip_location(function(pos){
              found_pos(pos);
            },function(){
              callback.apply(this,[null,'ERROR',this.getStatus()]);
              Ext.Viewport.unmask();
            });

					}        
			},{
				enableHighAccuracy: false,
				maximumAge: 600000, 
				timeout: 5000
			});
			
			
			/*
			//hight accruate
			navigator.geolocation.getCurrentPosition(function(position){
				found_pos(position);
			},function(error){
				console.log('High Location Error: ' + error.message);   
				//low accuracy try
				navigator.geolocation.getCurrentPosition(function(position){
					found_pos(position);
				},function(){
					if(!_p.silent){
						Ext.Viewport.unmask();
					}
					console.log(error);
					if ( typeof callback == 'function' ){
						callback.apply(this,[null,'ERROR',error]);
					}
					console.log('Location Error: ' + error.message);        
				},{
					maximumAge: 600000, 
					timeout: 10000,
					enableHighAccuracy: false
				});
	
			},{ 
				maximumAge: 600000, 
				timeout: 5000,
				enableHighAccuracy: true
			});
			*/
			
			
		}else{
			if ( typeof callback == 'function' ){
				callback.apply(this,[null,'NO_SERVICE']);
			}
			console.log('Location Service unavaliable');
		}
	
	},false);
	
};




window.update_location_old = function(callback,params){
  
  var default_params = {
    silent:true
  };
  
  var _p = jQuery.extend(default_params,params);
  
  
  if(navigator.geolocation){
    
    
    if(!_p.silent){
      Ext.Viewport.setMasked({
          xtype: 'loadmask',
          message: '定位中，请稍候。',
          transparent:true
      });
    }
    
    
    var found_pos = function(position){

      if(!_p.silent){
        Ext.Viewport.unmask();
      }
      
      window.lat=position.coords.latitude;
      window.lng=position.coords.longitude;
      
      _G.LAST_GEO_UPDATE = parseInt((new Date()).getTime()/1000);
      
      console.log('Location Update: lat:'+lat+' lng:'+lng);
      if ( typeof callback == 'function' ){
        callback.apply(this,[{lat:position.coords.latitude,lng:position.coords.longitude},'SUCCESS'],position);
      }
      
    };
    
    
    //hight accruate
    navigator.geolocation.getCurrentPosition(function(position){
      found_pos(position);
    },function(error){
      console.log('High Location Error: ' + error.message);   
      //low accuracy try
      navigator.geolocation.getCurrentPosition(function(position){
        found_pos(position);
      },function(){
        if(!_p.silent){
          Ext.Viewport.unmask();
        }
        console.log(error);
        if ( typeof callback == 'function' ){
          callback.apply(this,[null,'ERROR',error]);
        }
        console.log('Location Error: ' + error.message);        
      },{
        maximumAge: 600000, 
        timeout: 10000,
        enableHighAccuracy: false
      });

    },{ 
      maximumAge: 600000, 
      timeout: 5000,
      enableHighAccuracy: true
    });
  }else{
    if ( typeof callback == 'function' ){
      callback.apply(this,[null,'NO_SERVICE']);
    }
    console.log('Location Service unavaliable');
  }
};





window.get_location = function(){
  var lat = window.lat || _G.default_location.lat;
  var lng = window.lng || _G.default_location.lng;
  return {lat:lat,lng:lng};
};


window.fix_location = function(loc){
  return {
    lat:loc.lng,
    lng:loc.lat
  };
};





window.need_geo_update = function(){
  var cur_ts = parseInt((new Date()).getTime()/1000);
  if( ( cur_ts - _G.GEO_UPDATE_INTERVAL ) > _G.LAST_GEO_UPDATE ){
    return true;
  }else{
    return false;
  }
};



window.add_sys_alert = function( type,id,time_event,time_pre,msg ){
  
};


window.get_enum = function(callback){
  if( _G.ENUM ){
    callback(_G.ENUM);
  }else{
    
    send_request( {
      api:'enum',
      method:'POST',
      params:{
        pageSize:100
      },
      success:function(result, request){
        if( result.success ){
          switch( result.code ){
            case '0000':
              //成功
              _G.ENUM = result.data;
              callback(_G.ENUM);
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
      trigger:null,
      check_login:false
    } );
        
    
    
  }
};



window.get_citys = function(callback){
  if( _G.CITYS ){
    callback(_G.CITYS);
  }else{
    
    send_request( {
      api:'provice_city',
      method:'POST',
      params:{
        pageSize:1000
      },
      success:function(result, request){
        if( result.success ){
          switch( result.code ){
            case '0000':
              //成功
              _G.CITYS = result.data;
              callback(_G.CITYS);
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
      trigger:null,
      check_login:false
    } );
        
    
    
  }
};



//platform = sina | qq
window.get_access_token = function( _cb,platform ){
  
  var cb = _cb || function(){};

  var params = {};
  if(platform){
    params.platform = platform;
  }


  send_request( {
    api:'get_bind',
    method:'POST',
    params:params,
    success:function(result, request){
      if( result.success ){
        switch( result.code ){
          case '0000':
            //成功
            cb(result.data,true);
            break;
          default:
            cb(result,false);
            break;
        }
      }else{
  
      }
    },
    fail:function(result){
      cb(result,false);
      
      
    },
    text:'加载中',
    silent:true,
    trigger:null,
    check_login:false
  } );  
  
};




//platform = sina | qq
window.unbind_sns = function( _cb,platform,_silent ){
  var cb = _cb || function(){};
  
  var params = {};
  if(platform){
    params.platform = platform;
  }
    
  send_request( {
    api:'del_bind',
    method:'POST',
    params:params,
    success:function(result, request){
      if( result.success ){
        switch( result.code ){
          case '0000':
            //成功
            cb(result.data,true);
            break;
          default:
            cb(result,false);
            break;
        }
      }else{
        cb(result,false);
      }
    },
    fail:function(result){
      cb(result,false);
    },
    text:'加载中',
    silent:_silent,
    trigger:null,
    check_login:false
  } );  
  
};



window.share_to_sina = function( access_token,content,_cb ){
  

  Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: '提交中，请稍候。',
      transparent:true
  });

  
  var cb = _cb || function(){};
  
  var params = {
    access_token:access_token,
    status:content
  };
  
  console.log(params);
  
  var $target_iframe = jQuery('<iframe id="iframe_submit_sina"></iframe>').css({
    width:0,
    height:0,
    overflow:'hidden',
    position:'absolute',
    left:'0',
    top:'0'
  }).appendTo('body');
  
  var $post_form = jQuery('<form action="https://api.weibo.com/2/statuses/update.json" method="post" target="iframe_submit_sina"></form>').css({
    width:0,
    height:0,
    overflow:'hidden',
    position:'absolute',
    left:'0',
    top:'0'
  }).appendTo('body');
  
  var $access_token = jQuery('<input type="hidden" name="access_token" value="'+params.access_token+'" >').appendTo($post_form);
  var $status = jQuery('<input type="hidden" name="status" value="'+params.status+'" >').appendTo($post_form);
  
  
  $post_form.submit();
  
  window.setTimeout(function(){
    $target_iframe.remove();
    $post_form.remove();
    
    
    
  },5000);


  window.setTimeout(function(){
    Ext.Viewport.unmask();
    cb();
  },2000);  
  
  
  /*
  Ext.data.JsonP.request({
      url: 'https://api.weibo.com/2/statuses/update.json',
      callbackKey: 'callback',
      params:params,
      success: function(result, request) {
        console.log('success');
        console.log(result);

      },failure:function(result, request){
        console.log('failure');

      },callback:function(result, request){
        console.log('complete');

      }
  });
  */
  
};




window.check_new_version = function(_cb,_silent){
  
  var cb = _cb || function(){};
  var silent = _silent || false;
  
  var params = {
    'versionNumber':_G.VER,
    'platform':_G.PLATFORM
  };
  
  send_request( {
    api:'check_ver',
    method:'POST',
    params:params,
    success:function(result, request){
      if( result.success ){
        switch( result.code ){
          case '0000':
            //成功
            cb(result.data,true);
            break;
          default:
            cb(result,false);
            break;
        }
      }else{
  
      }
    },
    fail:function(result){
      cb(result,false);
    },
    text:'加载中',
    silent:silent,
    trigger:null,
    check_login:false
  } );    
  
  
};



window.refresh_scroll = function(cmp){
  var scroll =  cmp.getScrollable();
  if(scroll){
    var scroller = scroll.getScroller();
    if(scroller){
      scroller.refresh();
    }
  }
};



window.resume_refresh = function(id,page_id){
  send_request( {
    api:'resume_update',
    method:'POST',
    params:{
      resumeId:id
      //pageSize:100,
    },
    success:function(result, request){
      if( result.success ){
        switch( result.code ){
          case '0000':
            //成功
            //console.log(result);
            toast("您的简历已刷新。");
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
    trigger:x$(page_id),
    check_login:false
  } );  
};

window.resume_preview = function(id,page_id){
  change_page('ResumePreview',x$(page_id),{resume_id:id});
};

window.resume_private = function(id,page_id){
  
  window.resume_private_id = id;
  
  var x$select_open_status = x$('resume_center_open_status');
  x$select_open_status.showPicker();
};

window.resume_delete = function(id,page_id){
   
  var x$page = x$(page_id);
  
  
  Ext.Msg.confirm("删除确认","您确认删除您的简历吗？",function(result){
    if( result=='yes' ){
  
      send_request( {
        api:'resume_delete',
        method:'POST',
        params:{
          resumeId:id
          //pageSize:100,
        },
        success:function(result, request){
          if( result.success ){
            switch( result.code ){
              case '0000':
                //成功
                //console.log(result);
                toast("您的简历已被删除。");
                var this_page = x$(page_id);
                var nav = this_page.up('navigationview');
                var last_page = nav.pop();
                last_page.update();
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
        trigger:x$(page_id),
        check_login:false
      } );
  
    }
  });    
};



window.nselect_init = function( x$c , data , on_change ){
  
  var id = x$c.getId();
  
  var $c = jQuery('#'+id);
      
  var $w = $c.find('.x-field-input').empty();
  
  if(data && data.length){

    var options_html = '';  

    for( var i=0;i<data.length;i++ ){
      options_html += '<option value="'+data[i].value+'">'+data[i].text+'</option>';
    }
  
    var $s = jQuery( '<select class="x-native-select">'+options_html+'</select>' );
    
    $s.change(function(){
      var select = $s;
      var new_value = $s.val();
      var new_text = $s.find('option:selected').text();
      if( typeof on_change == 'function' ){
        on_change.apply(x$c,[select,new_value,new_text]);
      }
    });
    
    $w.append($s);
  }
  
};

window.nselect_set_val = function( x$c,value ){
  var $c = j$(x$c);
  var $s = $c.find('select');
  $s.val(value);
  return value;
};


window.nselect_get_val = function( x$c ){
  var $c = j$(x$c);
  var $s = $c.find('select');
  return $s.val();
};



window.gselect_init = function( x$c , data , on_change ){
  
  var id = x$c.getId();
  
  var $c = jQuery('#'+id);
      
  var $w = $c.find('.x-field-input').empty();
  
  if(data && data.length){
    
    var options_html = '';  

    for( var i=0;i<data.length;i++ ){
      options_html += '<optgroup label="'+data[i].label+'">';
      for( var j=0;j<data[i].childs.length;j++ ){
        options_html += '<option value="'+data[i].childs[j].value+'">'+data[i].childs[j].text+'</option>';
      }
      options_html += '</optgroup>';
    }
    
    var $s = jQuery( '<select class="x-native-select">'+options_html+'</select>' );
    
    $s.change(function(){
      var select = $s;
      var new_value = $s.val();
      var new_text = $s.find('option:selected').text();
      if( typeof on_change == 'function' ){
        on_change.apply(x$c,[select,new_value,new_text]);
      }
    });
    
    $w.append($s);
  }
  
};

window.gselect_set_val = function( x$c,value ){
  var $c = j$(x$c);
  var $s = $c.find('select');
  $s.val(value);
  return value;
};


window.gselect_get_val = function( x$c ){
  var $c = j$(x$c);
  var $s = $c.find('select');
  return $s.val();
};




window.get_return_url = function(platform){
  
  var base_url = window.location.href;
  if( /^(.*?)\/index\.html$/.test(window.location.href) ){
    base_url = base_url.slice(0,-11);
  }
  
  //console.log(base_url);
  
  return base_url + '/pop_view.html';
};


//class LD_Nested_List
window.LD_Nested_List = function( x$list,nested_data,key_childs,fn_leaf_click ){
  this.list = x$list;
  this.data = nested_data;
  this.data_stack = [];
  this.key_childs = key_childs;
  this.fn_leaf_click = ( typeof fn_leaf_click == 'function' ) ? fn_leaf_click : function(){};
  this.init();
};


window.LD_Nested_List.prototype.init = function(){
  var _this = this;

  set_store_data( this.list,[] );
  refresh_scroll(this.list);
  
  this.list.addListener( 'itemtap',function( __this, index, target, record, e, eOpts ){
    var data = record.data;

    console.log(data);

    if( data.__is_leaf ){
      _this.fn_leaf_click(data);
    }else{
      _this.push(data[_this.key_childs]);
    }

  } );

  this.push(this.data);
};


window.LD_Nested_List.prototype.show = function(){
  this.list.show();
};


window.LD_Nested_List.prototype.hide = function(){
  var this_list = this.list;
  window.setTimeOut(function(){
    this_list.hide();
  },500);
};


window.LD_Nested_List.prototype.update = function(){
  if( this.data instanceof Array && this.data.length > 0){
    for( var i=0;i<this.data.length;i++  ){
      if( this.data[i][this.key_childs] instanceof Array && this.data[i][this.key_childs].length > 0 ){
        this.data[i].__is_leaf = false;
        this.data[i].__leaf_cls = '';
      }else{
        this.data[i].__is_leaf = true;
        this.data[i].__leaf_cls = 'leaf_item';
      }
    }
    console.log(this.data);
    set_store_data( this.list,this.data );
    refresh_scroll(this.list);
  }else{
    set_store_data( this.list,[] );
    refresh_scroll(this.list);
  }
};


window.LD_Nested_List.prototype.push = function(childs_data){
  this.data_stack.push(childs_data);
  this.data = childs_data;
  this.update();
};


window.LD_Nested_List.prototype.pop = function(){
  if( this.data_stack.length > 1 ){
    this.data_stack.pop();
    this.data = this.data_stack[this.data_stack.length-1];
    this.update();
    return true;
  }else{
    return false;
  }
};

window.LD_Nested_List.prototype.reset = function(childs_data){
  set_store_data( this.list,[] );
  refresh_scroll(this.list);
  this.data = this.data_stack[0];
  this.data_stack = [];
  this.push(this.data);
};





window.show_login = function(trigger){
  var x$page_login = Ext.getCmp('page_login');
  
  if( x$page_login ){
    x$page_login.destroy();
  }
  
  logout();
  
  var page = Ext.create('ZJ02.view.Login', {fullscreen: true});
  
  console.log('SHOW TRIGGLER');
  console.log(trigger);
  
  
  if( trigger ){
    var nav_view = trigger.up('navigationview');
    if( nav_view ){
      nav_view.push(page);
    }else{
      Ext.Viewport.add(page);
      Ext.Viewport.setActiveItem(page);
    }
  }else{
    Ext.Viewport.add(page);
    Ext.Viewport.setActiveItem(page);
  }
  
};