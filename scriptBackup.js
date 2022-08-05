// Constants to store the different screens in the game
const root = document.documentElement;
const playerContainer = document.querySelector(".player-container");
const instructionsContainer = document.querySelector(".instructions-container");
const playerNameContainer = document.getElementById("header");
const wordListContainer = document.querySelector(".word-list-container");
const timerContainer = document.querySelector(".timer-container");
const countdownContainer = document.querySelector(".countdown-container");
const gameContainer = document.querySelector(".game-container");
const timesUpContainer = document.querySelector(".times-up-container");
const resetGameContainer = document.querySelector(".reset-game-container");

// Constants to store the different buttons in the game
const showInstructionsBtn = document.querySelector(".instructions-btn");
const setPlayerNameBtn = document.getElementById("setPlayerNameBtn");
const closeInstructionsBtn = document.getElementById("closeInstructionsBtn");
const changePlayerBtn = document.querySelector(".change-player-btn");
const wordList1Btn = document.getElementById("list1");
const wordList2Btn = document.getElementById("list2");
const wordList3Btn = document.getElementById("list3");
const wordList4Btn = document.getElementById("list4");
const timer1 = document.getElementById("timer1");
const timer2 = document.getElementById("timer2");
const timer3 = document.getElementById("timer3");
const buzzerBtn = document.querySelector(".game-container__buzzer");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const gameBtns = document.querySelector(".game-btns");
const restartBtn = document.querySelector(".game-btns__restart-btn");
const settingsBtn = document.querySelector(".game-btns__settingsBtn");
const confirmRestartBtn = document.querySelector("#confirmResetBtn");
const cancelRestartBtn = document.querySelector("#cancelResetBtn");

// Constants to store the different titles in the game
const playerNameTextbox = document.getElementById("username");
const playerName = document.getElementById("playerName");
const countdownText = document.querySelector(".countdown-container__text");
const trophyText = document.getElementById("trophiesWon");
const gameWord = document.querySelector(".game-container__word-box");
const timerText = document.querySelector(".game-container__timer-label");

// Game Logo
const gameLogo = document.querySelector(".header-container__logo");

// Timer elements
const timer = document.querySelector(".countdown");
const timerAnimation = document.querySelector(".timerAnimation");

// Trophy Icon
const trophyIcon = document.getElementById("trophyIcon");

// Variable to store timer value and selected word list
let storedDuration;
let duration;
let wordList;
let interval = null;
let timePassed = null;
let trophies = 0;

// Function to show/hide different screens in the game
function toggle(screen) {
  screen.classList.toggle("hidden");
}

// Check to see if name exists in local storage, if it does, don't show enter player name screen
function checkLocalStorage() {
  const savedName = localStorage.getItem("username");

  if (savedName) {
    playerContainer.classList.add("hidden");
    wordListContainer.classList.remove("hidden");
    playerNameContainer.classList.remove("hidden");
    changePlayerBtn.classList.remove("hidden");
    showInstructionsBtn.classList.add("hidden");
    playerName.textContent = savedName;
  }
}

// show loading animation when the app is opened
function loadingAnimation() {
  document.querySelector(".intro-image").style.transition = "1s";
  document.querySelector(".intro-image").style.transform = "scale(1)";
  document.querySelector(".intro-image").style.opacity = "1";
  document.querySelector(".intro-container").style.transition = "1s";
  setTimeout(() => {
    document.querySelector(".intro-container").style.opacity = "0";
  }, 3000);
  setTimeout(() => {
    document.querySelector(".intro-container").style.transition = "0s";
    document.querySelector(".intro-container").style.zIndex = "-1";
  }, 5000);
  checkLocalStorage();
}

// If player guesses correctly, restart the animation
function restartAnimation() {
  timer.style.animationName = "none";
  requestAnimationFrame(() => {
    setTimeout(() => {
      timer.style.animationName = "";
    }, 0);
  });
}

// Update timer label every second until it reaches zero
function countdownTimer() {
  if (duration < 10) {
    timerText.textContent = "0:0" + duration;
  } else {
    timerText.textContent = "0:" + duration;
  }
  duration--;
  if (duration < 0) {
    clearInterval(timePassed);
    gameContainer.classList.add("hidden");
    gameBtns.classList.add("hidden");
    playerNameContainer.classList.add("hidden");
    timesUpContainer.classList.remove("hidden");
  }
}

// call countdown function and start timer
function startTimer() {
  timePassed = setInterval(countdownTimer, 1000);
  timer.classList.add("timerAnimation");
}

// Show the game screen and start the timer
function startGame() {
  countdownContainer.classList.add("hidden");
  changePlayerBtn.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  gameBtns.classList.remove("hidden");
  startTimer();
}

