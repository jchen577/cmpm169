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

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(800, 500);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(800, 500);
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
}

let yoff = 0;
let trail = [];
let cloudPos = 0;

// draw() function is called repeatedly, it's the main animation loop
function draw() {
let maxY = 0;
  background(135,206,235);
  push();
  if(cloudPos > 750){
    cloudPos = -550;
  }
  translate(cloudPos+5,0);
  cloudPos+=5;
  drawCloud(50,100);
  drawCloud(200, 200);
  drawCloud(350, 150);
  pop();
  stroke(0,0,255);
  noFill();
  let xoff = 0;
  for (let x1 = 0; x1 <= width; x1 += 10) {
    let y1 = map(noise(xoff, yoff), 0, 1, 0, height);
    trail.push({ x: x1, y: y1 });
    //vertex(x1, y1);
    xoff += 0.01;
  }
  yoff += 0.01;
  
  for (let i = 0; i < trail.length; i++) {
    if(trail[i].x== 0){
      beginShape();
    }
    if(trail[i].y > maxY){
      maxY = trail[i].y;
    }
    //let alpha = map(i, 0, trail.length, 255, 0);
    //fill(0, 150, 200, alpha);
    vertex(trail[i].x,trail[i].y);
    if(trail[i].x == 800){
      endShape();
    }
  }
  
  while(trail.length > 4800){
    trail.shift();
  }
  
  fill(0,0,255);
  rect(0, maxY, width, height-maxY);

}

function drawCloud(x, y) {
    noStroke();
    fill(255);
  
    // Main cloud body
    ellipse(x, y, 60, 60);
    ellipse(x + 25, y - 15, 50, 50);
    ellipse(x - 25, y - 15, 40, 40);
  }

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}