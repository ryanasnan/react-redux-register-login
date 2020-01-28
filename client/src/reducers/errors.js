import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ERRORS:
			return payload;
		case CLEAR_ERRORS:
			return payload;
		default:
			return state;
	}
}
