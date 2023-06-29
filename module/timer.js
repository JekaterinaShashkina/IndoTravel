export const timer = (deadline) => {
  const heroTimer = document.querySelector('.hero__timer');
  if (heroTimer.dataset.timerDeadline) {
    heroTimer.insertAdjacentHTML(
      `afterbegin`,
      `
    <p class="timer__title">До конца акции осталось:</p>
    <p class="timer__item timer__item_days">
      <span class="timer__count timer__count_days">2</span>
      <span class="timer__units timer__units_days">дня</span>
    </p>
    <p class="timer__item timer__item_hours">
      <span class="timer__count timer__count_hours">05</span>
      <span class="timer__units timer__units_hours">часов</span>
    </p>
    <p class="timer__item timer__item_minutes">
      <span class="timer__count timer__count_minutes">12</span>
      <span class="timer__units timer__units_minutes">минут</span>
    </p>
    `,
    );

    const timerCountDays = document.querySelector('.timer__count_days');
    const timerCountHours = document.querySelector('.timer__count_hours');
    const timerCountMinutes = document.querySelector('.timer__count_minutes');
    const unitsDay = document.querySelector('.timer__units_days');
    const unitsHours = document.querySelector('.timer__units_hours');
    const unitsMin = document.querySelector('.timer__units_minutes');
    const timerSeconds = document.createElement('p');
    timerSeconds.classList.add('timer__item', 'timer__item_seconds');
    timerSeconds.style = 'display:none';
    const timerCount = document.createElement('span');
    timerCount.classList.add('timer__count', 'timer__count_seconds');
    document.querySelector('.hero__timer').append(timerSeconds);
    const timerUnitsSecond = document.createElement('span');
    timerUnitsSecond.classList.add('timer__units', 'timer__units_seconds');
    timerCount.textContent = '';
    timerSeconds.append(timerCount, timerUnitsSecond);
    const days = document.querySelector('.timer__item_days');

    const getTimeRemaining = () => {
      const d = new Date().getTimezoneOffset();
      const dateStop = new Date(deadline).getTime() - d + 180;
      const dateNow = Date.now();

      const timeRemaining = dateStop - dateNow;
      const sec = Math.floor((timeRemaining / 1000) % 60);
      const min = Math.floor(timeRemaining / 1000 / 60) % 60;
      const hour = Math.floor(timeRemaining / 1000 / 60 / 60) % 24;
      const day = Math.floor(timeRemaining / 1000 / 60 / 60 / 24) % 60;
      return { timeRemaining, sec, min, hour, day };
    };

    const start = () => {
      const timer = getTimeRemaining();
      if (timer.day > 0) {
        timerCountDays.textContent = timer.day;
        if (timer.hour < 10) {
          timerCountHours.textContent = `0${timer.hour}`;
        } else {
          timerCountHours.textContent = timer.hour;
        }
        if (timer.min < 10) {
          timerCountMinutes.textContent = `0${timer.min}`;
        } else {
          timerCountMinutes.textContent = timer.min;
        }
      } else {
        days.remove();
        if (timer.hour < 10) {
          timerCountHours.textContent = `0${timer.hour}`;
        } else {
          timerCountHours.textContent = timer.hour;
        }
        if (timer.min < 10) {
          timerCountMinutes.textContent = `0${timer.min}`;
        } else {
          timerCountMinutes.textContent = timer.min;
        }
        timerCount.textContent = timer.sec;
        timerSeconds.style.display = 'flex';
      }

      const intervalId = setTimeout(start, 1000);

      timerUnitsSecond.textContent = declOfNum(timer.sec, [
        'секунда',
        'секунды',
        'секунд',
      ]);
      unitsMin.textContent = declOfNum(timer.min, [
        'минута',
        'минуты',
        'минут',
      ]);
      unitsHours.textContent = declOfNum(timer.hour, ['час', 'часа', 'часов']);
      unitsDay.textContent = declOfNum(timer.day, ['день', 'дня', 'дней']);

      if (timer.timeRemaining <= 0) {
        clearInterval(intervalId);
        document.querySelector('.hero__timer').remove();
        document.querySelector('.hero__text').remove();
      }
    };

    start();
  }
};
const declOfNum = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};
