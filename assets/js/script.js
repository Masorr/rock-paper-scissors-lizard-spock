/*
Declare variables for DOM elements, and available options
*/
let buttons = document.getElementsByClassName("controls");
let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");
let rounds = document.getElementById("rounds");
let playerImage = document.getElementById("player-image");
let computerImage = document.getElementById("computer-image");
let options = ["rock", "paper", "scissors", "lizard", "spock"];

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
        playGame(playerChoice);
    });
}

/**
 * Main game function. It accepts one parameter, which is the data-choice on the selected button by the player.
 */
function playGame(playerChoice) {

    playerImage.src = `assets/images/${options[playerChoice]}.png`;
    playerImage.alt = options[playerChoice];

    // Delays computer's choice by 1000 milliseconds.
    // Credits to my mentor Dick Vlaanderen for making and helping with the implementation of the idea.
    setTimeout(() => {
        let computerChoice = Math.floor(Math.random() * 5);

        computerImage.src = `assets/images/${options[computerChoice]}.png`;
        computerImage.alt = options[computerChoice];

        let result = checkWinner(options[computerChoice], options[playerChoice]);
    }, 1000);

}

/**
 * Check winner function.
 * Compares computer's choice against player's choice
 */
function checkWinner(computerChoice, playerChoice) {
    if (computerChoice === playerChoice) {
        alert("It's a tie!");
    } else if (
        computerChoice === "rock" && (playerChoice === "scissors" || playerChoice === "lizard") ||
        computerChoice === "paper" && (playerChoice === "rock" || playerChoice === "spock") ||
        computerChoice === "scissors" && (playerChoice === "paper" || playerChoice === "lizard") ||
        computerChoice === "lizard" && (playerChoice === "paper" || playerChoice === "spock") ||
        computerChoice === "spock" && (playerChoice === "rock" || playerChoice === "scissors")
    ) {
        alert("Computer won!");
    }
    else {
        alert("You won!");
    }
}