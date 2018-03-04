import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './styles/index.css';
import configureStore from './store/configureStore';
import Universe from './components/Universe';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Universe />
  </Provider>,
  document.getElementById('app'),
);
