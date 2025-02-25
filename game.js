var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$("body").on("keypress", function() {
  if (!started) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function checkAnswer(currentLevel) {
  
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    
		gameOver();
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = []; 
  level++; 
  $("h1").text("Level " + level); 

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  
  gamePattern.push(randomChosenColour);

  
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function gameOver() {
	var audio = new Audio("sounds/wrong.mp3");
	audio.play();
	$("body").addClass("game-over")
	setTimeout(function () {
		$("body").removeClass("game-over")
	},200 )
	$("h1").text("Game Over, Press Any Key to Restart"); 
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false; 
}