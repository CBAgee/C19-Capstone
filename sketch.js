var PLAY = 1;
var END = 0;
var gameState = PLAY;

var robber, robberImg, robbercaught, robbercaughtImg;
var police, policeImg;
var car, car2, car3, car4, carsGroup;
var road, roadImg;

var score = 0;

function preload(){
roadImg = loadImage("road.png");
robberImg = loadImage("robber.png");
policeImg = loadImage("police.png");
robbercaughtImg = loadImage("robbercaught.jpg");

car2 = loadImage("car.png");
}


function setup(){
createCanvas(windowWidth, windowHeight);
road = createSprite(1200,350);
road.addImage("road",roadImg);
road.velocityX = - 3;
road.scale = .45;

robber = createSprite(300, 200, 200, 100);
robber.addImage("robber", robberImg);
robber.scale = 0.15;



police = createSprite (50, robber.y, 200, 100);
police.addImage("police", policeImg);
police.scale = 0.25



carsGroup =  new Group();
}

function spawnCars() {
  if(frameCount % 60 === 0) {
    var car = createSprite(width,robber.y,20,30);
    //car.setCollider('square')
    //car.debug = true
  
    car.velocityX = -(6 + 3*score/100);
    car.addImage("car", car2)
    car.scale = 0.1
    
    carsGroup.add(car)
    
    
    car.scale = 0.3;
    car.lifetime = 300;
    car.depth = robber.depth;
    robber.depth +=2;

    
  }
}


function draw(){
background(0);




if (gameState===PLAY){


road.velocityX = -(6 + 3*score/100);

if(road.x < 500){
  road.x = 1000
}

  if(keyDown("up")){
    robber.y = robber.y - 5;
    police.y = robber.y;
  }

  if(keyDown("down")){
    robber.y = robber.y +  5;
    police.y = robber.y;
  }

  if(keyDown("right")){
    robber.x = robber.x + 3;
   
  }

  if(keyDown("left")){
    robber.x = robber.x - 3;
  
    }

  spawnCars();



 if(carsGroup.isTouching(robber) || police.isTouching(robber)){

 gameState = END;
}
drawSprites();

fill("yellow");
textSize(20);
text("Score: "+ score,100,100);
score = score + Math.round(frameCount/60);
}
else if (gameState === END) {
  road.velocityX = 0;
  robber.velocityY = 0;
  carsGroup.setVelocityXEach(0);


  textSize(30);
  fill ("white");
text ("game over! you were caught!", 600, 400);



}



}