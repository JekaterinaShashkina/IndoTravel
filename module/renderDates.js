import {createModal} from "./modal.js";

export const renderDates = async (err, data) => {
  if (err) {
    console.warn(err, data)
    createModal()
    return
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
      </option>`
      data.forEach((element) => {
        if (element.date === e.target.value) {
          for (let i = element.min_people; i <= element.max_people; i++) {
            const peopleOption = document.createElement('option')
            peopleOption.classList.add('tour__option')
            peopleOption.value =i
            peopleOption.textContent = i
           selects[1].append(peopleOption)
          }
        }
      });
  })
};

export const renderReserve = async (err, data) => {
    if (err) {
      console.warn(err, data)
      createModal()
      return
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
      </option>`
      data.forEach((element) => {
        if (element.date === e.target.value) {
          for (let i = element.min_people; i <= element.max_people; i++) {
            const peopleOption = document.createElement('option')
            peopleOption.classList.add('tour__option', 'reservation__option')
            peopleOption.value =i
            peopleOption.textContent = i
           selects[1].append(peopleOption)
          }
        }
      });
  })
  const peopleReserv = document.querySelector('#reservation__people')
  const price = document.querySelector('.reservation__price')
    price.textContent = ''
  const reservDate = document.querySelector('.reservation__data')
    reservDate.textContent=''
  peopleReserv.addEventListener('change', (e) =>{
    const date =document.querySelector('#reservation__date')
    const m = declOfNum(e.target.value, ['человек','человека', 'человек'])
    const d = date.value.split(" - ")
    let month = d[1].slice(3) === '12' ? 'декабря' : 'ноября'
    reservDate.textContent = `${d[0].slice(0,2)} ноября - ${d[1].slice(0,2)} ${month}, ${m}`
    data.forEach(elem => {
      if(elem.date === date.value) {
        const allprice = e.target.value * elem.price
        price.textContent = `${allprice}₽`
      }
    })
  })
}
const declOfNum = (n, titles) => {
  return (
    n +
    " " +
    titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
    ]
  );
}

