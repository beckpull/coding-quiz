
// Define variables for HTML references

var header = document.querySelector('header');
var timeEl = document.querySelector('.time');
var startButton = document.querySelector('#start-quiz');
var startScreen = document.querySelector('#start-screen');
var quizScreen = document.querySelector('#quiz');
var questions = document.querySelector('.questions');
var answerChoices = document.querySelector('#answers');
var aquireInitials = document.querySelector('#aquire-initials');
var initials = document.querySelector('#initials');
var submitInitials = document.querySelector('#submit-initials');
var highScores = document.querySelector('#high-score');
var scoreTable = document.querySelector('.score-table');

// Defining other variables

var currentIndex = 0;
let score = 0;

// Setting header items in JavaScript instead of HTML

var showScore = document.createElement('h4');
var paintScore = ()=>showScore.innerHTML = 'Score: ' + score;
header.appendChild(showScore);
showScore.classList.add('show-score')
paintScore();

var highScoreBtn = document.createElement('button');
highScoreBtn.textContent = 'View High Scores';
highScoreBtn.setAttribute('class', 'high-score-btn');
header.append(highScoreBtn);

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

var timerInterval;
var secondsLeft;

function setTimer() {
    secondsLeft = 30;

    timerInterval = setInterval(function() {
        if (secondsLeft >= 0) {
            timeEl.textContent = 'Time: ' + secondsLeft;
            secondsLeft--;
        } else {
            clearInterval(timerInterval);
            getInitials();
        }

    }, 1000)
}

// Quiz functions

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    setTimer();
    displayQuestion();
}

function displayQuestion() {
    answerChoices.innerHTML = '';
    var currentQuestion = questionsArray[currentIndex]?.question;
    var choicesArr = questionsArray[currentIndex]?.choices;

    questions.textContent = currentQuestion;
    
    for (let i = 0; i < choicesArr.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice-button');
        choiceBtn.innerHTML = choicesArr[i];
        choiceBtn.onclick = displayChoices;
        answerChoices.appendChild(choiceBtn);
    }
    
}

var displayMessage = document.createElement('p');
displayMessage.classList.add('display-message');


function displayChoices(event) {
   

    var element = event.target.innerHTML;


    if (element === questionsArray[currentIndex].answer) {
        score++;
        paintScore();
        if (document.querySelector('p') == undefined) {
            quizScreen.appendChild(displayMessage);
        }
        displayMessage.textContent = 'Correct!';
        
    } else {
        secondsLeft -= 10;
        if (document.querySelector('p') == undefined) {
            quizScreen.appendChild(displayMessage);
        }
        displayMessage.textContent = 'Wrong!';
    }
    ++currentIndex;
    if (currentIndex < questionsArray.length) {

        displayQuestion();
    } else {
        quizScreen.removeChild(displayMessage);
        getInitials();
    }
}
var addScore;
var currentScore;

//Show most recent round's score when getting initials from user

var roundScore = function() {
    addScore = document.querySelector('#add-score');
    currentScore = document.createElement('h4');
    addScore.appendChild(currentScore); 
    currentScore.textContent = 'Your final score this round was ' + score + '!';
    currentScore.classList.add('round-score');
}

// Navigate to aquiring initial screen

function getInitials() {
    clearInterval(timerInterval);
    quizScreen.classList.add('hide');
    aquireInitials.classList.remove('hide');
    roundScore();
}

// Aquiring initials functions

function submitBtn(event) {
    event.preventDefault();
    addScore.removeChild(currentScore);
    var userScore = {
        user: initials.value.trim(),
        score: score
    }

    localStorage.setItem('userInfo', JSON.stringify(userScore));
    gameOver();
}

function restartQuiz() {
    clearInterval(timerInterval);
    score = 0;
    currentIndex = 0;
    highScores.classList.add('hide');
    quizScreen.classList.remove('hide');
    paintScore();
    setTimer();
    displayQuestion();
}

function displayHighScores() {
    clearInterval(timerInterval);
    var userScore = JSON.parse(localStorage.getItem('userInfo'));
    if (userScore !== null)  {
        var tableRow = document.createElement('tr');
        tableRow.innerHTML = '<td>User: ' + userScore.user.toUpperCase() + '</td><td> ---> </td><td>Score: ' + userScore.score + '</td>';
        scoreTable.appendChild(tableRow);
    } else {
        return;
    }
}

function gameOver() {
    viewHighScore();
    displayHighScores();
}

function viewHighScore() {
    clearInterval(timerInterval);
    startScreen.classList.add('hide');
    quizScreen.classList.add('hide');
    aquireInitials.classList.add('hide');
    highScores.classList.remove('hide'); 
    
    if (document.querySelector('.play-again') == undefined) {
        var playAgainBtn = document.createElement('button');
        playAgainBtn.setAttribute('class', 'play-again');
        playAgainBtn.innerHTML = 'Play Again';
        highScores.appendChild(playAgainBtn);
        playAgainBtn.addEventListener('click', restartQuiz);
    }
}

// Event listeners

startButton.addEventListener('click', startQuiz);

submitInitials.addEventListener('click', submitBtn);

highScoreBtn.addEventListener('click', viewHighScore);