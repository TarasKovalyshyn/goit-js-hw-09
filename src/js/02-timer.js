// імпортуємо бібліотеки та scc властивості "flatpickr"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_red.css');
// --------------------------------------------------------
// Отримуємо посилання на HTML елементи
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
//
let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // отримуємо значення DeadLine з input вибраний за допомогою бібліотеки "flatpickr"
  onClose(selectedDates) {
    // selectedDates - це масив обраних дат, тому ми беремо перший елемент.
    selectedDate = selectedDates[0].getTime();
    // вираховуємо вибраний час(різниця між DeadLIne та поточною датою "Date.now()")
    const deltaDate = selectedDate - Date.now();
    // якщо вибраний час в минклому alert за допомогою бібліотеки "Notify" і деактивуємо кнопку 'Start'
    if (deltaDate <= 0) {
      refs.startBtn.disabled = false;
      return (
        Notify.failure('Вибраний час в минулому'),
        (refs.startBtn.disabled = true)
      );
    }
  },
};
// refs.input, options - аргументи для flatpickr
flatpickr(refs.input, options); // flatpickr
// -----------------------------------------
// додаємосдухача подій на кнопку 'Start'
// відключаємо кнопку
// додаємо сповіщення про початок відліку
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  Notify.info('Відлік почато');
  // Встановлюємо інтервал відліку на 1с
  let intervalId = setInterval(() => {
    // якщо "deltaTime" дорінює менше 1с, то обнуляємо відлік і додаємо alert "відлік закінчено"
    const deltaTime = selectedDate - Date.now();
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return Notify.success('Відлік закінчено');
    }
    const reverseTimer = convertMs(deltaTime);
    // додаємо впереді "refs.days.textContent" нуль за допомогою "addLeadingZero"
    refs.days.textContent = addLeadingZero(reverseTimer.days);
    refs.hours.textContent = addLeadingZero(reverseTimer.hours);
    refs.minutes.textContent = addLeadingZero(reverseTimer.minutes);
    refs.seconds.textContent = addLeadingZero(reverseTimer.seconds);
  }, 1000);
});

// Формула індуса (за 2$) за допомогою якої перетворюємо мілісекунди в { days, hours, minutes, seconds }
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// -------------------------------------------------
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
