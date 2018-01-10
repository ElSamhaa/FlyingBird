// ##### the global variables #####
// pages
var startpage = document.getElementById('startpage');
var gamepage = document.getElementById('gamepage');
var endpage = document.getElementById('endpage');
// player attributes
var playername = document.getElementById('playername1');
var displayname = document.getElementById('displayname');
var displaylives1 = document.getElementById('displaylives1');
var displaylives = document.getElementById('displaylives');
var score = document.getElementById('score');
var showscore = document.getElementById('showscore');
// first page attributes
var playbutton = document.getElementById('startplay');
var character = document.getElementsByClassName('character');
// game page attributes
var img = document.getElementById('bird1');
// end page attributes
var endgame = document.getElementById('endgame');
var playagainbtn = document.getElementById('playagain');
// obstacle images
var obsimage = document.getElementById('obsimage');
var imagesarray = ["images/obs2.png","images/obs1.png"];
var heightarray = ["150","200","250","300","350","400","500","550"];
// bird attributes
var birdwings = [];
var count = 0;
var keepjump = 'true';
var crash = 'false';

//##########################     Moving Object Class     #####
var MovingObject = function(x , y , dx , dy) {
  this.pos_x = x;
  this.pos_y = y;
  this.dx = dx;
  this.dy = dy;
}

MovingObject.prototype.getposy = function () {
  return this.pos_y;
};

MovingObject.prototype.getposx = function () {
  return this.pos_x;
};

MovingObject.prototype.setposy = function () {
  return this.pos_y;
};

MovingObject.prototype.setposx = function () {
  return this.pos_x;
};

MovingObject.prototype.move = function () {
};
//##########################     bird class     #####
 var bird = function(x = 150, y = 100 , lives = 3) {
   MovingObject.call(this,x , y , dx = 0 , dy = 7);
   this.player_name;
   this.initiallives = lives;
   this.lives = this.initiallives;
   this.scoree = 0;
 }

bird.prototype = Object.create(MovingObject.prototype);
bird.prototype.constructor = bird;

// ... dealing with bird movement
bird.prototype.move = function( time = 90){
  window.addEventListener('keyup', function(event) {
    if (this.pos_y > 10 && keepjump === 'true') {
      this.pos_y -= 40;
      img.style.top = this.pos_y +'px';
    }
  }.bind(this))

  // gravity effect
  grav = setInterval(function () {
    this.pos_y += this.dy;
    img.style.top= this.pos_y +"px";
    displaylives.src = birdwings[0];
    displaylives1.innerHTML = ` x${this.lives}`;
  }.bind(this), time);
};

bird.prototype.wingmove = function () {
    wingmov = setInterval(function () {
     img.src = birdwings[count++];
     if (count === 4) {
       count = 0;
     }
    },90);
};

// ... dealing with player attributes

 bird.prototype.setplayername = function (pname) {
   this.player_name = pname;
 };

 bird.prototype.getplayername = function () {
   return this.player_name;
 };

 bird.prototype.decreaselives = function () {
   this.lives--;
 };

 bird.prototype.getlives = function () {
   return this.lives;
 };

 bird.prototype.setscore = function () {
   this.scoree += 2;
   score.innerHTML = `Score: ${this.scoree}`;
 };

 bird.prototype.getscore = function () {
   return this.scoree;
 };

 bird.prototype.printscore = function () {
   score.innerHTML = `Score: ${this.scoree}`;
   scoreint = setInterval(this.setscore.bind(this),3000);
 };

bird.prototype.main = function (){
  this.move();
  this.wingmove();
  this.printscore();
}

//##########################    Obstacles Class  ########
obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];

// append images instead of dealing with one obstacle
var obstacles = function() {
  MovingObject.call(this, 10,0);
}

obstacles.prototype = Object.create(MovingObject.prototype);
obstacles.prototype.constructor = obstacles;

obstacles.prototype.move = function () {
  moveleft = setInterval( function(){
      this.pos_x += 10;
      obsimage.style.right = this.pos_x +"px";
      if (this.pos_x > window.innerWidth) {
        this.pos_x = 10;
        obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
        obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];
      }
    }.bind(this), 50);
};

  // var obstacle = document.createElement("img")		--> Creating The Element(get The Element)
  // var gamediv = document.getElementById('myDiv')
	// gamediv.appendChild(obstacle)

//##########################     Cloud class     #####
var Cloud = function() {
  MovingObject.call(this);
}

Cloud.prototype = Object.create(MovingObject.prototype);
Cloud.prototype.constructor = obstacles;

//##########################     Background class     #####
var Background = function() {
  MovingObject.call(this);
}

Background.prototype = Object.create(MovingObject.prototype);
Background .prototype.constructor = obstacles;



//##########################    the game loop     ############
function gameloop() {
  var b1 = new bird;
  var obs = new obstacles;
  obs.move();

  b1.setplayername(playername.value);
  var printname = b1.getplayername();
  displayname.innerHTML = `Player: ${printname}`;

  b1.main();

  // ... dealing with bird crashing
  setInterval(function crash () {
  // solution for crashing .. mmove function get array of obstacles and check on them
   if ( ( parseInt(getComputedStyle(obsimage).left) <= b1.pos_x && b1.pos_y+50 >= parseInt(getComputedStyle(obsimage).top) )
        || b1.pos_y > window.innerHeight-120 && b1.lives > 0) {
       b1.pos_y = 100;
       b1.lives--;
       displaylives1.innerHTML = ` x${b1.lives}`;
       whencrash();
   }
  }, 50);


  whencrash = function () {
    function clearintervals(){
      clearInterval(grav);
      clearInterval(wingmov);
      clearInterval(scoreint);
    }

    clearintervals();
    img.src = "images/5.png"

    setTimeout(function() {
      img.src = birdwings;
      b1.wingmove();
      b1.move();
      b1.printscore();
    }, 1000)

    if (this.lives === 0) {
     clearintervals();
     startpage.style.display = 'none';
     gamepage.style.display = 'none';
     endpage.style.display = 'block';
     showscore.innerHTML = `${b1.player_name} Your Final Score Is: ${b1.scoree}`
    }
  };

  playagain.addEventListener("click", function() {
    b1.scoree = 0;
    b1.pos_y = 100;
    b1.lives = b1.initiallives;
    b1.main();
    startpage.style.display = 'none';
    gamepage.style.display = 'block';
    endpage.style.display = 'none';
  })
}

var birdImages = [
  ["images/1.png","images/2.png","images/3.png","images/4.png"],
  ["images/11.png","images/22.png","images/33.png","images/44.png"],
  ["images/111.png","images/222.png","images/333.png","images/444.png"] // default images
]

// play button
playbutton.addEventListener("click", function() {
  var j = true;
  for (var i = 0; i < character.length; i++) {
    if (character[i].checked === true) {
      birdwings = birdImages[i];
      j = false;
    }else if(i === character.length-1 && j){
      birdwings = birdImages[character.length];
    }
  }

  startpage.style.display = 'none';
  gamepage.style.display = 'block';
  gameloop();
})
