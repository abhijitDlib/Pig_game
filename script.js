'use strict';

//selecting elements
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');

const score0El = document.querySelector('#score__total-0');
const score1El = document.getElementById('score__total-1');
const current0El = document.getElementById('score--0');
const current1El = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice-box');
const diceImgEl = document.querySelector('.img');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`score--${activePlayer}`).textContent = currentScore;
  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceImgEl.src = `./img/dice-${dice}.png`;

    //3. Check for rolled 1; if ture, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`score--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's total score;
    //display the total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score__total-${activePlayer}`).textContent =
      scores[activePlayer];

    //   2. Check if player's scoer  is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      //finish the game
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('overlay');
      document
        .querySelector(`.player-${activePlayer}-winner`)
        .classList.remove('hidden');
    }

    //if not
    //3.Switch to the next player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`.player-${activePlayer}`).classList.remove('overlay');
  document
    .querySelector(`.player-${activePlayer}-winner`)
    .classList.add('hidden');
});
