import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { setErrors } from './error';
import { isObjectEmpty } from '../utils/helper';

import {
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from './types';

// Register
export const registerUser = (userData, history) => async (dispatch) => {
	try {
		await axios.post('/api/auth/register', userData);

		// using await, cause the component login has already clearAlert in first, and the next will give new alert
		await history.push('/login');
		await dispatch(setAlert('Please login to continue', 'info'));
	} catch (err) {
		// this error provide from database (mongoose validation, exp: exist data)
		const errors = err.response.data.error;
		if (errors) {
			const inputError = !isObjectEmpty(errors.details) ? errors.details : {};
			dispatch(setErrors(inputError));

			const message = errors.message ? errors.message : "";
			dispatch(setAlert(message, 'danger'));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Login - Get User Token
export const loginUser = userData => async dispatch => {
	try {
		const res = await axios.post('/api/auth/login', userData);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.error;
		if (errors) {
			const message = errors.message ? errors.message : "";
			dispatch(setAlert(message, 'danger'));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	};
}

export const loadUser = () => async dispatch => {
	if (localStorage.jwtToken) {
		setAuthToken(localStorage.jwtToken);
	}

	try {
		const res = await axios.get('/api/auth/me');
		if (res.data) {
			// note: the axios response store on data obj, and the standard format for api response store on data obj too
			const userData = !isObjectEmpty(res.data.data) ? res.data.data : {};
			dispatch({
				type: USER_LOADED,
				payload: userData
			});
		}
	} catch (err) {
		/* ITS NOT RECOMMENDED TO SHOW THIS ERROR, CAUSE ITS WILL SHOW ON EVERY PAGE WHICH IS NOT HAVE SUCCESS AUTH, EXP: LANDING PAGE */
		// const errors = err.response.data.error;
		// if (errors) {
		// 	const message = errors.message ? errors.message : "";
		// 	dispatch(setAlert(message, 'danger'));
		// }
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Logout 
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};
