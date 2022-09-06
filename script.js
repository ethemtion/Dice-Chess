import { Chess } from "./chess.js";

let myOrientation = "white";
var board;
var startC = "rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR";
var game = Chess();
let dice1, dice2, dice3;
let hasLegalMoveFlag = false;
let random;
let counter = 0;
let index, xIndex;

var piecesNames = {
  p: "Pawn",
  r: "Rook",
  n: "Knight",
  b: "Bishop",
  k: "King",
  q: "Queen",
};
var pieces = ["p", "r", "n", "b", "k", "q"];

$(document).ready(function () {
  var config = {
    draggable: true,
    position: "start",
    orientation: myOrientation,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onChange: onChange,
  };

  board = Chessboard("board", config);
  $(window).resize(board.resize);
  updateStatus();
  // generateDice();

  //   $(".piece-417db").click(function () {
  //     console.log($this)
  //     })
});

// -------------------------------------
//            CHESS CONFIGS
// -------------------------------------

function onDragStart(source, piece, position, orientation) {
  //Pick up pieces for the side to move
  if (game.game_over()) return false;

  if (game.turn() + dice1.toUpperCase() != piece) {
    return false;
  }
}

function onSnapEnd() {
  board.position(game.fen());
}

function onDrop(source, target) {
  //Legal move check
  var move = game.move({
    from: source,
    to: target,
    promotion: "q"
     //AutoQueen promote, will come back later
  });

  if (move === null) return "snapback";
  updateStatus();
}

function onChange() {
  
}

// -------------------------------------
//             UPDATE STATUS
// -------------------------------------
function updateStatus() {
  var status = "";

  var moveColor = "White";
  if (game.turn() === "b") moveColor = "Black";

  //checkmate?
  if (game.in_checkmate()) {
    status = "Game over," + moveColor + " is in checkmate.";
  }

  //draw?
  else if (game.in_draw()) {
    status = "Game over, draw";
  } else {
    status = moveColor + " to move";

    //check?
    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }

  $("#toMove").html(status);
  $("#pgn").html(game.pgn());
  //   changeOrientation();
  generateDice();
}

// -------------------------------------
//          FUNCTIONS OF BUTTONS
// -------------------------------------
$("#btStartPos").click(function () {
  board.position("start");
});
$("#btCenterGame").click(function () {
  board.position(startC);
});
$("#btChangeOrientation").click(function () {
  changeOrientation();
});

$("#btPlayRandom").click(function () {
  setTimeout(playRandom, 250);
});
$("#btRandomVs").click(function () {
  random = setInterval(playRandom, 400);
});

$('#btReroll').click(function () {
  reroll();
})

// ---------------------------------
// ---------------------------------
// ---------------------------------

function changeOrientation() {
  if (myOrientation == "black") myOrientation = "white";
  else myOrientation = "black";
  board.orientation(myOrientation, "250");
}

function playRandom() {
  var possibleMoves = game.moves();

  if (possibleMoves.length === 0) {
    clearInterval(random);
    return;
  }
  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}

var intervalId 

function generateDice() {
  if(game.game_over())return
  hasLegalMoveFlag = false;
  clearInterval(intervalId)
  while (!hasLegalMoveFlag) {
    roll();
    if (game.moves({ piece: dice1 }).length != "0") hasLegalMoveFlag = true;
  }
  //   console.log(dice1)
  // console.log(game.moves({piece: dice1}))

  //   console.log(piecesNames[dice1])
  counter = 0
  intervalId = setInterval(showDiceAnimation, 100);
  
  setTimeout(showRealDice,1600)

  //  var randomIdx2 = Math.floor(Math.random() * possibleMoves.length)
  //  var randomIdx3 = Math.floor(Math.random() * possibleMoves.length)
  //  dice2 = possibleMoves[randomIdx2]
  //  dice3 = possibleMoves[randomIdx3]
}
function roll() {
  var randomIdx1 = Math.floor(Math.random() * pieces.length);
  dice1 = pieces[randomIdx1];
}

function showDiceAnimation() {
  
  counter++;
  
  if (counter == 15) {
    clearInterval(intervalId);
  }

  index = Math.floor(Math.random() * pieces.length);
  let dummyPiece = pieces[index];
  $("#dice1").attr("src", `mydice/${game.turn()}${piecesNames[dummyPiece]}.png`);
  
}

function  showRealDice() {
  
  $("#dice1").attr("src", `mydice/${game.turn()}${piecesNames[dice1]}.png`);
}

function reroll() {
  dice1 = "p"
}