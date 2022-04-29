import React from "react";
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducers';

import App from './App';
import './index.css';

// const store = createStore(reducer, compose(applyMiddleware(thunk)));
const store = configureStore({ reducer: reducer })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);