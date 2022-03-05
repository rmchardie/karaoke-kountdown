let words = ["sound", "rose", "kick", "kiss", "little", "cool", "chance", "trousers", "cheer", "machine", "music", "mine" , "hanging", "larger", "blind", "discover", "throw", "laugh", "big", "chase", "sleep", "trouble", "myself", "faster", "slow", "request", "sender", "fire", "life", "world", "summer", "love", "home", "today", "don\'t", "rain", "heart", "under", "all", "good", "fun", "end", "bold", "somebody", "over", "one", "cry", "secret", "save", "yourself", "bye", "run", "brick", "eye", "day", "tonight", "tear", "thing", "begin", "lucky", "party", "march", "heal", "royal", "cross", "silence", "changes", "attention", "marry", "reason", "even", "from", "moment", "I", "want", "it", "that", "way", "tale", "time", "strong", "low", "beauty", "bird", "brown", "let", "sun", "hero", "holding", "out", "wonderful", "take", "memory", "queen", "my", "your", "song", "always", "careless", "living", "prayer", "wild", "one", "night", "coming", "back", "me", "pocket", "sunshine", "sorry"];
let wordsArr = [];
let playerTimer= 10;
let timerLabel = document.querySelector(".timerLabel");
let gameTimer = document.querySelector(".gameTimer");
let difficultyLabel = document.querySelector(".difficultyLabel");
let wordContainer = document.querySelector(".wordContainer");

const timerMenu = document.querySelector(".timerMenu");
const gamePanel = document.querySelector(".gamePanel");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const decreaseTimer = document.querySelector(".decreaseBtn");
const increaseTimer = document.querySelector(".increaseBtn");
const setTimerBtn = document.querySelector(".setTimerBtn");

function generateWordList() {
    for (let i=0; i < 10; i++) {
        let rand = words[Math.floor(Math.random() * words.length)];
        wordsArr.push(rand);
        songSelect = words.indexOf(rand);
        words.splice(songSelect, 1);
    }
}

function selectWord() {
    if (wordsArr.length != 0) {
        let selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
        wordContainer.textContent = selectedWord;
        wordIndex = wordsArr.indexOf(selectedWord);
        wordsArr.splice(wordIndex, 1);
    } else {
        wordContainer.textContent = "<List empty>";
    }
}

const showTimers = () => {
    timerMenu.style.transform = "translateX(0)";
    timerMenu.style.transition = "500ms";
    timerMenu.style.zIndex = 2;
    settingsPanel.style.transform = "translateY(100vh)";
    settingsPanel.style.transition = "500ms";
    settingsPanel.style.zIndex = "-1";
}

const resetTimers = () => {
    playerTimer = 10;
    timerLabel.textContent = playerTimer + "s";
    difficultyLabel.textContent = "Master";
    increaseTimer.classList.remove("disabled");
    increaseTimer.style.color = "#0077ff";
    decreaseTimer.classList.add("disabled");
    decreaseTimer.style.color = "#818181";
}


option1.addEventListener("click", function() {
    generateWordList();
    showTimers();
});

option2.addEventListener("click", function() {
    generateWordList();
    showTimers();
});

option3.addEventListener("click", function() {
    generateWordList();
    showTimers();
});

option4.addEventListener("click", function() {
    generateWordList();
    showTimers();
});

decreaseTimer.addEventListener("click", function() {
    if (playerTimer != 10) {
        playerTimer = playerTimer - 10;
        increaseTimer.classList.remove("disabled");
        timerLabel.textContent = `${playerTimer}s`;
        difficultyLabel.textContent = "Novice";
        increaseTimer.style.color = "#0077ff";
        if (playerTimer === 10) {
            decreaseTimer.style.color = "#818181";
            decreaseTimer.classList.add("disabled");
            difficultyLabel.textContent = "Master";
        }
    }
})

increaseTimer.addEventListener("click", function() {
    playerTimer = playerTimer + 10;
    decreaseTimer.classList.remove("disabled");
    timerLabel.textContent = `${playerTimer}s`;
    difficultyLabel.textContent = "Novice";
    decreaseTimer.style.color = "#0077ff";
    if (playerTimer === 30) {
        increaseTimer.style.color = "#818181";
        increaseTimer.classList.add("disabled");
        difficultyLabel.textContent = "Beginner";
    } else {
        increaseTimer.classList.remove("disabled");
    }
})

setTimerBtn.addEventListener("click", function() {
    timerMenu.style.transform = "translateX(-100%)";
    timerMenu.style.transition = "500ms";
    setTimeout(function() {
        gamePanel.style.zIndex = "1";
    }, 500);
    gameTimer.textContent = "0:" + playerTimer;
    timeLimit = playerTimer;
    mainMenu.style.zIndex = "-1";
    selectWord();
    playPauseBtn.classList.remove("disabled");
    startTimer();
})