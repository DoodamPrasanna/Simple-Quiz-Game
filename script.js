const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Rome", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },    // position 3
            { text: "Berlin", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: true },     // position 4
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true }, // position 1
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "Charles Dickens", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Ag", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },       // position 4
        ]
    },
    {
        question: "Which language is used for web apps?",
        answers: [
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true }, // position 2
            { text: "Python", correct: false },
            { text: "C++", correct: false },
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent Van Gogh", correct: false },
            { text: "Claude Monet", correct: false },
            { text: "Leonardo da Vinci", correct: true }, // position 3
            { text: "Pablo Picasso", correct: false },
        ]
    },
    {
        question: "What is the largest mammal?",
        answers: [
            { text: "Giraffe", correct: false },
            { text: "Blue Whale", correct: true }, // position 2
            { text: "Elephant", correct: false },
            { text: "Hippopotamus", correct: false },
        ]
    },
    {
        question: "Which country hosted the 2016 Summer Olympics?",
        answers: [
            { text: "Russia", correct: false },
            { text: "UK", correct: false },
            { text: "China", correct: false },
            { text: "Brazil", correct: true }, // position 4
        ]
    },
    {
        question: "What is the square root of 144?",
        answers: [
            { text: "14", correct: false },
            { text: "16", correct: false },
            { text: "12", correct: true }, // position 3
            { text: "10", correct: false },
        ]
    },
    {
        question: "Which element has the atomic number 1?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Helium", correct: false },
            { text: "Hydrogen", correct: true }, // position 3
            { text: "Carbon", correct: false },
        ]
    },
    {
        question: "Who is known as the father of computers?",
        answers: [
            { text: "Steve Jobs", correct: false },
            { text: "Charles Babbage", correct: true }, // position 2
            { text: "Bill Gates", correct: false },
            { text: "Alan Turing", correct: false },
        ]
    },
    {
        question: "Which is the smallest prime number?",
        answers: [
            { text: "3", correct: false },
            { text: "2", correct: true }, // position 2
            { text: "1", correct: false },
            { text: "5", correct: false },
        ]
    },
    {
        question: "What does HTTP stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: true }, // position 1
            { text: "HighText Transfer Protocol", correct: false },
            { text: "HyperText Transmission Protocol", correct: false },
            { text: "HyperTransfer Text Protocol", correct: false },
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Hydrogen", correct: false },
            { text: "Carbon Dioxide", correct: true }, // position 3
            { text: "Nitrogen", correct: false },
        ]
    },
    {
        question: "What is the value of Pi (π) up to two decimal places?",
        answers: [
            { text: "3.13", correct: false },
            { text: "3.16", correct: false },
            { text: "3.14", correct: true }, // position 3
            { text: "3.15", correct: false },
        ]
    }
];

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("nextbtn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60; // seconds

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    nextbutton.style.display = "none";
    showQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore(true);
        }
    }, 1000);
}

function showQuestion() {
    answerbutton.innerHTML = "";
    nextbutton.style.display = "none";

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionelement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.onclick = () => selectAnswer(button, answer.correct);
        answerbutton.appendChild(button);
    });
}


function selectAnswer(selectedButton, isCorrect) {
    Array.from(answerbutton.children).forEach(btn => {
        btn.disabled = true;
        if (btn === selectedButton) {
            btn.classList.add(isCorrect ? "correct" : "incorrect");
        }
        if (!isCorrect && questions[currentQuestionIndex].answers.find(a => a.correct && a.text === btn.innerHTML)) {
            btn.classList.add("correct");
        }
    });

    if (isCorrect) {
        score++;
    }
    nextbutton.style.display = "inline-block";
    nextbutton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            clearInterval(timer);
            showScore();
        }
    };
}

function showScore(timeUp = false) {
    if (timeUp) {
        questionelement.innerHTML = `Time's up! Your score: ${score}/${questions.length}`;
    } else {
        questionelement.innerHTML = `Quiz finished! Your score: ${score}/${questions.length}`;
    }
    answerbutton.innerHTML = "";
    nextbutton.innerHTML = "Restart";
    nextbutton.style.display = "inline-block";
    nextbutton.onclick = () => {
        clearInterval(timer);
        startQuiz();
    };
}

startQuiz();