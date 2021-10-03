export const HIDDEN_CLASS = 'hidden';
export const USER_KEY = 'user';
export const USERLIST_KEY = 'userlist';

export const LOGIN = document.querySelector('#login');
export const CONTENT = document.querySelector('#content');
export const FORM = document.querySelector('#userform');
export const USERNAME = document.querySelector('#username');
export const USERLIST = document.querySelector('#login > div#savedUser');

export const WEATHER = document.querySelector('div#weather .weather');
export const TEMPERATURE = document.querySelector('div#weather .temp');
export const LOCATION = document.querySelector('div#weather .location');

export const DATETIMER = document.querySelector('div#timer .date');
export const TIMETIMER = document.querySelector('div#timer .time');

export const LOGINUSER = document.querySelector('div#userInfo .username');

export const TODOFORM = document.querySelector('#todoform');
export const TODOINPUT = document.querySelector('#todoInput');
export const TODOLIST = document.querySelector('#todoList');

export const LOGOUTBTN = document.querySelector('button#logout');

export const WEATHER_URL = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_APIKEY}&units=metric&lang=kr`;
}

export const WEATHER_ICON_URL = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export const PIXABAY_URL = () => {
  const page = Math.floor(Math.random() * 100) + 1;
  return `https://pixabay.com/api/?key=${PIXABAY_APIKEY}&image_type=photo&min_width=1900&min_height=900&orientation=horizontal&per_page=5&page=${page}`;
}

const OPENWEATHER_APIKEY = 'ef7dae74ed6bf09c28cf0adf0f2fc4a2';
const PIXABAY_APIKEY = '23665099-131c366824bba0fe1a4e99c4a';