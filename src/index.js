import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import store from "./common/movie-store";
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <Controller />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
