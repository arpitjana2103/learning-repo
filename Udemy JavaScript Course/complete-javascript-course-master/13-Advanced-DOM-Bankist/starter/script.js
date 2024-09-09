"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////
// Modal window /////////////////////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

/////////////////////////////////////////////////////////////////////////////////////////////
// SMOOTH SCROLL ANIMATION [ BUTTON SCROLL ] ////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////
// EVENT DELEGATION IN PRACTICE [ LINK SCROLL ] /////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////
// TABBED COMPONENT /////////////////////////////////////////////////////////////////////////

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    if (clicked) {
        tabs.forEach(function (tab) {
            tab.classList.remove("operations__tab--active");
        });
        tabContents.forEach(function (content) {
            content.classList.remove("operations__content--active");
        });

        clicked.classList.add("operations__tab--active");

        document
            .querySelector(`.operations__content--${clicked.dataset.tab}`)
            .classList.add("operations__content--active");
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////
// MENU FADEOUT ANIMATION ///////////////////////////////////////////////////////////////////

const nav = document.querySelector(".nav");

const handleHover = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblingLinks = link
            .closest(".nav")
            .querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector(".nav__logo");

        siblingLinks.forEach(function (el) {
            if (el !== link) el.style.opacity = opacity;
        });
        logo.style.opacity = opacity;
    }
};

nav.addEventListener("mouseover", (e) => handleHover(e, 0.6));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));

/////////////////////////////////////////////////////////////////////////////////////////////
// STRICKY NAVIGATION ///////////////////////////////////////////////////////////////////////

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////////////////////////////////////////////////////////
// REVELING THE SECTIONS ////////////////////////////////////////////////////////////////////

const allSecitons = document.querySelectorAll(".section");
const revelSections = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};
const sectionsObserver = new IntersectionObserver(revelSections, {
    root: null,
    threshold: 0.15,
});

allSecitons.forEach(function (section) {
    sectionsObserver.observe(section);
    // section.classList.add("section--hidden");
});

/////////////////////////////////////////////////////////////////////////////////////////////
// LAZY LOADING IMAGES //////////////////////////////////////////////////////////////////////

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener("load", function () {
            entry.target.classList.remove("lazy-img");
            observer.unobserve(entry.target);
        });
    }
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
});
imgTargets.forEach(function (img) {
    imgObserver.observe(img);
});

/////////////////////////////////////////////////////////////////////////////////////////////
// SLIDER COMPONENT /////////////////////////////////////////////////////////////////////////

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
    slides.forEach(function (_, index) {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide="${index}"></button>`
        );
    });
};

createDots();

const activateDot = function (slideIndex) {
    document.querySelectorAll(".dots__dot").forEach(function (dot) {
        dot.classList.remove("dots__dot--active");
    });
    document
        .querySelector(`.dots__dot[data-slide="${slideIndex}"]`)
        .classList.add("dots__dot--active");
};

activateDot(0);

const gotToSlide = function (slideIndex) {
    slides.forEach(function (slide, index) {
        slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });
};

gotToSlide(0);

// Next Slide
btnRight.addEventListener("click", function () {
    currSlide++;
    if (currSlide === maxSlide) {
        currSlide = 0;
    }
    gotToSlide(currSlide);
    activateDot(currSlide);
});

btnLeft.addEventListener("click", function () {
    currSlide--;
    if (currSlide === -1) {
        currSlide = maxSlide - 1;
    }
    gotToSlide(currSlide);
    activateDot(currSlide);
});

document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") btnLeft.click();
    if (e.key === "ArrowRight") btnRight.click();
});

dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        gotToSlide(slide);
        activateDot(currSlide);
    }
});
