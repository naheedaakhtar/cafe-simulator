/*The Coding Train. (2018 June 30). Coding Challenge #111: Animated Sprites[Video]. Youtube. https://www.youtube.com/watch?v=3noMeuufLZY&t=5s

I used this video to better understand creating a class object and working with a json file. The aspects of this code that I have used include making the structure for this sprite class below as well as using the JSON file format from the video. I have changed this code in a few ways, like the movement of my sprite, but the overall JSON file and the Sprite class derives from the video. 
*/ 

class Sprite{
  //position, speed for each object 
  constructor(animation,speed,x,y){
    this.x=x;
    this.y=y;
    this.animation=animation;
    this.speed=speed;
    this.index=0;
  }
  show(){
     // Modulous by length ensures we wrap around the index 0 whenever frameCount=length, so index never exceeds length
    let index= floor(this.index) % this.animation.length;
    image(this.animation[index],this.x,this.y);
  }
  animate(){
    //manipulate change of frame rate and the waiter 'speed'
    this.index+=this.speed;
    this.x+=this.speed*2;
    //once offscreen move sprite back to starting point
    if (this.x>width){
      this.x=-this.animation[0].width;
    }
  }
}