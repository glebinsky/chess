const {
  knight: movesKnight,
  pawn: movesPawn,
} = require('./moves')

const {
  getPiece,
  getPieceType,
  getPlayer,
  getCoordinatesFromSquare,
} = require('./utils')

// Game board
const squares = new Array(64)
const pieces = {
  0: {},
  1: {},
}

const loggedMoves = []

let turn = 0

// Add board pieces
for(let square = 0; square < squares.length; square++) {
  squares[square] = ''

  if(square > 15 && square < 48) continue

  let type
  let player = square > 15 ? 1 : 0

  switch(square){
    case 0:
    case 7:
    case 56:
    case 63:
      type = 'r'
      break
    case 1:
    case 6:
    case 57:
    case 62:
      type = 'n'
      break
    case 2:
    case 5:
    case 58:
    case 61:
      type = 'b'
      break
    case 3:
    case 59:
      type = 'q'
      break
    case 4:
    case 60:
      type = 'k'
      break
    default:
      type = 'p'
  }

  squares[square] = `${player}${type}${square}`
  pieces[player][`${type}${square}`] = {
    square,
    possibleMoves: [],
  }
}

updatePieces()


function updatePieces() {
  Object.entries(pieces).forEach(([player, playerPieces]) =>
    Object.entries(playerPieces).forEach(([piece, data]) =>
      updateMoves(data)
    )
  )
}

// console.log(pieces)



function updateMoves(piece) {
  if(piece.square === -1) return

  let movesFunc = () => []

  switch(getPieceType(squares[piece.square])){
    case 'n':
      movesFunc = movesKnight
      break
    case 'p':
      movesFunc = movesPawn
      break
  }

  const newMoves = movesFunc(piece.square, squares)

  // TODO: See if preserving original array is required
  piece.possibleMoves.length = newMoves.length
  newMoves.forEach((s, i) => piece.possibleMoves[i] = s)
  // console.log(piece)
}

function updateSquares(oldSquare, newSquare) {
  const squarePiece = squares[oldSquare]
  // console.log(squarePiece)
  const piece = getPiece(squarePiece, pieces)

  if(getPlayer(squarePiece) !== turn || !piece.possibleMoves.includes(newSquare)) {
    console.log('** Illegal move **', getPlayer(squarePiece) !== turn, !piece.possibleMoves.includes(newSquare))
    return
  }

  logMove(oldSquare, newSquare)

  // Kill current piece on new square
  const killedPiece = getPiece(squares[newSquare], pieces)
  if(killedPiece) {
    killedPiece.possibleMoves.length = 0
    killedPiece.square = ''
  }

  squares[newSquare] = squares[oldSquare]
  squares[oldSquare] = ''
  piece.square = newSquare
  updatePieces()
  turn = turn === 0 ? 1 : 0
  // console.log(squares, piece, turn)
}

function logMove(oldSquare, newSquare) {
  loggedMoves.push({
    piece: squares[oldSquare],
    oldSquare,
    newSquare
  })
}

module.exports = {
  updateMoves,
  updateSquares,

  loggedMoves,
  squares,
}