var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var r;

var gameOver, gameOverImage;

var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup;

var alien, alienGroup, sword;
var alienAnimation, swordImage;

var swooshSound, gameOverSound;

function preload()
{
  
  swordImage = loadImage("sword.png");
  
  gameOverImage = loadImage("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alienAnimation = loadAnimation("alien1.png","alien2.png");

  swooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
}

function setup()
{
  //create the background
  createCanvas(500,500);
  
  //create the player sword
  sword = createSprite(100,250,10,10);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  sword.setCollider("circle",0,0,30);
  
  gameOver = createSprite(250,250,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  fruitGroup = createGroup();
  alienGroup = createGroup();
}


function draw()
{
  
  background("pink");
  
  //text the score
  fill("black");
  textSize(20);
  text("SCORE : "+score,380,20);
  
  //call the functions
  createFruit();
  createAlien();
  
  if(gameState === PLAY)
  {
    //move the sword with mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    //incrase score if sword touchs any fruit
    if(sword.isTouching(fruitGroup))
      {
        fruitGroup.destroyEach();
        swooshSound.play();
        score = score+1;
      }
    if(sword.isTouching(alienGroup))
      {
        //over the game if the sword touches any alien
        gameState = END;
        fruitGroup.destroyEach();
        alienGroup.destroyEach();
        gameOverSound.play();
      }  
  }     
  else if(gameState === END)
  {
    sword.destroy();      
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    gameOver.visible = true;  
  }
  
  drawSprites();
}

function createFruit(){
  
 if(World.frameCount % 80 == 0)
 {
   position = Math.round(random(1,3));
   fruit = createSprite(600,200,20,20);
   fruit.scale=0.2;
   
   var rand = Math.round(random(1,4));
   switch(rand)
     {
       case 1 : fruit.addImage(fruit1);
                break;
       case 2 : fruit.addImage(fruit2);
                break;
       case 3 : fruit.addImage(fruit3);
                break;
       case 4 : fruit.addImage(fruit4);
                break;
       default: break;           
     }
     
   if(position===1)
   {
     fruit.x = 600
     fruit.velocityX = -(6+(score/10))
   }
   else if(position===2)
   {
     fruit.x = 0
     fruit.velocityX = (6+(score/10))
   }
   else
   {
     fruit.x = Math.round(random(200,400))
     fruit.velocityY = (6+(score/10))
   }
   
   //add each fruit in the group
   fruitGroup.add(fruit);
   
   fruit.y = Math.round(random(50,340));

   fruit.setLifetime = 100;
   
 }
}

function createAlien()
{
  if(World.frameCount % 100 === 0)
    {
      
      state = Math.round(random(1,3));
      //create alien sprite 
      var alien = createSprite(600,400,10,10);
      
      if(state===1)
      {
         alien.x = 600
         alien.velocityX = -(6+(score/10))
      }
       else if(state===2)
       {
         alien.x = 0
         alien.velocityX = (6+(score/10))
       }
       else
       {
         alien.x = Math.round(random(200,400))
         alien.velocityY = (6+(score/10))
       }
      
      alien.y = Math.round(random(200,300));
      alien.addAnimation("smilling",alienAnimation);
      
      //asign lifetime
      alien.lifetime = 100;
      
      //add to the group
      alienGroup.add(alien);
      
    }
}