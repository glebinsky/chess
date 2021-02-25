import React from 'react';
import styles from './SquarePiece.module.css'
import classnames from 'classnames'
import { ReactComponent as ChessPiecesSprite } from './Chess_Pieces_Sprite.svg'
import {
  getPlayer,
  getPieceType,
} from './utils'

interface Props {
  color: boolean,
  piece?: string,
  selectPiece: Function,
  hover: boolean,
  selected: boolean,
}

export default function SquarePiece(props: Props) {
  const {
    piece,
    color,
    selectPiece,
    hover,
    selected,
  } = props

  const squareClassName = classnames({
    [styles.SquarePiece]: true,
    [styles.white]: color,
    [styles.black]: !color,
    [styles.hover]: hover,
    [styles.selected]: selected,
  })

  let pieceClassName = getPlayer((piece || '' as string)) ? 'white' : 'black'
  switch(getPieceType((piece || '' as string))) {
    case 'r':
      pieceClassName += 'rook'
      break
    case 'b':
      pieceClassName += 'bishop'
      break
    case 'n':
      pieceClassName += 'knight'
      break
    case 'q':
      pieceClassName += 'queen'
      break
    case 'k':
      pieceClassName += 'king'
      break
    case 'p':
      pieceClassName += 'pawn'
      break
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    selectPiece()
  }

  return (
    <div className={squareClassName} onClick={handleClick}>
      { typeof piece === 'string' && piece.length > 0 && <ChessPiecesSprite className={styles[pieceClassName]} />}
    </div>
  )
}
