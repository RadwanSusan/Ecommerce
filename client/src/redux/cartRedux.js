import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		// addProduct: (state, action) => {
		// 	const newProduct = action.payload;
		// 	const existingProduct = state.products.find(
		// 		(product) =>
		// 			product?._id === newProduct?._id &&
		// 			JSON.stringify(product.selectedVariant) ===
		// 				JSON.stringify(newProduct.selectedVariant),
		// 	);
		// 	if (existingProduct) {
		// 		existingProduct.quantity += newProduct.quantity;
		// 	} else {
		// 		state.products.push(newProduct);
		// 	}
		// 	state.total = state.products.reduce(
		// 		(total, product) => total + product.price * product.quantity,
		// 		0,
		// 	);
		// },
		addProduct: (state, action) => {
			const newProduct = action.payload;
			const existingProductIndex = state.products.findIndex(
				(product) =>
					product?._id === newProduct?._id &&
					JSON.stringify(product.selectedVariant) ===
						JSON.stringify(newProduct.selectedVariant),
			);
			if (existingProductIndex !== -1) {
				state.products[existingProductIndex].quantity +=
					newProduct.quantity;
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
			const productIndex = state.products.findIndex(
				(item) => item._id === productId,
			);
			if (productIndex !== -1) {
				const product = state.products[productIndex];
				const variantIndex = product.selectedVariant.findIndex(
					(variant) => variant._id === variantId._id,
				);
				if (variantIndex !== -1) {
					product.selectedVariant.splice(variantIndex, 1);
					if (product.selectedVariant.length === 0) {
						state.products.splice(productIndex, 1);
					}
				}
			}
		},
		increase: (state, action) => {
			const { productId, variantId, maxQuantity } = action.payload;
			const cartItem = state.products.find(
				(item) =>
					item._id === productId && item.selectedVariant._id === variantId,
			);
			if (cartItem && cartItem.quantity < maxQuantity) {
				cartItem.quantity += 1;
			}
		},
		decrease: (state, action) => {
			const { productId, variantId } = action.payload;
			const cartItem = state.products.find(
				(item) =>
					item._id === productId && item.selectedVariant._id === variantId,
			);
			if (cartItem && cartItem.quantity > 1) {
				cartItem.quantity -= 1;
			}
		},
		clear: (state) => {
			state.products = [];
			state.total = 0;
		},
		reset: (state, action) => {
			const { productId, variantId } = action.payload;
			const cartItem = state.products.find(
				(item) =>
					item._id === productId && item.selectedVariant._id === variantId,
			);
			if (cartItem) {
				cartItem.quantity = 1;
			}
		},
		getAllProduct: (state) => {
			let cartProducts = state.products;
			state.cartProducts = cartProducts;
		},
		calc: (state) => {
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
