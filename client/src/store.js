import { createStore, applyMiddleware } from 'redux'
import authReducer from './reducers/AuthReducer'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

const middleWare = [thunk];

const initialState = {};

const Store = createStore(
    authReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default Store;