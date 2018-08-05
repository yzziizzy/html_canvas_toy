

var Spinner = function(options) {
	
	var defaults = {
		position: pt(100, 100),
		size: 20,
		
		speed: 0.4, // in radians per second. there are 2*pi = 6.28 radians in a circle
		
		theta: 0,
	};
	
	// this overrides the defaults with the options passed in
	var e = $.extend({}, defaults, options);
	for(x in e) {
		console.log(x, e[x])
		this[x] = e[x];
	}
}




Spinner.prototype.draw = function(ctx) {
	
	ctx.save();
	
	
	// order matters
	ctx.translate(this.position.x, this.position.y);
	ctx.rotate(this.theta);
	
	
	// draw a box
	var half = this.size / 2;
	ctx.beginPath();
	ctx.moveTo(-half, -half);
	ctx.lineTo(-half, half);
	ctx.lineTo(half, half);
	ctx.lineTo(half, -half);
	ctx.closePath(); // this adds the last line back to the beginning
	
	ctx.fillStyle = '#22bb55';
	ctx.fill(); // fill in the interior
	
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;
	ctx.stroke(); // draw a line along the path, creating an outline
	
	
	ctx.restore();
	
}

Spinner.prototype.frameMove = function(te, input) {
	
	this.theta += te * this.speed;
	
	this.theta = this.theta % (2 * Math.PI); // make sure to wrap it around
}






