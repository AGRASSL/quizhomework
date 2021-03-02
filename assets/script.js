var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#scoreText');
var scoreText = document.querySelector('#score');
var progressStatusComplete = document.querySelector("#progressStatusComplete");
var username = document.querySelector("#username")
var saveScoreBtn = document.querySelector("#saveScoreBtn")
var finalScore = document.querySelector("#finalScore")
var mostRecentScore = localStorage.getItem("mostRecentScore")
var highScores = JSON.parse(localStorage.getItem("highScores")) || []
var MAX_HIGH_SCORES = 5
var highScoresList = document.querySelector("#highScoresList")
var highScores = JSON.parse(localStorage.getItem("highScores")) || []

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is Indiana Jones' real first name?",
            choice1: "Henry",
            choice2: "William",
            choice3: "Marcus",
            choice4: "Sean",
        answer: 1,
    },
    {
        question: "Where did Indianna choose his name from?",
            choice1: "His favorite book character",
            choice2: "Indiana is where he was born",
            choice3: "His Dog",
            choice4: "Indiana is his middle name",
        answer: 3,

    },

    {
        question: "Where does Dr. Jones teach?",
            choice1: "Harvard University",
            choice2: "Marshall College",
            choice3: "Stanford University",
            choice4: "Madison College",
        answer: 2,

    },
    {
        question: "What is Indiana Jones' worst fear?",
            choice1: "Sharks",
            choice2: "Spiders",
            choice3: "Small Spaces",
            choice4: "Snakes",
        answer: 4,

    },
]

var SCORE_POINTS = 25;
var MAX_QUESTIONS = 4;

alert("click ok to start the Indiana Jones Quiz!");

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions()
}



getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("end.html")
    }

    questionCounter ++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressStatusComplete.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "wrong"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerHTML = score
}

startQuiz()


finalScore.innerText = mostRecentScore

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("game.html")
}


highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")
  



// land on page that shows you can play quiz with a button that says start quiz

// clicking start quiz brings you to first question and an active timer

// user selects answer
    //answer is right or wrong
        //after choice screen displays right or wrong

//game tracks right and wrong answer score

//game ends with either all questions answered or timer running out

//game displays final score

//input field for user to enter their name for the leader board

//two options to either restart quiz or to view high-scores board