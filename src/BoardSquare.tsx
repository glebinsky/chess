import React from 'react';
import styles from './BoardSquare.module.css'
import classnames from 'classnames'

interface Props {
  color: boolean,
  piece?: string,
  selectPiece: Function,
  hover: boolean,
  selected: boolean,
}

export default function BoardSquare(props: Props) {
  const {
    piece,
    color,
    selectPiece,
    hover,
    selected,
  } = props

  const className = classnames({
    [styles.BoardSquare]: true,
    [styles.white]: color,
    [styles.black]: !color,
    [styles.hover]: hover,
    [styles.selected]: selected,
  })

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    selectPiece()
  }

  return (
    <div className={className} onClick={handleClick}>
      {piece}
    </div>
  )
}
