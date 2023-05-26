/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

  
class CountdownTimer {
constructor({ selector, targetDate }) {
  this.selector = selector;
  this.targetDate = targetDate;
  this.timerRef = document.querySelector(this.selector);
  this.daysRef = this.timerRef.querySelector('[data-value="days"]');
  this.hoursRef = this.timerRef.querySelector('[data-value="hours"]');
  this.minsRef = this.timerRef.querySelector('[data-value="mins"]');
  this.secsRef = this.timerRef.querySelector('[data-value="secs"]');
  this.setInt = null;
}
  
start() {
  this.setInt = setInterval(() => {
const now = Date.now();
const time = this.targetDate - now;
this.refreshTimer(time);
this.stop(time);
  }, 1000);
}
  
refreshTimer(time) {
  const days = this.padSet(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this.padSet(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this.padSet(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.padSet(Math.floor((time % (1000 * 60)) / 1000));

  this.updateBlock(this.daysRef, days);
  this.updateBlock(this.hoursRef, hours);
  this.updateBlock(this.minsRef, mins);
  this.updateBlock(this.secsRef, secs);

  // Додати/видалити клас "current" для з'явлення елементів
  this.daysRef.classList.add('current');
  this.hoursRef.classList.add('current');
  this.minsRef.classList.add('current');
  this.secsRef.classList.add('current');
}

updateBlock(block, value) {
block.textContent = value;
block.classList.remove('single-digit', 'double-digit', 'triple-digit', 'quadruple-digit');

if (value.length === 1) {
block.classList.add('single-digit');
  } else if (value.length === 2) {
block.classList.add('double-digit');
  } else if (value.length === 3) {
block.classList.add('triple-digit');
  } else if (value.length === 4) {
block.classList.add('quadruple-digit');	}
  }

padSet(value) {
  return String(value).padStart(2, '0');
}
stop(time) {
  if (time < 0) {
clearInterval(this.setInt);
this.refreshTimer(0);
  }
}
  }
  
  const setTimer = new CountdownTimer({
selector: '#timer-1',
targetDate: new Date('Apr 25, 2024'),
  });
  
  setTimer.start();
  