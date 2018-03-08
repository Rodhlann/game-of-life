import * as actionTypes from './actionTypes';

/**
  * Toggle universe on/off
  * @param {bool} toggle represents the new state of the universe
  */
export function toggleActive(toggle) {
  return (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_ACTIVE, universeActive: toggle });
  };
}

/**
  * Batch update all statuses
  * @param {array} universeCellStatuses 2D array representing the state of all cells in the universe
  */
export function updateAllStatuses(universeCellStatuses) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ALL_STATUSES, universeCellStatuses });
  };
}

/**
  * Toggle the state of a cell
  * @param {number} rowIndex y index of the universe
  * @param {number} cellIndex x index of the universe
  * @param {array} universeCellStatuses 2D array representing the state of all cells in the universe
  */
export function toggleStatus(rowIndex, cellIndex, universeCellStatuses) {
  const tmpArray = universeCellStatuses;
  tmpArray[rowIndex][cellIndex] = !universeCellStatuses[rowIndex][cellIndex];
  return (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_STATUS, universeCellStatuses: tmpArray });
  };
}

/**
  * Updates the width of the universe
  * @param {number} width represents new user input
  * @param {number} height  represents the current height of the universe
  */
export function updateUniverseWidth(width, height) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_WIDTH,
      width,
      universeCellStatuses: [...Array(height).fill(false)].map(() => Array(width).fill(false)),
    });
  };
}

/**
  * Updates the height of the universe
  * @param {number} width represents the current width of the universe
  * @param {number} height  represents new user input
  */
export function updateUniverseHeight(width, height) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_HEIGHT,
      height,
      universeCellStatuses: [...Array(height).fill(false)].map(() => Array(width).fill(false)),
    });
  };
}

/**
  * Generate initial 2D array representation of the universe
  * @param {number} width the width of the universe
  * @param {number} height the height of the universe
  */
export function addUniverseCellStatuses(width, height) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_UNIVERSE_CELLS,
      universeCellStatuses: [...Array(height).fill(false)].map(() => Array(width).fill(false)),
    });
  };
}
