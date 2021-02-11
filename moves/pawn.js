const {
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
} = require('../utils')

module.exports = function pawn(square, squares) {
  // console.log('pawn')
  const squarePiece = squares[square]

  const moves = []

  const { x, y } = getCoordinatesFromSquare(square)
  const player = getPlayer(squarePiece)
  let newSquare

  newSquare = getSquareFromCoordinates({
    x,
    y: (player === 0 ? y + 1 : y - 1)
  })
  // console.log(square, x, y + 1, newSquare, squares[newSquare])
  if(squares[newSquare] !== '') return []

  moves.push(newSquare)
  // console.log(moves)

  // first move case
  newSquare = -1
  if(player === 0 && y === 1) {
    newSquare = getSquareFromCoordinates({ x, y: 3 })
  } else if(player === 1 && y === 6) {
    newSquare = getSquareFromCoordinates({ x, y: 4 })
  }
  if(squares[newSquare] === '') moves.push(newSquare)

  return moves
}
