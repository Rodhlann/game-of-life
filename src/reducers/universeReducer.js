import * as actionTypes from '../actions/actionTypes';

const initialState = {
  height: 5,
  width: 5,
  universeCellStatuses: [],
  universeActive: false,
};

/**
  * Update the application global state (store) based on application actions and input
  * @param {object} state default state of the universe
  * @param {object} action action performed
  */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_UNIVERSE_CELLS:
    case actionTypes.TOGGLE_STATUS:
    case actionTypes.UPDATE_ALL_STATUSES:
      return { ...state, universeCellStatuses: action.universeCellStatuses };
    case actionTypes.TOGGLE_ACTIVE:
      return { ...state, universeActive: action.universeActive };
    case actionTypes.UPDATE_WIDTH:
      return { ...state, width: action.width, universeCellStatuses: action.universeCellStatuses };
    case actionTypes.UPDATE_HEIGHT:
      return { ...state, height: action.height, universeCellStatuses: action.universeCellStatuses };
    default:
      return state;
  }
};

/**
  * Distribute universe data to the desired locations within the application
  * @param {object} state state of the application
  * @returns {object} universeReducer data
  */
export function getUniverseData(state) {
  return state.universeReducer;
}
