import { acc } from './module/acc.js';
import { burger } from './module/burger.js';
import { timer } from './module/timer.js';
import './module/fly.js';
import { renderDates, renderReserve } from './module/renderDates.js';
import { fetchRequest, httpRequest } from './module/sendData.js';
const URL = 'https://jsonplaceholder.typicode.com/posts';

const time = document.querySelector('.hero__timer').dataset.timerDeadline;
timer(time);
acc();
burger();
fetchRequest('../../date.json', {
  callback: renderDates,
});
fetchRequest('../../date.json', {
  callback: renderReserve,
});

const questions = document.querySelector('.footer__form');
questions.addEventListener('submit', (e) => {
  e.preventDefault();

  fetchRequest(URL, {
    method: 'POST',
    body: {
      mail: questions.mail.value,
    },
    callback: (err, data) => {
      if (err) {
        console.warn(err, data);
        questions.textContent = err;
        return;
      }
      questions.innerHTML = `
            <h2 class="footer__title footer__form-title">Ваша заявка успешно отправлена.</h2>
             <p>Наши менеджеры свяжутся с вами в течение 3-х рабочих дней</p>`;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
});
