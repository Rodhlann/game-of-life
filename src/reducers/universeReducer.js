import * as actionTypes from '../actions/actionTypes';

const initialState = {
  height: 3,
  width: 3,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOY_UNIVERSE:
      return { ...state, width: action.width, height: action.height };
    default:
      return state;
  }
};

export function getUniverseData(state) {
  return state.universeReducer;
}
