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

/** we can get all data from the store by the function getStore , or it encapsulate on the function useSeletctor() from the redux 
 * if you like see at the component Form.
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);