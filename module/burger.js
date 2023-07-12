export const burger = () => {
  const menuButton = document.querySelector('.header__menu-button');
  const menuHeaders = document.querySelector('.header__menu');
  const debounce =
    (fn, raf = NaN) =>
    (...args) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        fn(...args);
        raf = NaN;
      });
    };

  const handle = () => {
    menuHeaders.classList.add('header__menu_active');
  };

  const debounceHandle = debounce(handle);
  menuButton.addEventListener('mousemove', debounceHandle);
  window.addEventListener('click', ({ target }) => {
    if (
      target.closest('.header__link') ||
      !target.matches('.header__menu-button')
    ) {
      menuHeaders.classList.remove('header__menu_active');
    }
  });
};
