import { createSlice } from "@reduxjs/toolkit";

export const offerSlice = createSlice({
  name: "offer",
  initialState: {
    offer: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOfferStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOfferSuccess: (state, action) => {
      state.isFetching = false;
      state.offer = action.payload;
    },
    getOfferFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
}});


export const {
    getOfferStart,
    getOfferSuccess,
    getOfferFailure,
  } = offerSlice.actions;
  
  export default offerSlice.reducer;