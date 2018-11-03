import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './expics/index'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
