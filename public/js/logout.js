import { LOGOUTBTN, TODOINPUT, TODOLIST, USER_KEY } from './common.js';
import { checkLocalStorage } from './index.js';

const onLogoutHandler = () => {
  localStorage.removeItem(USER_KEY);
  checkLocalStorage();

  TODOLIST.innerHTML = '';
  TODOINPUT.value = '';
  TODOINPUT.focus();
}

LOGOUTBTN.addEventListener('click', onLogoutHandler);