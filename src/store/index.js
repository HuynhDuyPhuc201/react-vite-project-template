import { combineReducers, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageReducer';

// const reducers = combineReducers({
//     page: pageReducer,
// });
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// reudx toolkit

const store = configureStore({
    reducer: {
        page: pageReducer,
    },
    // devTools: DEBUG,
});

export default store;
