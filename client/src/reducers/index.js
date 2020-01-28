import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import alert from './alert';

export default combineReducers({
	alert,
	auth,
	errors
});
