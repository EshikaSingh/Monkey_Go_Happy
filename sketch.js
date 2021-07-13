var PLAY = 1;

var END = 0;

var gameState = PLAY;

var monkey , monkey_running

var bananas ,bananaImage, obstacles, obstacleImage;

var bananaGroup, obstacleGroup;

var invisibleGround;

var SurvivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("ground2.png");
 
}



function setup() {

 createCanvas(600, 400);
  
  monkey = createSprite(80, 318, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300, 350);
  ground.addImage(groundImage);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(300, 370, 600, 10);
  invisibleGround.visible = false;
  
  //adjust the depth
   ground.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;

  bananaGroup = new Group();
  
  obstacleGroup = new Group();
}

function draw() {

 background(0,500, 500);
 //console.log(frameCount);
  
  monkey.collide(invisibleGround);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (gameState === PLAY){
    
     //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -16;
    }
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
  if(frameCount % 80 === 0 ){
    bananas();
  }
  
  if(frameCount % 300 === 0 ){
    obstacles();
  }
  
  for(var i = 0; i < bananaGroup.length; i++){
    if(bananaGroup.get(i).isTouching(monkey)){
      bananaGroup.get(i).destroy();
      monkey.scale = monkey.scale + 0.01;
    }
  }
    
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
  }
}
 
 drawSprites();
  stroke("white");
  textSize(20);
  fill("black");
  
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + SurvivalTime, 430, 50);
}

function bananas(){
 var  bananas = createSprite(600, 100, 20, 20);
  bananas.addImage(bananaImage);
  bananas.scale = 0.1;
  bananas.velocityX = -6;
  bananas.lifetime = -1;
  bananas = Math.round(random(100, 150, 200, 250)
  
  bananaGroup.add(bananas);
}

function obstacles(){
  var obstacles = createSprite(600, 330, 20, 20);
  obstacles.addImage(obstacleImage);
  obstacles.scale = 0.2;
  obstacles.velocityX = -6;
  obstacles.lifetime = -1;
  
  obstacleGroup.add(obstacles)
}


