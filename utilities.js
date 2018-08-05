

function pt(x,y) {
	return {x: x, y: y};
}

function ptc(p) {
	return {x: p.x, y: p.y};
}

// return the lengt hof a vector
function magnitude(p) {
	return Math.sqrt(p.x * p.x + p.y * p.y); // basic pythagorean theorem: a^2 + b^2 = c^2
}

// return a vector in the same direction with a magnitude (length) of 1.0
function normalize(p) {
	var l = Math.sqrt(p.x * p.x + p.y * p.y);
	
	if(l == 0) return {x: 0, y: 0}; // avoid divide-by-zero
	
	return {x: p.x / l, y: p.y / l};
}



function rect(top, left, bottom, right) {
	return {t: top, b: bottom, l: left, r: right};
}

function rectc(r) {
	return {t: r.t, b: r.b, l: r.l, r: r.r};
} 

function distance(from, to) {
	var x = to.x - from.x;
	var y = to.y - from.y;
	return Math.sqrt(x*x + y*y);
}


/*
varies between 0 and 1 with a quick rise and slow fall

k determines how long the impulse is
t is the time along the curve to return
the peak, 1.0, is at t = 1 / k

*/
function impulse(k, t) {
	var h = k * t;
	return h * Math.exp(1.0 - h);
}