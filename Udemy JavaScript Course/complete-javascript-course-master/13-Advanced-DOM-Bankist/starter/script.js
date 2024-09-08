"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Show Hide Modal

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (e) {
    e.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Smooth Scroll Animation [ Button Scroll ]

const buttonScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

buttonScrollTo.addEventListener("click", function () {
    // Old School Way

    /*
    const s1Coords = section1.getBoundingClientRect();
    window.scrollTo({
      left: s1Coords.left + window.scrollX,
      top: s1Coords.top + window.scrollY,
      behavior: 'smooth',
    });
    */

    // Modern Way
    section1.scrollIntoView({ behavior: "smooth" });
});

// Event Delegation in Practice [ Link Scroll ]
// 1. Add event listener to common parent element
// 2. Determine what element originated to event

/*
document.querySelectorAll(".nav__link").forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    });
});
*/

document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});
