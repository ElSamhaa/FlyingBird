// ##### the global variables #####
// pages
var startpage = document.getElementById('startpage');
var gamepage = document.getElementById('gamepage');
var endpage = document.getElementById('endpage');
// player
var playername = document.getElementById('playername1');
var displayname = document.getElementById('displayname');
var displaylives1 = document.getElementById('displaylives1');
var displaylives = document.getElementById('displaylives');
var score = document.getElementById('score');
var showscore = document.getElementById('showscore');
// first page
var character = document.getElementsByClassName('character');
// game page
var img = document.getElementById('bird1');
img.width = 80;
img.height = 60;
// end page
var endgame = document.getElementById('endgame');
var playagainbtn = document.getElementById('playagain');
// obstacle images
// var obsimage = document.getElementById('obsimage');
var imagesarray = ["images/obs2.png","images/obs1.png"];
var heightarray = ["70","90","110","130","150","170","190","210,230,300"];
// bird attributes
var birdwings = [];
var count = 0;
var keepjump = 'true';
var crash = 'false';
var birdImages = [
  ["images/1.png","images/2.png","images/3.png","images/4.png"],
  ["images/11.png","images/22.png","images/33.png","images/44.png"],
  ["images/111.png","images/222.png","images/333.png","images/444.png"] // default images
]
// levels
var levelsPics = [ "url('images/12.png')" , "url('images/2.jpg')" , "url('images/3.jpg')" ]
var level = document.getElementById("level")
var choosebtn = document.getElementById("choose")
var levelsimg = document.getElementById("levels")
var showlevel = document.getElementById("showlevel")
var levels = [
  document.getElementById("choose1"),
  document.getElementById("choose2"),
  document.getElementById("choose3")
]
// header bar
var header = document.getElementById('header-bar')
//##########################     Moving Object Class     #####
var MovingObject = function(x , y , dx , dy) {
  this.pos_x = x;
  this.pos_y = y;
  this.dx = dx;
  this.dy = dy;
}

MovingObject.prototype.move = function () {
};
//##########################     bird class     #####
 var bird = function(x = 20, y = 20 , lives = 3) {
   MovingObject.call(this,x , y , dx = 0 , dy = 15);
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
      this.pos_y -= 35;
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
// ... need to be moved into the environment class
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
var obstacle = function(x = -50, y = 0, dx = 5) {
  MovingObject.call(this, x, y, dx );
  this.obsimage = document.createElement("img");
  this.myDiv = document.getElementById('newobsimage');
  this.myDiv.appendChild(this.obsimage);
  this.obsimage.width = 50;
  this.obsimage.setAttribute('id','obsid');
  this.obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
  this.obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];
}

obstacle.prototype = Object.create(MovingObject.prototype);
obstacle.prototype.constructor = obstacle;

obstacle.prototype.move = function () {
  moveleft = setInterval( function(){
      this.pos_x += this.dx;
      this.obsimage.style.right = this.pos_x +"px";

      if (this.pos_x > 800) {
        this.pos_x = -50;
        this.obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
        this.obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];
      }
    }.bind(this), 50);
};

//##########################     environment Class    #####

const  Environment = function (x = 0 , y = 0, dx = 2) {
    MovingObject.call(this , x , y , dx)
    this.x = 0 ;
};

Environment.prototype.move = function(){
  setInterval(function(){
      this.x -= this.dx ;
      gamepage.style.backgroundPositionX =  this.x + "px"
  }.bind(this) ,50)
};

//##########################     Character Choose     #####

var characterChoose = function() {
  var j = true;
  for (var i = 0; i < character.length; i++) {
    if (character[i].checked === true) {
      birdwings = birdImages[i];
      j = false;
    }else if(i === character.length-1 && j){
      birdwings = birdImages[character.length];
    }
  }
}

