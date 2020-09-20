import {combineReducers} from 'redux';
import {globalReducers} from '../modules';
import {Reducer} from 'typesafe-actions';
import {IAppStore} from "../@types/store";

export default function createReducers(
    lazyReducers: {
        [key: string]: Reducer<IAppStore, any>;
    } = {}) {

    return combineReducers({...globalReducers, ...lazyReducers})
}
