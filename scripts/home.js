"use strict";

const currentUser = JSON.parse(getFromStorage("currentUser")) || [];

const loginModal = document.getElementById("login-modal");
const loginSuccess = document.getElementById("main-content");
const loginFirstname = document.getElementById("welcome-message");

if (currentUser.length > 0) {
  loginModal.innerHTML = "";
  loginFirstname.textContent = `Welcome ${currentUser[0].firstname} !!!`;
} else if (!currentUser.length) {
  loginSuccess.innerHTML = "";
}
const btnLogout = document.getElementById("btn-logout");
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "pages/login.html";
});
