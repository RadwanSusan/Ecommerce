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
			state.products = state.products.filter((item) => item._id !== itemId);
			state.quantity -= 1;
			state.total = 20;
		},
		increase: (state, action) => {
			// let prevTotal = state.total;
			const cartItem = state.products.findIndex(
				(item) => item._id === action.payload,
			);
			// cartItem.amount =cartItem.amount + 1;
			// state.quantity+=1;
			state.products[cartItem].quantity += 1;
			// state.total  = (state.products[cartItem].quantity * state.products[cartItem].price) ;
		},
		decrease: (state, action) => {
			const cartItem = state.products.findIndex(
				(item) => item._id === action.payload,
			);
			// cartItem.amount =cartItem.amount + 1;
			// state.quantity+=1;
			// state.total = 40;
			if (state.products[cartItem].quantity > 1) {
				state.products[cartItem].quantity -= 1;
				// state.total  = (state.products[cartItem].quantity * state.products[cartItem].price);
			}
		},
		reset: (state, action) => {
			// let prevTotal = state.total;
			const cartItem = state.products.findIndex(
				(item) => item._id === action.payload,
			);
			// cartItem.amount =cartItem.amount + 1;
			// state.quantity+=1;
			state.products[cartItem].quantity = 1;
			// state.total  = (state.products[cartItem].quantity * state.products[cartItem].price) ;
		},
		calc: (state, action) => {
			let { total, quantity } = state.products.reduce(
				(cartTotal, cartItem) => {
					const { price, quantity } = cartItem;
					const itemTotal = price * quantity;
					cartTotal.total += itemTotal;
					cartTotal.quantity += quantity;
					return cartTotal;
				},
				{
					total: 0,
					quantity: 0,
				},
			);
			state.total = total;
			// state.products
		},
	},
});

export const { addProduct, removeProduct, increase, decrease, calc, reset } =
	cartSlice.actions;
export default cartSlice.reducer;
