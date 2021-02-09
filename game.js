const {
  knight: movesKnight,
  pawn: movesPawn,
} = require('./moves')

const {
  getPlayer,
  getCoordinatesFromSquare,
} = require('./utils')

// Game board
const squares = new Array(64)
const possibleMoves = []
const loggedMoves = []

let turn = 0

let selectedSquare

// Add board pieces
for(let s = 0; s < squares.length; s++) {
  squares[s] = ''

  if(s > 15 && s < 48) continue

  let piece

  switch(s){
    case 0:
    case 7:
    case 56:
    case 63:
      piece = 'r'
      break
    case 1:
    case 6:
    case 57:
    case 62:
      piece = 'n'
      break
    case 2:
    case 5:
    case 58:
    case 61:
      piece = 'b'
      break
    case 3:
    case 59:
      piece = 'q'
      break
    case 4:
    case 60:
      piece = 'k'
      break
    default:
      piece = 'p'
  }

  squares[s] = `${piece}${s}`
}

// console.log(squares)



function updateMoves(square) {
  if(squares[square] === '') {
    possibleMoves.length = 0
    return
  }

  let movesFunc = () => {}

  switch(squares[square][0]){
    case 'n':
      movesFunc = movesKnight
      break
    case 'p':
      movesFunc = movesPawn
      break
  }

  const newMoves = movesFunc(square, squares)

  possibleMoves.length = newMoves.length
  newMoves.forEach((s, i) => possibleMoves[i] = s)
  console.log(possibleMoves)
}

function updateSquares(oldSquare, newSquare) {
  if(getPlayer(squares[oldSquare]) !== turn || !possibleMoves.includes(newSquare)) {
    console.log('** Illegal move **')
    return
  }

  logMove(oldSquare, newSquare)

  squares[newSquare] = squares[oldSquare]
  squares[oldSquare] = ''
  possibleMoves.length = 0
  turn = turn === 0 ? 1 : 0
  // console.log(squares, possibleMoves, turn)
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
  possibleMoves,
  squares,
  getCoordinatesFromSquare,
  getPlayer,
}