rightwristX = 0
rightwristY = 0

leftwristX = 0
leftwristY = 0

leftwristscore = 0
rightwristscore = 0

songp1 = ""
songp2 = ""


song1 = 0
song2 = 0

function preload() 
{
 song1 = loadSound("music.mp3")
 song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(700, 600)
    canvas.position(600,300)

    video = createCapture(VIDEO)
    video.hide()

    posenet = ml5.poseNet(video,  modelLoaded)
    posenet.on('pose', gotPoses)
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        //console.log(results)

        leftwristscore = results[0].pose.keypoints[9].score
        rightwristscore = results[0].pose.keypoints[10].score
        
        rightwristX = results[0].pose.rightWrist.x 
        rightwristY = results[0].pose.rightWrist.y 

        leftwristX = results[0].pose.leftWrist.x 
        leftwristY = results[0].pose.leftWrist.y 



        //console.log("the value of right wrist x is "+rightwristX)
        //console.log("the value of left wrist y is "+leftwristY)
        //console.log("the value of right wrist y is "+rightwristY)
        //console.log("the value of left wrist x is "+leftwristX)
    }
}

function modelLoaded()
{
    console.log("Model Loaded!")
}

function draw() 
{
    image(video, 0,0, 700, 600)

    songp1 = song1.isPlaying()
    songp2 = song2.isPlaying()

    
   
    if(leftwristscore > 0.2)
    {
        fill("blue")
        
        circle(leftwristX, leftwristY, 25)

        song2.stop()
        if(songp1 == false)
        {
           song1.play() 
            
            document.getElementById("song").innerHTML = "Harry Potter's Theme"
        }
    }

    if(rightwristscore > 0.2)
    {
        fill("red")

        circle(rightwristX, rightwristY, 25)

        song1.stop()
        if(songp2 == false)
        {
            song2.play()

            document.getElementById("song").innerHTML = "Peter Pan's Theme"
        }
    }
}