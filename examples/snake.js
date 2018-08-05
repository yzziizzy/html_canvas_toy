








 

 
 
 
 

var Snake = function(options) {
	
	var defaults = {
		position: pt(300, 350),
		direction: normalize(pt(2, 1)),
		speed: 10.0,
		size: 20,
		
		snakeLen: 150, // horizontal length of the snake
		snakeCurves: 3, // number of curves in the snake
		snakeSegments: 50, // the snake is made of line segments. the more lines, the smoother the snake.
		amplitude: 20,
		
		theta: 0, // used for the snake wiggle
		dist: 0, // distance along path
	};
	
	// this overrides the defaults with the options passed in
	var e = $.extend({}, defaults, options);
	for(x in e) {
		console.log(x, e[x])
		this[x] = e[x];
	}
}




Snake.prototype.draw = function(ctx) {
	
	ctx.save();
	
	
	// order matters
	
	// move to the center of revolution
	ctx.translate(this.position.x, this.position.y);
	

	
	
	
	// draw 
	ctx.beginPath();
	
	for(var i = 0; i < this.snakeSegments + 1; i++) { // 4 segments means 5 points: o--o--o--o--o
		
		var n = i / this.snakeSegments;
		var th = (Math.PI * 2) * this.snakeCurves;
		
		th = this.theta + (n * th);
		
		var y = Math.sin(th) * this.amplitude;
	//	console.log('aa: ' + Math.PI);
		
		var x = (i / this.snakeSegments) * this.snakeLen;
		
		
		if(i == 0) {
			ctx.moveTo(x, y); // move without drawing a line for the first point
			// otherwise there will be a stray line going to the center point
		}
		else {
			ctx.lineTo(x, y);
		}
	}
	
	
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#23f1f4';
	ctx.stroke();
	
	// this is just a line. it is not a complete loop so it does not get closed. 
	// ctx.closePath();
	
	
	
	// begin a new path, erasingthe previous one 
	ctx.beginPath();
	
	for(var i = 0; i < this.snakeSegments + 1; i++) { // 4 segments means 5 points: o--o--o--o--o
		
		var n = i / this.snakeSegments;
		var th = (Math.PI * 2) * this.snakeCurves;
		
		th = this.theta + (n * th);
		
		// cosine is offset from sine by:
		//   half a hump
		//   one quarter of a full wave
		//   90 degrees
		//   (pi / 2) radians
		// cosine is at zero when sine is at a peak or trough
		// sine and cosine mapped to x and y respectively will draw a circle in 2*pi radians
		var y = Math.cos(th) * this.amplitude; 
		
		
		var x = (i / this.snakeSegments) * this.snakeLen;
		
		
		if(i == 0) {
			ctx.moveTo(x, y); // move without drawing a line for the first point
			// otherwise there will be a stray line going to the center point
		}
		else {
			ctx.lineTo(x, y);
		}
	}
	
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#f1f423';
	ctx.stroke();
	
	
	ctx.restore();
	
}

Snake.prototype.frameMove = function(te, input) {
	
	this.theta += te; // update the timer
	
	// wrap the timer
	this.theta = this.theta % (Math.PI * 2);
}

