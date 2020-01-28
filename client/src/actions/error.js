import { SET_ERRORS, CLEAR_ERRORS } from './types';

export const setErrors = (errors) => dispatch => 
	dispatch({
		type: SET_ERRORS,
		payload: errors
	});

export const clearErrors = () => dispatch => 
	dispatch({
		type: CLEAR_ERRORS,
		payload: {}
	});
;