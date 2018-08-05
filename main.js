


var drawables = [];

function addDrawable(d) {
	drawables.push(d);
}





function init() {
	
	addDrawable(new Spinner({}));
	addDrawable(new Revolver({}));
	addDrawable(new Pulse({}));
	
	// draw order determines above and below
	// the snake will appear on top of the heart because it is drawn afterward
	addDrawable(new Snake({}));
	
	
	
	
}




function drawLoop(ctx, timeElapsed, input) {
	
	
	// this code preserves the order objects are added above
	drawables.map(function(d) {
		var fn = d.frameMove;
		if(typeof(fn) != 'function') {
			console.log("missing frameMove function");
			return;
		}
		
		fn.call(d, timeElapsed, input);
	});
	
	
	drawables.map(function(d) {
		var fn = d.draw;
		if(typeof(fn) != 'function') {
			console.log("missing draw function");
			return;
		}
		
		fn.call(d, ctx);
	});
	
	
	
}



 
