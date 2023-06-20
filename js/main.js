var board = null;
var game = new Chess();

function makeRandomMove() {
  var possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over()) {
    console.log(game.pgn());
    return;
  }

  let captureMove = "-1";

  possibleMoves.forEach((move) => {
    if (move[move.length - 3] == "x") {
      captureMove = move;
      return;
    }
  });

  console.log(captureMove);

  if (captureMove != "-1") {
    game.move(captureMove);
  } else {
    var randomIdx = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIdx]);
  }

  board.position(game.fen());
  window.setTimeout(makeRandomMove, 500);
}

board = Chessboard("myBoard", "start");

window.setTimeout(makeRandomMove, 500);