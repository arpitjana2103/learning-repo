"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////////////////////////////////////////
// PART 01 -- AJAX CALL ///////////////////////////////////////////////////
/*
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        const flagPng = data.flags.png;
        const countryName = data.name.common;
        const region = data.region;
        const population = (+data.population / 1_000_000).toFixed(1);
        const languages = Object.values(data.languages).slice(0, 2).join(", ");
        const currency = Object.values(data.currencies)[0].name;

        const html = `
        <article class="country">
          <img class="country__img" src="${flagPng}" />
          <div class="country__data">
            <h3 class="country__name">${countryName}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${population} M people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currency}</p>
          </div>
        </article>`;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
};

getCountryData("india");
getCountryData("portugal");
*/

///////////////////////////////////////////////////////////////////////////
// PART 02 -- CALL BACK HELL //////////////////////////////////////////////

const baseURL = `https://restcountries.com/v3.1`;

const renderCountry = function (data) {
    const flagPng = data.flags.png;
    const countryName = data.name.common;
    const region = data.region;
    const population = (+data.population / 1_000_000).toFixed(1);
    const languages = Object.values(data.languages).slice(0, 2).join(", ");
    const currency = Object.values(data.currencies)[0].name;

    const html = `
        <article class="country">
          <img class="country__img" src="${flagPng}" />
          <div class="country__data">
            <h3 class="country__name">${countryName}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${population} M people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currency}</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const getCountryDataAndNeighbour = function (country) {
    // AJAX CALL 01
    const request = new XMLHttpRequest();
    request.open("GET", `${baseURL}/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);

        // Render Country 01
        renderCountry(data);

        const neighbour = data.borders?.[0];
        if (!neighbour) return;

        // AJAX CALL 02
        const request = new XMLHttpRequest();
        request.open("GET", `${baseURL}/alpha/${neighbour}`);
        request.send();

        request.addEventListener("load", function () {
            const [data] = JSON.parse(this.responseText);

            // Render Country 02
            renderCountry(data);
            const neighbour = data.borders?.[0];
            if (!neighbour) return;

            // AJAX CALL 03
            const request = new XMLHttpRequest();
            request.open("GET", `${baseURL}/alpha/${neighbour}`);
            request.send();

            request.addEventListener("load", function () {
                const [data] = JSON.parse(this.responseText);

                // Render Country 03
                renderCountry(data);
            });
        });
    });
};

getCountryDataAndNeighbour("india");
