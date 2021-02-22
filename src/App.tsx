import React from 'react';
import { connect } from "react-redux"
import { loadPieces } from './redux/action-pieces'
import styles from './App.module.css';
import Square from './Square'

interface pieces {
  0: Object,
  1: Object,
}

interface stateProps {
  pieces: pieces,
  turn: 0 | 1,
  squares: string[],
  loggedMoves: object[],
}

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

        return <Square
                key={i}
                number={i}
                color={color}
                piece={s} />
      })}
      </div>
    </div>
  );
}

function mapStateToProps(state: stateProps) {
  const {
    pieces,
  } = state

  let squares = (new Array(64)).fill('')
  
  if(piecesLoaded(pieces)) {
    Object.entries(pieces).forEach(([player, playerPieces]) => {
      Object.entries((playerPieces as Object)).forEach(([piece, { square }]) =>
        squares[square] = `${player}${piece}`
      )
    })
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


function piecesLoaded(pieces: pieces) {
  return Object.keys(pieces[0]).length
}
