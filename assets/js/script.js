/*
Declare variables for DOM elements
And available options
And available colors
*/
const colorChoice = document.getElementById("color-choice");
const buttons = document.getElementsByClassName("controls");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const rounds = document.getElementById("rounds");
const playerImage = document.getElementById("player-image");
const computerImage = document.getElementById("computer-image");
const playerName = document.getElementById("player-color-text");
const computerName = document.getElementById("computer-color-text");
const gameWinner = document.getElementById("game-winner");
const options = ["rock", "paper", "scissors", "lizard", "spock"];
const colors = ["lightgrey", "lightcoral", "lightblue", "lightgreen", "lightgoldenrodyellow"];
const colorsText = ["Grey", "Red", "Blue", "Green", "Yellow"];

// Allows player to select color
colorChoice.addEventListener("change", function () {
    const playerColor = colors[this.value];
    const playerColorText = colorsText[this.value];
    player.style.backgroundColor = playerColor; // Change color of player div
    playerName.textContent = playerColorText; // Change player name in div to represent color

    // Makes new arrays which doesn't contain playerColor and playerColorText choice
    let colorsLeft = colors.filter(
        function notPlayerColor(color) {
            return color !== playerColor;
        }
    );
    let colorsTextLeft = colorsText.filter(
        function notPlayerColorText(colorText) {
            return colorText !== playerColorText;
        }
    );

    // Computer chooses color and its 'player name' from arrays that doesn't contain player's choice
    const random = Math.random();
    const computerColor = colorsLeft[Math.floor(random * colorsLeft.length)];
    computer.style.backgroundColor = computerColor; // Change color of computer div

    const computerColorText = colorsTextLeft[Math.floor(random * colorsTextLeft.length)];
    computerName.textContent = computerColorText; // Change computer name in div to represent color

    console.log(colorsLeft);
    console.log(playerColor);

    // Store selected colors and corresponding name in browser
    localStorage.setItem("storeChoices", true);
    localStorage.setItem("currentPlayerColor", playerColor);
    localStorage.setItem("currentComputerColor", computerColor);
    localStorage.setItem("currentPlayerName", playerColorText); // change to proper colorname
    localStorage.setItem("currentComputerName", computerColorText);
    localStorage.setItem("currentPlayerColorSelected", this.value);

});

// TODO remove for final push
// Console logs for testing
console.log(options);
console.log(options[1] + " " + options[2]);
console.log(buttons.length);

/**
 * Add event listener to all buttons
 */
for (let button of buttons) {

    button.addEventListener("click", function () {
        let playerChoice = this.getAttribute("data-choice");

        // After 5 rounds restart game on next click
        const maxRounds = "5";
        if (rounds.textContent === maxRounds) {
            console.log("Restarting the game");
            restart();
        } else {
            // empty, could place playGame(playerChoice) call function below here to prevent game from restarting immediately on button press after round 5
        }

        playGame(playerChoice);
    });

}

/**
 * Main game function. It accepts one parameter, which is the data-choice on the selected button by the player.
 */
function playGame(playerChoice) {

    // Disables player controls
    for (let button of buttons) {
        button.disabled = true;
    }

    playerImage.src = `assets/images/${options[playerChoice]}.png`;
    playerImage.alt = options[playerChoice];

    computerImage.src = "assets/images/empty.png";
    computerImage.alt = "Computer thinking";

    // Delays computer's choice by 500 milliseconds.
    // Credits to my mentor Dick Vlaanderen for making and helping with the implementation of the idea.
    setTimeout(() => {
        let computerChoice = Math.floor(Math.random() * 5);

        computerImage.src = `assets/images/${options[computerChoice]}.png`;
        computerImage.alt = options[computerChoice];

        let result = checkWinner(options[computerChoice], options[playerChoice]);

        updateScore(result);

        // Reenables player controls after computer is finished
        for (let button of buttons) {
            button.disabled = false;
        }

    }, 500);

}

/**
 * Check winner function.
 * Compares computer's choice against player's choice
 * @param {string} computerChoice a random integer between 0 to 4
 * @param {string} playerChoice a clicked button with value between 0 to 4
 */
function checkWinner(computerChoice, playerChoice) {
    if (computerChoice === playerChoice) {
        console.log("It's a tie!");
        return "It's a tie!";
    } else if (
        computerChoice === "rock" && (playerChoice === "scissors" || playerChoice === "lizard") ||
        computerChoice === "paper" && (playerChoice === "rock" || playerChoice === "spock") ||
        computerChoice === "scissors" && (playerChoice === "paper" || playerChoice === "lizard") ||
        computerChoice === "lizard" && (playerChoice === "paper" || playerChoice === "spock") ||
        computerChoice === "spock" && (playerChoice === "rock" || playerChoice === "scissors")
    ) {
        console.log("Computer won!");
        return "Computer won!";
    }
    else {
        console.log("You won!");
        return "You won!";
    }
}

/**
 * Update score and round function
 * @param {string} result the result of who won the round
 */
function updateScore(result) {
    if (result === "Computer won!") {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    } else if (result === "You won!") {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        // It's a tie, no incrementation needed
    }
    rounds.textContent = parseInt(rounds.textContent) + 1;

    // Determines who is the final winner at end of round 5
    if (
        rounds.textContent === "5" &&
        parseInt(computerScore.textContent) > parseInt(playerScore.textContent)
    ) {
        gameWinner.textContent = "Computer won the game!";
    } else if (
        rounds.textContent === "5" &&
        parseInt(computerScore.textContent) < parseInt(playerScore.textContent)
    ) {
        gameWinner.textContent = "Player won the game!";
    } else if (
        rounds.textContent === "5" &&
        parseInt(computerScore.textContent) === parseInt(playerScore.textContent)
    ) {
        gameWinner.textContent = "The game is a tie!";
    } else {
        // empty
    }
}

/**
 * Restarts the game when called
 */
function restart() {
    playerImage.src = "assets/images/rpsls.png";
    playerImage.alt = "rpsls";
    computerImage.src = "assets/images/rpsls.png";
    computerImage.alt = "rpsls";
    rounds.textContent = "0";
    playerScore.textContent = "0";
    computerScore.textContent = "0";
    gameWinner.innerHTML = "<br>";
}

// Retrieve selected colors and corresponding names in browser
if (localStorage.getItem("storeChoices") === "true") {
    player.style.backgroundColor = localStorage.getItem("currentPlayerColor");
    computer.style.backgroundColor = localStorage.getItem("currentComputerColor");
    playerName.textContent = localStorage.getItem("currentPlayerName");
    computerName.textContent = localStorage.getItem("currentComputerName");
    colorChoice.value = localStorage.getItem("currentPlayerColorSelected");
} else {
    // nothing
}