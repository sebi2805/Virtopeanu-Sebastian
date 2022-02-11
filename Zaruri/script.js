'use strict';
let gameOK = 1;
const diceRoll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const curentScore = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];

const totalScore = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
totalScore[0].textContent = totalScore[1].textContent = String(0);
let curentPlayer = 0;
document.querySelector('current--1');
dice.style.display = 'none';
let diceNumber;
diceRoll.addEventListener('click', function () {
  if (gameOK) {
    diceNumber = Math.trunc(Math.random() * 6 + 1);

    if (diceNumber === 1) {
      dice.src = `dice-${1}.png`;
      dice.style.display = 'initial';
      curentScore[curentPlayer % 2].textContent = String(0);
      document
        .querySelector(`.player--${(curentPlayer + 1) % 2}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${curentPlayer % 2}`)
        .classList.toggle('player--active');
      curentPlayer++;
    }
    for (let i = 2; i <= 6; i++)
      if (diceNumber === i) {
        dice.src = `dice-${i}.png`;
        dice.style.display = 'initial';
        curentScore[curentPlayer % 2].textContent = String(
          Number(curentScore[curentPlayer % 2].textContent) + diceNumber
        );
        break;
      }
  }
  console.log(gameOK);
});
hold.addEventListener('click', function () {
  if (gameOK) {
    totalScore[curentPlayer % 2].textContent =
      Number(totalScore[curentPlayer % 2].textContent) +
      Number(curentScore[curentPlayer % 2].textContent);
    curentScore[curentPlayer % 2].textContent = String(0);
    document
      .querySelector(`.player--${(curentPlayer + 1) % 2}`)
      .classList.toggle('player--active');
    document
      .querySelector(`.player--${curentPlayer % 2}`)
      .classList.toggle('player--active');

    if (Number(totalScore[curentPlayer % 2].textContent) >= 20) {
      dice.style.display = 'none';
      document
        .querySelector(`.player--${curentPlayer % 2}`)
        .classList.add('player--winner');
      gameOK = 0;
    }

    curentPlayer++;
  }
});
newGame.addEventListener('click', function () {
  totalScore[0].textContent = totalScore[1].textContent = String(0);
  curentScore[0].textContent = curentScore[1].textContent = String(0);
  dice.style.display = 'none';
  curentPlayer = 0;
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--winner');
  document
    .querySelector(`.player--${curentPlayer % 2}`)
    .classList.remove('player--winner');
  gameOK = 1;
});

const modal = document.querySelector('.modal');
const closebtn = document.querySelector('.close');
closebtn.addEventListener('click', function (e) {
  e.preventDefault();
  modal.style.display = 'none';
});
window.onclick = function (e) {
  e.preventDefault();
  modal.style.display = 'none';
};
