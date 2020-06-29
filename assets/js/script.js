// create header and its functions
// get element for high scores
var page = document.querySelector("#page")
var highScoreDisplay = document.querySelector("#high-score");
var mainContainer = document.querySelector(".landing");
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz");
var pageContent = document.querySelector("#page-content");
var scoreArr = [];
// create function to show highscores // will clear page below // will be created by parse JSON  localstorage // a div will hold the list
//list will be sorted to show higher in the top of the list // and will get information being passed as object to json localStorage.
var highScorePage = function(){
    page.innerHTML = '';
    var highScoreContainer = document.createElement("div");   
    highScoreContainer.classList = "container high score";
    highScoreContainer.id = "high score";  
    page.appendChild(highScoreContainer);
    var highScoreTitle = document.createElement("h2");
    highScoreTitle.textContent = "High Scores";
    highScoreContainer.appendChild(highScoreTitle);
    var highScoreListContainer = document.createElement("ul");
    highScoreContainer.appendChild(highScoreListContainer);
    for(var i = 0; i < scoreArr.length; i++) {
        var quickzScore = createElement("li");
        quickzScore.innerHTML = i + 1 + '. ' + socreArr[i].score;
        highScoreListContainer.appendChild(quickzScore);
    }
    //two buttons will be created
    var actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions';
    //create function inside the function to create the object where we pass attibutes information with the click buttom to go back to the quiz
    var goBackBtn = document.createElement('a');
	goBackBtn.id = 'go-back';
	goBackBtn.setAttribute('href', './index.html');
	goBackBtn.classList = 'btn btn-short';
	goBackBtn.innerText = 'Go Back';
    actionsContainer.appendChild(goBackBtn);

    //create function inside the function to create the object where we pass attibutes information with the click buttom to clear score and stay.
     var clearScores = document.createElement('button');
	clearScores.classList = 'btn btn-short';
	clearScores.innerText = 'Clear high scores';
	clearScores.addEventListener('click', handleClearScores);
	actionsContainer.appendChild(clearScores);
	highScoreContainer.appendChild(actionsContainer);
}
//clear scores
var handleClearScores = function() {
    
        scoreArr = [];
        saveScores();
        highScorePage();
}
//show score function puts page in blank and add elements to the dom
 var saveScores = function() {
	// sort high scores highest to lowest
	scoreArr.sort((a, b) => b.score - a.score);
    localStorage.setItem('stats', JSON.stringify(scoreArr));
 }
 // load high scores from localStorage
function loadScores() {
	var stats = localStorage.getItem('stats');
	if (!stats) {
		return false;
	}
	return (stats = JSON.parse(stats));
}

// get element timer from header
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
	// start timer
	timer();

	// call function to create single question
	createQuestion(questionsArr[questionIndex]);
}
var counter = 60;
//create set interval to the timer//clear interval function timer
var timer = function () {
	window.startCountdown = setInterval(function() {
		counter--;
		// check if above zero since wrong answer can pull it below despite conditional check for clearInterval
		counter > 0 ? (timerDisplay.innerText = counter) : (timerDisplay.innerText = 0);
		// stop timer at 0
		if (counter === 0) {
			clearInterval(startCountdown);
			gameOverView();
		}
	}, 1000);
}

//after creating the function to the header lets create a function to create the questionary array
//create questionary index
var questionIndex = 0;
//create questions and answers as and objet
var questionsArr = [
	{
		question           : 'Commonly used data types do NOT include:',
		answers            : [ 'strings', 'booleans', 'alerts', 'numbers' ],
		correctAnswerIndex : 2
	},
	{
		question           : 'Arrays in Javascript can be used to store _______',
		answers            : [
			'numbers and strings',
			'other arrays',
			'booleans',
			'all of the above'
		],
		correctAnswerIndex : 3
	},
	{
		question           : 'The condition in an IF/ELSE is enclosed with _______',
		answers            : [
			'quotes',
			'curly brackets',
			'parenthesis',
			'square brackets'
		],
		correctAnswerIndex : 2
	},
	{
		question           :
			'String values must be enclosed within _______ when being assigned to variables',
		answers            : [ 'commas', 'curly brackets', 'quotes', 'parenthesis' ],
		correctAnswerIndex : 2
	},
	{
		question           :
			'A very useful tool used during development and debugging for printing content to the debugger:',
		answers            : [
			'JavaScript',
			'terminal/bash',
			'for loops',
			'console.log'
		],
		correctAnswerIndex : 3
	}
];

