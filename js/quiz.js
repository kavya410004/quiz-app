let currentQuestionIndex = 0;
let data = [];

const questionNumberElement = document.getElementById('question-number');
const topicNameElement = document.getElementById('topic-name');
const questionTextElement = document.getElementById('question-text');
const optionAElement = document.getElementById('A');
const optionBElement = document.getElementById('B');
const optionCElement = document.getElementById('C');
const optionDElement = document.getElementById('D');
const optionEElement = document.getElementById('E');
const showAnswerButton = document.getElementById('show-answer');
const nextQuestionButton = document.getElementById('next-question');
const previousQuestionButton = document.getElementById('previous-question');

const urlParams = new URLSearchParams(window.location.search);
const quizFile = urlParams.get('file');

function loadJsonData(filename) {
    fetch(`three-one/${filename}`)
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            loadQuestion(currentQuestionIndex);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function loadQuestion(index) {
    const question = data[index];
    questionNumberElement.textContent = `Question ${index + 1}`;
    topicNameElement.textContent = question['TOPIC NAME'];
    questionTextElement.textContent = question['QUESTION TEXT'];
    optionAElement.textContent = question['OPTION  A'];
    optionBElement.textContent = question['OPTION  B'];
    optionCElement.textContent = question['OPTION  C'];
    optionDElement.textContent = question['OPTION  D'];
    if (question['OPTION  E']) {
        optionEElement.textContent = question['OPTION  E'];
    }else{
        optionEElement.style.display = 'none';
    }

    const options = [optionAElement, optionBElement, optionCElement, optionDElement, optionEElement];
    options.forEach(option => option.style.backgroundColor = '');

    options.forEach(option => {
        option.onclick = function () {
            const correctAnswer = question['CORRECT ANSWER'];
            const selectedAnswer = option.id;

            if (selectedAnswer === correctAnswer) {
                option.style.backgroundColor = '#4CAF50'; 
            } else {
                option.style.backgroundColor = 'red'; 
            }

            setTimeout(() => {
                options.forEach(opt => opt.style.backgroundColor = '');
            }, 1000);
        };
    });

    showAnswerButton.onclick = () => alert(`Correct answer: ${question['CORRECT ANSWER']}`);
}

if (quizFile) {
    loadJsonData(quizFile);
}

nextQuestionButton.onclick = () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % data.length;
    loadQuestion(currentQuestionIndex);
};

previousQuestionButton.onclick = () => {
    currentQuestionIndex = (currentQuestionIndex - 1 + data.length) % data.length;
    loadQuestion(currentQuestionIndex);
};