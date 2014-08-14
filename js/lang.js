

function PG_Toast( params ){
	
	var d_p = {
		prefix:'pg-',
		fadeout:3000
	};
	
	this._p = jQuery.extend( d_p,params );
	
	this.cls_con = this._p.prefix+'toast-container';
	this.cls_item = this._p.prefix+'toast-item';
	
}

PG_Toast.prototype.get_container = function(){
	if ( typeof this.$container == 'undefined' ){
		var $container = jQuery(this.cls_con);
		if( $container.length ){
			this.$container = $container;
		}else{
			this.$container = jQuery('<div class="'+this.cls_con+'"></div>').appendTo('body');
		}
	}else{
		if( !this.$container.length ){
			this.$container = jQuery('<div class="'+this.cls_con+'"></div>').appendTo('body');
		}
	}
	return this.$container;
}

PG_Toast.prototype.add = function(text,_fadeout){
	var fadeout = _fadeout || this._p.fadeout;
	if( text ){
		var $con = this.get_container();
		var $item = jQuery('<div class="'+this.cls_item+'"><span>'+text+'</span></div>').appendTo($con);
		
		window.setTimeout(function(){
			$item.css({'max-height':'100px'});
		},0);
		
		
		//$span.css({height:'40px'});
		window.setTimeout(function(){
			/*
			$item.fadeOut(function(){
				this.remove();
			});
			*/
			$item.remove();
			
		},fadeout);
	}
}

PG_Toast.prototype.clear = function(){
	$con = this.get_container();
	$con.empty();
}