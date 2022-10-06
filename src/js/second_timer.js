// Таймер з встанновлення ручного DeadLine---------------------
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const TIMER_DEADLINE = new Date(2022, 9, 5, 18, 00);
console.log(TIMER_DEADLINE);

const refsTimer = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};
const timerRef = document.querySelector('.timer');

// -------------------------------------------------------------
const timer = {
  intervalId: null,
  refs: {},
  notifyOptions: {
    position: 'center-center',
    backoOverlay: true,
    clickToClose: true,
    closeButton: true,
  },
  start(rootSelector, deadline) {
    const delta = deadline.getTime() - Date.now();
    console.log(delta);
    if (delta <= 1000) {
      Notify.failure('вибраний час в минулому', this.notifyOptions);
      return;
    }
    Notify.success('відлік почався', this.notifyOptions);
    this.getRefs(rootSelector);
    this.intervalId = setInterval(() => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 1000) {
        clearInterval(this.intervalId);
        Notify.success('dead line настав', this.notifyOptions);
      }
      const data = this.convertMs(diff);
      //   -----------------------------------------------
      //   дуструктеризуємо і перебираємо за допомогою ForEach щоб скоротити код
      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.addLeadinZero(value);
      });
      this.refs.days.textContent = this.addLeadinZero(data.days);
      this.refs.hours.textContent = this.addLeadinZero(data.hours);
      this.refs.minutes.textContent = this.addLeadinZero(data.minutes);
      this.refs.seconds.textContent = this.addLeadinZero(data.seconds);
      // -----------------------------------------------------
      //    [name] - в квадратних дужках, бо ми кожного разу записуємо ключик
      //   { days, hours, minutes, seconds }
    }, 1000);
  },
  getRefs(rootSelector) {
    (this.refs.days = rootSelector.querySelector('[data-days]')),
      (this.refs.hours = rootSelector.querySelector('[data-hours]')),
      (this.refs.minutes = rootSelector.querySelector('[data-minutes]')),
      (this.refs.seconds = rootSelector.querySelector('[data-seconds]'));
  },

  convertMs(diff) {
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  },
  //   додаємо нуль перед кожним значенням дати
  addLeadinZero(value) {
    return String(value).padStart(2, '0');
  },
};
timer.start(timerRef, TIMER_DEADLINE);

// function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
