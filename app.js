let totalQuestions = 0;
let correctAnswers = 0;
let incorrectProblems = [];
let isReviewQuestion = false;
let currentQuestion = '';
let mode = 'easy'; // Default mode

document.getElementById('easy-mode').addEventListener('click', function() {
    mode = 'easy';
    correctAnswer = generateQuestion();
});

document.getElementById('hard-mode').addEventListener('click', function() {
    mode = 'hard';
    correctAnswer = generateQuestion();
});

function generateQuestion() {
    if (incorrectProblems.length > 0 && Math.random() < 0.3) {
        let index = Math.floor(Math.random() * incorrectProblems.length);
        currentQuestion = incorrectProblems[index];
        isReviewQuestion = true;
        document.getElementById('question').innerText = `Review: ${currentQuestion}`;
        return eval(currentQuestion);
    }

    let num1, num2;
    if (mode === 'hard') {
        num1 = Math.floor(Math.random() * 25) - 12; // Generates a number from -12 to 12
        num2 = Math.floor(Math.random() * 25) - 12; // Generates a number from -12 to 12
    } else {
        num1 = Math.floor(Math.random() * 13); // Generates a number from 0 to 12
        num2 = Math.floor(Math.random() * 13); // Generates a number from 0 to 12
    }
    
    let operation;
    if (mode === 'easy') {
        // In easy mode, only generate addition and subtraction problems
        operation = Math.random() < 0.5 ? '+' : '-';
    } else {
        // In hard mode, generate problems with all operations
        const operations = ['+', '-', '*', '/'];
        operation = operations[Math.floor(Math.random() * operations.length)];
    }
    if (operation === '/') {
        num1 = num1 * num2; // Ensures a whole number for division
    }

    if (num1 < 0) {
        num1 = `(${num1})`;
    }
    if (num2 < 0) {
        num2 = `(${num2})`;
    }

    currentQuestion = `${num1} ${operation} ${num2}`;
    document.getElementById('question').innerText = `What is ${currentQuestion}?`;
    isReviewQuestion = false;
    return eval(currentQuestion);
}

let correctAnswer = generateQuestion();

function submitAnswer() {
    let userAnswer = parseInt(document.getElementById('answer').value);
    totalQuestions++;
    let feedbackElement = document.getElementById('feedback');
    if (userAnswer === correctAnswer) {
        correctAnswers++;
        feedbackElement.innerText = 'Correct!';
        feedbackElement.classList.remove('incorrect');
        feedbackElement.classList.add('correct');
        if (isReviewQuestion) {
            incorrectProblems = incorrectProblems.filter(q => q !== currentQuestion);
        }
    } else {
        feedbackElement.innerText = 'Wrong!';
        feedbackElement.classList.add('incorrect');
        feedbackElement.classList.remove('correct');
        if (!isReviewQuestion) {
            incorrectProblems.push(currentQuestion);
        }
    }
    score = `Score: ${correctAnswers}/${totalQuestions}`;
    document.getElementById('score').innerText = score;
    correctAnswer = generateQuestion();
    document.getElementById('answer').value = '';
    updateIncorrectProblemsList();
}

function updateIncorrectProblemsList() {
    let list = document.getElementById('incorrectProblems');
    list.innerHTML = '';
    incorrectProblems.forEach(problem => {
        let listItem = document.createElement('li');
        listItem.innerText = problem;
        list.appendChild(listItem);
    });
}

document.getElementById('answer').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitAnswer();
    }
});

updateIncorrectProblemsList();
