// Simple countdown timer
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const secondsInput = document.getElementById('seconds');

let total = parseInt(secondsInput.value, 10) || 30;
let remaining = total;
let timerId = null;

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateDisplay() {
  display.textContent = formatTime(remaining);
}

function startTimer() {
  if (timerId) return;
  if (remaining <= 0) remaining = parseInt(secondsInput.value, 10) || 30;
  timerId = setInterval(() => {
    remaining -= 1;
    updateDisplay();
    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      alert('Time is up!');
    }
  }, 1000);
}

function pauseTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetTimer() {
  pauseTimer();
  total = parseInt(secondsInput.value, 10) || 30;
  remaining = total;
  updateDisplay();
}

secondsInput.addEventListener('change', () => {
  total = parseInt(secondsInput.value, 10) || 30;
  remaining = total;
  updateDisplay();
});
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// initialize
updateDisplay();
