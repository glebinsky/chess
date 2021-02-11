const {
  updateMoves,
  updateSquares,

  loggedMoves,
  squares,
} = require('./game')

const {
  getPlayer,
  getCoordinatesFromSquare,
} = require('./utils')

updateSquares(1,18)
updateSquares(57,40)
updateSquares(6,23)
updateSquares(62,45)
updateSquares(11,27)
updateSquares(51,33)


for(let square = 0, output = ''; square < squares.length; square++) {
  output += (squares[square] === '' ? '___' : squares[square]) + ','
  switch(square) {
    case 7:
    case 15:
    case 23:
    case 31:
    case 39:
    case 47:
    case 55:
    case 63:
      console.log(output)
      output = ''
  }
}

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
