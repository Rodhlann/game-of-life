import * as actionTypes from '../actions/actionTypes';

const initialState = {
  height: 3,
  width: 3,
  universeCellData: [],
  universeActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOY_UNIVERSE:
      return { ...state, width: action.width, height: action.height };
    case actionTypes.TOGGLE_ACTIVE: 
      return { ...state, universeActive: action.universeActive };
    // case actionTypes.CREATE_UNIVERSE_CELL_DATA:
    //   return { ...state, universeCellData: state.universeCells.concat(action.cells) };
    default:
      return state;
  }
};

export function getUniverseData(state) {
  return state.universeReducer;
}
