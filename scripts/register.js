"use strict";

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

const validate = function () {
  if (firstName.value === "") {
    alert("please input for firstName");
    return false;
  }
  if (lastName.value === "") {
    alert("please input for lastName");
    return false;
  }
  if (username.value === "") {
    alert("please input for username");
    return false;
  }
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === username.value) {
      alert("Username already exists");
      return false;
    }
  }
  if (password.value === "") {
    alert(
      "please input for password and Password must be at least 8 characters"
    );
    return false;
  }
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters");
    return false;
  }
  if (confirmPassword.value !== password.value) {
    alert("Confirm Password is incorrect");
    return false;
  } else {
    return true;
  }
};

btnSubmit.addEventListener("click", function () {
  const userData = {
    firstname: firstName.value,
    lastname: lastName.value,
    username: username.value,
    password: password.value,
  };
  if (validate() === true) {
    userArr.push(userData);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
});
