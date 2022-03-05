let timeLimit = playerTimer;
let timePassed = 0;
let timeLeft = timeLimit;
let timerInterval = null;

const playIcon = document.getElementById("playIcon");

function timesUp() {
  navigator.vibrate(500);
  clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = timeLimit - timePassed;
      gameTimer.textContent = formatTime(timeLeft);
  
      if (timeLeft === 0) {
        timesUp();
        playPauseBtn.classList.add("disabled");
        playPauseBtn.style.backgroundColor = "#FF0000";
        playPauseBtn.style.color = "#FFF";
        playIcon.classList.remove("fa-forward");
        playIcon.classList.add("fa-stop");
        timesUpPanel.style.zIndex = "1";
        timesUpPanel.style.transform = "translateY(0vh)";
        timesUpPanel.style.transition = "500ms";
      }

      if (timeLeft <= 5) {
          gameTimer.style.color = "#FF0000";
      } else {
        gameTimer.style.color = "#333";
      }
    }, 1000);
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
