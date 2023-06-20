let board = null;
let game = new Chess();

let pieceVal = {"B": 3, "N": 3, "R": 5, "Q": 9}

function makeRandomMove() {
  let possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over()) {
    console.log(game.pgn());
    return;
  }

  let captureMove = "-1";
  let captureMoveVal = 0;

  possibleMoves.forEach((move) => {
    if (move[move.length - 3] == "x") {
      captureMove = move;
      let val = 1;
      for (let i = 0; i < move.length; i++) {
        if (move[i] == move[i].toUpperCase()) {
          val = pieceVal[move[i]];
          break;
        }
      }
      if (captureMoveVal < val) {
        captureMoveVal = val;
      }
    }
  });

  console.log(captureMove);

  if (captureMove != "-1") {
    game.move(captureMove);
  } else {
    let randomIdx = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIdx]);
  }

  board.position(game.fen());
  window.setTimeout(makeRandomMove, 500);
}

board = Chessboard("myBoard", "start");

window.setTimeout(makeRandomMove, 500);