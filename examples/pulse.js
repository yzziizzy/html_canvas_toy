

var Pulse = function(options) {
	
	var defaults = {
		position: pt(400, 250),
		size: 20,
		
		pulseLength: 1.50, // total length of a cycle
		pulseSpeed: 6, // intensity of the pulse itself. larger = faster
		pulseScale: 1.5, // amount to scale the heart by at the peak of the pulse
		t: 0, // timer. initialize to zero 
		
	};
	
	// this overrides the defaults with the options passed in
	var e = $.extend({}, defaults, options);
	for(x in e) {
		console.log(x, e[x])
		this[x] = e[x];
	}
}




Pulse.prototype.draw = function(ctx) {
	
	ctx.save();
	
	
	// order matters
	
	// move to the center of revolution
	ctx.translate(this.position.x, this.position.y);
	
	
	// the heart is rather large, so scale it down a bit to start with
	ctx.scale(0.333, 0.333);
	
	
	// the impulse function is found in utilities.js
	var s = impulse(this.pulseSpeed, this.t);
	
	// impulse goes down to zero. we want a baseline scale that pulses upward
	s = this.pulseScale + s;
	
	ctx.scale(s, s) // scale in both dimensions;
	
	
	
	// draw a heart
	ctx.beginPath();
	
	ctx.moveTo(0, 0);
	ctx.bezierCurveTo(30, -100, 250, 30, 0, 200);
	ctx.bezierCurveTo( -250, 30, -30, -100, 0, 0);

	ctx.lineWidth = 3;
	
	ctx.fillStyle = "#ddaacc";
	ctx.fill();
	
	ctx.strokeStyle = '#661144';
	ctx.stroke();
	
	ctx.closePath(); // this adds the last line back to the beginning
	
	ctx.fillStyle = '#eeccaa';
	ctx.fill(); // fill in the interior
	
	ctx.strokeStyle = 'purple';
	ctx.lineWidth = 4;
	ctx.stroke(); // draw a line along the path, creating an outline
	
	
	ctx.restore();
	
}

Pulse.prototype.frameMove = function(te, input) {
	
	this.t += te; // update the timer
	
	// wrap the timer
	this.t = this.t % this.pulseLength;
}



 
