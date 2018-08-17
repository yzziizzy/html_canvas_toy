


var drawables = [];

function addDrawable(d) {
	drawables.push(d);
}





function init() {
	/*
	addDrawable(new Spinner({}));
	addDrawable(new Revolver({}));
	
	// override default properties like this
	addDrawable(new Revolver({
		position: pt(460, 240),
		speed: 1.0,
		radius: 120,
		size: 35,
	}));
	
	
	addDrawable(new Pulse({}));
	
	// draw order determines above and below
	// the snake will appear on top of the heart because it is drawn afterward
	addDrawable(new Snake({}));
	*/
	
	addDrawable(new Waves({}));
	
	
	
	
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



