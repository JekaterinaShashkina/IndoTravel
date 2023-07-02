import { acc } from './module/acc.js';
import { burger } from './module/burger.js';
import { timer } from './module/timer.js';

const time = document.querySelector('.hero__timer').dataset.timerDeadline;
timer(time);
acc();
burger();
