const docEl = document.documentElement;
let lastScrollTop = 0;

if (docEl.clientWidth > 758) {
  const fly = document.createElement('div');

  fly.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: url("../img/airplane.svg") center/contain no-repeat
    `;
  document.body.append(fly);
  const calcPositionFly = () => {
    const maxHeight = docEl.clientHeight - fly.clientHeight;
    const maxscroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.scrollY * 100) / maxscroll;
    const right = maxHeight * (percentScroll / 100);
    let st = window.scrollY || docEl.scrollTop;
    if (st > lastScrollTop) {
      fly.style.transform = `translateY(${-right}px)`;
    } else if (st < lastScrollTop) {
      fly.style.transform = `translateY(${-right}px) rotate(180deg)`;
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };
  window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionFly);
  });

  calcPositionFly();
}
