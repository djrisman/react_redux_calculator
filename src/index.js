import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cal from './Cal';
import * as serviceWorker from './serviceWorker';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import calculateReducer from './Reducers/calculate-reducer';
import userReducer from './Reducers/user-reducer';

const allReducers = combineReducers({
    theValue : calculateReducer,
    user: userReducer
});

const store = createStore(
    allReducers,
    {
      theValue:"0",
      user: "risman"
    },
    window.devToolsExtension && window.devToolsExtension()
  );

console.log(store.getState())


ReactDOM.render(<Provider store={store}> <Cal  aRandomProps= "testing" /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
