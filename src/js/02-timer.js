'use strict';

// Opisany w dokumentacji
import flatpickr from 'flatpickr';

// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

// VARS
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const calendarInput = document.querySelector('#datetime-picker');
const actualDate = new Date();

// CODE
startBtn.disabled = true;

// calendar options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= actualDate) {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

function leftTimeCounter() {
  const inputDate = new Date(calendarInput.value);
  const diff = inputDate - new Date();

  if (diff <= 0) {
    clearInterval(timeInterval);
    return;
  } else {
    const { days, hours, minutes, seconds } = convertMs(diff);
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
  }
}

let timeInterval;
startBtn.addEventListener('click', () => {
  timeInterval = setInterval(leftTimeCounter, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
