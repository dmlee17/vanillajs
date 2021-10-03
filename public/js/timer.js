import { DATETIMER, TIMETIMER } from "./common.js";

const getNowTime = () => {
  const now = new Date();
  DATETIMER.innerHTML = `${now.getFullYear()}.${setNumberDigits((now.getMonth()+1), 2)}.${setNumberDigits(now.getDate(), 2)}`;
  TIMETIMER.innerHTML = `${setNumberDigits(now.getHours(), 2)}:${setNumberDigits(now.getMinutes(), 2)}:${setNumberDigits(now.getSeconds(), 2)}`;
}

const setNumberDigits = (number, digit) => {
  return number.toString().padStart(digit, 0);
}

setInterval(getNowTime, 1000);
getNowTime();