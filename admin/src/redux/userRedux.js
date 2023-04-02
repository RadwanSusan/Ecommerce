import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		user: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		// login
		loginStart: (state) => {
			state.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
		},
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		// get user
		// getUserStart: (state) => {
		// 	state.isFetching = true;
		// },
		// getUserSuccess: (state, action) => {
		// 	state.isFetching = false;
		// 	state.currentUser = action.payload;
		// },
		// getUserFailure: (state) => {
		// 	state.isFetching = false;
		// 	state.error = true;
		// },
		// // delete user
		// deleteUserStart: (state) => {
		// 	state.isFetching = true;
		// 	state.error = false;
		// },
		// deleteUserSuccess: (state, action) => {
		// 	state.isFetching = false;
		// 	state.users.splice(
		// 		state.users.findIndex((item) => item._id === action.payload._id),
		// 		1,
		// 	);
		// },
		// deleteUserFailure: (state) => {
		// 	state.isFetching = false;
		// 	state.error = true;
		// },
		// // update user
		// updateUserStart: (state) => {
		// 	state.isFetching = true;
		// 	state.error = false;
		// },
		// updateUserSuccess: (state, action) => {
		// 	state.isFetching = false;
		// 	state.users[
		// 		state.users.findIndex((item) => item._id === action.payload._id)
		// 	] = action.payload;
		// },
		// updateUserFailure: (state) => {
		// 	state.isFetching = false;
		// 	state.error = true;
		// },
		// // add user
		// addUserStart: (state) => {
		// 	state.isFetching = true;
		// 	state.error = false;
		// },
		// addUserSuccess: (state, action) => {
		// 	state.isFetching = false;
		// 	state.users.push(action.payload);
		// },
		// addUserFailure: (state) => {
		// 	state.isFetching = false;
		// 	state.error = true;
		// },
		// // logout
		// logout: (state) => {
		// 	state.currentUser = null;
		// },
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	getUserStart,
	getUserSuccess,
	getUserFailure,
	// deleteUserStart,
	// deleteUserSuccess,
	// deleteUserFailure,
	// updateUserStart,
	// updateUserSuccess,
	// updateUserFailure,
	// addUserStart,
	// addUserSuccess,
	// addUserFailure,
	// logout,
} = userSlice.actions;
export default userSlice.reducer;
