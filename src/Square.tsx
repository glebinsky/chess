import React from 'react';
import styles from './Square.module.css'
import classnames from 'classnames'

export default function Square(props: { number: number, color: boolean, piece?: string }) {
  const {
    number,
    piece,
    color,
  } = props

  const className = classnames({
    [styles.Square]: true,
    [styles.white]: color,
    [styles.black]: !color,
  })

  return (
    <div className={className}>
      {piece}
    </div>
  )
}
