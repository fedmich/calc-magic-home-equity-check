
// var ENABLE_ANIMATION_COUNTER = false;
var ENABLE_ANIMATION_COUNTER = true;

function doCalc () {
	
	var a = $('input#selling_price').val();
	var b = $('input#mortgage').val();
	
	a = a.replace( /[,\$ ]/g, '');
	b = b.replace( /[,\$ ]/g, '');
	
	a = a * 1;
	b = b * 1;
	
	var valid = true;
	if( isNaN( a ) ){
		valid = false;
	}
	if( isNaN( b ) ){
		valid = false;
	}
	
	var calc_a = '';
	
	if( valid ) {
		calc_a = ( a - b );
		if( calc_a < 0 ){
			valid = false;
		}
	}
	
	if( ! valid ) {
		calc_a = '';
	}
	
	inp_set_text ( '.result_box .result' , calc_a );
	
}

$(function() {
	
	var oInput = $('#selling_price')
	oInput.change(function(){
		doCalc ();
	}).click(function(){
		doCalc ();
	}).blur(function(){
		doCalc ();
		this.value = addCommas( this.value.replace( /[,\$ ]/g, '') );
	});
	
	var oInput2 = $('#mortgage')
	oInput2.change(function(){
		doCalc ();
	}).click(function(){
		doCalc ();
	}).blur(function(){
		doCalc ();
		this.value = addCommas( this.value.replace( /[,\$ ]/g, '') );
	});
	
	
	
});

function animate_counter ( obj, to_num ){
	
	obj.each(function () {
	
	  var $this = $(this);
	  $this.Counter = to_num ;
	  $this.text ( to_num );
	  $this
	  	.stop()
	  	.animate({ Counter: $this.text() }, {
		duration: 600,
		easing: 'swing',
		step: function () {
			
			var cnt = this.Counter ;
			if(! cnt ){
				cnt = 0;
			}
			
		  	$this.text( cnt.toFixed( 0 ) );
		} , complete: function () {
			
			$this.text( '$' + addCommas( to_num.toFixed( 0 ) ) );
		}
	  });
	});
	
}

function inp_set_text ( css, val ){
	var obj = jQuery( css );
	
	if( ENABLE_ANIMATION_COUNTER ){
		
		var val_before = obj.data('val');
		if(! val_before ){
			val_before = 0;
		}
	
		animate_counter ( obj, val_before, val ) ;
		obj.data('val', val );
	} else {
		obj.text( val );
	}
}

function addCommas(nStr){
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}