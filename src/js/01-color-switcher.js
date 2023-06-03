'use strict';

//buttons start and stop
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let bgColor;

//CODE

function changeColorInterval() {
  bgColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  return bgColor;
}

//random color function
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnClick = startBtn.addEventListener('click', () => {
  changeColorInterval();
  startBtn.disabled = true;
});

const stopBtnClick = stopBtn.addEventListener('click', () => {
  clearInterval(bgColor);
  startBtn.disabled = false;
});
