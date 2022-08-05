// Constants to store the different screens in the game
const root = document.documentElement;
const introContainer = document.querySelector(".intro-container");
const playerContainer = document.querySelector(".player-container");
const instructionsContainer = document.querySelector(".instructions-container");
const playerNameContainer = document.getElementById("header");
const wordListContainer = document.querySelector(".word-list-container");
const timerContainer = document.querySelector(".timer-container");
const countdownContainer = document.querySelector(".countdown-container");
const gameContainer = document.querySelector(".game-container");
const timesUpContainer = document.querySelector(".times-up-container");
const resetGameContainer = document.querySelector(".reset-game-container");
const settingsContainer = document.querySelector(".game-settings-container");
const levelCompleteContainer = document.querySelector(
  ".level-complete-container"
);

// Constants to store the different buttons in the game
const showInstructionsBtn = document.querySelector(".instructions-btn");
const setPlayerNameBtn = document.getElementById("setPlayerNameBtn");
const closeInstructionsBtn = document.getElementById("closeInstructionsBtn");
const changePlayerBtn = document.querySelector(".change-player-btn");
const wordListBtns = document.querySelectorAll(".wordListBtn");
const timerBtns = document.querySelectorAll(".timerBtn");
const timer1 = document.getElementById("timer1");
const timer2 = document.getElementById("timer2");
const timer3 = document.getElementById("timer3");
const buzzerBtn = document.querySelector(".game-container__buzzer");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const gameBtns = document.querySelector(".game-btns");
const restartBtn = document.querySelector(".game-btns__restart-btn");
const confirmRestartBtn = document.querySelector("#confirmResetBtn");
const cancelRestartBtn = document.querySelector("#cancelResetBtn");
const settingsBtn = document.querySelector(".game-btns__settings-btn");
const settingsRestartBtn = document.getElementById("settingsResetBtn");
const settingsWordListBtn = document.getElementById("settingsWordListBtn");
const settingsTimerBtn = document.getElementById("settingsTimerBtn");
const cancelSettingsBtn = document.getElementById("settingsCancelBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");

// Constant to store the intro image element
const introImage = document.querySelector(".intro-image");

// Constants to store the different titles in the game
const playerNameTextbox = document.getElementById("username");
const playerName = document.getElementById("playerName");
const countdownText = document.querySelector(".countdown-container__text");
const trophyText = document.getElementById("trophiesWon");
const gameWord = document.querySelector(".game-container__word-box");
const timerText = document.querySelector(".game-container__timer-label");
const levelCompletedTrophyText = document.getElementById(
  "levelCompletedTrophieText"
);

// Game Logo
const gameLogo = document.querySelector(".header-container__logo");

// Timer elements
const timer = document.querySelector(".countdown");
const timerAnimation = document.querySelector(".timerAnimation");

// Trophy Icon
const trophyIcon = document.getElementById("trophyIcon");

// Variable to store timer value and selected word list
let storedDuration;
let countdown = 3;
let duration;
let wordList;
let interval = null;
let timePassed = null;
let trophies = 0;
let totalTrophies = 0;

// Variables to store game words
let words = [];

let wordsArr = [];

function getWordList() {
  for (let i = 0; i < 11; i++) {
    let wordList = words[Math.floor(Math.random() * words.length)];
    wordsArr.push(wordList);
    let songSelect = words.indexOf(wordList);
    words.splice(songSelect, 1);
  }
}

function loadWordList() {
  // Display contents of JSON file
  fetch("./words.json")
    .then((response) => response.json())
    // parsed contains the parsed JSON file
    .then((parsed) => {
      if (parsed.length != 0) {
        parsed.forEach((word) => {
          words.push(word);
        });
      }
    });
}

const getSelectedWord = () => {
  selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  gameWord.textContent = selectedWord;
  let songSelect = wordsArr.indexOf(selectedWord);
  wordsArr.splice(songSelect, 1);
};

// Function to show/hide different screens in the game
function toggle(screen) {
  screen.classList.toggle("hidden");
}

