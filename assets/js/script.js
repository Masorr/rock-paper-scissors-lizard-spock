/*
Declare variables for DOM elements, and available options
*/
const buttons = document.getElementsByClassName("controls");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const rounds = document.getElementById("rounds");
const playerImage = document.getElementById("player-image");
const computerImage = document.getElementById("computer-image");
const options = ["rock", "paper", "scissors", "lizard", "spock"];

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

    // Delays computer's choice by 1000 milliseconds.
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

    }, 1000);

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
}