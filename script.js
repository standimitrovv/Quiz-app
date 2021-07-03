'use strict';

const startQuizBox = document.querySelector('.start-quiz');

const quizBox = document.querySelector('.quiz');

const main = document.querySelector('.main');

const startQuizBtn = document.querySelector('#start-btn');
const btnsOption = document.querySelectorAll('.quiz__option--btn');
const btnContainer = document.querySelector('.quiz-navigation');
const btnNext = document.querySelector('.btn-next');
const btnShowResults = document.querySelector('.quiz-navigation__final');

const quizQuestion = document.querySelector('.quiz__question--actual');
const btnOptionContainer = document.querySelector('.quiz__option');
const btnOption1 = document.querySelector('.quiz__option--1');
const btnOption2 = document.querySelector('.quiz__option--2');
const btnOption3 = document.querySelector('.quiz__option--3');
const btnOption4 = document.querySelector('.quiz__option--4');
const quizOptionBtns = document.querySelectorAll('.quiz__option--btn');

const resultsTab = document.querySelector('.results__tab');

let questionIndex = 0;
let score = 0;

const beginQuiz = function () {
  btnNext.classList.add('hidden');
  startQuizBox.classList.add('hidden');
  quizBox.classList.remove('hidden');
};

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

const loadQuestions = function (questionI) {
  quizQuestion.textContent = questionsData[questionI].question;
  btnOption1.textContent = questionsData[questionI].answers[0];
  btnOption2.textContent = questionsData[questionI].answers[1];
  btnOption3.textContent = questionsData[questionI].answers[2];
  btnOption4.textContent = questionsData[questionI].answers[3];
};

loadQuestions(questionIndex);

const renderResultsTab = function () {
  btnShowResults.classList.remove('hidden');

  btnShowResults.addEventListener('click', function () {
    quizBox.classList.add('hidden');
    resultsTab.classList.remove('hidden');

    resultsTab.innerHTML = `
        <h2 class="results__tab-heading heading-2 ">
          <span class="results__tab-user-points-container">Your Points
            <label class="results__tab-user"></label>
          </span>
          <span class="results__tab-all-points-container">All Points
            <label class="results__tab-all"></label>
          </span>
        </h2>
        <button class="results__tab-btn btn">Restart Game!</button>

    `;

    const usersPoints = document.querySelector('.results__tab-user');
    const allPoints = document.querySelector('.results__tab-all');
    const btnRestart = document.querySelector('.results__tab-btn');

    const type = score > 1 || score == 0 ? 'points' : 'point';
    usersPoints.innerText = `${score} ${type}`;
    allPoints.innerText = `${questionsData.length} points`;

    btnRestart.addEventListener('click', function () {
      score = 0;
      resultsTab.classList.add('hidden');
      window.location.reload();
    });
  });
};

const loadNextQuestion = function (e) {
  btnNext.classList.add('hidden');

  quizOptionBtns.forEach((btn) => {
    if (btn.classList.contains('correct') && btn.classList.contains('wrong')) {
    }
    btn.classList.remove('correct');
    btn.classList.remove('wrong');
  });

  if (questionIndex < questionsData.length - 1) {
    questionIndex++;
  }

  if (questionIndex === questionsData.length - 1) {
    btnNext.classList.add('hidden');
  }

  loadQuestions(questionIndex);
};

const checkAnswer = function (e) {
  const id = e.target.id;
  const clickedButton = e.target.closest(`.quiz__option--${id}`);
  if (!clickedButton) return;
  const correctAnswer = questionsData[questionIndex].correct;

  if (
    clickedButton.textContent == correctAnswer &&
    questionIndex < questionsData.length - 1
  ) {
    score++;
    clickedButton.classList.add('correct');
    quizOptionBtns.forEach((btn) => {
      if (!btn.classList.contains('correct')) {
        btn.classList.add('wrong');
      }
    });
    btnNext.classList.remove('hidden');
  }
  if (
    clickedButton.textContent == correctAnswer &&
    questionIndex == questionsData.length - 1
  ) {
    score++;
    clickedButton.classList.add('correct');
    quizOptionBtns.forEach((btn) => {
      if (!btn.classList.contains('correct')) {
        btn.classList.add('wrong');
      }
    });
    btnNext.classList.add('hidden');
    renderResultsTab();
  }
  if (
    clickedButton.textContent !== correctAnswer &&
    questionIndex < questionsData.length - 1
  ) {
    quizOptionBtns.forEach((btn) => {
      if (btn.textContent != correctAnswer) {
        btn.classList.add('wrong');
      } else btn.classList.add('correct');
      btnNext.classList.remove('hidden');
    });
  }
  if (
    clickedButton.textContent !== correctAnswer &&
    questionIndex == questionsData.length - 1
  ) {
    quizOptionBtns.forEach((btn) => {
      if (btn.textContent != correctAnswer) {
        btn.classList.add('wrong');
      } else btn.classList.add('correct');
      renderResultsTab();
    });
  }
};

startQuizBtn.addEventListener('click', beginQuiz);
btnNext.addEventListener('click', loadNextQuestion);
btnOptionContainer.addEventListener('click', checkAnswer);
btnShowResults.addEventListener('click', renderResultsTab);
