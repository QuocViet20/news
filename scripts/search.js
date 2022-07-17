"use strict";

const currentUser = JSON.parse(getFromStorage("currentUser")) || [];
const inputSearch = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const newList = document.getElementById("news-container");
const hiddenLink = document.getElementById("nav-page-num");
const btnNext = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");
const btnPrev = document.getElementById("btn-prev");
let totalPage;
let page = 1;
let pageSize = currentUser[0].pageSize;

hiddenLink.style.display = "none";
const getNews = async function (page) {
  hiddenLink.style.display = "none";
  newList.innerHTML = "loading";
  await fetch(
    `https://newsapi.org/v2/everything?q=${
      inputSearch.value
    }&apiKey=fb98c34b2a454a4490b4eba882b85ac8&page=${page}&pageSize=${
      pageSize || 5
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`country not found ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      totalPage = data.totalResults;
      hiddenLink.style.display = "block";
      render(data.articles);
    })
    .catch((err) => console.log(`${err}`));
};

btnSearch.addEventListener("click", async function () {
  if (currentUser.length === 0) {
    alert("Please log in to your account");
  } else {
    if (!inputSearch.value) {
      alert("please input for Search");
    }
    await getNews(page);
  }
});

btnNext.addEventListener("click", async function () {
  page++;
  await getNews(page);
  if (page > 1) {
    btnPrev.style.display = "block";
  }
  pageNumber.textContent = page;
  if (page === Math.floor(totalPage / pageSize) + 1) {
    btnNext.style.display = "none";
  }
});
btnPrev.addEventListener("click", async function () {
  page--;
  await getNews(page);
  if (page > 1) {
    btnPrev.style.display = "block";
  }
  if (page * pageSize < totalPage) {
    btnNext.style.display = "block";
  }
  pageNumber.textContent = page;
  if (page === 1) {
    btnPrev.style.display = "none";
  }
});
if (page === 1) {
  btnPrev.style.display = "none";
}

const render = function (data) {
  newList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="card flex-row flex-wrap">
      <div class="card mb-3" >
          <div class="row no-gutters">
              <div class="col-md-4">
                  <img src=${data[i].urlToImage || ""}
                      class="card-img"
                      alt=${data[i].description || data[i].content}>
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">${data[i].title}</h5>
                      <p class="card-text">"${
                        data[i].description || data[i].content
                      }"</p>
                      <a href=${data[i].url}
                          class="btn btn-primary">View</a>
                  </div>
              </div>
          </div>
      </div>`;
    newList.appendChild(div);
  }
};
