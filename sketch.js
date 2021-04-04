
var PLAY=1;
var END=0;
var gameState=1;

var monkey , monkey_running;
var banana ,bananaImage,  obstacleImage,obstacle2;

var score;
var survivalTime;

// variables for background..
var back,backImg;

var restart, restartImage;
var gameOver,gameOverimg;
var lose,loseimg;


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_Img = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  restartImage=loadImage("restart.png")
  
  gameOverimg=loadImage("gameover.png");

  loseimg=loadImage("youlose.png");


  backImg=loadImage("jungle.png");  
 

  score=0;
}



function setup()
 {
  createCanvas(700,500);

  back=createSprite(350,250);
  back.addImage(backImg);
  back.scale=0.7;

  monkey=createSprite(80,402,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;

 
  ground=createSprite(350,480,700,40);
  ground.velocityX=-6;
 
  restart=createSprite(350,400,20,20);
  restart.addImage(restartImage);
  restart.scale=0.05;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver=createSprite(350,250,20,20);
  gameOver.addImage(gameOverimg);
  gameOver.scale=0.1;
  
  lose=createSprite(350,150,20,20);
  lose.addImage(loseimg);
  lose.scale=0.4;

}


function draw() 
{

  background(backImg);

  ground.x = ground.width /2;
  ground.visible=false;
  console.log(ground.x)
  
  if(gameState===PLAY)
  {
   survivalTime=Math.ceil(frameCount/frameRate())
    
    restart.visible=false;
    gameOver.visible=false;
    lose.visible=false

    monkey.collide(ground)
  
    monkey.setCollider("rectangle",-30,20,600,580);
  
    if(keyDown("space")&& monkey.y>=290)
    {
    monkey.velocityY=-13;
    }

    monkey.velocityY=monkey.velocityY+0.8
  
    spawnfood();
    spawnobstacle();

  if(monkey.isTouching(foodGroup))
  {
    score=score+1;
    foodGroup.destroyEach();
  }

  if(obstacleGroup.isTouching(monkey))
  {

  gameState=END;
    
  }

  }else
  if(gameState===END)
    {

      text("Click Here to Restart the Game",220,350);
    
      restart.visible=true;
      gameOver.visible=true;
      monkey.visible=false;
      lose.visible=true;

      ground.velocityX=0;
      monkey.velocityY=0;

      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);

      foodGroup.destroyEach();
      obstacleGroup.destroyEach();

      
    }
  
  
  if(mousePressedOver(restart))
  {
    reset();
  }

  stroke("black");
  textSize(20);
  fill("black");
  text("Your Score:"+score,450,50);

  stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime:"+survivalTime,100,50);
  
  drawSprites();
  
}

function spawnfood()
{

  if(frameCount % 80===0)
  {
    banana = createSprite(600,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.y = Math.round(random(120,200));
    foodGroup.add(banana);
    foodGroup.setVelocityXEach(-8);
    // memory leak..
    foodGroup.setLifetimeEach(70);
    
  }
}

function spawnobstacle()
{
  
  if(frameCount % 300===0){
    
    obstacle2 = createSprite(600,424,20,20);
    obstacle2.addImage("obstacle",obstacleImage);
    obstacle2.velocityX=-9;
    obstacle2.scale=0.2;
    obstacleGroup.add(obstacle2);
    obstacle2.setCollider("circle",0,0,250)
  }
}

function reset()
{
  gameState=PLAY;
  monkey.visible=true;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime=0;
  score=0;
}







