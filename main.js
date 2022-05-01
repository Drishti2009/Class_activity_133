object = [];
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    object_detector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

img = "";
status = "";

function preload(){
    img = loadImage("Dog-and-Cat-Grooming.jpg");
}

function draw(){
    image(img ,0 ,0 ,640, 420);
    if (status != ""){
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            percent = floor(object[i].confidence*100);
            fill("#FF0000");
            noFill();
            stroke("#FF0000");
            text( object[i].label + " " + percent + "%", object[i].x+15 , object[i].y+15);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}