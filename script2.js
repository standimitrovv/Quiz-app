'use strict';

const startBtn = document.querySelector('#start-btn');

const quizBox = document.querySelector('.quiz');

const questionBox = document.querySelector('.quiz__question--actual');

const btnOption1 = document.querySelector('.quiz__option--1');
const btnOption2 = document.querySelector('.quiz__option--2');
const btnOption3 = document.querySelector('.quiz__option--3');
const btnOption4 = document.querySelector('.quiz__option--4');

let questionIndex = 0;

const questionsData = [
  {
    question: 'How many states are there in USA?',
    answers: [30, 12, 60, 50],
    correct: 50,
  },
  {
    question: 'How are you today?',
    answers: ['good', 'very good', 'bad', 'been better'],
    correct: 'very good',
  },
  {
    question: 'Which is the smallest and most fundamental unit of matter',
    answers: ['atom', 'molecule', 'brain', 'cell'],
    correct: 'atom',
  },
];

const startQuiz = function () {
  console.log('started');
  quizBox.classList.remove('hidden');
  startBtn.classList.add('hidden');
};

const loadQuestions = function (questionI) {
  questionsData.forEach((question, i) => {
    questionBox.texContent = questionsData[questionI].question[questionI];
    btnOption1.textContent = questionsData[questionI].answers[questionI];
    btnOption2.textContent = questionsData[questionI].answers[questionI];
    btnOption3.textContent = questionsData[questionI].answers[questionI];
    btnOption4.textContent = questionsData[questionI].answers[questionI];
  });
};

loadQuestions(questionIndex);

startBtn.addEventListener('click', startQuiz);
