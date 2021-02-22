import { LOG_MOVE } from './action-logged-moves'

const initialState: any[] = []

export default function loggedMoves(state = initialState, action: { type: string, payload: any }) {
  const { type, payload } = action

  switch(type) {
    case LOG_MOVE:
      return Array.prototype.concat(state, [payload])
    default:
      return state
  }
}
