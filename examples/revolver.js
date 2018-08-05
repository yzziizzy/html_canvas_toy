



var Revolver = function(options) {
	
	var defaults = {
		position: pt(300, 150),
		size: 20,
		
		speed: -3.1, // in radians per second. there are 2*pi = 6.28 radians in a circle
		radius: 50, // distance from the center of revolution
		
		theta: 0,
	};
	
	// this overrides the defaults with the options passed in
	var e = $.extend({}, defaults, options);
	for(x in e) {
		console.log(x, e[x])
		this[x] = e[x];
	}
}




Revolver.prototype.draw = function(ctx) {
	
	ctx.save();
	
	
	// order matters
	
	// move to the center of revolution
	ctx.translate(this.position.x, this.position.y);
	
	// rotate the canvase
	ctx.rotate(this.theta);
	
	// move outward from the center of rotation
	ctx.translate(this.radius, 0);
	
	
	// draw a box
	var half = this.size / 2;
	ctx.beginPath();
	ctx.arc(0,0, this.size, 0, 2*Math.PI);
	ctx.closePath(); // this adds the last line back to the beginning
	
	ctx.fillStyle = 'red';
	ctx.fill(); // fill in the interior
	
	ctx.strokeStyle = '#3333dd';
	ctx.lineWidth = 4;
	ctx.stroke(); // draw a line along the path, creating an outline
	
	
	ctx.restore();
	
}

Revolver.prototype.frameMove = function(te, input) {
	
	this.theta += te * this.speed;
	
	this.theta = this.theta % (2 * Math.PI); // make sure to wrap it around
}

