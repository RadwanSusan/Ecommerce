import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			console.debug(
				`🚀  file: cartRedux.js:14  action.payload =>`,
				action.payload,
			);
			state.total += action.payload.price * action.payload.quantity;
		},
		removeProduct: (state, action) => {
			const itemId = action.payload;
			state.products = state.products.filter((item) => item._id !== itemId);
			state.quantity -= 1;
			state.total = 20;
		},
		increase: (state, action) => {
			const cartItem = state.products.findIndex(
				(item) => item._id === action.payload,
			);
			state.products[cartItem].quantity += 1;
		},
		decrease: (state, action) => {
			const cartItem = state.products.findIndex(
				(item) => item._id === action.payload,
			);
			if (state.products[cartItem].quantity > 1) {
				state.products[cartItem].quantity -= 1;
			}
		},
		clear: (state) => {
			state.products = [];
			state.total = 0;
		},
		reset: (state, action) => {
			const cartItem = state.products.findIndex(
				(item) => item._id === action.payload,
			);
			state.products[cartItem].quantity = 1;
		},
		getAllProduct: (state) => {
			let cartProducts = state.products;
			state.cartProducts = cartProducts;
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
		},
	},
});

export const {
	addProduct,
	removeProduct,
	increase,
	decrease,
	calc,
	reset,
	getAllProduct,
	clear,
} = cartSlice.actions;
export default cartSlice.reducer;
