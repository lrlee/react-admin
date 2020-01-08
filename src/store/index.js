import {combineReducers,createStore} from 'redux';
import {reducer} from '@/views/Login/store'

const _store = createStore(reducer)
export const store = _store;