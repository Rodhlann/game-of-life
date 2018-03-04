import { DEPLOY_UNIVERSE } from './actionTypes';

export function deployUniverse(width, height) {
  return { type: DEPLOY_UNIVERSE, width, height };
}

export function discoverUniverse(width, height) {
  return (dispatch) => {
    dispatch(deployUniverse(width, height));
  };
}
