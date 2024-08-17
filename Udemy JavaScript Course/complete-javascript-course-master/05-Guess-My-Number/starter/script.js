"use strict";

const scoreObj = {
    score: 20,
    heighestScore: Number.MIN_VALUE,
};
let secretNumber = Math.trunc(Math.random() * 20) + 1;
const numberTxt = document.querySelector(".number");
const messageTxt = document.querySelector(".message");
const scoreTxt = document.querySelector(".score");
const checkBtn = document.querySelector(".check");
const playAgainBtn = document.querySelector(".again");
const guessInput = document.querySelector(".guess");
const heighestScoreTxt = document.querySelector(".highscore");
const bodyEle = document.querySelector("body");

numberTxt.textContent = secretNumber;

const manageScoreAndMessage = function (message) {
    if (scoreObj.score > 1) {
        scoreObj.score--;
        messageTxt.textContent = message;
        scoreTxt.textContent = scoreObj.score;
    } else {
        messageTxt.textContent = "💥 Your Lost the Game !";
        scoreTxt.textContent = 0;
    }
};

checkBtn.addEventListener("click", function () {
    const guess = Number(guessInput.value);
    if (!guess) {
        messageTxt.textContent = "⛔ No number";
    } else if (guess === secretNumber) {
        scoreObj.heighestScore = Math.max(
            scoreObj.heighestScore,
            scoreObj.score
        );
        messageTxt.textContent = "🎉 Correct Number";
        numberTxt.textContent = secretNumber;
        heighestScoreTxt.textContent = scoreObj.heighestScore;
        bodyEle.style.backgroundColor = "#2f9e44";
    } else if (guess > secretNumber) {
        manageScoreAndMessage("📈 Too High");
    } else if (guess < secretNumber) {
        manageScoreAndMessage("📉 Too Low");
    }
});

playAgainBtn.addEventListener("click", function () {
    scoreObj.score = 20;
    guessInput.value = "";
    messageTxt.textContent = "Start guessing...";
    scoreTxt.textContent = 20;
    bodyEle.style.backgroundColor = "#222";
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    numberTxt.textContent = secretNumber;
});
