import { DEPLOY_UNIVERSE, CREATE_UNIVERSE_CELL_DATA, TOGGLE_ACTIVE } from './actionTypes';

export function deployUniverse(width, height) {
  return { type: DEPLOY_UNIVERSE, width, height };
}

export function createUniverseCell(cells) { 
  return (dispatch) => { 
    dispatch({ type: CREATE_UNIVERSE_CELL_DATA, cells});
  };
}

export function toggleActive(toggle) { 
  return (dispatch) => { 
    dispatch({ type: TOGGLE_ACTIVE, universeActive: toggle });
  }
}

export function discoverUniverse(width, height) {
  return (dispatch) => {
    dispatch(deployUniverse(width, height));
  };
}
