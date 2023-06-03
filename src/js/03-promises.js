'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const firstDelayInput = document.querySelector('[name="delay"]');
const delayStepInput = document.querySelector('[name="step"]');
const promisesAmountInput = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

form.addEventListener('submit', evt => {
  evt.preventDefault();

  let firstDelay = Number(firstDelayInput.value);
  let delayStep = Number(delayStepInput.value);
  let amount = Number(promisesAmountInput.value);

  for (let i = 0; i < amount; i++) {
    const promise = createPromise(i + 1, firstDelay + delayStep * i);
    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
