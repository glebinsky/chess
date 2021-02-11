const {
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
} = require('../utils')

module.exports = function knight(square, squares) {
  // console.log('knight')
  const { x, y } = getCoordinatesFromSquare(square)

  const steps = [
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: 1, y: 2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
  ]

  return steps.reduce((acc, cur) => {
    // console.log(cur)
    const newX = cur.x + x
    const newY = cur.y + y

    if(newX > -1 && newX < 8 && newY > -1 && newY < 8) {
      const newSquare = getSquareFromCoordinates({ x: newX, y: newY })
      // console.log(newSquare, squares[newSquare], squares[newSquare].player === undefined || squares[newSquare].player !== squares[square].player)
      if(squares[newSquare] === '' || getPlayer(squares[newSquare]) !== getPlayer(squares[square])) acc = acc.concat([newSquare])
    }
    // console.log(acc)

    return acc
  }, [])
}
