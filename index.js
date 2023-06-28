import { timer } from './module/timer.js';

const time = document.querySelector('.hero__timer').dataset.timerDeadline;
timer(time);
