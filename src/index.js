import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './expics/index'

const epicMiddleware = createEpicMiddleware()

const store = createStore(reducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
