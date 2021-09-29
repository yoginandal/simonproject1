var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function(event) { //we can use yogesh(anything) instead of event.
  var userChosenColor = $(this).attr("id"); // or this.id; or (event.target.id; or yogesh(anything).target.id;
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

function nextsequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}

function checkAnswer(currentLevel1){
  if(gamePattern[currentLevel1] === userClickedPattern[currentLevel1]){
    // console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextsequence()
      },1000);
    }
  }else{

    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press any key to restart");
    startOver();

    // console.log("wrong");
  }
};

function startOver(){
   gamePattern = [];
   started = false;
   level = 0;
};
