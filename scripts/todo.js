"use strict";

const currentUser = JSON.parse(getFromStorage("currentUser")) || [];
const todoList = JSON.parse(getFromStorage("todoList")) || [];
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const renderList = document.getElementById("todo-list");

renderTodoList(todoList);
if (currentUser.length === 0) {
  renderList.innerHTML = "";
}
btnAdd.addEventListener("click", function () {
  if (currentUser.length === 0) {
    alert("Please log in to your account");
  } else {
    if (inputTask.value === "") {
      alert("please input for Task");
    } else {
      const data = {
        task: inputTask.value,
        owner: currentUser[0].username,
        isDone: false,
      };
      todoList.push(data);
      saveToStorage("todoList", JSON.stringify(todoList));
      renderTodoList(todoList);
    }
    inputTask.value = "";
  }
});

function deleteTodo(id) {
  if (confirm("Are you sure?") === true) {
    for (let i = 0; i < todoList.length; i++) {
      if (i == id) {
        todoList.splice(i, 1);
        saveToStorage("todoList", JSON.stringify(todoList));
        renderTodoList(todoList);
      }
    }
  }
}
function togleTask(id) {
  console.log(todoList);
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].task == id) {
      if (!todoList[i].isDone) {
        todoList[i].isDone = true;
        saveToStorage("todoList", JSON.stringify(todoList));
        renderTodoList(todoList);
      } else {
        todoList[i].isDone = false;
        saveToStorage("todoList", JSON.stringify(todoList));
        renderTodoList(todoList);
      }
    }
  }
}
console.log(todoList);

function renderTodoList(todo) {
  renderList.innerHTML = "";
  for (let i = 0; i < todo.length; i++) {
    const row = document.createElement("ul");
    if (todo[i].isDone) {
      row.innerHTML = `<li class="checked"  onclick="togleTask('${todo[i].task}')">
        ${todo[i].task}
        <span class="close" onclick="deleteTodo('${i}')">×</span>
    </li>`;
    } else {
      row.innerHTML = `<li onclick="togleTask('${todo[i].task}')">
        ${todo[i].task}
        <span class="close" onclick="deleteTodo('${i}')">×</span>
    </li>`;
    }

    renderList.appendChild(row);
  }
}
