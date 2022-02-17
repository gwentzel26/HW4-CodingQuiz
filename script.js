var startEl = document.querySelector("#startQuiz");
var timeEl = document.querySelector(".time");
var secondsLeft = 30;
var homeEl = document.querySelector("#starting-page");
var quizEl = document.querySelector("#quiz-section");
var questionIndex = 0;
var currentQuestion = document.querySelector("#currentQuestion");
var ans1 = document.querySelector("#answer1");
var ans2 = document.querySelector("#answer2");
var ans3 = document.querySelector("#answer3");
var ans4 = document.querySelector("#answer4");
// var allBtn = document.querySelectorAll("#answer1","#answer2","#answer3","#answer4");
var ansBtn = document.querySelectorAll(".ansBtn");
var renderInitials = document.querySelector("#renderInitials");
var submitEl = document.querySelector("#submit");
var highscore = document.querySelector("#highscore");
var initialsEl  = document.querySelector("#initials");
var submittedScores = document.querySelector("#submittedScores");
// var  = document.querySelector(" ");
// var   = document.querySelector(" ");
// var   = document.querySelector(" ");
var score = 0;
// array holding all questions, options, and answers getting cycled through by question index
const quests = [
  {
    text: "Which of the following is not an event listener?",
    options: ["click", "mouseon", "pushtowards", "keydown"],
    answer: "pushtowards",
  },

  {
    text: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<javascript>", "<scripting>", "<script>"],
    answer: "<script>",
  },

  {
    text: "How do you declare a JavaScript variable?",
    options:
      ["variable carLength;",
      "var carLength;",
      "v: carLength;",
      "carLength = var;"],
    answer: "var carLength;",
  },

  {
    text: "Which operator is used to declare a variable?",
    options: ["=", ":", "*", "none"],
    answer: "=",
  },
];

// hide both the quiz section and render initials section on page load
quizEl.style.display = "none";
renderInitials.style.display = "none";

// When the user clicks on Start Quiz, the function startBtn begins by hiding the home page and showing the previously hidden quiz section.
startEl.addEventListener("click", startBtn);
function startBtn() {
  homeEl.style.display = "none";

  quizEl.style.display = "block";
  setTimer();
  quizSection();
}

// game timer
function setTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if (secondsLeft === 0 || secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    
        saveScore();
    //   endGame();
    }
  }, 1000);
}

function quizSection() {
  currentQuestion.textContent = quests[questionIndex].text;
  ans1.textContent = quests[questionIndex].options[0];
  ans2.textContent = quests[questionIndex].options[1];
  ans3.textContent = quests[questionIndex].options[2];
  ans4.textContent = quests[questionIndex].options[3];
  // quizEl.style.display = "block";
}

// on the click of any button determine if the button the user clicked matched the answer
quizEl.addEventListener("click", function (event) {
 
  if (event.target.matches(".ansBtn")) {
    if (event.target.textContent === quests[questionIndex].answer) {
      score++;
      console.log("Correct!");
    } else {
      secondsLeft -=8;
      console.log("Wrong! You now have 8 fewer seconds!");
    }
    questionIndex++;

    if (questionIndex >= quests.length) {
    //   endGame();
      saveScore();
    } else {
      quizSection();
    }
  }
});

// }

function endGame() {
 var retake = confirm("Game Over - Your score: " + score + ".  Would you like to retake the quiz?");
 if (retake === true) {
     window.location.reload();
 } 
// }
}
function saveScore() {
    quizEl.style.display= "none";
    localStorage.setItem("score", score);
    renderInitials.style.display = "block";
    
    // submitEl.addEventListener('click', function(event) {
    //     event.localStorage.setItem("initials", initialsEl);
    //     endGame();
    // submittedScores.textContent = "Initials: " + initialsEl + " Score: " + score;
    
    submitEl.addEventListener("click", function(event) {
        event.preventDefault();
        // quizEl.style.display = "none";
        timeEl.style.display = "none";
        // renderInitials.style.display = "block";
        submittedScores = {
          initials: initialsEl.value,
          score: score.value,
        };
        
        localStorage.setItem("submittedScores", JSON.stringify(submittedScores));
        renderMessage();
        
        });
        
        function renderMessage() {
          var lastScore = JSON.parse(localStorage.getItem("submittedScores"));
          if (lastScore !== null) {
           submittedScores.textContent = "Initials: " + lastScore.initials + 
            " Score: " + lastScore.score;
          }
          endGame();
        }}








