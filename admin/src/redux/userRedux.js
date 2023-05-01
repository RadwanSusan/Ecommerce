import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    // users: [],
    // username: "",

    isFetching: false,
    error: false,
  },
  reducers: {
    // login
    loginStart: (state) => {
		  state.isFetching = true;
      state.error = false;

		  
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
		state.currentUser = action.payload;
      state.error = false;

		
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
} = userSlice.actions;
export default userSlice.reducer;
