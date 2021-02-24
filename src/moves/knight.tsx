import {
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
} from '../utils'

import {
  Square,
  Squares,
  PossibleMoves,
  Coordinates,
} from '../types'

export default function knight(square: Square, squares: Squares): PossibleMoves {
  // console.log('knight')
  const { x, y } = getCoordinatesFromSquare(square)

  const steps: Coordinates[] = [
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: 1, y: 2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
  ]

  return steps.reduce((acc: number[], cur: Coordinates) => {
    // console.log(cur)
    const newX = cur.x + x
    const newY = cur.y + y

    if(newX > -1 && newX < 8 && newY > -1 && newY < 8) {
      const newSquare: Square = getSquareFromCoordinates({ x: newX, y: newY })
      // console.log(newSquare, squares[newSquare], squares[newSquare].player === undefined || squares[newSquare].player !== squares[square].player)
      if(squares[newSquare] === '' || getPlayer(squares[newSquare]) !== getPlayer(squares[square]))
        acc = acc.concat([newSquare])
    }
    // console.log(acc)

    return acc
  }, [])
}
