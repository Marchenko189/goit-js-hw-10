import iziToast from "izitoast";

import flatpickr from "flatpickr";

const options = {
  enableTime: true,
  disableMobile: true,
  time_24hr: true,
  locale: {
    weekdays: {
      shorthand: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], 
      longhand: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    months: {
      shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
      longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
    }
  },
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; // Отримання першої обраної дати

    if (userSelectedDate <= Date.now()) { //Перевірка валідності дати
        iziToast.warning({
        title: "Warning",
        message: "Please choose a date in the future",
        position: 'bottomCenter',
      });
        startBtn.disabled = true; //Якщо дата минула, кнопка деактивована
    } else {
        startBtn.disabled = false; //Якщо дата майбутня, кнопка активована
    }   
    },
};

new flatpickr('#datetime-picker', options); //Ініциалізація бібліотеки

let userSelectedDate; //Змінна для зберігання обраної дати

const dateTimePicker = document.querySelectorAll('input'); // Отримання input

const startBtn = document.querySelector('button[data-start]'); // Отримання кнопки

startBtn.disabled = true; // Спочатку кнопка деактивована при завантаженні сторінки

startBtn.addEventListener('click', () => { // При натисканні на кнопку починається відлік
    if (userSelectedDate) {
        startCountDown(userSelectedDate);
    }
    iziToast.info({
        title: "Info",
        message: "Timer started",
        position: 'bottomCenter',
      });
    startBtn.disabled = true;
     dateTimePicker.forEach(input => {
         input.disabled = true;
    });
});

function startCountDown(userSelectedDate) { // Функція для початку відліку часу
    const interval = setInterval(() => {
    const ms = userSelectedDate - Date.now();
      
     if (ms <= 0) {
        clearInterval(interval);
         iziToast.success({
        title: "Success",
        message: "Time over",
        position: 'bottomCenter',
      });
        dateTimePicker.forEach(input => {
        input.disabled = false;
    }); 
    } else {
        const timeVal = convertMs(ms);
      updateUI(timeVal); 
    }
    }, 1000);
};

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
};

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

function updateUI(timeVal) {
    // Оновлення значень на екрані
    dataDays.textContent = addLeadingZero(timeVal.days);
    dataHours.textContent = addLeadingZero(timeVal.hours);
    dataMinutes.textContent = addLeadingZero(timeVal.minutes);
    dataSeconds.textContent = addLeadingZero(timeVal.seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};








