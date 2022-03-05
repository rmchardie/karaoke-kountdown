let player = document.getElementById("playerName");

const enterNamePanel = document.querySelector(".enterName");
const mainMenu = document.querySelector(".mainMenu");
const welcomeMessage = document.getElementById("welcomeMessage");
const playerDetails = document.querySelector(".namePlaceholder");

if (window.localStorage.getItem("name") != "null"){
    welcomeMessage.innerHTML = window.localStorage.getItem("name");
}

setPlayerName.addEventListener('click', function(event) {
    event.preventDefault();
    if (!player.value) {
        alert("Player name required!");
    } else {
        window.localStorage.setItem("name", player.value);
        welcomeMessage.innerHTML = player.value;
        enterNamePanel.style.transform = "translateX(-100%)";
        enterNamePanel.style.transition = "1000ms";
        enterNamePanel.style.zIndex = "-1";
        setTimeout(function() { mainMenu.style.zIndex = "1"; playerDetails.style.display = "flex";}, 1000);
        mainMenu.style.transform = "translateX(0)";
        mainMenu.style.transition = "1000ms";
    }
});

changePlayer.addEventListener("click", function() {
    window.localStorage.clear();
    mainMenu.style.transform = "translateX(100%)";
    mainMenu.style.transition = "1000ms";
    mainMenu.style.zIndex = "-1";
    setTimeout(function() { 
        enterNamePanel.style.zIndex = "2"; 
        enterNamePanel.style.transform = "translateX(0%)";
        enterNamePanel.style.transition = "500ms";
    }, 1000);
    playerDetails.style.display = "none";
    document.getElementById("playerName").textContent = " ";
})