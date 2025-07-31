const rockImage = document.querySelector(".rock-image");
const rockAgeDisplay = document.querySelector(".rock-age");
const timerDisplay = document.querySelector(".timer");
const endScreen = document.querySelector(".end-screen");
const restartBtn = document.querySelector(".restart-btn");

let age = 0;
let resetTimeout;
let countdownInterval;
let secondsLeft = 10;

function handleClick() {
  age += 1;
  rockAgeDisplay.textContent = age;

  clearTimeout(resetTimeout);
  clearInterval(countdownInterval);

  secondsLeft = 10;
  timerDisplay.textContent = `(reset in ${secondsLeft}s)`;

  countdownInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft > 0) {
      timerDisplay.textContent = `(reset in ${secondsLeft}s)`;
    }
  }, 1000);

  resetTimeout = setTimeout(endGame, 10000);
}

function endGame() {
  clearInterval(countdownInterval);
  timerDisplay.textContent = `(reset in 10s)`;
  endScreen.classList.remove("hidden");
}

function restartGame() {
  age = 0;
  rockAgeDisplay.textContent = age;
  timerDisplay.textContent = `(reset in 10s)`;
  endScreen.classList.add("hidden");
}

rockImage.addEventListener("click", handleClick);
restartBtn.addEventListener("click", restartGame);
