// Static countdown starting from 2 days (auto-start)
const display = document.getElementById('display');

// target is 2 days from now
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
const target = Date.now() + TWO_DAYS_MS;

function pad(n) { return n.toString().padStart(2, '0'); }

function update() {
  const now = Date.now();
  let diff = Math.max(0, Math.floor((target - now) / 1000)); // seconds
  const days = Math.floor(diff / (24 * 3600));
  diff -= days * 24 * 3600;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;
  display.textContent = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  if (target - now <= 0) {
    clearInterval(intervalId);
    display.textContent = '00:00:00:00';
  }
}

// update every second
update();
const intervalId = setInterval(update, 1000);
