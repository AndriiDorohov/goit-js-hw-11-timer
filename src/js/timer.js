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
}

  setInt = setInterval(() => {
    const now = Date.now();
    const time = this.targetDate - now;
    this.refreshTimer(time);
    this.stop(time);
  }, 1000);
   
  refreshTimer(time) {
    
    const days = this.padSet(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.padSet(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.padSet(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.padSet(Math.floor((time % (1000 * 60)) / 1000));

    const timerRef = document.querySelector('#timer-1');
    const daysRef = timerRef.querySelector('[data-value="days"]');
    const hoursRef = timerRef.querySelector('[data-value="hours"]');
    const minsRef = timerRef.querySelector('[data-value="mins"]');
    const secsRef = timerRef.querySelector('[data-value="secs"]');
    
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minsRef.textContent = `${mins}`;
    secsRef.textContent = `${secs}`;
  }

  padSet(value) {
    return String(value).padStart(2, '0');
  };

  stop(time) {
    if (time < 0) {
      clearInterval(this.setInt);
      this.refreshTimer(0);
    }
  }
};

const setTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Mar 25, 2021'),
});
