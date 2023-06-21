let board = null;
let game = new Chess();

let pieceVal = {"b": 3, "n": 3, "r": 5, "q": 9, "p": 1, "k": 3.5};
let moveLimit = 3;

function minimax(moveCount) { // returns a list where the first element is the eval and the second element is the best move
  if (moveCount == moveLimit) {
    let eVal = 0;
    game.board().forEach((_) => {
      _.forEach(move => {
        if (move == null) return;
        if (move.color == "w") {
          eVal += pieceVal[move.type];
        } else {
          eVal -= pieceVal[move.type];
        }
      });
    });
    return [-eVal, ""];
  }

  let possibleMoves = game.moves();

  let turn = (game.turn() == 'b' ? -1 : +1);
  let bestMove = null;

  if (game.in_checkmate()) {
    return [-10000 * turn, ""];
  }

  possibleMoves.forEach(possibleMove => {
    game.move(possibleMove);

    let madeMove = minimax(moveCount + 1);
    madeMove[0] *= turn;
    if (bestMove == null || madeMove[0] > bestMove[0]) {
      bestMove = [madeMove[0], possibleMove];
    }

    game.undo();
  });

  if (bestMove == null) {
    bestMove = [0, ""];
  }

  return bestMove;
}

function makeMove(lastMove) {
  if (game.game_over()) {
    console.log(game.pgn());
    return;
  }

  bestMove = minimax(0);

  console.log(bestMove);

  game.move(bestMove[1]);

  board.position(game.fen());
}

function onDragStart (source, piece, position, orientation) {
  if (game.game_over()) return false

  if (piece.search(/^b/) !== -1) return false
}

function onDrop (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for simplicity
  })

  if (move === null) return 'snapback'

  // make random legal move for black
  window.setTimeout(makeMove(move.san), 250)
}

// update the board position after the piece snap
// for castling, en peasant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}

board = Chessboard("myBoard", config);