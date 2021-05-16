var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;

function preload(){
dogimg = loadImage("Dog.png");
dogHappy = loadImage("happydog.png");

}

function setup() {
  createCanvas(700, 500);
  
  
  dog = createSprite(200,200,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.2;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
 
}


function draw() {
  background(46,139,87); 
  
  if (keyIsDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  

  drawSprites();

  textSize(20);
  fill("white");
  text("food remaining: "+foods,300,250);
  text("press the up arrow key to feed the dog",250,150);
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}
