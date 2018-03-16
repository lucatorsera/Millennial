var mic;

var noiseScale = 0.02;
var posX = 0.0;
var posY = 0.0;
var sum = 0.0;
var smoothness = 0.5;
var _scale = 5.0;
var step = 10;
var offset = 30.0;

function setup() {
  // find the size of the underlying div
  var divWidth = $("#setup_p5_sketch").width();
  var divHeight = $("#setup_p5_sketch").height();
  var myCanvas = createCanvas(divWidth, divHeight);
  myCanvas.parent('setup_p5_sketch');
  //myCanvas.position(0, 0);
  //myCanvas.style('z-index', '-1');
  
  background(255);
  
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  var cor = color(random(255), random(255), random(255));
  
  for (var y = 0; y < height; y++){
    var noiseVal = noise(posY*noiseScale, (posY + y)*noiseScale);
    stroke(cor);
    line(width - (posX + noiseVal*80) + offset, y, width + offset, y);
    line(0 - offset, y, posX + noiseVal*80 - offset, y);
  }
  posY++;
  sum += (mic.getLevel() - sum) * smoothness;
  posX = sum*(height/2)*_scale;
  
  if(posY > height) posY = 0.0;
  
  myDelay();
}

function myDelay() {
  var time = millis();
  while(millis() - time < step){}
}

// when the window is resized the canvas is resized accordingly
function windowResized(){
  var divWidth = $("#setup_p5_sketch").width();
  var divHeight = $("#setup_p5_sketch").height();
  resizeCanvas(divWidth, divHeight);
}
