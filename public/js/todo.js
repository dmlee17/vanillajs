import {
  TODOFORM,
  TODOINPUT,
  TODOLIST,
  LOGINUSER,
  USER_KEY,
} from "./common.js";

export const getUserInfo = () => {
  const user = localStorage.getItem(USER_KEY);
  LOGINUSER.innerHTML = `${user}'s To-Do List`;

  const todoList = JSON.parse(localStorage.getItem(user));

  if (todoList !== null) {
    for (const todo of todoList) {
      onCreateToDoDiv(todo.id, todo.text, todo.done);
    }
  }
};

const onAddToDoHandler = (e) => {
  e.preventDefault();
  const lastId = onSetToDoInLS(TODOINPUT.value);
  onCreateToDoDiv(lastId, TODOINPUT.value, false);

  TODOINPUT.value = "";
  TODOINPUT.focus();
};

const onSetToDoInLS = (value) => {
  const user = localStorage.getItem(USER_KEY);
  const todoList = JSON.parse(localStorage.getItem(user));

  if (todoList !== null) {
    const lastId = todoList[todoList.length - 1].id;

    const newTodo = {
      id: lastId + 1,
      text: value,
      done: false,
    };

    todoList.push(newTodo);
    localStorage.setItem(user, JSON.stringify(todoList));

    return newTodo.id;

  } else {
    const list = [
      {
        id: 1,
        text: value,
        done: false,
      }
    ]
    localStorage.setItem(user, JSON.stringify(list));

    return 1;
  }
};

const onChangeToDoDoneHandler = (e) => {
  if (e.target.checked) {
    e.target.nextElementSibling.classList.add("done");
  } else {
    e.target.nextElementSibling.classList.remove("done");
  }

  const user = localStorage.getItem(USER_KEY);
  const todoList = JSON.parse(localStorage.getItem(user));

  const editedList = todoList.map((todo) => {
    if (todo.id === parseInt(e.target.parentElement.dataset.idx)) {
      todo.done = e.target.checked;
    }
    return todo;
  });

  localStorage.setItem(user, JSON.stringify(editedList));
};

const onDeleteToDoDoneHandler = (e) => {

  const user = localStorage.getItem(USER_KEY);
  const todoList = JSON.parse(localStorage.getItem(user));

  const editedList = todoList.filter((todo) => todo.id !== parseInt(e.target.parentElement.dataset.idx));

  localStorage.setItem(user, JSON.stringify(editedList));

  e.target.parentElement.remove();
};

const onCreateToDoDiv = (id, value, bool) => {
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("data-idx", id);

  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  if (bool) {
    check.setAttribute("checked", "checked");
  }
  check.classList.add("todoCheck");
  check.addEventListener("change", onChangeToDoDoneHandler);

  const text = document.createElement("span");
  text.classList.add("content");
  if (bool) {
    text.classList.add("done");
  }
  text.innerHTML = value;

  const delTodoBtn = document.createElement("div");
  delTodoBtn.classList.add("delTodo");
  delTodoBtn.innerHTML = "❌";
  delTodoBtn.addEventListener("click", onDeleteToDoDoneHandler);

  todoDiv.appendChild(check);
  todoDiv.appendChild(text);
  todoDiv.appendChild(delTodoBtn);

  TODOLIST.appendChild(todoDiv);
};

TODOFORM.addEventListener("submit", onAddToDoHandler);
