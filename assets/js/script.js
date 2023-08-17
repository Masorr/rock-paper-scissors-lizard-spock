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
