// Countdown to fixed target: 26 Dec 2025 06:00:00 IST (UTC+5:30)
// Convert to UTC: 2025-12-26 00:30:00Z
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
if (!daysEl || !hoursEl || !minutesEl || !secondsEl) throw new Error('Countdown elements missing');

const TARGET_ISO = '2025-12-26T00:30:00Z';
const target = Date.parse(TARGET_ISO);

function pad(n){return String(n).padStart(2,'0');}

function update() {
  const now = Date.now();
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(diff / (24*3600));
  diff -= days * 24*3600;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  if (target - now <= 0) {
    clearInterval(intervalId);
    // show zeros when done
    daysEl.textContent = '00'; hoursEl.textContent='00'; minutesEl.textContent='00'; secondsEl.textContent='00';
  }
}

update();
const intervalId = setInterval(update, 1000);
