let player = document.getElementById("playerName");

const intro = document.querySelector(".intro");
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
        intro.style.transform = "translateX(-100%)";
        intro.style.transition = "1000ms";
        intro.style.zIndex = "-1";
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
        intro.style.zIndex = "2"; 
        intro.style.transform = "translateX(0%)";
        intro.style.transition = "500ms";
    }, 1000);
    playerDetails.style.display = "none";
    document.getElementById("playerName").textContent = " ";
})