const rockImage = document.querySelector(".rock-image");
const rockAgeDisplay = document.querySelector(".rock-age");
const timerDisplay = document.querySelector(".timer");
const endScreen = document.querySelector(".end-screen");
const restartBtn = document.querySelector(".restart-btn");
const leaderboardList = document.querySelector(".leaderboard-list");
const rockNameDisplay = document.querySelector(".rock-name-display");

let age = 0;
let rockName = "";
let resetTimeout;
let countdownInterval;
let secondsLeft = 10;

function promptRockName() {
  rockName = prompt("Name your rock:")?.trim() || "Lil Rock";
  rockNameDisplay.textContent = rockName;
}

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
  saveScoreLocally(rockName, age);
  updateLeaderboard();
}

function restartGame() {
  age = 0;
  rockAgeDisplay.textContent = age;
  timerDisplay.textContent = `(reset in 10s)`;
  endScreen.classList.add("hidden");
  promptRockName();
}

function saveScoreLocally(name, score) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  if (score > 0) {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // keep top 10
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
}

function updateLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  if (leaderboard.length === 0) {
    leaderboardList.innerHTML = "<li>No scores yet. Click the rock!</li>";
    return;
  }

  leaderboardList.innerHTML = leaderboard
    .map((entry, index) => `<li>${index + 1}. ${entry.name} — ${entry.score}</li>`)
    .join("");
}

restartBtn.addEventListener("click", restartGame);
rockImage.addEventListener("click", handleClick);
window.addEventListener("load", () => {
  promptRockName();
  updateLeaderboard();
});
