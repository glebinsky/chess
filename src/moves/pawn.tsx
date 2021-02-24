import {
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
} from '../utils'

import {
  Square,
  Squares,
  PossibleMoves,
} from '../types'

export default function pawn(square: Square, squares: Squares): PossibleMoves {
  // console.log('pawn')
  const squarePiece = squares[square]

  const moves = []

  const { x, y } = getCoordinatesFromSquare(square)
  const player = getPlayer(squarePiece)
  const yAdvanceOne = player === 0 ? y + 1 : y - 1

  let newSquare

  // attack right
  if(x < 7) {
    newSquare = getSquareFromCoordinates({
      x: x + 1,
      y: yAdvanceOne
    })
    if(squares[newSquare] !== '' && getPlayer(squares[newSquare]) !== player)
      moves.push(newSquare)

    //TODO: en passant
  }

  // attack left
  if(x > 0) {
    newSquare = getSquareFromCoordinates({
      x: x - 1,
      y: yAdvanceOne
    })
    if(squares[newSquare] !== '' && getPlayer(squares[newSquare]) !== player)
      moves.push(newSquare)

    //TODO: en passant
  }

  // advance one
  newSquare = getSquareFromCoordinates({
    x,
    y: yAdvanceOne
  })
  // console.log(square, x, y + 1, newSquare, squares[newSquare])
  if(squares[newSquare] !== '') return moves

  moves.push(newSquare)
  // console.log(moves)


  // advance two on first move
  newSquare = -1
  if(player === 0 && y === 1) {
    newSquare = getSquareFromCoordinates({ x, y: 3 })
  } else if(player === 1 && y === 6) {
    newSquare = getSquareFromCoordinates({ x, y: 4 })
  }
  if(squares[newSquare] === '') moves.push(newSquare)

  return moves
}
