import { createSlice } from "@reduxjs/toolkit";

export const userAllSlice = createSlice({
	name: "userAll",
	initialState: {
		currentUser: null,
		usersAll: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL
		getUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getUserSuccess: (state, action) => {
			state.isFetching = false;
			state.usersAll = action.payload;
		},
		getUserFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//DELETE
		deleteUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteUserSuccess: (state, action) => {
			state.isFetching = false;
			state.usersAll = state.usersAll.filter(
				(user) => user._id !== action.payload,
			);
		},
		deleteUserFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//UPDATE
		updateUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateUserSuccess: (state, action) => {
			state.isFetching = false;
			state.usersAll = state.usersAll.map((user) =>
				user._id === action.payload._id ? action.payload : user,
			);
		},
		updateUserFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//ADD
		addUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		addUserSuccess: (state, action) => {
			state.isFetching = false;
			state.usersAll.push(action.payload);
		},
		addUserFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getUserStart,
	getUserSuccess,
	getUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	addUserStart,
	addUserSuccess,
	addUserFailure,
} = userAllSlice.actions;
export default userAllSlice.reducer;
