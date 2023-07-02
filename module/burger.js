export const burger = () => {
  const menuButton = document.querySelector('.header__menu-button');
  const menuHeaders = document.querySelector('.header__menu');

  // "header__menu_active"
  menuButton.addEventListener('click', () => {
    menuHeaders.classList.toggle('header__menu_active');
  });
  window.addEventListener('click', ({ target }) => {
    console.log(target);
    if (
      target.closest('.header__link') ||
      !target.matches('.header__menu-button')
    ) {
      menuHeaders.classList.remove('header__menu_active');
    }
  });
};
