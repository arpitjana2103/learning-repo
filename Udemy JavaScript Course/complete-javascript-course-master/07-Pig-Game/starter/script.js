"use strict";

// Roll The Dice
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const imgDice = document.querySelector(".dice");

const txtCurrScore = {
    player1: document.querySelector("#current--0"),
    player2: document.querySelector("#current--1"),
};

const mainScore = {
    player1: 0,
    player2: 0,
};

const currScore = {
    player1: 0,
    player2: 0,
};

let currPlayer = 1;

const resetPlayer = function (currPlayer) {
    const playerName = `player${currPlayer}`;
    currScore[playerName] = 0;
    txtCurrScore[playerName].textContent = currScore[playerName];
};

const chageCurrScore = function (score) {
    const playerName = `player${currPlayer}`;
    currScore[playerName] += score;
    txtCurrScore[playerName].textContent = currScore[playerName];
};

const changeCurrPlayer = function () {
    resetPlayer(currPlayer);
    currPlayer = currPlayer === 1 ? 2 : 1;
    document
        .querySelector(".player--active")
        .classList.remove("player--active");
    document
        .querySelector(`.player--${currPlayer - 1}`)
        .classList.add("player--active");
};

const manageCurrScore = function (score) {
    if (score == 1) changeCurrPlayer();
    else chageCurrScore(score);
};

btnRoll.addEventListener("click", function () {
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    imgDice.setAttribute("src", `dice-${randomNum}.png`);
    manageCurrScore(randomNum);
});

btnHold.addEventListener("click", function () {
    const playerName = `player${currPlayer}`;
    mainScore[playerName] += currScore[playerName];
    document.querySelector(`#score--${currPlayer - 1}`).textContent =
        mainScore[playerName];
    changeCurrPlayer();
});
