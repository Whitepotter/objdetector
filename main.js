
img = "";
objects = [];
status_ = "";

function setup() {
  canvas = createCanvas(380,380);
  canvas.center();

  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();

  
}

function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status_ = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380,380);
  if (status_ != ""){
    objectDetector.detect(video, gotResult);
    r = random(255);
    g = random(255);
    b = random(255);
    for(i = 0; i < objects.length; i++){
      document.getElementById("status").innerHTML = "Status: Object(s) detected";
      document.getElementById("objects_detected").innerHTML = "Number of Objects Detected is " + objects.length;
      fill(r,g,b);
      stroke(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent +"%", objects[i].x + 15,objects[i].y + 15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
  }
      
}
