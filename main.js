song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    
canvas.position(450,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist =" + scoreLeftWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX+ "rightWristY" + rightWristY)
    }
}

function modelLoaded() {
    console.log('PoseNet Is Intialized');
}

function draw() {
    image(video,0 ,0 ,600, 500);

    fill(" #ff0000");
    stroke(" #16c766");

    if(scoreRightWrist > 0.2)
{
    circle(rightWristX,rightWristY,20);

     if(rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    
    else if(rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    else if(rightWristY >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2);
    }
}

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY,50);
    InNumberleftWristY =Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    
    if(leftWristY >0 && leftWristY <= 100)
    {
        document.getElementById("volume").innerHTML = "volume = 0.5";
        song.setVolume(0.5);
    }

    else if(leftWristY >100 && leftWristY <= 200)
    {
        document.getElementById("volume").innerHTML = "volume = 1";
        song.setVolume(1);
    }

    else if(leftWristY >200 && leftWristY <= 300)
    {
        document.getElementById("volume").innerHTML = "volume = 1.5";
        song.setVolume(1.5);
    }

    
    else if(leftWristY >300 && leftWristY <= 400)
    {
        document.getElementById("volume").innerHTML = "volume = 2";
        song.setVolume(2);
    }

    else if(leftWristY >400 && leftWristY <= 500)
    {
        document.getElementById("volume").innerHTML = "volume = 2.5";
        song.setVolume(2.5);
    }
}

}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
