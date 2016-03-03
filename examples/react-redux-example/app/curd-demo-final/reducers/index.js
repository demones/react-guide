import {combineReducers} from 'redux';
import persons from './persons';
import tabs from './tabs';

export default combineReducers({
  persons,
  tabs
});