//##########################    the game loop     ############
gameloop = function (level = 1) {
  this.level = level;
  // create the main player , wingmove
  this.birdplayer = new bird;
  this.birdplayer.setplayername(playername.value);
  var printname = this.birdplayer.getplayername();
  displayname.innerHTML = `Player: ${printname}`;

  const Env = new Environment();
  Env.move();

// creating obstacles
  this.groundObstacles = [];
  this.i = 0;

  clback = function(){
    this.groundObstacles[this.i] = new obstacle(10,0,this.level*10);
    this.groundObstacles[this.i].move();
    this.i++;
    if(this.i < this.level * 3){
      setTimeout(clback,1000)
    }
  }.bind(this)
  clback();
};

gameloop.prototype.crashDetection = function(){
  setInterval(function () {
    var obsimage = document.getElementById('newobsimage')

    for (var i = 0; i <this.level * 3 ; i++) {
      if ( ( (parseInt(getComputedStyle(obsimage.children[i]).left) <= this.birdplayer.pos_x) && (this.birdplayer.pos_y+50 >= parseInt(getComputedStyle(obsimage.children[i]).top)) )
          || this.birdplayer.pos_y > 500 && this.birdplayer.lives > 0) {
            this.birdplayer.pos_y = 20;
            this.birdplayer.lives--;
            displaylives1.innerHTML = ` x${this.birdplayer.lives}`;
            this.whencrash();
      }
    }
  }.bind(this), 50);
}

gameloop.prototype.whencrash = function () {
  function clearintervals(){
    clearInterval(grav);
    clearInterval(wingmov);
    clearInterval(scoreint);
  }

  clearintervals();
  img.src = "images/5.png"

  setTimeout(function() {
    img.src = birdwings[0];
    this.birdplayer.main();
  }.bind(this), 1000)

  if (this.birdplayer.lives === 0) {
   clearintervals();
   startpage.style.display = 'none';
   gamepage.style.display = 'none';
   endpage.style.display = 'block';
   endgame.src = "images/Replay.png";
   showscore.innerHTML = `${this.birdplayer.player_name} Your Final Score Is: ${this.birdplayer.scoree}`
 }
}

gameloop.prototype.Playagain = function(){
  playagain.addEventListener("click", function() {
    this.birdplayer.scoree = 0;
    this.birdplayer.pos_y = 20;
    this.birdplayer.lives = this.birdplayer.initiallives;
    this.birdplayer.main();
    startpage.style.display = 'none';
    gamepage.style.display = 'block';
    header.style.display = 'block';
    endpage.style.display = 'none';
  }.bind(this))
}

gameloop.prototype.main = function(){
  this.birdplayer.main();
  this.crashDetection();
  this.Playagain();
}

//##########################     loading page     #####
function loadingpage() {
  var bar = document.getElementById('progress-bar')
  var prog = document.getElementById('progress');
  var progress = 25;

  loadinginterval = setInterval(function() {
    if (progress === 500) {
      clearInterval(loadinginterval);
      bar.style.display = "none"
      startpage.style.display = "block"
    }
    else {
      progress += 5;
      prog.style.width = progress + 'px';
    }
  },10)
}

//##########################     starting the game normally without levels    #####
playbutton = function (){
  var playbutton = document.getElementById('startplay');
  playbutton.addEventListener("click", function() {
    characterChoose();
    startpage.style.display = 'none';
    gamepage.style.display = 'block';
    header.style.display = 'block';
    var newgame = new gameloop(); // ... should take the level
    newgame.main();
  })
}

//##########################     Start Levels    #####
var levelsinit = function(){
  showlevel.addEventListener("click", function() {
      startpage.style.display = 'none';
      level.style.display = 'block';
      // for (var i = 0; i < 3; i++) {
      startlevel = function(){
        characterChoose();
        level.style.display = 'none';
        gamepage.style.display = 'block';
        var newgame = new gameloop();
        newgame.main();
      }

      for (var i = 0; i < levels.length; i++) {
        levels[i].addEventListener("click" , function () {
            gamepage.style.backgroundImage = levelsPics[i];
            startlevel()
        },i);
      }
  })
}

//##########################     initiate the game     #####
function initiateGame(){
  loadingpage();
  playbutton();
  levelsinit();
}

initiateGame();