// when user selects timer difficulty show countdown screen: 3, 2, 1, GO!
function startCountdown(selectedTimer) {
  duration = selectedTimer;
  root.style.setProperty("--timer-duration", `${selectedTimer + 1}s`);
  if (duration < 10) {
    timerText.textContent = "0:0" + selectedTimer;
  } else {
    timerText.textContent = "0:" + selectedTimer;
  }
  let countdown = 3;
  interval = setInterval(() => {
    countdown--;
    countdownText.textContent = countdown;
    if (countdown <= 0) {
      countdownText.style.fontSize = "170px";
      countdownText.textContent = "GO!";
    }
    if (countdown < 0) {
      startGame();
      clearInterval(interval);
    }
  }, 1000);
}

// Event Listeners
// Input player name screen
playerNameTextbox.addEventListener("focus", () => {
  playerNameTextbox.value = "";
});

setPlayerNameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  changePlayerBtn.classList.remove("hidden");
  showInstructionsBtn.classList.add("hidden");
  playerContainer.classList.add("hidden");
  playerName.textContent = playerNameTextbox.value;
  localStorage.setItem("username", playerNameTextbox.value);
  playerNameContainer.classList.remove("hidden");
  wordListContainer.classList.remove("hidden");
});

// Word list screen
wordList1Btn.addEventListener("click", () => {
  wordListContainer.classList.add("hidden");
  timerContainer.classList.remove("hidden");
});

wordList2Btn.addEventListener("click", () => {
  wordListContainer.classList.add("hidden");
  timerContainer.classList.remove("hidden");
});

wordList3Btn.addEventListener("click", () => {
  wordListContainer.classList.add("hidden");
  timerContainer.classList.remove("hidden");
});

wordList4Btn.addEventListener("click", () => {
  wordListContainer.classList.add("hidden");
  timerContainer.classList.remove("hidden");
});

// Set timer screen
timer1.addEventListener("click", () => {
  gameLogo.classList.add("hidden");
  timerContainer.classList.add("hidden");
  countdownContainer.classList.remove("hidden");
  storedDuration = 10;
  startCountdown(10);
});

timer2.addEventListener("click", () => {
  gameLogo.classList.add("hidden");
  timerContainer.classList.add("hidden");
  countdownContainer.classList.remove("hidden");
  storedDuration = 20;
  startCountdown(20);
});

timer3.addEventListener("click", () => {
  gameLogo.classList.add("hidden");
  timerContainer.classList.add("hidden");
  countdownContainer.classList.remove("hidden");
  storedDuration = 30;
  startCountdown(30);
});

// Game Screen
buzzerBtn.addEventListener("click", () => {
  timer.style.animationPlayState = "paused";
  clearInterval(timePassed);
  trophyIcon.classList.add("trophyAnimation");
  setTimeout(() => {
    trophyIcon.classList.remove("trophyAnimation");
  }, 1000);
  trophies++;
  trophyText.textContent = trophies;
  duration = storedDuration;
  timerText.textContent = `0:${duration}`;
  startTimer();
  restartAnimation();
  timer.style.animationPlayState = "running";
  gameWord.textContent = "careless";
});

tryAgainBtn.addEventListener("click", () => {
  gameContainer.classList.remove("hidden");
  gameBtns.classList.remove("hidden");
  playerNameContainer.classList.remove("hidden");
  timesUpContainer.classList.add("hidden");
  duration = storedDuration;
  startTimer();
  restartAnimation();
  timer.style.animationPlayState = "running";
  gameWord.textContent = "careless";
});

restartBtn.addEventListener("click", () => {
  clearInterval(timePassed);
  timer.style.animationPlayState = "paused";
  resetGameContainer.classList.remove("hidden");
});

confirmRestartBtn.addEventListener("click", () => {
  resetGameContainer.classList.add("hidden");
  gameContainer.classList.add("hidden");
  wordListContainer.classList.remove("hidden");
});

cancelRestartBtn.addEventListener("click", () => {
  timePassed = setInterval(countdownTimer, 1000);
  timer.style.animationPlayState = "running";
  resetGameContainer.classList.add("hidden");
});

// App footer
showInstructionsBtn.addEventListener("click", () => {
  instructionsContainer.classList.remove("hidden");
});

closeInstructionsBtn.addEventListener("click", () => {
  instructionsContainer.classList.add("hidden");
});

changePlayerBtn.addEventListener("click", () => {
  wordListContainer.classList.add("hidden");
  playerNameContainer.classList.add("hidden");
  changePlayerBtn.classList.add("hidden");
  showInstructionsBtn.classList.remove("hidden");
  playerContainer.classList.remove("hidden");
});

// On load
loadingAnimation();
