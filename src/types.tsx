export interface Pieces {
  0: Object,
  1: Object,
}

export type Turn = 0 | 1

export type Squares = string[]
export type Square = number

export type PossibleMoves = number[]

export interface PieceMeta {
  square: Square,
  possibleMoves?: PossibleMoves,
}

export interface StateProps {
  pieces: Pieces,
  turn: Turn,
  squares: Squares,
  loggedMoves: object[],
}

export type PieceType = 'p' | 'n' | 'r' | 'b' | 'k' | 'q'