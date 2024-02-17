// sketch.js - Text experiments in p5.js
// Author: Jacky Chen
// Date: 2/17/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

/**
 * Drawing tool for creating moire effect compositions using
 * smooth path of any length, width, smoothness and colour.
 *
 * MOUSE
 * position x          : path simplification
 * position y          : ribbon width
 *
 * KEYS
 * arrow right         : increase path density
 * arrow left          : decrease path density
 * arrow up            : increase font size
 * arrow down          : decrease font size
 * control             : save png
 * 
 * TYPING
 * rotate              : rotates the text
 * square              : draws a square
 * triangle            : draws a triangle
 * circle              : draws a circle
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */

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

var letters = [];
var density = 2.5;
var ribbonWidth = 92;
var shapeColor;
var fontSize = 100;
var pathSimplification = 0;
var pathSampleFactor = 0.1;


var textTyped = 'hi';


var font;


function preload() {
  font = loadFont('data/PlayfulTime.ttf');
}


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

    noFill();
    strokeWeight(1);
    shapeColor = color(0);


    createLetters();

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(255);
    if(textTyped.includes('rotate')){
        angle+= 0.05;
        rotate(angle);
    }
    else{
        angle = 0;
    }
    if(textTyped.includes('circle')){
      circle(canvasContainer.width()/2,canvasContainer.height()/2,canvasContainer.width());
    }
    if(textTyped.includes('square')){
        square(0,0,canvasContainer.width()-20);
    }
    if(textTyped.includes('triangle')){
        triangle(canvasContainer.width()/2,0,canvasContainer.width(),canvasContainer.height()-10,0,canvasContainer.height()-10);
    }

    translate(100, height*.25);
  
  
    pathSampleFactor = 0.1 * pow(0.02, mouseX / width);
    ribbonWidth = 10;
  
  
    for (var i = 0; i < letters.length; i++) {
      letters[i].draw();
    }
  

}

function createLetters() {
    letters = [];
    var chars = textTyped.split('');
  
  
    var x = 0;
    var y = 0;
    var subbed = 0;
    for (var i = 0; i < chars.length; i++) {
      if (i > 0) {
        var charsBefore = textTyped.substring(subbed, i);
        x = font.textBounds(charsBefore, 0, 0, fontSize).w +20;
        if(x + fontSize > canvasContainer.width()){
          x= 0;
          subbed = i;
          y+= fontSize;
        }
      }
      var newLetter = new Letter(chars[i], x, y);
      letters.push(newLetter);
    }
  }
  
  
  function Letter(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  
  
    Letter.prototype.draw = function() {
      var path = font.textToPoints(this.char, this.x, this.y, fontSize, {sampleFactor: pathSampleFactor});
      stroke(shapeColor);
  
  
      for (var d = 0; d < ribbonWidth; d += density) {
        beginShape();
        stroke(random(0,255),random(0,255),random(0,255));
  
  
        for (var i = 0; i < path.length; i++) {
          var pos = path[i];
          var nextPos = path[i + 1];
  
  
          if (nextPos) {
            var p0 = createVector(pos.x, pos.y);
            var p1 = createVector(nextPos.x, nextPos.y);
            var v = p5.Vector.sub(p1, p0);
            v.normalize();
            v.rotate(HALF_PI);
            v.mult(d);
            var pneu = p5.Vector.add(p0, v);
            curveVertex(pneu.x, pneu.y);
          }
        }
  
  
        endShape(CLOSE);
      }
    };
  }
  
  
  function keyReleased() {
    if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  
  
    if (keyCode == LEFT_ARROW) density *= 1.25;
    if (keyCode == RIGHT_ARROW) density /= 1.25;
  
  
    if (keyCode == UP_ARROW) {
      fontSize *= 1.1;
      createLetters();
    }
    if (keyCode == DOWN_ARROW) {
      fontSize /= 1.1;
      createLetters();
    }
  
  
    if (keyCode == ENTER) createLetters();
  }
  
  
  function keyPressed() {
    if (keyCode == DELETE || keyCode == BACKSPACE) {
      if (textTyped.length > 0) {
        textTyped = textTyped.substring(0, textTyped.length - 1);
        createLetters();
      }
    }
  }
  
  
  function keyTyped() {
    if (keyCode >= 32) {
      textTyped += key;
      createLetters();
    }
  }
  

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}