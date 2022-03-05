function checkForUser() {
    document.querySelector(".intro").style.transition = "1s";
    document.querySelector(".intro").style.opacity = "0";
    document.querySelector(".intro").style.zIndex = "-1";
    if (window.localStorage.getItem("name") === null) {
        playerDetails.style.display = "none";
        document.querySelector(".enterName").style.zIndex = "1";
        document.getElementById("playerName").focus();
    } else {
        document.querySelector(".mainMenu").style.zIndex = "1";
        playerDetails.style.display = "flex";
    }
}

window.addEventListener("load", function () {
    document.querySelector(".introImg").style.transition = "1s";
    document.querySelector(".introImg").style.transform = "scale(1)";
    document.querySelector(".introImg").style.opacity = "1";
    setTimeout(checkForUser, 2000);
});

const instructions = document.querySelector(".instructions");

showInstructions.addEventListener('click', function() {
    instructions.style.transform = "translateY(0)";
    instructions.style.transition = "500ms";
    instructions.style.zIndex = "1";
});

hideInstructions.addEventListener('click', function() {
    instructions.style.transform = "translateY(530px)";
    instructions.style.transition = "500ms";
    instructions.style.zIndex = "-1";
});