// Wait for device API libraries to load
//


function exit_app(){
  Ext.Msg.confirm('确认退出','您确定要退出职点吗？',function(result){
    if( result == 'yes' ){
      navigator.app.exitApp();
    }
  });  
}



function pop_view( _need_refresh ){
  
  var need_refresh = _need_refresh || false;
  
  if( typeof CURRENT_TAB !='undefined' && typeof CURRENT_NAV !='undefined' ){
    var cur_tab_id = CURRENT_TAB.id;
    var cur_nav_length = CURRENT_NAV.getItems().length;
    var cur_page = CURRENT_NAV.getActiveItem();
    var is_login = cur_page.xtype == 'login';
    
    if( cur_page.f_pop_refresh ){
      need_refresh = true;
      console.log('f_pop_refresh = true');
    }
    
    console.log('CUR PAGE');
    console.log(cur_page);
    console.log(cur_page.xtype);
  
    switch( cur_tab_id ){
      case 'tab_home':
        if( cur_nav_length > 2 ){
          var new_view = CURRENT_NAV.pop();
          if( need_refresh && typeof new_view.update == 'function' ){
            new_view.update();
          }
          //toast('APP POP');
        }else{
          //toast('APP EXIT');
          exit_app();
        }
        
        break;
      case 'tab_user':
        if( is_login && cur_nav_length > 3 ){
          var new_view = CURRENT_NAV.pop();
          if( need_refresh && typeof new_view.update == 'function' ){
            new_view.update();
          }
          //toast('APP POP');
        }else if( !is_login && cur_nav_length > 2 ){
          var new_view = CURRENT_NAV.pop();
          if( need_refresh && typeof new_view.update == 'function' ){
            new_view.update();
          }
          //toast('APP POP');        
        }else{
          //toast('APP HOME');
          go_home();
        }
        break;
      case 'tab_msg':
        if( is_login && cur_nav_length > 3 ){
          var new_view = CURRENT_NAV.pop();
          if( need_refresh && typeof new_view.update == 'function' ){
            new_view.update();
          }
          //toast('APP POP');
        }else if( !is_login && cur_nav_length > 2 ){
          var new_view = CURRENT_NAV.pop();
          if( need_refresh && typeof new_view.update == 'function' ){
            new_view.update();
          }
          //toast('APP POP');        
        }else{
          //toast('APP HOME');
          go_home();
        }
        break;
      case 'tab_more':
        if( cur_nav_length > 2 ){
          var new_view = CURRENT_NAV.pop();
          if( need_refresh && typeof new_view.update == 'function' ){
            new_view.update();
          }
          //toast('APP POP');
        }else{
          //toast('APP HOME');
          go_home();
        }
        break;
    }
  }else{
    //exapp;
    //toast('APP EXIT');
    exit_app();
  }
  
  
  
}


jQuery(function(){
	
	// disable backbutton on android
	function onBackKeyDown() {
    pop_view();
    return false;
	}	

	function onDeviceReady() {
		document.addEventListener("backbutton", onBackKeyDown, false);
	}

	onDeviceReady();

  
});


