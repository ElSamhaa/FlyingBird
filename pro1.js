// ##### the global variables #####
var img = document.getElementById('bird1');
var character = document.getElementsByClassName('character');
var playbutton = document.getElementById('startplay');
var startpage = document.getElementById('startpage');
var gamepage = document.getElementById('gamepage');
var endpage = document.getElementById('endpage');
var playername = document.getElementById('playername1');
var displayname = document.getElementById('displayname');
var displaylives1 = document.getElementById('displaylives1');
var displaylives = document.getElementById('displaylives');
var endgame = document.getElementById('endgame');
var score = document.getElementById('score');
var showscore = document.getElementById('showscore');
var playagainbtn = document.getElementById('playagain');
var obsimage = document.getElementById('obsimage');
var imagesarray = ["images/obs2.png","images/obs1.png"];
var heightarray = ["150","200","250","300","350","400","500","550"];


img.width = 100;
img.height = 80;
var birdwings = [];
var count = 0;
var keepjump = 'true';
var crash = 'false';

//##### the bird class #####
 var bird = function() {
   this.pos_y = 100;
   this.pos_x = 150;
   this.player_name;
   this.lives = 3;
   this.scoree = 0;
   window.addEventListener('keyup', function(event) {
     if (event.keyCode === 32 && this.pos_y > 10 && keepjump === 'true') {
       this.pos_y -= 40;
       img.style.top= this.pos_y +'px';
     }
   }.bind(this))
 }
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
 bird.prototype.getbirdposy = function () {
   return this.pos_y;
 };
 bird.prototype.getbirdposx = function () {
   return this.pos_x;
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
 bird.prototype.wingmove = function () {

  wingmov = setInterval(this.changeimg,90);

 };
bird.prototype.gravity = function () {
    grav = setInterval(this.set_y.bind(this), 90);
};
bird.prototype.changeimg = function () {
  img.src = birdwings[count++];
  if (count === 4) {
    count = 0;
  }
};
bird.prototype.crash = function () {
  if (parseInt(getComputedStyle(obsimage).left) <= this.pos_x) {
    if (this.pos_y+50 >= parseInt(getComputedStyle(obsimage).top)) {
      this.pos_y = 100;
      this.lives--;
      displaylives1.innerHTML = ` x${this.lives}`;
      this.whencrash();
    }
  }
};
bird.prototype.whencrash = function () {
  clearInterval(grav);
  clearInterval(wingmov);
  clearInterval(scoreint);
  img.src = "images/5.png"
  setTimeout(function() {
    img.src = birdwings;
    this.wingmove();
    this.gravity();
    this.printscore();
  }.bind(this), 1000)
};
bird.prototype.set_y = function () {
  this.pos_y += 7
  img.style.top= this.pos_y +"px";
  displaylives.src = birdwings[0];
  displaylives1.innerHTML = ` x${this.lives}`;
  this.crash();
  if (this.pos_y > window.innerHeight-120 && this.lives > 0) {
    this.pos_y = 100;
    this.lives--;
    displaylives1.innerHTML = ` x${this.lives}`;
    this.whencrash();
  }
  if (this.lives === 0) {
    clearInterval(grav);
    clearInterval(wingmov);
    clearInterval(scoreint);
    startpage.style.display = 'none';
    gamepage.style.display = 'none';
    endgame.src = "images/Replay.png";
    endpage.style.display = 'block';
    showscore.innerHTML = `${this.player_name} Your Final Score Is: ${this.scoree}`
  }
};


playbutton.addEventListener("click", function() {
  if (character[0].checked === true) {
    birdwings = ["images/1.png","images/2.png","images/3.png","images/4.png"];
  }
  if (character[1].checked === true) {
    birdwings = ["images/11.png","images/22.png","images/33.png","images/44.png"];
  }
  if (character[0].checked === false && character[1].checked === false) {
    birdwings = ["images/111.png","images/222.png","images/333.png","images/444.png"];
  }
  startpage.style.display = 'none';
  gamepage.style.display = 'block';
  gameloop();
})

//###### the game loop ######
function gameloop() {
  var b1 = new bird;
  var obs = new obstacles;
  obs.obsmove();

  b1.setplayername(playername.value);
  var printname = b1.getplayername();
  displayname.innerHTML = `Player: ${printname}`;

  b1.wingmove();
  b1.gravity();
  //b1.birdjump();
  b1.printscore();

  playagain.addEventListener("click", function() {
    b1.scoree = 0;
    b1.pos_y = 100;
    b1.lives = 3;
    b1.wingmove();
    b1.gravity();
    b1.printscore();
    startpage.style.display = 'none';
    gamepage.style.display = 'block';
    endpage.style.display = 'none';
  })
}



//######## the obstacles class and proto types ########
obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];

var obstacles = function() {
  this.posx = 10;
  this.posy = 0;
}
obstacles.prototype.setposx = function () {
  this.posx += 10;
  obsimage.style.right = this.posx +"px";
  if (this.posx > window.innerWidth-140) {
    this.posx = 10;
    setTimeout(function() {
      obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
      obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];
    },100)
  }
};
obstacles.prototype.getposx = function () {
  return this.posx;
};
obstacles.prototype.setposy = function (nuum) {
  this.posy = nuum;
};
obstacles.prototype.getposy = function () {
  return this.posy;
};
obstacles.prototype.obsmove = function () {
  moveleft = setInterval(this.setposx.bind(this), 50);
};
