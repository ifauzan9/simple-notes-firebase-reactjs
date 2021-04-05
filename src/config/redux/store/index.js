// React-redux
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducer';


export const storeNew = createStore(rootReducer, applyMiddleware(thunk));