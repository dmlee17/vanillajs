import { LOGIN, CONTENT, FORM, USERNAME, USERLIST, HIDDEN_CLASS, USER_KEY, USERLIST_KEY } from './common.js';
import { refreshWeatherInfo } from './weather.js';
import { getUserInfo } from './todo.js';
import { getBackgroundImage } from './background.js';

const submitEventHandler = (e) => {
  e.preventDefault();
  if (!checkUserList()) {
    alert('Because you have a lot of ID, you can\'t creat new ID. \n Please Delete unsued IDs.');
    USERNAME.value = '';
    USERNAME.focus();
    return false;
  }

  if (USERNAME.value != '') {
    saveUserName(USERNAME.value);
    checkLocalStorage();
  }

  USERNAME.value = '';

  refreshWeatherInfo();
}

export const checkLocalStorage = () => {
  if (localStorage.getItem(USER_KEY) === null || localStorage.getItem(USER_KEY) === '') {

    LOGIN.classList.remove(HIDDEN_CLASS);
    CONTENT.classList.add(HIDDEN_CLASS);
    getBackgroundImage(false);
    loadUserList();
  }
  else {
    LOGIN.classList.add(HIDDEN_CLASS);
    CONTENT.classList.remove(HIDDEN_CLASS);
    getBackgroundImage(true);
    getUserInfo();
  }  
}

const checkUserList = () => {
  const userList = JSON.parse(localStorage.getItem(USERLIST_KEY));
  if (userList.length > 11) {
    return false;
  }
  else {
    return true;
  }
}

const loadUserList = () => {
  const userList = JSON.parse(localStorage.getItem(USERLIST_KEY));
  paintUserTags(userList);
}

const onClickUserTag = (e) => {
  console.dir(e.target.firstChild.textContent)
  localStorage.setItem(USER_KEY, e.target.firstChild.textContent);
  checkLocalStorage();
}

const onClickDeleteUser = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const userName = e.target.parentElement.childNodes[0].textContent;
  const userList = JSON.parse(localStorage.getItem(USERLIST_KEY));
  const editedList = userList.filter((user) => user !== userName);

  localStorage.setItem(USERLIST_KEY, JSON.stringify(editedList));
  localStorage.removeItem(userName);

  loadUserList();
}

const paintUserTags = (userList) => {

  USERLIST.innerHTML = '';

  if (userList !== null) {
    for (const user of userList) {
      
      const userdiv = document.createElement("div");
      userdiv.innerHTML = user;
      userdiv.style.background = `${"#" + Math.round(Math.random() * 0xffffff).toString(16) + "55"}`;
      userdiv.classList.add('userDiv');
      userdiv.addEventListener('click', onClickUserTag);
  
      const deleteIcon = document.createElement('div');
      deleteIcon.innerHTML = '❌';
      deleteIcon.classList.add('deleteIcon');
      deleteIcon.addEventListener('click', onClickDeleteUser);
  
      userdiv.appendChild(deleteIcon);
      USERLIST.appendChild(userdiv);
    }
  }
}

const saveUserName = (userName) => {
  localStorage.removeItem(USER_KEY);
  localStorage.setItem(USER_KEY, userName);
  
  if(localStorage.getItem(USERLIST_KEY) === null || localStorage.getItem(USERLIST_KEY) === '') {
    const userList = [userName];
    localStorage.setItem(USERLIST_KEY, JSON.stringify(userList));
  }
  else {
    let userList = JSON.parse(localStorage.getItem(USERLIST_KEY));

    if (!userList.includes(userName)) {
      userList.push(userName);
      localStorage.setItem(USERLIST_KEY, JSON.stringify(userList));
    }
  }
}

FORM.addEventListener('submit', submitEventHandler)

checkLocalStorage();