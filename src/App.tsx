import React from 'react';
import { connect } from "react-redux"
import { loadPieces } from './redux/action-pieces'
import styles from './App.module.css';
import BoardSquare from './Square'

import { getPieceType } from './utils'
import {
  knight,
  pawn,
} from './moves'

import {
  StateProps,
  Pieces,
  PieceMeta,
  Squares,
  Square,
  Turn,
  PossibleMoves,
} from './types'

function App(props: any) {
  const {
    pieces,
    squares,
    loadPieces,
  } = props

  if(!piecesLoaded(pieces)) loadPieces()

  let color = true

  return (
    <div className={styles.App}>
      <div className={styles.board}>
      { squares.map((s: string, i: number) => {
        color = !color
        if(i % 8 === 0) color = !color

        return <BoardSquare
                key={i}
                number={i}
                color={color}
                piece={s} />
      })}
      </div>
    </div>
  );
}

function mapStateToProps(state: StateProps) {
  const {
    pieces,
  } = state

  let squares = (new Array(64)).fill('')

  if(piecesLoaded(pieces)) {
    addPiecesToBoard(pieces, squares)
    addPossibleMovesToPieces(pieces, squares)
  }

  return {
    pieces,
    squares,
  }
}

const mapDispatchToProps = {
  loadPieces,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


function piecesLoaded(pieces: Pieces) {
  return Object.keys(pieces[0]).length
}

function addPiecesToBoard(pieces: Pieces, squares: Squares) {
  Object.entries(pieces).forEach(([player, playerPieces]) => {
    Object.entries((playerPieces as Object)).forEach(([piece, { square }]) => {
      if(square > -1) squares[square] = `${player}${piece}`
    })
  })
}

function addPossibleMovesToPieces(pieces: Pieces, squares: Squares) {
  Object.entries(pieces).forEach(([player, playerPieces]) =>
    Object.entries(playerPieces).forEach(([piece, pieceMeta]) => {
      const { square } = (pieceMeta as PieceMeta)

      if(square === -1) return

      let movesFunc = (square: Square, squares: Squares): number[] => []

      switch(getPieceType(squares[square])){
        case 'n':
          movesFunc = knight
          break
        case 'p':
          movesFunc = pawn
          break
      }

      (pieceMeta as PieceMeta).possibleMoves = movesFunc(square, squares)
    })
  )
}
