import { SET_ALERT, CLEAR_ALERT } from './types';

export const setAlert = (message, type) => dispatch =>
	dispatch({
		type: SET_ALERT,
		payload: { message, type }
	});
;

export const clearAlert = () => dispatch => 
	dispatch({
		type: CLEAR_ALERT,
		payload: {}
	});
;