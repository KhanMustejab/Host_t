// Static countdown: persistent 2-day timer (stores end timestamp in localStorage)
const display = document.getElementById('display');
if (!display) throw new Error('Display element not found');

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'host_t_timer_target';

function pad(n) { return n.toString().padStart(2, '0'); }

function getTarget() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const t = parseInt(stored, 10);
    if (!isNaN(t)) return t;
  }
  const t = Date.now() + TWO_DAYS_MS;
  localStorage.setItem(STORAGE_KEY, String(t));
  return t;
}

let target = getTarget();

function formatRemaining(ms) {
  let sec = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(sec / (24 * 3600));
  sec -= days * 24 * 3600;
  const hours = Math.floor(sec / 3600);
  sec -= hours * 3600;
  const minutes = Math.floor(sec / 60);
  const seconds = sec - minutes * 60;
  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function update() {
  const now = Date.now();
  const remainingMs = target - now;
  if (remainingMs <= 0) {
    display.textContent = '00:00:00:00';
    // optionally clear stored target so it won't stay expired on reload
    // localStorage.removeItem(STORAGE_KEY);
    return;
  }
  display.textContent = formatRemaining(remainingMs);
}

update();
const intervalId = setInterval(update, 1000);
