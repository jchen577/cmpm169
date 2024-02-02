// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

var img;
var mode = 0;
function preload(){
  img = loadImage("./js/images/Cat.jpg");
  img2 = loadImage("./js/images/Dog.jpg");
}

var capture;
var imgCache;
let overAllTexture;


// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(640, 480);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;

    capture = createCapture(VIDEO);//Capture the video feed
    capture.size(640,480);
    imgCache = createGraphics(640,480)
    imgCache.translate(640,0)
    imgCache.scale(-1,1)
    capture.hide();//Hide the videp
    
    overAllTexture=createGraphics(width,height);
    overAllTexture.loadPixels()
      // noStroke()
      for(var i=0;i<width+50;i++){
          for(var o=0;o<height+50;o++){
    overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,50,100])))
          }
      }
      overAllTexture.updatePixels()
    radius = 10;
  
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(220);//Reset canvas
    if(mode == 0){//If mode 0 then return video feed
      imgCache.image(capture,0,0);
    }
    else if(mode == 1){//If mode 1 then return animals
      imgCache.clear();
      imgCache.image(img,mouseX,mouseY);   
      imgCache.image(img2,(mouseX+500)/2,mouseY);
    }
    push()
    noStroke()
    scale(1)
          for(var y=0;y<imgCache.height;y+=radius){
              for(var x=0;x<imgCache.width;x+=radius){
                  var pixel = imgCache.get(x,y)
                  var r = pixel[0]
                  var g = pixel[1]
                  var b = pixel[2]
  
                  let bk = (r+g+b)/3
                  let bkI = 10-int(bk/25.5)
                  let txt = "こんにちは十の言葉😀"//Text to use for images
                  fill(r+50,g+50,b+50)
                  textSize(radius)
                  textStyle(BOLD)
                  text(txt[bkI],x,y)
                //ellipse(x,y,radius/3+b/15,radius/3+b/15)
                  }
          }
    pop()
      
      push()
          blendMode(MULTIPLY);
          image(overAllTexture,0,0);
      pop()
  
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
    if(mode == 1){
        mode = 0;
      }
      else{
        mode += 1;
      }
    
}