import * as actionTypes from '../actions/actionTypes';

const initialState = {
  height: 3,
  width: 3,
  universeCellStatuses: [],
  universeActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_UNIVERSE_CELLS:
    case actionTypes.TOGGLE_STATUS:
      return { ...state, universeCellStatuses: action.universeCellStatuses };
    case actionTypes.TOGGLE_ACTIVE:
      return { ...state, universeActive: action.universeActive };
    case actionTypes.DEPLOY_UNIVERSE:
      return { ...state, width: action.width, height: action.height };
    case actionTypes.UPDATE_WIDTH:
      return { ...state, width: action.width, universeCellStatuses: action.universeCellStatuses };
    case actionTypes.UPDATE_HEIGHT:
      return { ...state, height: action.height, universeCellStatuses: action.universeCellStatuses };
    default:
      return state;
  }
};

export function getUniverseData(state) {
  return state.universeReducer;
}
