///////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctx = document.getElementById('canvas').getContext('2d');
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var MovingObject = function() {
	// the image that appears as the object
	this.image = new Image();
	this.image.src = 'images/1.png';
	this.imageXDimension = 100; // width of the image
	this.imageYDimension = 100; // height of the image
	// coordintates of the object where the origin is at the top left of the canvas
	this.Xpos = 100; //************************************** 800
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
var Cloud = function() {
	MovingObject.call(this);

	this.image.src = 'images/3.png';
	this.imageXDimension = 95;
	this.imageYDimension = 37;

	this.Xpos = 700, this.Ypos = 50;

	this.Xspeed = -0.5;
}
Cloud.prototype = Object.create(MovingObject.prototype);
Cloud.prototype.constructor = Cloud;

Cloud.prototype.update = function() {
	this.Xpos += this.Xspeed;

	if(this.Xpos < -this.imageXDimension) { // checks when the image totally outs the canvas borders
		this.Xpos = 700; // sets the Xposition to the right border of the canvas
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var CollObj = function(px, py, pr) {
	this.x = px, this.y = py;
	this.radius = pr;
}
// CollObj.prototype.draw = function() {
// 	ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
// 	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
// 	ctx.fill();
// }
var calcDistance = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
}
CollObj.prototype.checkColl = function(pCollObj) {
	var distanceBetween = calcDistance(this.x, this.y, pCollObj.x, pCollObj.y);
	if (distanceBetween < this.radius + pCollObj.radius)
		console.log('they have intersected');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Obstacle = function(xdim, ydim, xpos, ypos) {
	MovingObject.call(this);
	this.imageXDimension = xdim, this.imageYDimension = ydim;
	this.Xpos = xpos, this.Ypos = ypos;
	this.collObj = new CollObj(0.37 * this.imageXDimension + this.Xpos,
		0.55 * this.imageYDimension + this.Ypos, 0.4 * this.imageXDimension);
	
}
Obstacle.prototype = Object.create(MovingObject.prototype);
Obstacle.prototype.constructor = Obstacle;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var FlyingTRex = function() {
	Obstacle.call(this, 91, 97, 100, 100);

	this.collObj2 = new CollObj(this.collObj.x + 0.68 * this.collObj.radius,
		this.collObj.y - 0.78 * this.collObj.radius, 0.63 * this.collObj.radius);

	this.image.src = 'images/5.png';
	this.Xspeed = 0;
	this.Yacceleration = 0.5;
}
FlyingTRex.prototype = Object.create(Obstacle.prototype);
FlyingTRex.prototype.constructor = FlyingTRex;

FlyingTRex.prototype.update = function() {
	this.Ypos += this.Yspeed, this.collObj.y += this.Yspeed, this.collObj2.y += this.Yspeed;
	if(this.Yspeed < 10) { // set a maximum downward speed
		this.Yspeed += this.Yacceleration;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Bird = function() {
	Obstacle.call(this, 93, 80, 300, 100);
	this.collObj = new CollObj(0.55 * this.imageXDimension + this.Xpos,
		0.55 * this.imageYDimension + this.Ypos, 0.22 * this.imageXDimension);
	this.collObj2 = new CollObj(0.22 * this.imageXDimension + this.Xpos,
		0.31 * this.imageYDimension + this.Ypos, 0.2 * this.imageXDimension);
	this.collObj3 = new CollObj(0.9 * this.imageXDimension + this.Xpos,
		0.5 * this.imageYDimension + this.Ypos, 0.13 * this.imageXDimension);

	this.image.src = 'images/1.png';

	this.Xspeed = -2, this.Yspeed = 0;
	this.Yacceleration = 0.3;

}
Bird.prototype = Object.create(Obstacle.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
	this.Xpos += this.Xspeed, this.collObj.x += this.Xspeed, this.collObj2.x += this.Xspeed,
	this.collObj3.x += this.Xspeed;
	if(this.Xpos < -this.imageXDimension) {
		this.Xpos = 700, this.collObj.x = 700, this.collObj2.x = 700, this.collObj3.x = 700;
	}
}

Bird.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
	// this.collObj.draw();
	// this.collObj2.draw();
	// this.collObj3.draw();
	this.collObj.checkColl(flyingTRexObj.collObj);
	this.collObj.checkColl(flyingTRexObj.collObj2);
	this.collObj2.checkColl(flyingTRexObj.collObj);
	this.collObj2.checkColl(flyingTRexObj.collObj2);
	this.collObj3.checkColl(flyingTRexObj.collObj);
	this.collObj3.checkColl(flyingTRexObj.collObj2);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Cactus = function() {
	Obstacle.call(this, 49, 102, 700, 368);

	this.image.src = 'images/4.png';

	this.Xspeed = -1;
}
Cactus.prototype = Object.create(Obstacle.prototype);
Cactus.prototype.constructor = Cactus;

Cactus.prototype.update = function() {
	this.Xpos += this.Xspeed;

	if(this.Xpos < -this.imageXDimension) { // checks when the image totally outs the canvas borders
		this.Xpos = 700; // sets the Xposition to the right border of the canvas
	}
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
Ground.prototype = Object.create(Obstacle.prototype);
Ground.prototype.constructor = Ground;

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
document.addEventListener('keydown', function() {
	if(flyingTRexObj.Yspeed > -5) flyingTRexObj.Yspeed -= 5; // set the maximum Yspeed
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var then = 0;

var bird1 = new Bird; // a bird demo
var bird2 = new Bird; // 2nd bird demo
bird2.Xpos = 600; // starting position for second bird
var groundObj = new Ground; // a ground demo
var cloudObj = new Cloud; // a cloud demo
var flyingTRexObj = new FlyingTRex;
var cactusObj = new Cactus; // a cactus demo

function draw(tframe) { // tframe is an implicit parameter automatically passed to the callback function ..
	// i.e. draw function, by the requestAnimationFrame(). tframe represents a timestamp in milliseconds ..
	// starting the moment the user load the page
	if(tframe - then >= 30) { // to set the refresh rate of the canvas as once every 30 milliseconds
		ctx.clearRect(0, 0, 700, 500); // to clear the canvas for each frame

		cloudObj.update();
		bird1.update();
		bird2.update();
		groundObj.update();
		cactusObj.update();
		flyingTRexObj.update();

		cloudObj.draw();
		bird1.draw();
		bird2.draw();
		groundObj.draw();
		cactusObj.draw();
		flyingTRexObj.draw();
		then = tframe;
	}

	window.requestAnimationFrame(draw); // a non-blocking recursive call for the requestAnimationFrame()
}

function init() { // function that initializes the game environment
	window.requestAnimationFrame(draw);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
init();
