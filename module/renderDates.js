import { declOfNum } from './declOfNum.js';
import { createModal } from './modal.js';
const form = document.querySelector('.reservation__form');
const reservDate = document.querySelector('.reservation__data');
const price = document.querySelector('.reservation__price');

export const renderDates = async (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const selects = document.querySelectorAll('.tour__select');
  const dates = data.map((item) => {
    const option = document.createElement('option');
    option.classList.add('tour__option');
    option.value = item.date;
    option.textContent = item.date;
    return option;
  });
  selects[0].append(...dates);
  selects[0].addEventListener('change', (e) => {
    selects[1].innerHTML = `                  
      <option value="" class="tour__option">
        Количество человек
      </option>`;
    data.forEach((element) => {
      if (element.date === e.target.value) {
        for (let i = element.min_people; i <= element.max_people; i++) {
          const peopleOption = document.createElement('option');
          peopleOption.classList.add('tour__option');
          peopleOption.value = i;
          peopleOption.textContent = i;
          selects[1].append(peopleOption);
        }
      }
    });
  });
};

export const renderReserve = async (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const selects = document.querySelectorAll('.reservation__select');
  const dates = data.map((item) => {
    const option = document.createElement('option');
    option.classList.add('tour__option', 'reservation__option');
    option.value = item.date;
    option.textContent = item.date;
    return option;
  });
  selects[0].append(...dates);
  selects[0].addEventListener('change', (e) => {
    selects[1].innerHTML = `                  
      <option value="" class="tour__option">
        Количество человек
      </option>`;
    data.forEach((element) => {
      if (element.date === e.target.value) {
        for (let i = element.min_people; i <= element.max_people; i++) {
          const peopleOption = document.createElement('option');
          peopleOption.classList.add('tour__option', 'reservation__option');
          peopleOption.value = i;
          peopleOption.textContent = i;
          selects[1].append(peopleOption);
        }
      }
    });
  });
  const peopleReserv = document.querySelector('#reservation__people');
  price.textContent = '';
  reservDate.textContent = '';
  peopleReserv.addEventListener('change', (e) => {
    const date = document.querySelector('#reservation__date');
    const m = declOfNum(e.target.value, ['человек', 'человека', 'человек']);
    const d = date.value.split(' - ');
    let month = d[1].slice(3) === '12' ? 'декабря' : 'ноября';
    reservDate.textContent = `${d[0].slice(0, 2)} ноября - ${d[1].slice(
      0,
      2,
    )} ${month}, ${m}`;
    data.forEach((elem) => {
      if (elem.date === date.value) {
        const allprice = e.target.value * elem.price;
        price.textContent = `${allprice}₽`;
      }
    });
  });
  form.addEventListener('input', () => {
    form.name.value = form.name.value.replace(/[^а-яА-ЯёЁ\s]+$/i, '');
  });

  form.addEventListener('input', () => {
    form.phone.value = form.phone.value.replace(/[^+\0-9\s]+$/i, '');
  });
  const reg = /^([^\s]*\s){2,}[^\s]*$/i;

  const btn = document.querySelector('.reservation__button');
  form.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === btn) {
      if (reg.test(form.name.value)) {
        createModal(form);
      } else {
        const info = document.querySelector('.reservation__info');
        const nameErr = document.createElement('p');
        nameErr.textContent = 'Неправильно введено ФИО';
        info.append(nameErr);
      }
    }
  });
};
