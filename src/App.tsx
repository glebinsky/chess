import React from 'react';
import { connect } from "react-redux"
import { loadPieces } from './redux/action-pieces'
import styles from './App.module.css';
import BoardSquare from './BoardSquare'

import {
  getPieceType,
  getPiece,
  isPieceTurn,
} from './utils'

import {
  knight,
  pawn,
} from './moves'

import {
  Pieces,
  PieceMeta,
  Squares,
  Square,
  Turn,
} from './types'

interface StateProps {
  pieces: Pieces,
  turn: Turn,
}

interface AppProps {
  pieces: Pieces,
  squares: Squares,
  turn: Turn,
  loadPieces: Function,
}

function App(props: AppProps) {
  const [selectedPiece, setSelectedPiece] = (React.useState() as [string, Function])

  const {
    pieces,
    squares,
    turn,
    loadPieces,
  } = props

  if(!piecesLoaded(pieces)) loadPieces()

  function selectPiece(squarePiece: string) {
    setSelectedPiece()
    if(!isPieceTurn(pieces, squarePiece, turn)) return
    setSelectedPiece(squarePiece)
  }

  function isSquareSelected(squarePiece: string, index: number): boolean {
    let selected = selectedPiece === squarePiece
    if(!selected && selectedPiece) {
      const pieceMeta = getPiece(selectedPiece, pieces)
      selected = pieceMeta !== undefined &&
        pieceMeta.possibleMoves !== undefined &&
        pieceMeta.possibleMoves.includes(index)
    }
    return selected
  }

  let color = true

  return (
    <div className={styles.App}>
      <div className={styles.board}>
      { squares.map((s: string, i: number) => {
        color = !color
        if(i % 8 === 0) color = !color

        const hover = isPieceTurn(pieces, s, turn)
        const selected = isSquareSelected(s, i)

        return <BoardSquare
                key={i}
                color={color}
                piece={s}
                hover={hover}
                selected={selected}
                selectPiece={() => selectPiece(s)} />
      })}
      </div>
    </div>
  );
}

function mapStateToProps(state: StateProps) {
  const {
    pieces,
    turn,
  } = state

  let squares = (new Array(64)).fill('')

  if(piecesLoaded(pieces)) {
    addPiecesToBoard(pieces, squares)
    addPossibleMovesToPieces(pieces, squares)
  }

  return {
    pieces,
    squares,
    turn,
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
