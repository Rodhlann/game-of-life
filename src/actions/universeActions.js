import * as actionTypes from './actionTypes';

export function deployUniverse(width, height) {
  return { type: actionTypes.DEPLOY_UNIVERSE, width, height };
}

export function discoverUniverse(width, height) {
  return (dispatch) => {
    dispatch(deployUniverse(width, height));
  };
}

export function createUniverseCell(cells) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_UNIVERSE_CELL_DATA, cells });
  };
}

export function toggleActive(toggle) {
  return (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_ACTIVE, universeActive: toggle });
  };
}

export function toggleStatus(cellId, universeCellStatuses) {
  const tmpArray = universeCellStatuses;
  tmpArray[cellId] = !universeCellStatuses[cellId];
  return (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_STATUS, universeCellStatuses: tmpArray });
  };
}

export function updateUniverseWidth(width, height) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_WIDTH, width, universeCellStatuses: new Array(width * height).fill(false) });
  };
}

export function updateUniverseHeight(width, height) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_HEIGHT, height, universeCellStatuses: new Array(width * height).fill(false) });
  };
}

export function addUniverseCellStatuses(width, height) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_UNIVERSE_CELLS, universeCellStatuses: new Array(width * height).fill(false) });
  };
}
