var MovingObject = function() {
	// the image that appears as the object
	this.image = new Image();
	this.image.src = 'images/1.png';
	this.imageXDimension = 100; // width of the image
	this.imageYDimension = 100; // height of the image
	// coordintates of the object where the origin is at the top left of the canvas
	this.Xpos = 800;
	this.Ypos = 100;
	// speed components of the object in the horizontal and vertical directions respectively
	this.Xspeed = -2;
	this.Yspeed = 0;
}

MovingObject.prototype.update = function() { // function to update the coordinates of the object
	this.Xpos += this.Xspeed, this.Ypos += this.Yspeed;
	// resets position when the whole object gets out of the canvas borders
	if(this.Xpos < -this.imageXDimension		||
	   this.Ypos < -this.imageYDimension		||
	   this.Xpos > 700 + this.imageXDimension 	||
	   this.Ypos > 500 + this.imageYDimension)	{

		this.Xpos = 700 + this.imageXDimension;
		this.Ypos = 100;
	}
}

MovingObject.prototype.draw = function() { // draw into canvas
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var FlyingBird = function() {
	MovingObject.call(this);

	this.image.src = 'images/5.png';
	this.imageXDimension = 91;
	this.imageXDimension = 97;

	this.Xpos = 100, this.Ypos = 100;

	this.Xspeed = 0, this.Yspeed = 0;
	this.Yacceleration = 0.2;

}

FlyingBird.prototype.update = function() {
	this.Ypos += this.Yspeed;
	this.Yspeed += this.Yacceleration;
}

FlyingBird.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Cloud = function() {
	MovingObject.call(this);

	this.image.src = 'images/3.png';
	this.imageXDimension = 95;
	this.imageYDimension = 37;

	this.Xpos = 700, this.Ypos = 50;

	this.Xspeed = -0.5;
}

Cloud.prototype.update = function() {
	this.Xpos += this.Xspeed;

	if(this.Xpos < -this.imageXDimension) { // checks when the image totally outs the canvas borders
		this.Xpos = 700; // sets the Xposition to the right border of the canvas
	}
}

Cloud.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Obstacle = function() {
	MovingObject.call(this);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Cactus = function() {
	Obstacle.call(this);

	this.image.src = 'images/4.png';
	this.imageXDimension = 49;
	this.imageYDimension = 102;

	this.Xpos = 700, this.Ypos = 368;

	this.Xspeed = -1;
}

Cactus.prototype.update = function() {
	this.Xpos += this.Xspeed;

	if(this.Xpos < -this.imageXDimension) { // checks when the image totally outs the canvas borders
		this.Xpos = 700; // sets the Xposition to the right border of the canvas
	}
}

Cactus.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Ground = function() {
	Obstacle.call(this);

	this.image.src = 'images/2.png';
	this.imageXDimension = 2400;
	this.imageYDimension = 24;

	this.Xpos = 0,						this.Ypos = 450;
	this.Xpos2 = this.imageXDimension,	this.Ypos2 = 450; // two images drawn successively after each other

	this.Xspeed = -1;
}

Ground.prototype.update = function() {
	this.Xpos2 += this.Xspeed;
	this.Xpos += this.Xspeed;

	if(this.Xpos < -this.imageXDimension) { // checks when the first image totally outs the canvas borders
		this.Xpos = this.imageXDimension; // resets the Xpos of the first image
	} else if(this.Xpos2 < -this.imageXDimension) { // when the second image outs the canvas borders
		this.Xpos2 = this.imageXDimension; // resets the Xpos for the second image
	}
}

Ground.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
	ctx.drawImage(this.image, this.Xpos2, this.Ypos);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctx = document.getElementById('canvas').getContext('2d');
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var then = 0, deltaTimeFrame = 0;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var obj1 = new MovingObject; // a bird demo
var obj2 = new MovingObject; // 2nd bird demo
obj2.Xpos = 600; // starting position for second bird
var groundObj = new Ground; // a ground demo
var cloudObj = new Cloud; // a cloud demo
var flyingBirdObj = new FlyingBird;
var cactusObj = new Cactus; // a cactus demo

function draw(tframe) { // tframe is an implicit parameter automatically passed to the callback function ..
	// i.e. draw function, by the requestAnimationFrame(). tframe represents a timestamp in milliseconds ..
	// starting the moment the user load the page
	deltaTimeFrame = tframe - then;
	if(deltaTimeFrame >= 30) { // to set the refresh rate of the canvas as once every 30 milliseconds
		ctx.clearRect(0, 0, 700, 500); // to clear the canvas each frame
		cloudObj.update();
		obj1.update();
		obj2.update();
		groundObj.update();
		cactusObj.update();
		flyingBirdObj.update();
		cloudObj.draw();
		obj1.draw();
		obj2.draw();
		groundObj.draw();
		cactusObj.draw();
		flyingBirdObj.draw();
		then = tframe;
	}

	window.requestAnimationFrame(draw); // a non-blocking recursive call for the requestAnimationFrame()
}

function init() { // function that initialize the game environment
	window.requestAnimationFrame(draw);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
