const travelItems = document.querySelectorAll('.travel__item');
const buttons = document.querySelectorAll('.travel__item-title');
const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');
let heightWrapper = 0;

export const acc = () => {
  textWrapper.forEach((elem) => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    }
  });

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log(button);

      for (let i = 0; i < travelItems.length; i++) {
        if (i === index) {
          textWrapper[i].style.height = travelItems[i].classList.contains(
            'travel__item_active',
          )
            ? ''
            : `${heightWrapper}px`;
          travelItems[i].classList.toggle('travel__item_active');
        } else {
          travelItems[i].classList.remove('travel__item_active');
          textWrapper[i].style.height = '';
        }
      }
    });
  });
};
