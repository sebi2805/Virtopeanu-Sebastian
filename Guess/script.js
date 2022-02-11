'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '👍👍Correct Number!';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.guess').value = 3;
// document.querySelector('.score').textContent = 12;
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    document.querySelector('.message').textContent = 'No number😢';
  } else if (guess > 20)
    document.querySelector('.message').textContent =
      'number to big, choose a smaller number';
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'correct number👍';
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.backgroundColor = 'grey';
    document.querySelector('.number').style.color = 'white';
    if (score > Number(document.querySelector('.highscore').textContent)) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    document.querySelector('.check').removeEventListener('click');
  } else if (score > 1) {
    score--;
    document.querySelector('.score').textContent = score;

    if (guess > secretNumber)
      document.querySelector('.message').textContent = 'Too High🤦‍♂️';
    else document.querySelector('.message').textContent = 'Too Low🤦‍♂️';
  } else {
    document.querySelector('.message').textContent = 'You lost the game❌';
    document.querySelector('.score').textContent = 0;
  }
  //   } else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too High🤦‍♂️';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You lost the game❌';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   } else {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too Low🤦‍♂️';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You lost the game❌';
  //       document.querySelector('.score').textContent = 0;
  //     }
  document.querySelector('.guess').value = '';
});
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').style.backgroundColor = '#eee';
  document.querySelector('.number').style.color = '#333';
  document.querySelector('.message').textContent = 'Start Guessing...';
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
});
