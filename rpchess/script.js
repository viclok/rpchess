import axios from 'axios'
import { Chess } from 'chess.js'
import io from 'socket.io-client'

var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
const socket = io("http://localhost:8080/")



// Chess stuff
function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.isGameOver()) return false

  set_turn(game, 'w')

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // see if the move is legal
  try {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })
  } catch (error) {
    move = null
  }
  

  // illegal move
  if (move === null) return 'snapback'

  updateStatus()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (game.isCheckmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.isDraw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.inCheck()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('board1', config)


updateStatus()

/* totally untested ... this will blow your game state/history  */
function set_turn(game, color) {
    var tokens = game.fen().split(' ');
    tokens[1] = color;
    game.load(tokens.join(' '));
}





// RPS stuff
const rockButton = document.getElementById("rock")
rockButton.onclick = () => {
    playGame("rock")
}
const scissorsButton = document.getElementById("scissors")
scissorsButton.onclick = () => {
    playGame("scissors")
}
const paperButton = document.getElementById("paper")
paperButton.onclick = () => {
    playGame("paper")
}

export const playGame = (choice) => {
    let playerChoice = choice
    let result = ""

    const computerChoices = ['rock', 'paper', 'scissors']
    let computerChoice = computerChoices[getRandomInt(0,2)]

    if (playerChoice === computerChoice) {
        result = "Tie"
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "Player win "
        console.log(playerChoice)
        console.log(computerChoice)
    } else {
        result = "Player lose"
    }

    document.getElementById("result").textContent = result

}

function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up to the nearest integer
    max = Math.floor(max); // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate random integer
}

// const fetchAPI = async () => {
//     const response = await axios.get("http://localhost:8080/api")
//     console.log(response.data.fruits)
//   }

// fetchAPI()