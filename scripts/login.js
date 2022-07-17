"use strict";

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = JSON.parse(getFromStorage("currentUser")) || [];

const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

const validate = function () {
  if (username.value === "") {
    alert("please input for username");
    return false;
  }
  if (password.value === "") {
    alert("please input for password");
    return false;
  }
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters");
    return false;
  } else {
    return true;
  }
};
// kiem tra user có tồn tại hay chưa
function checkUser() {
  for (let i = 0; i < userArr.length; i++) {
    if (
      userArr[i].username === username.value &&
      userArr[i].password === password.value
    ) {
      return true;
    } else {
      return false;
    }
  }
}

btnLogin.addEventListener("click", function () {
  if (validate() === true) {
    let filterArr = userArr.filter(
      (item) =>
        item.username === username.value && item.password === password.value
    );
    if (filterArr.length === 0) {
      alert("username and password incorrect");
    } else {
      currentUser.push(filterArr[0]);
      saveToStorage("currentUser", JSON.stringify(userArr));
      window.location.href = "../index.html";
    }
  }
});
