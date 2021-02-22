import { UPDATE_TURN } from './action-turn'

const initialState = 0

export default function turn(state = initialState, action: { type: string }) {
  const { type } = action

  switch(type) {
    case UPDATE_TURN:
      return state ? 0 : 1
    default:
      return state
  }
}
