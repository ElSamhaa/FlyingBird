//
var medal1 = document.getElementById('stmedal')
var medal2 = document.getElementById('ndmedal')
var medal3 = document.getElementById('thmedal')

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
var levelsPics = [ "url('images/b1.png')" , "url('images/b2.png')" , "url('images/b3.png')" ]
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

  this.calledByKeyUp = function() {
    if (this.pos_y > 50 && keepjump === 'true') {
      this.pos_y -= this.dy*4;
      img.style.top = this.pos_y +'px';
    }
  }.bind(this)

  this.keyupEventListner = window.addEventListener('keyup',this.calledByKeyUp)

  // gravity effect
  grav = setInterval(function () {
    this.pos_y += this.dy;
    img.style.top = this.pos_y +"px";
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
   if (this.scoree >= 10) {
     medal1.style.opacity = "1";
   }
   if (this.scoree >= 20) {
     medal2.style.opacity = "1";
   }
   if (this.scoree >= 30) {
     medal3.style.opacity = "1";
   }
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
	  window.removeEventListener('keyup',this.calledByKeyUp)
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


// flyingObsImage

//##########################     Flying Obstacles Class    #####
var flyingObstacle = function(x = -50, y = 100  , dx = 5) {
  obstacle.call(this, x, y, dx );
  // this.pos_x = x; this.pos_y = y ; this.dx = dx;
  this.obsimage = document.createElement("img");
  this.myDiv = document.getElementById('flyingObsImage');
  this.myDiv.appendChild(this.obsimage);
  this.obsimage.width = 50;
  this.obsimage.setAttribute('id','flyingObsId');
  this.obsimage.src = 'images/enemy.png';
  this.obsimage.style.top = Math.floor(Math.random()*100) +"px";
}

flyingObstacle.prototype = Object.create(obstacle.prototype);
flyingObstacle.prototype.constructor = obstacle;

flyingObstacle.prototype.move = function () {
  moveleft = setInterval( function(){
      this.pos_x += this.dx;
      this.obsimage.style.right = this.pos_x +"px";

      if (this.pos_x > 800) {
        this.pos_x = -700;
        this.obsimage.style.top = Math.floor(Math.random() *150)+"px";
      }
    }.bind(this), 50);
};
//##########################     environment Class    #####

const  Environment = function (x = 0 , y = 0, dx = 2) {
    MovingObject.call(this , x , y , dx)
    this.x = 0 ;
};

Environment.prototype.move = function(){
  this.EnvInterval = setInterval(function(){
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

  this.Env = new Environment();
  this.Env.move();

// creating obstacles
  this.groundObstacles = [];
  this.flyingObstacle = [];
  this.i = 0;

  clback = function(){
    this.groundObstacles[this.i] = new obstacle(10,0,this.level*10);
    this.groundObstacles[this.i].move();

    this.flyingObstacle[this.i] = new flyingObstacle(-700,5,this.level*10)
    console.log(this.flyingObstacle[this.i].pos_y)
    this.flyingObstacle[this.i].move();
    this.i++;
    if(this.i < this.level * 3){
      setTimeout(clback,1000)
    }
  }.bind(this)
  clback();
};

  gameloop.prototype.crashDetection = function(){
    this.crashDetInt = setInterval(function () {
    this.obsimage = document.getElementById('newobsimage');
    this.obsFlyingImage = document.getElementById('flyingObsImage');

    for (var i = 0; i <this.level * 3 ; i++) {
      if ( parseInt(window.getComputedStyle(this.obsimage.children[i]).left)-50 <= this.birdplayer.pos_x) {
	      	if (this.birdplayer.pos_y+20 >= parseInt(window.getComputedStyle(this.obsimage.children[i]).top) ){
	      	    this.birdplayer.pos_y = 20;
	            this.birdplayer.lives--;
	            displaylives1.innerHTML = ` x${this.birdplayer.lives}`;
	            this.whencrash();
	      	}
      	}

        if ( parseInt(window.getComputedStyle(this.obsFlyingImage.children[i]).left)-50 <= this.birdplayer.pos_x) {
            if (this.birdplayer.pos_y+30 <= parseInt(window.getComputedStyle(this.obsFlyingImage.children[i]).top)
            && this.birdplayer.pos_y-30 >= parseInt(window.getComputedStyle(this.obsFlyingImage.children[i]).bottom)){
                this.birdplayer.pos_y = 20;
                this.birdplayer.lives--;
                displaylives1.innerHTML = ` x${this.birdplayer.lives}`;
                this.whencrash();
            }
          }
    }
  }.bind(this), 50);
}

gameloop.prototype.whencrash = function () {
  function clearintervals(){
    clearInterval(this.crashDetInt);//...
    clearInterval(grav);
    clearInterval(wingmov);
    clearInterval(scoreint);
  }

  clearintervals();
  img.src = "images/5.png"

if (this.birdplayer.lives > 0) {
	  setTimeout(function() {
    img.src = birdwings[0];
    this.birdplayer.main();
  }.bind(this), 1000)
}

  if (this.birdplayer.lives === 0) {
   clearintervals();
   clearInterval(this.Env.EnvInterval);
   startpage.style.display = 'none';
   gamepage.style.display = 'none';
   endpage.style.display = 'block';
   header.style.display = 'block';
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
      startlevel = function(){
        characterChoose();
        level.style.display = 'none';
        gamepage.style.display = 'block';
        header.style.display = 'block';
        var newgame = new gameloop();
        newgame.main();
      }

        levels[0].addEventListener("click" , function () {
             gamepage.style.backgroundImage = levelsPics[0];
             startlevel()
        })
        levels[1].addEventListener("click" , function () {
            gamepage.style.backgroundImage = levelsPics[1];
            startlevel()
        });
        levels[2].addEventListener("click" , function () {
            gamepage.style.backgroundImage = levelsPics[2];
            startlevel()
        });
  })
}

//##########################     initiate the game     #####
function initiateGame(){
  loadingpage();
  playbutton();
  levelsinit();
}

initiateGame();
