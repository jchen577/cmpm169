// sketch.js - Experiment 2: The creation of a unique creative code using vectors, animation, and interactivity
// Author: Jacky Chen
// Date: 1/22/2024

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

let trail = [];
let trail2 = [];
let squareSize = 30;
let mouseTrack = 0;
let distance = 0;

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
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
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);

  if(mouseTrack > windowWidth /2 +200){
    distance+=5;
    translate(distance,0);
  }
  else if(mouseTrack < windowWidth /2 -200){
    distance-=5;
    translate(distance,0);
  }
  else{
    translate(distance,0);
  }

  // Update the trail array with a new particle
  trail.push({ x: random(width), y: random(height), size: random(20,50) });
  trail.push({ x: random(width), y: random(height), size: random(20,50) });
  trail2.push({ x: mouseX+(distance*-1), y: mouseY, size: squareSize });

  // Draw squares from the trail
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 255, 0);
    fill(random(255), random(255), random(255), alpha);
    noStroke();
    rectMode(CENTER);
    rect(trail[i].x, trail[i].y, trail[i].size, trail[i].size);

    // Shrink the size of each square
    trail[i].size *= 0.97;
  }
  for (let i = 0; i < trail2.length; i++) {
    let alpha = map(i, 0, trail2.length, 255, 0);
    fill(random(255), random(255), random(255), alpha);
    noStroke();
    rectMode(CENTER);
    rect(trail2[i].x, trail2[i].y, trail2[i].size, trail2[i].size);

    // Shrink the size of each square
    trail2[i].size *= 0.97;
  }

  // Remove squares that have shrunk too much
  trail = trail.filter(square => square.size > 1);
  trail2 = trail2.filter(square => square.size > 1);

  mouseTrack = mouseX;
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

function keyPressed() {
    // Press 'UP' arrow key to increase the square size
    if (keyCode === UP_ARROW) {
      squareSize += 5;
    }
    // Press 'DOWN' arrow key to decrease the square size
    else if (keyCode === DOWN_ARROW && squareSize > 5) {
      squareSize -= 5;
    }
  }