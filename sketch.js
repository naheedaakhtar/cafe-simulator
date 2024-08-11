//array of boids & number of boids & image used for boids (customers)
let customers=[];
let numCustomers=30;
let customerImage;
//background shade variables
let dayTime,nightTime, sunrise;
//load json file, data on position and height/width of sprite (in preload)
let spriteSheet;
//load png file for sprite (in preload)
let spriteData;

//array of positions of sprite
let animation = [];
let waiters=[];

//function that loads pngs used (sourced from Universal LPC Generator Site & entire webpage cited for convenience)
function preload(){
  spriteData = loadJSON('https://raw.githubusercontent.com/naheedaakhtar/cafe_simulator/main/waiter.json');
  /*
  Universal LPC spritesheet generator. Universal LPC Sprite   Sheet Character Generator. (n.d.). https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?
body=Body_color_light&head=Human_male_light 
  */
  spriteSheet = loadImage('waiterSprite.png');
  /*Universal LPC spritesheet generator. Universal LPC Sprite Sheet Character Generator. (n.d.-a). https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_amber&head=Human_male_amber&sex=female&shadow=Shadow_shadow */
  customerImage=loadImage('customer.png');
}


function setup() {
  createCanvas(400, 400);
  //make Boids 'objects' (the customers) with for loop & established dimensions
  let customerWidth=60;
  let customerHeight=60;
  for (let i=0; i<numCustomers;i++){
    customers.push(new Boid(customerImage,customerWidth,customerHeight));
  }
  //initialize colors for background
  dayTime=color(150,220,255);
  nightTime=color(0,0,50);
  sunrise=color(220,151,200);
  // extract each sprite frame from json file
  let leftMove= spriteData.frames;
  // iterate through each sprite frame
  for (let i=0; i<leftMove.length;i++){
    // extract position details from json file
    let pos= leftMove[i].position;
    let img = spriteSheet.get(pos.x,pos.y, pos.w, pos.h);
    //divide sprite size for better fit on screen
    img.resize(pos.w/3,pos.h/3);
    // add each sprite frame to array
    animation.push(img);
  }
  //find number of waiters based on height
  numWaiter= int(height/100);
  //create waiters in relation to the windowscreen
  for (let i=0;i<numWaiter;i++){
    waiters[i]= new Sprite(animation,random(0.1,1),0,i*110);
  }
}

function draw(){
  //oscillating frameCount used to make sunrise/sunset flow
  let timeOfday=sin(frameCount/400);
  // map time/color to speed 
  let waiterSpeed=map(abs(timeOfday),0,1,0.5,1.5);
  //variable to hold sky/daytime color 
  let col;
  //daytime colors
  if (timeOfday>0){
    col= lerpColor(sunrise,dayTime, timeOfday);
  }
  //nighttime colors
  else{
    col=lerpColor(sunrise,dayTime, abs(timeOfday));
  }
  background(col);
  
  //call each method of boids for each customer boid made
  for (let boid of customers){
      boid.flock(customers);
      boid.edges(); //keep boids in frame
      boid.update(); //move boid before showing
      boid.show();
    }
  //call methods from sprite class for each waiter
  for (let waiter of waiters){
    waiter.speed=waiterSpeed;
    waiter.show();
    waiter.animate();
  }
}

//make the screen adaptable if you change the window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}