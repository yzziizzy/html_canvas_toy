 


var Waves = function(options) {
	
	var defaults = {
		position: pt(100, 100),
		
		// default properties go here
		
	};
	
	// this overrides the defaults with the options passed in
	var e = $.extend({}, defaults, options);
	for(x in e) {
		console.log(x, e[x])
		this[x] = e[x];
	}
}




Waves.prototype.draw = function(ctx) {
	
	ctx.save();
	
	
	// draw here
	
	
	ctx.restore();
}

Waves.prototype.frameMove = function(te, input) {
	
	// animation happens here
}






 
