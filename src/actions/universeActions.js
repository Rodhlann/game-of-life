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

// TEST CODE
// export function toggleAllStatuses(universeCellStatuses) {
//   const tmpArray = universeCellStatuses;
//   for (let i = 0; i < tmpArray.length; i += 1) {
//     tmpArray[i] = !universeCellStatuses[i];
//   }
//   return (dispatch) => {
//     dispatch({ type: actionTypes.TOGGLE_STATUS, universeCellStatuses: tmpArray });
//   };
// }

export function toggleStatus(rowIndex, cellIndex, universeCellStatuses) {
  const tmpArray = universeCellStatuses;
  tmpArray[rowIndex][cellIndex] = !universeCellStatuses[rowIndex][cellIndex];
  return (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_STATUS, universeCellStatuses: tmpArray });
  };
}

export function updateUniverseWidth(width, height) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_WIDTH,
      width,
      universeCellStatuses: [...Array(width).fill(false)].map(() => Array(height).fill(false)),
    });
  };
}

export function updateUniverseHeight(width, height) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_HEIGHT,
      height,
      universeCellStatuses: [...Array(width).fill(false)].map(() => Array(height).fill(false)),
    });
  };
}

export function addUniverseCellStatuses(width, height) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_UNIVERSE_CELLS,
      universeCellStatuses: [...Array(width).fill(false)].map(() => Array(height).fill(false)),
    });
  };
}
