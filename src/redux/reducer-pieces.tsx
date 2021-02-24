import {
  LOAD_PIECES,
  UPDATE_PIECES,
} from './action-pieces'

import {
  PieceMeta,
  Turn,
  Square,
  UpdatePiecesPayload,
} from '../types'

interface State {
  0: Object,
  1: Object,
}

const initialState = {
  0: {},
  1: {},
}

export default function pieces(state: State = initialState, action: { type: string, payload: any }) {
  const { type, payload } = action

  switch(type) {
    case UPDATE_PIECES:
      return updatePieces(state, payload)
    case LOAD_PIECES:
      return {...payload}
    default:
      return state
  }
}

function updatePieces(state: State, payload: UpdatePiecesPayload) {
  const {
    newPlayer,
    newPieceKey,
    newIndex,
    oldPlayer,
    oldPieceKey,
  } = payload

  if(newPlayer === oldPlayer) return state

  const newState = Object.entries(state).reduce((outerState: any, [player, playerPieces]) => {
    outerState[player] = Object.entries(playerPieces).reduce((innerState: any, [pieceKey, pieceMeta]) => {
      innerState[pieceKey] = { ...(pieceMeta as PieceMeta) }
      return innerState
    }, {})
    return outerState
  }, {})

  newState[newPlayer][newPieceKey].square = newIndex

  if(oldPlayer && oldPieceKey) delete newState[oldPlayer][oldPieceKey]

  return newState
}
