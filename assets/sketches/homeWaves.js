//No MIC

var noiseScale = 0.02;
var posY = 0.0;
var posX = [];
var cor = [];
var NUM_STRIPS = 5;
var speed = 1.0;


function setup() {
  // find the size of the underlying div
  var divWidth = $("#setup_p5_sketch").width();
  var divHeight = $("#setup_p5_sketch").height();
  var myCanvas = createCanvas(divWidth, divHeight);
  myCanvas.parent('setup_p5_sketch');
  //myCanvas.position(0, 0);
  //myCanvas.style('z-index', '-1');
  frameRate(60);
  posX[0] = random(10);
  for(var i = 1; i < NUM_STRIPS; i++){
    posX[i] = posX[i - 1] + random(20);
  }
  for(var i = 0; i < NUM_STRIPS; i++){
    cor[i] = color(random(255), random(255), random(255));
  }


  
}

function draw() {
  background(255);
  if(frameRate < 20){
    noLoop();
  }
  
  for(var i = posX.length - 1; i >= 0; i--){
    for(var y = 0; y < height; y++){
      var noiseVal = noise(posY*noiseScale, (posY + y)*noiseScale);
      stroke(cor[i]);
      line(width - (posX[i] + noiseVal*100 + 40), y, width, y);
      line(0, y, posX[i] + noiseVal*100, y);
    }
  }

  posY+=speed;
  if(posY > height){
    posY = 0.0;
  }
}

// when the window is resized the canvas is resized accordingly
function windowResized(){
  var divWidth = $("#setup_p5_sketch").width();
  var divHeight = $("#setup_p5_sketch").height();
  resizeCanvas(divWidth, divHeight);
}
