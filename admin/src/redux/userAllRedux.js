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
	},
});

export const {
	getUserStart,
	getUserSuccess,
	getUserFailure,
} = userAllSlice.actions;
export default userAllSlice.reducer;

