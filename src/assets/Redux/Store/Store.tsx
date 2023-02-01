import { createStore, combineReducers } from 'redux';
import { composeEnhancers } from '../window';
import LoginReducer from './../Reducers/';

const store = createStore(
	combineReducers({
		login: LoginReducer,
	}),
	composeEnhancers()
);

export default store