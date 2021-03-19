/*global $*/
var randomNumber = Math.floor(Math.random() * 99) + 1;

var numOfTries = 1;
var guesses = "";
var wins = 0;
var losses = 0;
var winCount = $("#win-count");
var loseCount = $("#lose-count");
var box = $("#userNum");
var resetGame = false;
document.querySelector("#submitGuess").addEventListener("click", submitGuess);

// document.querySelector(".prev-guesses").innerHTML = guesses;

function reset() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  numOfTries = 1;
  guesses = "Previous guesses: ";
  box.val(" ");
  document.querySelector(".prev-guesses").innerHTML = "";
  document.querySelector(".verdict").style.backgroundColor = "lightgray";
  $(".verdict").html("");
  $(".gan").html("Guess a number between 1 and 99 in seven attempts!")
  document.querySelector("#submitGuess").innerHTML = "Submit Guess";
  resetGame = false;
}

function submitGuess() {

  if (resetGame) {
    reset();
    return;
  }

  let userInput = document.querySelector("#userNum").value;
  let verdict = "";
  let verdictBackgroundColor = "";

  if (numOfTries > 7 || (numOfTries == 7 && userInput != randomNumber)) {
    alert("No more tries left, press OK to start over");
    document.querySelector(".verdict").style.backgroundColor = "red";
    losses++;
    loseCount.html(losses);
    box.val(" ");
    reset();
    return;
  }

  if (isNaN(userInput) || userInput < 1 || userInput > 99) {
    alert("Invalid input, enter a number between 1 and 99.");
  }
  else {
    guesses += userInput + ' ';
    numOfTries++;

    document.querySelector(".prev-guesses").innerHTML = guesses;

    if (userInput < randomNumber) {
      verdict = "Wrong Guess - Too Low";
      box.val(" ");
      verdictBackgroundColor = "red";
    } else if (userInput > randomNumber) {
      verdict = "Wrong Guess - Too High";
      box.val(" ");
      verdictBackgroundColor = "red";
    } else if (userInput == randomNumber) {
      verdict = "Correct Guess - Congrats!";
      box.val(" ");
      verdictBackgroundColor = "green";
      wins++;
      winCount.html(wins);
      document.querySelector(".verdict").innerHTML = verdict;
      document.querySelector(".verdict").style.backgroundColor = verdictBackgroundColor;
      resetGame = true;
      $(".gan").html("Press restart to play again")
      document.querySelector("#submitGuess").innerHTML = "Restart";
      return;
    }
    document.querySelector(".verdict").innerHTML = verdict;
    document.querySelector(".verdict").style.backgroundColor = verdictBackgroundColor;
  }
}