objects = [];
status = "";
video = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 380);
    if (status != "") {
       objectDetector.detect(video, gotResult);  
       for (i = 0; i < objects.length; i++){
           document.getElementById("status").innerHTML = "status: object detected";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;

           fill("#FF0000");
           percent = floor(objects[1].confidence * 100);
           text(objects[i].label + "" + percent + "%", objects[i].y + 15);
           nofill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    } 
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("modelLoaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, gotResult) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}