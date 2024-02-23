// sketch.js - Text experiments in p5.js
// Author: Jacky Chen
// Date: 2/23/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// The Coding Train / Daniel Shiffman (Original Template)

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

let angle = 0;

let table;
let table2;
let r = 200;

let earth;
let xaxis;
function preload() {
  earth = loadImage('./js/earth2.jpg');
  // table = loadTable(
  //   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv',
  //   'header'
  // );
  // table = loadTable(
  //   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv',
  //   'header'
  // );
  // This dataset is more medium sized, giving a decent number of
  // earthquakes to look at without slowing the sketch down as much.
  table = loadTable(
'./js/4.5_month.csv','csv',
    'header'
  );
  table2 = loadTable('./js/pyramids.csv','csv','header');
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(),WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

}

// draw() function is called repeatedly, it's the main animation loop
function draw(){
  background(100);
  orbitControl(1, 1, 1);
  // We don't need to translate here, since WEBGL mode centers the view
  rotateY(angle);
  angle += 0.01;

  lights();
  noStroke();
  // While the video shows that this doesn't work for texturing the
  // sphere, that's only true for Processing - in p5.js, it does work.
  texture(earth);
  sphere(r);

  // The rows are here a field instead of a method, and the getFloat()
  // method is replaced by getNum() since JS only has one number type.
  for (let row of table.rows) {
    let lat = row.getNum('latitude');
    let lon = row.getNum('longitude');
    let magi = row.getNum('mag');

    // original version
    // let theta = radians(lat) + PI/2;

    // fix: no + PI/2 needed, since latitude is between -180 and 180 deg
    let theta = radians(lat);

    let phi = radians(lon) + PI;

    // original version
    // let x = r * sin(theta) * cos(phi);
    // let y = -r * sin(theta) * sin(phi);
    // let z = r * cos(theta);

    // fix: in OpenGL, y & z axes are flipped from math notation of spherical coordinates
    let x = r * cos(theta) * cos(phi);
    let y = -r * sin(theta);
    let z = -r * cos(theta) * sin(phi);

    let pos = createVector(x, y, z);

    let h = pow(10, magi);
    let maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    xaxis = createVector(1, 0, 0);

    // Processing's PVector.angleBetween has a range from 0 to PI,
    // while p5.js' vector.angleBetween has a range from -PI to PI.
    // This is because it includes information about which direction
    // the angle goes (that is, if the first vector is the X axis,
    // whether the angle to the second vector is upwards or downwards).
    // We don't want the direction here, just the angle itself, so we
    // take the absolute value of the returned value to get that.
    let angleb = abs(xaxis.angleBetween(pos));

    let raxis = xaxis.cross(pos);

    push();
    translate(x, y, z);
    // In p5.js, the rotation axis is a vector object instead of x,y,z
    rotate(angleb, raxis);
    if(magi < 5){
      fill(135,206,235);
    }
    else if(magi >6){
      fill(255,0,0);
    }
    else{
      fill(200);
    }
    box(h, 5, 5);
    pop();
    
  }
  for (let row of table2.rows) {
    lat = row.getNum('lat');
    lon = row.getNum('lon');
    let siz = row.getNum('size');
    theta = radians(lat);
    phi = radians(lon) + PI/2;
    x = r * cos(theta) * cos(phi);
    y = -r * sin(theta);
    z = -r * cos(theta) * sin(phi);
    pos = createVector(x, y, z);
    angleb = abs(xaxis.angleBetween(pos));
    raxis = xaxis.cross(pos);
    push();
    translate(x, y, z);
    rotate(angleb, raxis);
    fill(255,255,0);
    box(siz,5,5);
    pop();
  }

}
