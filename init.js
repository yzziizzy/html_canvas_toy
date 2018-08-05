



function initCanvas() {
	
	var w = $(window);
	
	var canvas = $('.scribble-canvas');
	
	var ctx = canvas[0].getContext("2d");
	
	
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame	|| 
			window.webkitRequestAnimationFrame	|| 
			window.mozRequestAnimationFrame		|| 
			window.oRequestAnimationFrame		|| 
			window.msRequestAnimationFrame		|| 
			function(callback){
				window.setTimeout(callback, 1000 / 30);
			};
	})();
	
	
	$(document).keyup(function(e) {
		
		
	});
	
	var _inputdata = {};
	
	function checkinputs() {
		var curinput = {
			down: _inputdata.down,
			pressed: _inputdata.pressed,
		};
		
 		_inputdata.pressed = {};
		
		return curinput;
	}
	
	
	var d = new Date();
	var lastframe = d.getTime() / 1000.0;
	
	
	function frame() {
		
		var d = new Date();
		var now = d.getTime() / 1000.0; // getTime is in milliseconds
		
		// time elapsed (since last frame)
		var te = now - lastframe; 
		lastframe = now;
		
		
		// these can change when the window is resized
		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;
		
		ctx.clearRect(0, 0, cw, ch); // clear the entire canvas
		 
		var input = checkinputs();
		
		
		drawLoop(ctx, te, input);
		
		window.requestAnimFrame(frame);
	}
	
	
	// custom initialization
	init();

	// start drawing
	frame();
}




 
