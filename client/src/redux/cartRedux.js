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
		// 	const existingProductIndex = state.products.findIndex(
		// 		(product) =>
		// 			product?._id === newProduct?._id &&
		// 			JSON.stringify(product.selectedVariant) ===
		// 				JSON.stringify(newProduct.selectedVariant),
		// 	);
		// 	if (existingProductIndex !== -1) {
		// 		state.products[existingProductIndex].quantity +=
		// 			newProduct.quantity;
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
			state.total = state.products.reduce((total, product) => {
				if (product.type === 'simple') {
					return total + product.price * product.quantity;
				} else if (product.type === 'variable' && product.selectedVariant) {
					return total + product.selectedVariant.price * product.quantity;
				}
				return total;
			}, 0);
		},
		removeProduct: (state, action) => {
			const { productId, variantId } = action.payload;
			state.products = state.products.filter(
				(item) =>
					item._id !== productId ||
					(item.type === 'variable' &&
						item.selectedVariant?._id !== variantId),
			);
		},

		increase: (state, action) => {
			const { productId, variantId, maxQuantity } = action.payload;
			const cartItem = state.products.find(
				(item) =>
					item._id === productId &&
					(item.type === 'simple' ||
						item.selectedVariant?._id === variantId),
			);
			if (cartItem && cartItem.quantity < maxQuantity) {
				cartItem.quantity += 1;
			}
		},

		decrease: (state, action) => {
			const { productId, variantId } = action.payload;
			const cartItem = state.products.find(
				(item) =>
					item._id === productId &&
					(item.type === 'simple' ||
						item.selectedVariant?._id === variantId),
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
					item._id === productId &&
					(item.type === 'simple' ||
						item.selectedVariant?._id === variantId),
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
			console.log('here is the state', state.products);
			let { total, quantity } = state.products.reduce(
				(cartTotal, cartItem) => {
					let itemTotal;
					if (cartItem.type === 'simple') {
						itemTotal = cartItem.price * cartItem.quantity;
					} else if (cartItem.type === 'variable') {
						itemTotal =
							cartItem.selectedVariant.price * cartItem.quantity;
					}
					cartTotal.total += itemTotal;
					cartTotal.quantity += cartItem.quantity;
					return cartTotal;
				},
				{
					total: 0,
					quantity: 0,
				},
			);
			state.total = total;
			state.quantity = quantity;
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
