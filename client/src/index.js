import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import thunk from  'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from 'redux';
import rootReducers from './store/reducers/rootReducers';

const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
