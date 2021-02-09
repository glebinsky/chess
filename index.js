const {
  updateMoves,
  updateSquares,

  loggedMoves,
  possibleMoves,
  squares,
  getCoordinatesFromSquare,
  getPlayer,
} = require('./game')


updateMoves(1)
updateSquares(1,18)
updateMoves(57)
updateSquares(57,40)
updateMoves(6)
updateSquares(6,23)
updateMoves(62)
updateSquares(62,possibleMoves[1])
updateMoves(11)
updateSquares(11,possibleMoves[1])
updateMoves(51)
updateSquares(51,possibleMoves[1])


console.log(squares)
loggedMoves.forEach(m => {
  const {
    oldSquare,
    newSquare,
    piece,
  } = m
  const { x: oldX, y: oldY } = getCoordinatesFromSquare(oldSquare)
  const { x: newX, y: newY } = getCoordinatesFromSquare(newSquare)

  console.log(`${getPlayer(piece) === 0 ? 'white' : 'black'} ${String.fromCharCode(oldY + 65)}${oldX}:${String.fromCharCode(newY + 65)}${newX}`)
})
