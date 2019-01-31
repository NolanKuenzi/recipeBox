import { createStore } from 'redux';
import RootReducer from '../reducers/index';

const store = state => createStore(RootReducer, state);
export default store;
