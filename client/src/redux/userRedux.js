import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
		username: '',
	},
	reducers: {
		loginStart: (state, action) => {
			state.isFetching = true;
			state.error = false;
			state.username = action.payload;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
		},
		loginFailure: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});
export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
