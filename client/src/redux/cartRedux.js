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
			state.quantity -= 1;
			state.total = 20;
		},
		
		// updateAmount: (state, action)=>{
		// 	if(action.payload.quantity <= 0) {
		// 		action.payload.quantity =1;
		// 	}
		// 	const id =action.payload.id;
		// 	const type = action.payload.type;
		// 	const index = state.products.findIndex(p=> p._id === id);
		// 	const currentProduct = state.products[index];
		// 	if(type === 'up') {
		// 		currentProduct.quantity += 1;
		// 		state.total += currentProduct.price;
		// 	}
		// 	if(type === 'down'&& state.products[index].quantity>1 ) {
		// 		currentProduct.quantity -= 1;
		// 		state.total -= currentProduct.price;
		// 	}

		// 	if(type === 'updateQuantity') {
		// 		if(currentProduct.quantity > action.payload.quantity){
		// 			state.total += (currentProduct.quantity - action.payload.quantity) * currentProduct.price;
		// 		}else {
		// 			state.total -= (currentProduct.quantity - action.payload.quantity) * currentProduct.price;

		// 		}

		// } 
		
	// }  


},
});

export const { addProduct , removeProduct ,updateAmount } = cartSlice.actions;
export default cartSlice.reducer;
