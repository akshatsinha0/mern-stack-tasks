let timerDisplay = document.getElementById('timer');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');

let minutes = 25;
let seconds = 0;
let interval;

function updateDisplay() {
  let min = minutes < 10 ? '0' + minutes : minutes;
  let sec = seconds < 10 ? '0' + seconds : seconds;
  timerDisplay.textContent = `${min} : ${sec}`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(interval);
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial display
updateDisplay();