// create questionary function
function createQuestion(questionObj) {
	// clear page
	pageContent.innerHTML = '';

	// iterate index for call to next question
	questionIndex++;

	//create and get the div where questionary will be display
	var questionContainerEl = document.createElement('div');
	questionContainerEl.className = 'question';
	questionContainerEl.id = 'question';

	// create question
	var questionEl = document.createElement('h2');
	questionEl.textContent = questionObj.question;
	// append question
	questionContainerEl.appendChild(questionEl);
	// create answer-list
	var answerListEl = document.createElement('ul');
	answerListEl.className = 'answer-list';
	answerListEl.id = 'answer-list';

	// create array of answers
	var answers = questionObj.answers;
	//create and array to show the questionary from its index
	for (var i = 0; i < answers.length; i++) {
		var answerEl = document.createElement('li');
		answerEl.className = 'answer-list-item';
		// add button
		answerEl.innerHTML =
			// '<button class="btn answer-btn">' + (i + 1) + '. ' + answers[i] + '</button>';
			`<button class="btn answer-btn">${i + 1}. ${answers[i]}</button>`;
		// set data-attr flag on correct answer
		if (i === questionObj.correctAnswerIndex) {
			answerEl.setAttribute('data-correct-answer', 'true');
		}
		// append answer to ul
		answerListEl.appendChild(answerEl);
	}

	questionContainerEl.appendChild(answerListEl);
  pageContent.appendChild(questionContainerEl);
  
  // listen for user click on answer
	answerListEl.addEventListener('click', checkAnswer);
}
function checkAnswer(event) {
	// find parent li of clicked button
	var clicked = event.target.closest('li.answer-list-item');
	var answerList = document.getElementById('answer-list');

	// check if clicked is truthy otherwise, ul was clicked and we don't want function to proceed or we will get an error because ul has no parent li.answer-list-item so .hasAttribute would be called on null
	if (clicked) {
		var isCorrectAnswer = clicked.hasAttribute('data-correct-answer');
		if (isCorrectAnswer) {
			// display 'correct' message
			var correctMsgEl = document.createElement('p');
			correctMsgEl.className = 'feedback-msg';
			correctMsgEl.innerText = 'Correct!';
			answerList.appendChild(correctMsgEl);
		} else {
			// display 'wrong' message
			counter = counter - 10;
			var wrongMsgEl = document.createElement('p');
			wrongMsgEl.className = 'feedback-msg';
			wrongMsgEl.innerText = 'Wrong!';
			answerList.appendChild(wrongMsgEl);
		}
		answerList.removeEventListener('click', checkAnswer);

		// remove feedback msg after 1 second and proceed to next question or game over
		setTimeout(function() {
			if (counter <= 0 || questionIndex >= questionsArr.length) {
				gameOverView();
			} else {
				createQuestion(questionsArr[questionIndex]);
			}
		}, 1000);
	}
}

// FUNCTION TO CREATE GAME-OVER VIEW
function gameOverView() {
	// stop timer
	clearInterval(window.startCountdown);

	pageContent.innerHTML = '';

	var gameOverEl = document.createElement('div');
	gameOverEl.className = 'game-over';
	gameOverEl.id = 'game-over';

	var gameOverMsgEl = document.createElement('h2');
	gameOverMsgEl.innerText = 'All done!';
	gameOverEl.appendChild(gameOverMsgEl);

	var scoreMsgEl = document.createElement('h3');
	scoreMsgEl.innerText = 'Your final score is ';

	var scoreEl = document.createElement('span');
	scoreEl.id = 'player-score';

	if (counter >= 0) {
		scoreEl.innerText = counter + '.';
	} else {
		scoreEl.innerText = 0 + '.';
	}

	scoreMsgEl.appendChild(scoreEl);
	gameOverEl.appendChild(scoreMsgEl);

	var playerStatsFormEl = document.createElement('form');
	playerStatsFormEl.innerHTML =
		"<label for='initials'>Enter initials:</label>" +
		"<input type='text' id='initials' name='initials' maxlength=2>" +
		"<button class='btn btn-short' type='submit'>Submit</button>";

	// add listener for input submit which calls function to add player object with player and score to high scoreArr
	playerStatsFormEl.addEventListener('submit', handleStatsSubmit);

	gameOverEl.appendChild(playerStatsFormEl);
	pageContent.appendChild(gameOverEl);
}

function handleStatsSubmit(event) {
	event.preventDefault();
	// get and save player stats
	var playerInitials = document
		.querySelector("input[name='initials']")
		.value.toUpperCase();
	var playerScore = counter > 0 ? counter : 0;
	var playerStatsObj = {
		player : playerInitials,
		score  : playerScore
	};
	scoreArr.push(playerStatsObj);
	saveScores();

	// display high scores
	highScorePage();
}
highScoreDisplay.addEventListener("click", highScorePage);












