import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; // Отримання першої обраної дати

    if (userSelectedDate <= Date.now()) { //Перевірка валідності дати
        alert("Please choose a date in the future"); 
        startBtn.disabled = true; //Якщо дата минула, кнопка деактивована
    } else {
        startBtn.disabled = false; //Якщо дата майбутня, кнопка активована
    }   
    },
};

new flatpickr('#datetime-picker', options); //Ініциалізація бібліотеки

let userSelectedDate; //Змінна для зберігання обраної дати
console.log(userSelectedDate);

const startBtn = document.querySelector('button[data-start]'); // Отримання кнопки

startBtn.addEventListener('click', () => { // При натисканні на кнопку починається відлік
    if (userSelectedDate) {
        startCountDown(userSelectedDate);
    }
});

function startCountDown(userSelectedDate) { // Функція для початку відліку часу
    const interval = setInterval(() => {
    const ms = userSelectedDate - Date.now();
      
    if (ms <= 0) {
      clearInterval(interval);
    } else {
        const timeVal = convertMs(ms);
      console.log(`${timeVal.days} days, ${timeVal.hours} hours, ${timeVal.minutes} minutes, ${timeVal.seconds} seconds`);
    }
  }, 1000);
}

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


