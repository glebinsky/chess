import {
  Pieces,
  PieceType,
  Turn,
  Square,
} from './types'

interface Coordinates {
  x: number,
  y: number,
}

export function getPiece(squarePiece: string, pieces: Pieces): string | undefined {
  if(squarePiece === '') return
  // @ts-ignore: Don't want to refactor player keys
  return pieces[getPlayer(squarePiece)][squarePiece.substring(1)]
}

export function getPieceType(squarePiece: string): PieceType | undefined {
  if(squarePiece === '') return
  return (squarePiece.substring(1,2) as PieceType)
}

export function getPlayer(squarePiece: string): Turn | undefined {
  if(squarePiece === '') return
  return (Number.parseInt(squarePiece.substring(0,1), 10) as Turn)
}

export function getCoordinatesFromSquare(s: Square): Coordinates {
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

export function getSquareFromCoordinates(coordinates: Coordinates): Square {
  const { x, y } = coordinates
  return (y * 8) + x
}

// console.log(getCoordinatesFromSquare(16))
// console.log(getSquareFromCoordinates({ x: 0, y: 2 }))

// console.log(getCoordinatesFromSquare(33))
// console.log(getSquareFromCoordinates({ x: 1, y: 4 }))