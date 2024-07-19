import { combineReducers, createStore } from 'redux';
import pageReducer from './pageReducer';

const reducers = combineReducers({
    page: pageReducer,
});
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
