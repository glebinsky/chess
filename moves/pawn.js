const {
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
} = require('../utils')

module.exports = function pawn(square, squares) {
  const piece = squares[square]
  if(piece[0] !== 'p') return []

  const moves = []

  const { x, y } = getCoordinatesFromSquare(square)
  const player = getPlayer(piece)
  let newSquare

  if(player === 0) {
    newSquare = getSquareFromCoordinates({ x, y: y + 1 })
    // console.log(square, x, y + 1, newSquare, squares[newSquare])
    if(squares[newSquare] !== '') return []

    moves.push(newSquare)
    console.log(moves)

    if(y === 1) {
      newSquare = getSquareFromCoordinates({ x, y: 3 })
      if(squares[newSquare] === '') moves.push(newSquare)
    }
  } else {
    newSquare = getSquareFromCoordinates({ x, y: y - 1 })
    if(squares[newSquare] !== '') return []

    moves.push(newSquare)

    if(y === 6) {
      newSquare = getSquareFromCoordinates({ x, y: 4 })
      if(squares[newSquare] === '') moves.push(newSquare)
    }
  }
  return moves
}
