import { combineReducers } from 'redux';
import universeReducer from './universeReducer';

const rootReducer = combineReducers({
  universeReducer,
});

export default rootReducer;
