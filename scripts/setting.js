"use strict";

const currentUser = JSON.parse(getFromStorage("currentUser")) || [];
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  if (currentUser.length === 0) {
    alert("Please log in to your account");
  } else {
    if (inputPageSize === "" || inputPageSize.value < 1) {
      alert("please input for page-Size");
    } else if (inputPageSize > 10) {
      alert("the maximum number of pages is 10");
    } else {
      currentUser[0].pageSize = inputPageSize.value;
      currentUser[0].category = inputCategory.value;
      saveToStorage("currentUser", JSON.stringify(currentUser));
    }
    window.location.href = "../pages/news.html";
  }
});
