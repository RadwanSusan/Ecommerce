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
		// addOffer
		addOfferStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		addOfferSuccess: (state, action) => {
			state.isFetching = false;
			state.offer.push(action.payload);
		},
		addOfferFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//DELETE
		deleteOfferStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteOfferSuccess: (state, action) => {
			state.isFetching = false;
			state.offer = state.offer.filter((offer) => offer._id !== action.payload);
		},
		deleteOfferFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		//UPDATE offer
		updateOfferStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateOfferSuccess: (state, action) => {
			state.isFetching = false;
			state.offer = state.offer.map((offer) =>
				offer._id === action.payload._id ? action.payload : offer,
			);
		},
		updateOfferFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getOfferStart,
	getOfferSuccess,
	getOfferFailure,
	addOfferStart,
	addOfferSuccess,
	addOfferFailure,
	deleteOfferStart,
	deleteOfferSuccess,
	deleteOfferFailure,
	updateOfferStart,
	updateOfferSuccess,
	updateOfferFailure,
} = offerSlice.actions;

export default offerSlice.reducer;