// Check to see if name exists in local storage, if it does, don't show enter player name screen
function checkLocalStorage() {
  // Get player name and amount of trophies won from local storage
  const savedName = localStorage.getItem("username");
  const savedTrophies = localStorage.getItem("trophies");

  // If they exist in local storage, show the word list screen, if not, show the enter name screen
  if (savedName && savedTrophies) {
    toggle(playerContainer);
    toggle(wordListContainer);
    toggle(playerNameContainer);
    toggle(changePlayerBtn);
    showInstructionsBtn.classList.add("hidden");
    playerName.textContent = savedName;
    trophyText.textContent = savedTrophies;
    totalTrophies = savedTrophies;
  } else {
    trophyText.textContent = 0;
  }
}

// show loading animation when the app is opened
function loadingAnimation() {
  introImage.style.transition = "1s";
  introImage.style.transform = "scale(1)";
  introImage.style.opacity = "1";
  introContainer.style.transition = "1s";
  setTimeout(() => {
    introContainer.style.opacity = "0";
  }, 3000);
  setTimeout(() => {
    toggle(introContainer);
  }, 4000);
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
  timer.style.backgroundColor = "var(--focus-color)";
}

// Update timer label every second until it reaches zero
function countdownTimer() {
  if (duration < 10) {
    timerText.textContent = "0:0" + duration;
  } else {
    timerText.textContent = "0:" + duration;
  }

  duration--;

  // If the timer is 5s or less, turn the timer bar red
  if (duration <= 5) {
    timer.style.backgroundColor = "#FF0000";
  }

  // If time has ran out, show the times up screen
  if (duration < 0) {
    navigator.vibrate(200);
    clearInterval(timePassed);
    toggle(timesUpContainer);
    toggle(gameBtns);
  }
}

// call countdown function and start timer
function startTimer() {
  timePassed = setInterval(countdownTimer, 1000);
  timer.classList.add("timerAnimation");
  timer.style.animationPlayState = "running";
}

// Show the game screen and start the timer
function startGame() {
  trophyText.textContent = 0;
  toggle(countdownContainer);
  toggle(gameLogo);
  toggle(gameContainer);
  toggle(gameBtns);
  getSelectedWord();
  startTimer();
}

// when user selects timer difficulty show countdown screen: 3, 2, 1, GO!
function startCountdown(selectedTimer) {
  countdown = 3;
  countdownText.textContent = countdown;
  toggle(changePlayerBtn);
  duration = selectedTimer;
  root.style.setProperty("--timer-duration", `${parseInt(selectedTimer) + 1}s`);
  if (duration < 10) {
    timerText.textContent = "0:0" + selectedTimer;
  } else {
    timerText.textContent = "0:" + selectedTimer;
  }
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
// When you click on the name field, clear any text that's in it
playerNameTextbox.addEventListener("focus", () => {
  playerNameTextbox.value = "";
});

// When the player clicks continue, save their name to local storage and show the word list screen
setPlayerNameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggle(changePlayerBtn);
  toggle(showInstructionsBtn);
  toggle(playerContainer);
  playerName.textContent = playerNameTextbox.value;
  trophyText.textContent = 0;
  localStorage.setItem("username", playerNameTextbox.value);
  toggle(playerNameContainer);
  toggle(wordListContainer);
});

// Word list screen
// Loop through all the wordList buttons and attach click events to them
wordListBtns.forEach((wordListBtn) => {
  wordListBtn.addEventListener("click", () => {
    toggle(wordListContainer);
    toggle(timerContainer);
    getWordList();
  });
});

// Set timer screen
// Loop through all the timer buttons and attach click events to them
timerBtns.forEach((timerBtn) => {
  timerBtn.addEventListener("click", () => {
    toggle(timerContainer);
    toggle(countdownContainer);
    storedDuration = timerBtn.dataset.duration;
    startCountdown(timerBtn.dataset.duration);
  });
});

