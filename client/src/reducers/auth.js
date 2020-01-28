import {
	USER_LOADED,
	LOGIN_SUCCESS,
	REGISTER_FAIL,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGOUT,
	ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
	isAuthenticated: false,
	loading: true,
	user: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('jwtToken', payload.token);
			return {
				...state,
				...payload,
				loading: false,
				isAuthenticated: true
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('jwtToken');
			return {
				...state,
				token: null,
				loading: false,
				isAuthenticated: false,
			};
		default:
			return state;
	}
}
