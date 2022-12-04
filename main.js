objects=[];
status="";
var objectDetector;
function setup(){
    canvas=createCanvas(380,380);
    canvas.position(570,300);
    video=createCapture(VIDEO);
    video.size(375,375);
    video.hide();
}
function modelLoaded(){
    console.log("modelloaded")
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    object_name=document.getElementById("object_name").value;
}
function gotResult(){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    if(status!=undefined){
        image(video,0,0,380,380);
        objectDetector.detect(video,gotResult)
        for(var i=0; i<objects.length;i++){
            console.log(objects);
            document.getElementById("status").innerHTML="Status: Object Detected";
            fill("black");
            strokeWeight(2.5);
            stroke("black");
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%", objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML=object_name+" found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+' found');
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML=object_name+" not found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+' not found');
                synth.speak(utterThis);
            }
        }
    }
}