import {applyMiddleware, compose, createStore as creatReduxStore} from 'redux'
import thunk from 'redux-thunk';
import createReducers from "./reducers";

export default function createStore(initialState = {}) {
    const middlewares = [thunk]
    let composeEnhancers = compose;

    if(process.env.NODE_ENV === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose
    }

    return creatReduxStore(
        createReducers(),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    )
}
