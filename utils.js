module.exports = {
  getOriginalSquare,
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
}

function getOriginalSquare(piece) {
  return piece.substring(1)
}

function getPlayer(piece) {
  return Number.parseInt(getOriginalSquare(piece), 10) < 16 ? 0 : 1
}


function getCoordinatesFromSquare(s) {
  let x = s
  let y = 0
  while(x > 7) {
    x -= 8
    y++
  }
  return {
    x,
    y
  }
}

function getSquareFromCoordinates({ x, y}) {
  return (y * 8) + x
}

// console.log(getCoordinatesFromSquare(16))
// console.log(getSquareFromCoordinates({ x: 0, y: 2 }))

// console.log(getCoordinatesFromSquare(33))
// console.log(getSquareFromCoordinates({ x: 1, y: 4 }))
