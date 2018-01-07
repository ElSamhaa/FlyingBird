var MovingObject = function() {
	// the image that appears as the object
	this.image = new Image();
	this.image.src = 'images/1.png';
	this.imageXDimension = 100;
	this.imageYDimension = 100;
	// coordintates of the object where the origin is at the top left of the canvas
	this.Xpos = 800;
	this.Ypos = 100;
	// speed components of the object in the horizontal and vertical directions respectively
	this.Xspeed = -3;
	this.Yspeed = 0;
}
MovingObject.prototype.move = function() {
	if(this.Xpos < -this.imageXDimension || this.Ypos < -this.imageYDimension || this.Xpos > 700 + this.imageXDimension || this.Ypos > 500 + this.imageYDimension) { // check when the ..
		this.Xpos = 700 + this.imageXDimension;
		this.Ypos = 100;
	}
	ctx.drawImage(this.image, this.Xpos += this.Xspeed, this.Ypos += this.Yspeed);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Ground = function() {
	MovingObject.call(this);
	this.image.src = 'images/2.png';
	this.imageXDimension = 2400;
	this.imageYDimension = 24;
	this.Xspeed = -4;
	this.Xpos = 0, this.Ypos = 450;
	this.Xpos2 = this.imageXDimension, this.Ypos2 = 450;
}
Ground.prototype.move = function() {
	if(this.Xpos < -this.imageXDimension) { // check when the ..
		this.Xpos = this.imageXDimension;
	} else if(this.Xpos2 < -this.imageXDimension) {
		this.Xpos2 = this.imageXDimension;
	}
	ctx.drawImage(this.image, this.Xpos += this.Xspeed, this.Ypos);
	ctx.drawImage(this.image, this.Xpos2 += this.Xspeed, this.Ypos);
}

var ctx = document.getElementById('canvas').getContext('2d');
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var obj1 = new MovingObject;
var obj2 = new MovingObject;
var groundObj = new Ground;
obj2.Xpos = 600;
function init() {
	window.requestAnimationFrame(draw);
}
function draw() {
	ctx.clearRect(0, 0, 700, 500);
	obj1.move();
	obj2.move();
	groundObj.move();
	window.requestAnimationFrame(draw);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
init();





// /////////////////////////////////////////Some global variables////////////////////////////////////////
// var lastRender = null;
// var lastTick = null;
// var ticklength = null;
// var stopMain = null;
// //////////////////////////////////////////////Main Function////////////////////////////////////////
// function main( tFrame ) {
//     stopMain = window.requestAnimationFrame( main );
//     draw();
//     var nextTick = lastTick + tickLength;
//     var numTicks = 0;

//     //If tFrame < nextTick then 0 ticks need to be updated (0 is default for numTicks).
//     //If tFrame = nextTick then 1 tick needs to be updated (and so forth).
//     //Note: As we mention in summary, you should keep track of how large numTicks is.
//     //If it is large, then either your game was asleep, or the machine cannot keep up.
//     if (tFrame > nextTick) {
// 		var timeSinceTick = tFrame - lastTick;
// 		numTicks = Math.floor( timeSinceTick / tickLength );
//     }

//     queueUpdates( numTicks );
//     render( tFrame );
//     lastRender = tFrame;
// }

// function queueUpdates( numTicks ) {
//     for(var i=0; i < numTicks; i++) {
// 		lastTick = lastTick + tickLength; //Now lastTick is this tick.
// 		draw( lastTick );
//     }
// }

// lastTick = performance.now();
// lastRender = lastTick; //Pretend the first draw was on first update.
// tickLength = 50; //This sets your simulation to run at 20Hz (50ms)

// // setInitialState();
// main(performance.now()); // Start the cycle
