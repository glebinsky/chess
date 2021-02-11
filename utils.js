module.exports = {
  getPiece,
  getPieceType,
  getPlayer,
  getCoordinatesFromSquare,
  getSquareFromCoordinates
}

function getPiece(squarePiece, pieces) {
  if(squarePiece === '') return
  return pieces[getPlayer(squarePiece)][squarePiece.substring(1)]
}

function getPieceType(squarePiece) {
  if(squarePiece === '') return
  return squarePiece.substring(1,2)
}

function getPlayer(squarePiece) {
  if(squarePiece === '') return
  return Number.parseInt(squarePiece.substring(0,1), 10)
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
