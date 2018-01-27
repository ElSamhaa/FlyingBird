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
// 	ctx.fillStyle = "rgba(0, 0, 0, 1)";
// 	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
// 	ctx.fill();
// 	ctx.closePath();
// }
var calcDistance = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

var collisionFlag = false;

CollObj.prototype.checkColl = function(pCollObj) {
	var distanceBetween = calcDistance(this.x, this.y, pCollObj.x, pCollObj.y);
	if (distanceBetween < this.radius + pCollObj.radius) {
		collisionFlag = true;
		audLose.play(); // play lose sound
		clearTimeout(level1ID);
		clearTimeout(level2ID);
		clearTimeout(level3ID);
		clearTimeout(level4ID);
		clearInterval(flippingID);
		clearInterval(scoreID);
		textDraw("OOPS!", (700 / 2) - 90, (500 / 2) - 10, 60);
	}
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
	this.Xspeed = 0; this.Yspeed = -5
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
FlyingTRex.prototype.draw = function() { // draw into canvas
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
	if(this.Ypos > 361) {
		collisionFlag = true;
		audLose.play(); // play lose sound
		clearTimeout(level1ID);
		clearTimeout(level2ID);
		clearTimeout(level3ID);
		clearTimeout(level4ID);
		clearInterval(flippingID);
		clearInterval(scoreID);
		textDraw("OOPS!", (700 / 2) - 90, (500 / 2) - 10, 60);
	}
	// this.collObj.draw();
	// this.collObj2.draw();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Bird = function(px, py) {
	Obstacle.call(this, 93, 80, 300, 100);
	this.Xpos = px, this.Ypos = py;
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

var availFlag = true
Bird.prototype.update = function() {
	this.Xpos += this.Xspeed, this.collObj.x += this.Xspeed, this.collObj2.x += this.Xspeed,
	this.collObj3.x += this.Xspeed;
	if(this.Xpos < -this.imageXDimension && availFlag == true) {
		this.resetPos();
	}
}
var that;
Bird.prototype.resetPos = function() {
	that = this;
	window.setTimeout(function() {
		that.Xpos = 700;
		that.collObj.x = 0.55 * that.imageXDimension + that.Xpos;
		that.collObj2.x = 0.22 * that.imageXDimension + that.Xpos;
		that.collObj3.x = 0.9 * that.imageXDimension + that.Xpos;
		that.Ypos = Math.random() * 400;
		that.collObj.y = 0.55 * that.imageYDimension + that.Ypos;
		that.collObj2.y = 0.31 * that.imageYDimension + that.Ypos;
		that.collObj3.y = 0.5 * that.imageYDimension + that.Ypos;

		availFlag = true; }, Math.random() * 400);
	availFlag = false;
}

Bird.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
	if(this.Xpos < 220 && this.Xpos > -50) {
		this.collObj.checkColl(flyingTRexObj.collObj);
		this.collObj.checkColl(flyingTRexObj.collObj2);
		this.collObj2.checkColl(flyingTRexObj.collObj);
		this.collObj2.checkColl(flyingTRexObj.collObj2);
		this.collObj3.checkColl(flyingTRexObj.collObj);
		this.collObj3.checkColl(flyingTRexObj.collObj2);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var Cactus = function() {
	Obstacle.call(this, 49, 102, 700, 368);
	this.collObj = new CollObj(0.5 * this.imageXDimension + this.Xpos,
		0.31 * this.imageYDimension + this.Ypos, 0.5 * this.imageXDimension);

	this.image.src = 'images/4.png';

	this.Xspeed = -1;
}
Cactus.prototype = Object.create(Obstacle.prototype);
Cactus.prototype.constructor = Cactus;

Cactus.prototype.update = function() {
	this.Xpos += this.Xspeed, this.collObj.x += this.Xspeed;

	if(this.Xpos < -this.imageXDimension) { // checks when the image totally outs the canvas borders
		// sets the Xposition to the right border of the canvas
		this.Xpos = 700, this.collObj.x = 0.5 * this.imageXDimension + this.Xpos;
	}
}

Cactus.prototype.draw = function() {
	ctx.drawImage(this.image, this.Xpos, this.Ypos);
	if(this.Xpos < 220 && this.Xpos > -50) {
		this.collObj.checkColl(flyingTRexObj.collObj);
		this.collObj.checkColl(flyingTRexObj.collObj2);
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
document.addEventListener('click', function() {
	if(flyingTRexObj.Yspeed > -5) flyingTRexObj.Yspeed -= 5; // set the maximum Yspeed
	if(flyingTRexObj.Ypos < 0) {flyingTRexObj.Yspeed += 10};
	if(collisionFlag == true) {
		collisionFlag = false;
		init();
	}
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var bird1; // a bird demo
var bird2; // 2nd bird demo
var groundObj; // a ground demo
var cloudObj; // a cloud demo
var flyingTRexObj;
var cactusObj; // a cactus demo
var audLose = new Audio('audio/lose.mp3');
var flippingFlag = true, flippingID;

var scoreID;
var score = 0;
var scoreUpdate = function() {
	score++;
}
var textDraw = function(text, x, y, size) {
    ctx.font = "bold " + size + "px Tahoma"
    ctx.strokeStyle = 'black';
    ctx.lineWidth = size / 4;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
}

var level;
var levelIncrement = function() {
	level++;
	bird1.Xspeed -= 1;
	bird2.Xspeed -= 1;
	groundObj.Xspeed -= 1;
	cactusObj.Xspeed -= 1;
}

var level1ID;
var level2ID;
var level3ID;
var level4ID;

function init() { // function that initializes the game environment
	bird1 = new Bird(700, 50 + Math.random() * 250); // a bird demo
	bird2 = new Bird(800 + Math.random() * 300, 50 + Math.random() * 250); // 2nd bird demo
	score = 0;
	level = 1;
	level1ID = setTimeout(levelIncrement, 15000);
	level2ID = setTimeout(levelIncrement, 30000);
	level3ID = setTimeout(levelIncrement, 50000);
	level4ID = setTimeout(levelIncrement, 70000);
	scoreID = setInterval(scoreUpdate, 300);
	flippingID = setInterval(function() { if(flippingFlag == true) {
			bird1.image.src = 'images/6.png', bird2.image.src = 'images/6.png';
			flippingFlag = false;
		} else {
			bird1.image.src = 'images/1.png', bird2.image.src = 'images/1.png';
			flippingFlag = true;
		} }, 500);
	groundObj = new Ground; // a ground demo
	cloudObj = new Cloud; // a cloud demo
	flyingTRexObj = new FlyingTRex;
	cactusObj = new Cactus; // a cactus demo

	window.requestAnimationFrame(draw);
}

var then = 0;
function draw(tframe) { // tframe is an implicit parameter automatically passed to the callback function ..
	// i.e. draw function, by the requestAnimationFrame(). tframe represents a timestamp in milliseconds ..
	// starting the moment the user load the page
	if(tframe - then >= 20) { // to set the refresh rate of the canvas as once every 30 milliseconds
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
		textDraw("score: " + score, 500, 50, 30);
		textDraw("level " + level, 75, 50, 30);
		then = tframe;
	}

	if(collisionFlag == false) {
		window.requestAnimationFrame(draw); // a non-blocking recursive call for the requestAnimationFrame()
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
init();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
