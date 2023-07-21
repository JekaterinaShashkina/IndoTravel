import {declOfNum} from "./declOfNum.js"
import loadStyle from "./loadstyle.js";
import {fetchRequest} from "./sendData.js";
const URL = 'https://jsonplaceholder.typicode.com/posts'

export const createModal = async (data)=>{
await loadStyle('/css/modal.css')
    const overlay = document.createElement('div')
    overlay.classList.add('overlay', 'overlay_confirm')
        const modal = document.createElement('div')
        modal.classList.add('modal')
        const title = document.createElement('h2')
        title.classList.add('modal__title')
        title.textContent = 'Подтверждение заявки'
        const peopleCount = document.createElement('p')
        peopleCount.classList.add('modal__text')
        const m =declOfNum(data.people.value, ['человек','человека', 'человек'])
        peopleCount.textContent= `Бронирование путешествия в Индонезию на ${m}`
        const datesText = document.createElement('p')
        datesText.classList.add('modal__text')
        const d = data.dates.value.split(" - ")
        let month = d[1].slice(3) === '12' ? 'декабря' : 'ноября'
        datesText.textContent = `В даты: ${d[0].slice(0,2)} ноября - ${d[1].slice(0,2)} ${month}, ${m}`
        const priceText = document.createElement('p')
        priceText.classList.add('modal__text')
        const price=document.querySelector('.reservation__price')
        priceText.textContent = `Стоимость тура ${price.textContent}`

        const buttons =document.createElement('div')
        buttons.classList.add('modal__button')
        const btnConfirm = document.createElement('button')
        btnConfirm.classList.add('modal__btn', 'modal__btn_confirm')
        btnConfirm.textContent= 'Подтверждаю'
        const btnEdit = document.createElement('button')
        btnEdit.classList.add('modal__btn', 'modal__btn_edit')
        btnEdit.textContent = 'Изменить данные'
        buttons.append(btnConfirm, btnEdit)
        modal.append(title, peopleCount, datesText,priceText, buttons)
        overlay.append(modal)
        document.body.append(overlay)
        btnEdit.addEventListener('click', () => {
            overlay.remove()
        })
        btnConfirm.addEventListener('click',(e) =>{
            e.preventDefault()
                fetchRequest(URL, {
                    method: 'POST',
                    body: {
                        dates: data.dates.value,
                        people: data.people.value,
                        name: data.name.value,
                        phone: data.phone.value
                    },
                    callback: (err, data)=>{
                        if (err) {
                            console.warn(err, data)
                          return
                        }
                        overlay.remove()
                        const selects = document.querySelectorAll('.reservation__select')
                        selects.forEach(elem => {
                            elem.value = ''
                            elem.setAttribute('disabled', 'true')
                        })
                        const inputs =document.querySelectorAll('.reservation__input')
                        inputs.forEach(elem => {
                            elem.value = ''
                            elem.setAttribute('disabled', 'true')
                        })
                        document.querySelector('.reservation__button').setAttribute('disabled', true)
                        document.querySelector('.reservation__data').textContent= 'Ваша заявка принята'
                        document.querySelector('.reservation__price').textContent= ''

                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }) 
        })
    }

