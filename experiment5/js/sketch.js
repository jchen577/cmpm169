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
    let canvas = createCanvas(1000, 2000,WEBGL);
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

let angle = 0;
let pressed = false;

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(220);

    fill(140,100,0);
    //rotateX(angle);
    //rotateY(angle);
    rotateY(angle);
    rotateZ(angle);
    rotateX(angle);
    if(pressed){
        angle += 0.005;
    }
    rotateX(45);
    push()
    torus(200,100);
    translate(0,0,100);
    fill(255,192,203)
    torus(200,75)
    translate(-150,500,0);
    rotateX(30);
    fill(255,0,0);
    cylinder(30,100);
    translate(200,40,0);
    fill(255,255,255);
    ellipsoid(100,40,20);
    pop()
    
    translate(0,0,-200);
    
    push()
    translate(-280,600,0);
    rotateX(30);
    box(50,300,10);
    pop()
    
    push()
    translate(280,600,0);
    rotateX(30);
    box(50,300,10);
    pop()
    
    box(700,900,10);

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
    if(pressed){
        pressed = false;
      }
      else{
        pressed = true;
      }
}