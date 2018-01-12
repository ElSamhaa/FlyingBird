// last added variables
var heightarray = ["70","90","110","130","150","170","190","210,230,300"];
var header = document.getElementById('header-bar')
var level = document.getElementById("level")
var choosebtn = document.getElementById("choose")
var levelsimg = document.getElementById("levels")
var showlevel = document.getElementById("showlevel")
var levels = [
  document.getElementById("choose1"),
  document.getElementById("choose2"),
  document.getElementById("choose3")
]
var levelsPics = [ "url('images/12.png')" , "url('images/2.jpg')" , "url('images/3.jpg')" ]

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
img.width = 80;
img.height = 60;
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
var birdImages = [
  ["images/1.png","images/2.png","images/3.png","images/4.png"],
  ["images/11.png","images/22.png","images/33.png","images/44.png"],
  ["images/111.png","images/222.png","images/333.png","images/444.png"] // default images
]

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
var obstacle = function(x = -50, y = 0, dx = 5) {
  MovingObject.call(this, x, y, dx );
}

obstacle.prototype = Object.create(MovingObject.prototype);
obstacle.prototype.constructor = obstacle;

obstacle.prototype.move = function () {
  moveleft = setInterval( function(){
      this.pos_x += this.dx;
      obsimage.style.right = this.pos_x +"px";

      if (this.pos_x > 800) {
        this.pos_x = -50;
        obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
        obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];
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

//##########################     levels Start    #####

var levelsinit = function(){
  showlevel.addEventListener("click", function() {
      startpage.style.display = 'none';
      level.style.display = 'block';

      for (var i = 0; i < levelsPics.length; i++) {
        l = levelsPics[i];
        levels[i].addEventListener("click" , function (e , levelsPic = levelsPics) {
            gamepage.style.backgroundImage = levelsPic;
            characterChoose();
            level.style.display = 'none';
            gamepage.style.display = 'block';
            gameloop();
        });
      }
  })

}

//##########################    the game loop     ############
// game loope should be object that get the level and the other parameters

gameloop = function (level = 1) {
  // create the main player
  this.birdplayer = new bird;
  console.log(this.birdplayer)

  // create the obstacles
  groundObstacles = [];
  for (var i = 0; i < level * 3; i++) {
    groundObstacles[i] = new obstacle(10,0,level*10);
    groundObstacles[i].move();
  }

  const Env = new Environment()
  Env.move();

  this.birdplayer.setplayername(playername.value);
  var printname = this.birdplayer.getplayername();
  displayname.innerHTML = `Player: ${printname}`;

  this.birdplayer.main();

  // ... dealing with bird crashing
  setInterval(function crash () {
  // solution for crashing .. mmove function get array of obstacles and check on them
  //
  if ( ( (parseInt(getComputedStyle(obsimage).left) <= this.birdplayer.pos_x) && (this.birdplayer.pos_y+50 >= parseInt(getComputedStyle(obsimage).top)) )
      || this.birdplayer.pos_y > 500 && this.birdplayer.lives > 0) {
        this.birdplayer.pos_y = 20;
        this.birdplayer.lives--;
        displaylives1.innerHTML = ` x${this.birdplayer.lives}`;
        whencrash();
     }
  }.bind(this), 50);


  whencrash = function () {

    function clearintervals(){
      clearInterval(grav);
      clearInterval(wingmov);
      clearInterval(scoreint);
    }

    clearintervals();
    img.src = "images/5.png"

    setTimeout(function() {
      img.src = birdwings[0];
      this.birdplayer.wingmove();
      this.birdplayer.move();
      this.birdplayer.printscore();
    }.bind(this), 1000)


    if (this.birdplayer.lives === 0) {
     clearintervals();
     startpage.style.display = 'none';
     gamepage.style.display = 'none';
     endpage.style.display = 'block';

     showscore.innerHTML = `${this.birdplayer.player_name} Your Final Score Is: ${this.birdplayer.scoree}`
   }
  }

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
};


//##########################     starting the game normally without levels    #####
// play button listner
playbutton.addEventListener("click", function() {
  characterChoose();
  startpage.style.display = 'none';
  gamepage.style.display = 'block';
  header.style.display = 'block';
  newgame = gameloop(); // ... should take the level
})


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


function initiateGame(){
  loadingpage();
  levelsinit();
}

initiateGame();
