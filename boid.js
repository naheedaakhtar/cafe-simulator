/*The Coding Train. (2018, December 11). Coding Challenge #124: Flocking Simulation[Video]. YouTube. https://www.youtube.com/watch?v=mhjuuHl6qHM

^ I have referenced this video on flocking simulation to help me implement the forces part of the structure (separate,align,cohesion) as these were steps I was having trouble understanding and they were preventing me from moving onto the next step of my program - the actual flocking simulation.There isn't direct code from the video used, but it was a big influence on the structure of this code aside from the flocking pattern.

*/
class Boid {
  constructor(img,imgW,imgH) {
    //place boid on random point of canavas
    this.position = createVector(random(width),random(height));
    //ptjs function to randomize velocity
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2,4));
    this.maxVelocity = 5;
    //set acceleration and maximum value
    this.acceleration = createVector();
    this.maxAcceleration = 1;
    //store customer picture and size
    this.img = img;
    this.imgW=imgW;
    this.imgH=imgH;
  }
//FUNC: display boid physically (customer png)
  show(){ 
    image(this.img,this.position.x,this.position.y,this.imgW,this.imgH);
         
  }
  //FUNC:move boids with velocity and acceleration
  update(){
    //adding velocity to position vector moves boid along velocity vector
    this.position.add(this.velocity);
    //account for changes in speed/direction by adding acceleration
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
  }
  //FUNC: stop boids from leaving the screen
  edges(){
    // loop x around if its at either edge of the screen
    if (this.position.x>width){
      this.position.x=0;
    }
    else if (this.position.x<0){
      this.position.x=width;
    }
    //loop y around if its at either edge of the screen
    if (this.position.y>height){
      this.position.y=0;
    }
    else if (this.position.y<0){
      this.position.y=height;
    }
  }
  //FUNC: keep boids away from one another
  separate(boids){
    let perceptionRadius=50;
    let minDist=25; //minimum distance for boids to be away from eachother
    let totalBoids=0; //boids in radius
    let avoid=createVector(); //velocity
    
    //checking if theres a boid in the perception radius
    for (let i=0;i<boids.length;i++){
      let boid=boids[i];
      //distance between current boid and other boid
      let d=dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      )
      //if the boid is in the perceptionRadius
      if (d<perceptionRadius && boid!=this){
        if (d<minDist){
        //difference shows the distance between the boids, how much they avoid eachother
          let diff=p5.Vector.sub(this.position,boid.position)
          //dividing provides the average avoidance between the boids 
          diff.div(d);
          //add to the avoid vector
          avoid.add(diff);
          totalBoids++;
        }
      }
    } 
    //returns zero if no boids
    if (totalBoids>0){
      //average the avoidance force
      avoid.div(totalBoids);
      //standardize force strength so theyre not too strong
      avoid.setMag(this.maxVelocity);
      //subtract current velocity; change needed from current velocity
      avoid.sub(this.velocity);
      //limit function stops the boids from turning too sharp or quickly
      avoid.limit(this.maxAcceleration);
    }
    return avoid;
  }
  
  align(boids){
    let perceptionRadius=50;
    let totalBoids=0; //boids in radius
    let goalForce=createVector(); //velocity
    
    for (let i=0;i<boids.length;i++){
      let boid=boids[i];
      //distance between current boid and other boid
      let d=dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      )
      //if boid in perception radius
      if (d<perceptionRadius && boid!=this){
        goalForce.add(boid.Velocity);
        totalBoids++;
      }
      }
    if (totalBoids>0){
      //find average of forces found
      goalForce.div(totalBoids);
      //boid matches its speed to maximum velocity
      goalForce.setMag(this.maxVelocity);
      //prevent the boid from slowing down,
      goalForce.sub(this.velocity);
      goalForce.limit(this.maxAcceleration);
    }
    return goalForce;
  }
  //some repeated functionality as other forces
  cohesion(boids){
    let perceptionRadius = 50;
    let totalBoids = 0;
    let steering = createVector(); //change direction of object 
    
    for (let i=0;i<boids.length;i++){
      let boid=boids[i];
      //distance between current boid and other boid
      let d=dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      )
      //check if boids in perception radius (and not itself)
      if (d<perceptionRadius && boid!=this){
        steering.add(boid.position);
        totalBoids++;
      }
      }
    if (totalBoids>0){
      steering.div(totalBoids);
      steering.sub(this.position);
      steering.setMag(this.maxVelocity);
      steering.sub(this.velocity);
      steering.limit(this.maxAcceleration);
    }
    return steering;
  }
  
  flock(boids){
    this.acceleration.set(0,0); //change acceleration to 0 each frame
    
    //find the big three forces
    let separation=this.separate(boids);
    let alignment=this.align(boids);
    let cohesive=this.cohesion(boids);
    
    //multiply weights
    separation.mult(1.0);
    alignment.mult(1.0);
    cohesive.mult(1.0);
    
    //add forces to the acceleration
    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesive);
    
    //move boids towards mouse position
    let mousePos=createVector(mouseX,mouseY);
    let velo=p5.Vector.sub(mousePos,this.position); //velocity towards the mouse
    velo.setMag(this.maxVelocity); //limit to highest velocity (set before)
    let force=p5.Vector.sub(velo,this.velocity); //steering force of boids in flock
    force.limit(this.maxAcceleration);  //limit to highest acceleration
    force.mult(1.0);
    this.acceleration.add(force); //add on the steering force
  }
  
}