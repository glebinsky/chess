import { LOAD_PIECES } from './action-pieces'

const initialState = {
  0: {},
  1: {},
}

export default function pieces(state = initialState, action: { type: string, payload: any }) {
  const { type, payload } = action

  switch(type) {
    case LOAD_PIECES:
      return {...payload}
    default:
      return state
  }
}
