export const LOG_MOVE = 'LOG_MOVE'

export const logMove = (oldSquare: number, newSquare: number) => ({
  type: LOG_MOVE,
  payload: {
    oldSquare,
    newSquare,
  }
})
