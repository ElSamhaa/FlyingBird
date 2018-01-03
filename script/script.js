var MovingObject = function () {
	this.image = new Image();
	this.image.src = 'images/1.png';
	this.Xspeed = 1;
	this.Yspeed = 1;
	this.Xpos = 0;
	this.Ypos = 0;
}

// MovingObject.prototype.move = function() {
// 	this.Xpos += this.Xspeed;
// 	this.Ypos += this.Yspeed;
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctx = document.getElementById('canvas').getContext('2d');
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var obj = new MovingObject;
function init() {
	window.requestAnimationFrame(draw);
}
function draw() {

	ctx.clearRect(0, 0, 500, 700);
	ctx.drawImage(obj.image, obj.Xpos += obj.Xspeed, obj.Ypos += obj.Yspeed, 50, 50);
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