// Game Screen
// When the player clicks the buzzer, update the trophy count in local storage, load a new word and reset the timers
buzzerBtn.addEventListener("click", () => {
  if (trophies < 9) {
    navigator.vibrate(200);
    gameWord.classList.add("flip");
    timer.style.animationPlayState = "paused";
    clearInterval(timePassed);
    trophyIcon.classList.add("trophyAnimation");
    totalTrophies++;
    trophies++;
    trophyText.textContent = trophies;
    localStorage.setItem("trophies", totalTrophies);
    duration = storedDuration;
    timerText.textContent = `0:${duration}`;
    startTimer();
    restartAnimation();
    timer.style.animationPlayState = "running";
    // When the transition has finished, remove it from the app
    gameWord.addEventListener("transitionend", () => {
      gameWord.classList.remove("flip");
    });
    setTimeout(getSelectedWord, 500);
  } else {
    timer.style.animationPlayState = "paused";
    clearInterval(timePassed);
    levelCompletedTrophyText.textContent = `You achieved ${
      trophies + 1
    } trophies!`;
    levelCompleteContainer.classList.remove("hidden");
    startConfetti();
  }
});

// When the animation has finished, remove it from the app
trophyIcon.addEventListener("animationend", () => {
  trophyIcon.classList.remove("trophyAnimation");
});

// When the player clicks try again, reset everything and load a new word.
tryAgainBtn.addEventListener("click", () => {
  toggle(gameBtns);
  toggle(timesUpContainer);
  duration = storedDuration;
  startTimer();
  restartAnimation();
  timer.style.animationPlayState = "running";
  getSelectedWord();
});

// App footer
// Open the instructions screen
showInstructionsBtn.addEventListener("click", () => {
  toggle(instructionsContainer);
});

// Close the instructions screen
closeInstructionsBtn.addEventListener("click", () => {
  toggle(instructionsContainer);
});

// Clear local storage and display the enter player name screen
changePlayerBtn.addEventListener("click", () => {
  toggle(wordListContainer);
  gameLogo.classList.remove("hidden");
  toggle(playerNameContainer);
  toggle(changePlayerBtn);
  toggle(showInstructionsBtn);
  toggle(playerContainer);
  localStorage.clear();
});

// Pause the game and show confirm restart screen
restartBtn.addEventListener("click", () => {
  clearInterval(timePassed);
  timer.style.animationPlayState = "paused";
  toggle(resetGameContainer);
});

// When player confirms, restart the game
confirmRestartBtn.addEventListener("click", () => {
  toggle(resetGameContainer);
  toggle(gameContainer);
  toggle(gameBtns);
  toggle(gameLogo);
  toggle(changePlayerBtn);
  toggle(wordListContainer);
  countdown = 3;
});

// If player changes their mind, hide the confirm screen and restart the timers
cancelRestartBtn.addEventListener("click", () => {
  timePassed = setInterval(countdownTimer, 1000);
  timer.style.animationPlayState = "running";
  toggle(resetGameContainer);
});

// Pause the game and show settings screen
settingsBtn.addEventListener("click", () => {
  clearInterval(timePassed);
  timer.style.animationPlayState = "paused";
  toggle(settingsContainer);
});

// Show the confirm restart screen from the settings screen
settingsRestartBtn.addEventListener("click", () => {
  toggle(settingsContainer);
  toggle(resetGameContainer);
});

// Show the word list screen from the settings screen
settingsWordListBtn.addEventListener("click", () => {
  toggle(settingsContainer);
  toggle(gameContainer);
  toggle(gameBtns);
  toggle(gameLogo);
  toggle(wordListContainer);
  toggle(changePlayerBtn);
});

// Show the timer screen from the settings screen
settingsTimerBtn.addEventListener("click", () => {
  toggle(settingsContainer);
  toggle(gameContainer);
  toggle(gameBtns);
  toggle(gameLogo);
  toggle(timerContainer);
  toggle(changePlayerBtn);
});

// Hide the settings screen and restart the timers
cancelSettingsBtn.addEventListener("click", () => {
  timePassed = setInterval(countdownTimer, 1000);
  timer.style.animationPlayState = "running";
  toggle(settingsContainer);
});

// Load next word list and start new timer
nextLevelBtn.addEventListener("click", () => {
  stopConfetti();
  setTimeout(() => {
    duration = storedDuration;
    trophies = 0;
    trophyText.textContent = 0;
    getWordList();
    getSelectedWord();
    toggle(levelCompleteContainer);
    startTimer();
    restartAnimation();
    timer.style.animationPlayState = "running";
  }, 2500);
});

// On load, play animation then check local storage for previous gameplay
loadingAnimation();
loadWordList();
