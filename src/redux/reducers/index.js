import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import timeReducer from './timeReducer';


export default combineReducers({
    counter: counterReducer,
    time: timeReducer
});