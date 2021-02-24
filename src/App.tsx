import React from 'react';
import { connect, batch } from "react-redux"
import {
  loadPieces,
  updatePieces,
} from './redux/action-pieces'
import { updateTurn } from './redux/action-turn'
import styles from './App.module.css';
import BoardSquare from './BoardSquare'

import {
  getPieceType,
  getPiece,
  isPieceTurn,
  getPlayer,
  getPieceKey,
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
  updatePieces: Function,
  updateTurn: Function,
}

function App(props: AppProps) {
  const [selectedPiece, setSelectedPiece] = (React.useState() as [string, Function])

  const {
    pieces,
    squares,
    turn,
    loadPieces,
    updatePieces,
    updateTurn,
  } = props

  // get pieces from backend
  if(!piecesLoaded(pieces)) loadPieces()

  function selectPiece(squarePiece: string, squareIndex: number) {
    if(squarePiece === selectedPiece || (squarePiece !== '' && !isPieceTurn(pieces, squarePiece, turn))) {
      setSelectedPiece()
      return
    }

    if(selectedPiece) {
      const pieceMeta = getPiece(selectedPiece, pieces)
      if(squareInPossibleMoves(squareIndex)) {
        batch(() => {
          updatePieces({
            newPlayer: getPlayer(selectedPiece),
            newPieceKey: getPieceKey(selectedPiece),
            newIndex: squareIndex,
            oldPlayer: getPlayer(squares[squareIndex]),
            oldPieceKey: getPieceKey(squares[squareIndex]),
          })
          updateTurn()
        })

        setSelectedPiece()
        return
      }
    }

    setSelectedPiece(squarePiece)
  }

  function isSquareSelected(squarePiece: string, squareIndex: number): boolean {
    let selected = selectedPiece === squarePiece
    if(!selected && selectedPiece) {
      const pieceMeta = getPiece(selectedPiece, pieces)
      selected = squareInPossibleMoves(squareIndex)
    }
    return selected
  }

  function squareInPossibleMoves(squareIndex: number) {
    const pieceMeta = getPiece(selectedPiece, pieces)
    return pieceMeta !== undefined &&
      pieceMeta.possibleMoves !== undefined &&
      pieceMeta.possibleMoves.includes(squareIndex)
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
                selectPiece={() => selectPiece(s, i)} />
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
  updatePieces,
  updateTurn,
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
