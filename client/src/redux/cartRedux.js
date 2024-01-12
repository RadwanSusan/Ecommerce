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
					product?._id === newProduct?._id &&
					product.selectedVariant?._id === newProduct.selectedVariant?._id,
			);
			if (existingProduct) {
				existingProduct.quantity += newProduct.quantity;
			} else {
				state.products.push(newProduct);
			}
			state.total = state.products.reduce(
				(total, product) => total + product.price * product.quantity,
				0,
			);
		},
		removeProduct: (state, action) => {
			const { productId, variantId } = action.payload;
			state.products = state.products.filter(
				(item) =>
					item._id !== productId || item.selectedVariant._id !== variantId,
			);
		},
		increase: (state, action) => {
			const variantId = action.payload;
			const cartItem = state.products.findIndex(
				(item) => item.selectedVariant._id === variantId,
			);
			state.products[cartItem].quantity += 1;
		},
		decrease: (state, action) => {
			const variantId = action.payload;
			const cartItem = state.products.findIndex(
				(item) => item.selectedVariant._id === variantId,
			);
			state.products[cartItem].quantity -= 1;
		},
		clear: (state) => {
			state.products = [];
			state.total = 0;
		},
		reset: (state, action) => {
			const variantId = action.payload;
			const cartItem = state.products.findIndex(
				(item) => item.selectedVariant._id === variantId,
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
