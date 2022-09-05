import { Chess } from "../node_modules/chess.js/chess.js";

let myOrientation = "white";
var board;
var startC = "rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR";
var game = Chess();

$(document).ready(function () {
  var config = {
    draggable: true,
    position: "start",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
  };

  board = Chessboard("board", config);
  $(window).resize(board.resize);
  updateStatus();
});

// -------------------------------------
//            CHESS CONFIGS
// -------------------------------------

function onDragStart(source, piece, position, orientation) {
  //Pick up pieces for the side to move
  if (game.game_over()) return false;

  if (
    (game.turn() === "w" && piece.search(/^b/) !== -1) ||
    (game.turn() === "b" && piece.search(/^w/) !== -1)
  ) {
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
    promotion: "q", //AutoQueen promote, will come back later
  });

  if (move === null) return "snapback";
  updateStatus();
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
  $("#fen").html(game.fen());
  $("#pgn").html(game.pgn());
  changeOrientation();
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
})
$("#btRandomVs").click(function () {
    let random =  setInterval(playRandom, 400);
})

// ---------------------------------
// ---------------------------------
// ---------------------------------

function changeOrientation(){
    if (myOrientation == "black") myOrientation = "white";
  else myOrientation = "black";
  board.orientation(myOrientation);
}

function playRandom(){
    var possibleMoves = game.moves()

    if(possibleMoves.length === 0){
        clearInterval(random)   
        return
    }
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIdx])
    board.position(game.fen())

}