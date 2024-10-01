import axios from 'axios'

const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api")
    console.log(response.data.fruits)
  }

fetchAPI()

const rockButton = document.getElementById("rock")
rockButton.onclick = () => {
    playGame("rock")
}

const playGame = (choice) => {
    let playerChoice = choice
    let result = ""

    const computerChoices = ['rock', 'paper', 'scissors']
    let computerChoice = computerChoices[getRandomInt(1,3)]

    if (playerChoice === computerChoice) {
        result = "Tie"
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "Player win"
    } else {
        result = "Player lose"
    }

    document.getElementById("result").textContent = result

}


var board1 = Chessboard('board1', 'start')

function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up to the nearest integer
    max = Math.floor(max); // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate random integer
}