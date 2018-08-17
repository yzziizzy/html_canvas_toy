 


var Waves = function(options) {
	
	var defaults = {
		position: pt(50, 450),
		
		segments: 200,
		len: 800,
		amplitude: 10,
		
		damping: 0.75,
	};
	
	// this overrides the defaults with the options passed in
	var e = $.extend({}, defaults, options);
	for(x in e) {
		console.log(x, e[x])
		this[x] = e[x];
	}
	
	
	
	
	this.a = [];
	this.b = [];
	this.r = [];
	this.m = [];
	this.p = [];
	for(var i = 0; i < this.segments; i++) {
		this.a[i] = 1;
		this.b[i] = 1;
		this.r[i] = Math.abs(20 * (i / this.segments) - 10);
		
		this.m[i] = 0;
		this.p[i] = 0;
	}
	
	//this.a[this.segments / 5] = 10;
	//this.b[this.segments / 5] = 10;
	
	this.a[0] = 0;
	this.b[0] = 0;
	this.a[this.segments-1] = 0;
	this.b[this.segments-1] = 0;
	this.a[this.segments] = 0;
	this.b[this.segments] = 0;
	
}



function clamp(v, min, max) {
	return Math.min(max, Math.max(min, v));
}


var timer = 0;
Waves.prototype.frameMove = function(te, input) {

	timer += te;
	if(timer < .05) return;
	timer = timer % .05;
	
	
	var density = 1; 
	var rate = .5;
	var minfluence = .025;
	var inertia = .1;
	
	
	var that = this;
	function at(i) {
		return that.a[i] + that.r[i];
	}
	
	
	// p is the pressure at the bottom
	for(var i = 1; i < this.a.length - 2; i++) {
		this.p[i] = this.r[i] + (this.a[i] * density);
	}
	
	
	

	
	for(var i = 1; i < this.a.length - 2; i++) {
		
		var t1 = at(i - 1);
		var t =  at(i);
		var t2 = at(i + 1);
		
		var to_1 = (t - t1) * rate; 
		var to_2 = (t - t2) * rate; 
		
		
		if(i == 80) {
			console.log(this.m[i] * minfluence, t1, t, t2, to_1, to_2);
		}
		
	//	this.b[i] = t - to_1 - to_2 - this.r[i]; 
		
		this.b[i] = this.a[i] + clamp(this.m[i] * minfluence, -1 , 1);
		
		
		
		this.b[i] = this.b[i] > 0 ? this.b[i] : 0;
		
		//var t = ((at(i-1) + at(i+1)) / 2) - (this.b[i] + this.r[i]);
		
		//this.b[i] = t * this.damping;

		
		
		// update momentum at the very end
		//this.m[i] *= inertia;
		//this.m[i] += (to_1 - to_2);
		
		this.m[i] = t1 - t2;
	}
	
	
	// swap the buffers
	var temp = this.a;
	this.a = this.b;
	this.b = temp;
}







Waves.prototype.draw = function(ctx) {
	
	ctx.save();
	
	
	ctx.translate(this.position.x, this.position.y);
	
	
	ctx.beginPath();
	
	
	for(var i = 0; i < this.segments + 1; i++) { // 4 segments means 5 points: o--o--o--o--o
		var y = this.r[i] * -this.amplitude;
		var slen = this.len / this.segments;
		//console.log(slen);
		
		var x = (i * slen);
		y++;
		
		if(i == 0) {
			ctx.moveTo(x, y); // move without drawing a line for the first point
			// otherwise there will be a stray line going to the center point
		}
		else {
			ctx.lineTo(x, y);
		}
	}
	
		
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#662211';
	ctx.stroke();
	
	
	
	ctx.beginPath();
	
	
	var minm = 0;
	var maxm = 0;
	this.m.map(function(x) { minm = Math.min(minm, x);  maxm = Math.max(maxm, x);});
	
	
	for(var i = 0; i < this.segments + 1; i++) { // 4 segments means 5 points: o--o--o--o--o
		var y = (this.a[i] + this.r[i]) * -this.amplitude;
		var slen = this.len / this.segments;
		//console.log(slen);
		
		var x = (i * slen);
		
		
		if(i == 0) {
			ctx.moveTo(x, y); // move without drawing a line for the first point
			// otherwise there will be a stray line going to the center point
		}
		else {
			ctx.lineTo(x, y);
					
			
			var t = ((this.m[i] - minm) / (maxm - minm));
			var r = clamp(2.0 * t * 255, 0, 255);  
			var g = clamp(2.0 * (1 - t) * 255, 0, 255);  
			
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgb('+r+','+g+',0)';
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	}
	
		
// 	ctx.lineWidth = 1;
// 	ctx.strokeStyle = '#03a1a4';
// 	ctx.stroke();
	
	
	ctx.restore();
}


 
