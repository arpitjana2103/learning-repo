"use strict";

const modalBtns = document.querySelectorAll(".show-modal");
const closeBtn = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const hideModel = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const showModel = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

modalBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    showModel();
  });
});

overlay.addEventListener("click", function () {
  hideModel();
});

closeBtn.addEventListener("click", function () {
  hideModel();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideModel();
  }
});
