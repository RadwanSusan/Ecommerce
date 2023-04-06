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
		// increase:(state,{payload})=>{
		// 	const cartItem = state.products.find((item)=>item.id===payload.id);
		// 	products.quantity = products.quantity+1; 
		// }
		
	},
});

export const { addProduct , removeProduct , increase , decrease } = cartSlice.actions;
export default cartSlice.reducer;
