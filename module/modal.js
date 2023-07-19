
export const createModal = (success)=>{
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    if (success) {
            overlay.innerHTML = `
            <div class="modal">
                <h2 class="modal__title">Ваша заявка успешно отправлена</h2>
                <p class="modal__text">Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</p>
                <button class="modal__close">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" fill="#78EC6E"/>
                    <path d="M42.2618 60.8332L31.4285 49.9999L27.8174 53.611L42.2618 68.0554L73.2142 37.1031L69.6031 33.4919L42.2618 60.8332Z" fill="white"/>
                </svg>
                </button>
            </div>
           `
    } else {
        overlay.innerHTML=`
        <div class="modal">
            <h2 class="modal__title">Упс... Что-то пошло не так</h2>
            <p class="modal__text">Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз</p>
            <button class="modal__close modal__btn">
                Забронировать
            </button>
        </div>
        `
    }
    document.body.append(overlay)
    return overlay
    }

    export const modalOpen = (overlay) =>{
        overlay.classList.add('overlay_active')
    }
    export const modalClose = (overlay) =>{
        overlay.addEventListener("click", (e) => {
            const target = e.target;
            if (target === overlay|| target.closest(".modal__close")) {
                overlay.classList.remove('overlay_active')
                ;
            }
          });
    }