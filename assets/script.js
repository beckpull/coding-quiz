
// Define variables for HTML references

var header = document.querySelector('header');
var timeEl = document.querySelector('.time');
var startButton = document.querySelector('#start-quiz');
var startScreen = document.querySelector('#start-screen');
var quizScreen = document.querySelector('#quiz');
var questions = document.querySelector('.questions');
var answerChoices = document.querySelector('#answers');
var aquireInitials = document.querySelector('#aquire-initials');
var submitInitials = document.querySelector('#submit-initials');
var highScores = document.querySelector('#high-score');

// Defining other variables

var currentIndex = 0;
let score = 0;

// Setting attributes 

timeEl.setAttribute('style', 'text-align:right; font-size: 20px; font-weight: 100;');

// var showScore = document.createElement('h4');
// header.appendChild('showScore');
// showScore.innerHTML = 'Score: ' + score;

// Storing quiz information in an array

var questionsArray = [
    {
        question: 'Which of the following is the correct syntax for a CSS class?',
        choices: ['#float-left', '.floatleft', '.float-left', 'float-left'],
        answer: '.float-left'
    }, 
    {
        question: 'What is button:hover an example of?',
        choices: ['CSS class selector', 'Pseudoclass selector', 'Event listener', 'State listener'],
        answer: 'Pseudoclass selector'
    },
    {
        question: 'Which of the following is considered a body element?',
        choices: ['div', 'style', 'class', 'HTML'],
        answer: 'div'
    },
    {
        question: 'Which of the following is not considered an object/type in JavaScript?',
        choices: ['string', 'array', 'integer', 'operator'],
        answer: 'operator'
    }
];

// Setting timer/interval

function setTimer() {
    var secondsLeft = 10;

    var timerInterval = setInterval(function() {
        if (secondsLeft >= 0) {
            timeEl.textContent = 'Time: ' + secondsLeft;
            secondsLeft--;
        } else {
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000)
}

// Quiz functions

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    displayQuestion();
}

function displayQuestion() {
    answerChoices.innerHTML = '';
    var currentQuestion = questionsArray[currentIndex].question;
    var choicesArr = questionsArray[currentIndex].choices;

    questions.textContent = currentQuestion;
    
    for (let i = 0; i < choicesArr.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice-button');
        choiceBtn.innerHTML = choicesArr[i];
        choiceBtn.onclick = displayChoices;
        answerChoices.appendChild(choiceBtn);
    }
    
}

function displayChoices(event) {
    var element = event.target;
    if (element === questionsArray[currentIndex].answer) {
        score++;
    }
    currentIndex++;
    displayQuestion();
    // TO DO:
    // if (questionsArray[currentIndex].choices === null) {
    //     getInitials();
    // }
}

function restartQuiz() {
    score = 0;
    currentIndex = 0;
    highScores.classList.add('hide');
    quizScreen.classList.remove('hide');
    setTimer();
    displayQuestion();
}

// Aquiring initials functions

function getInitials() {
    clearInterval(timerInterval);
    quizScreen.classList.add('hide');
    aquireInitials.classList.remove('hide');
}

function submitBtn(event) {
    event.preventDefault();

    //  TO DO: need to store initials and score in highScores element before resetting score to zero

    gameOver();
}

function gameOver() {
    quizScreen.classList.add('hide');
    aquireInitials.classList.add('hide');
    highScores.classList.remove('hide');

    // TO DO: create high score data table

    // created a play again button entirely in js
    var playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('class', 'play-again');
    playAgainBtn.innerHTML = 'Play Again';
    highScores.appendChild(playAgainBtn);
    playAgainBtn.addEventListener('click', restartQuiz);
}


// Event listeners

startButton.addEventListener('click', function() {
    setTimer();
    startQuiz();

});

submitInitials.addEventListener('click', submitBtn);
