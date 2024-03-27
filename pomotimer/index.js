const notifier = require('node-notifier');
const moment = require('moment');
const argTime = process.argv.slice(2);

const POMODORO_DURATION = argTime[0];
const BREAK_DURATION = argTime[1];

let isWorking = false;
let remainingTime = 0;

const timerFormat = (totalSecond) => {
    const duration = moment.duration(totalSecond, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

const timerStart = (duration) => {
    isWorking = !isWorking;
    remainingTime = duration * 60;

    const timer = setInterval(() => {
        remainingTime--;
        const resultFormat = timerFormat(remainingTime);
        console.log(`${isWorking ? 'Work' : 'Break'}: ${resultFormat}`);
        
        if (remainingTime === 0) {
            clearInterval(timer);
            notifier.notify({
                title: isWorking ? '- Working Time -' : '- Break Time -',
                message: isWorking ? 'Happy Work!' : 'Happy Break',
                sound: true,
                wait: true
            });
            timerStart(isWorking ? BREAK_DURATION : POMODORO_DURATION);
        }
    }, 1000);
}

timerStart(POMODORO_DURATION);