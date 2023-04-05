import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			state.total += action.payload.price * action.payload.quantity;
		},
		removeProduct: (state, action) => {
			const itemId = action.payload;
			state.products= state.products.filter((item)=>item._id !== itemId);
		},
	},
});

export const { addProduct , removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
