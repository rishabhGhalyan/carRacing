var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var car1,car2,car3,car4,cars,car1Image,car2Image,car3Image,car4Image
var trackImage
var database;

var form, player, game;
var allPlayers;
var distance = 0;

function preload (){
car1Image = loadImage("images/car1.png")
car2Image = loadImage("images/car2.png")
car3Image = loadImage("images/car3.png")
car4Image = loadImage("images/car4.png")
trackImage = loadImage("images/track.jpg")
}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}


function draw(){
  if(playerCount===4){
    game.update(1)
  }
  if(gameState===1){
    clear();
    game.play()
  }
}
