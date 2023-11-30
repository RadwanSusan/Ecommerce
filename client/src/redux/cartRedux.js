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
			const newProduct = action.payload;
			const existingProduct = state.products.find(
				(product) =>
					product._id === newProduct._id &&
					product.selectedVariant._id === newProduct.selectedVariant._id,
			);
			if (existingProduct) {
				// Variant is already in cart, update its quantity
				existingProduct.quantity += newProduct.quantity;
			} else {
				// Variant is not in cart, add it
				state.products.push(newProduct);
			}
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
