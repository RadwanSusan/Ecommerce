import {
	loginFailure,
	loginStart,
	loginSuccess,
	getUserStart,
	getUserSuccess,
	getUserFailure,
	// deleteUserStart,
	// deleteUserSuccess,
	// deleteUserFailure,
	// updateUserStart,
	// updateUserSuccess,
	// updateUserFailure,
	// addUserStart,
	// addUserSuccess,
	// addUserFailure,
	// logout,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	deleteProductFailure,
	deleteProductStart,
	deleteProductSuccess,
	updateProductFailure,
	updateProductStart,
	updateProductSuccess,
	addProductFailure,
	addProductStart,
	addProductSuccess,
} from "./productRedux";
import {
	getOfferStart,
	getOfferSuccess,
	getOfferFailure,
} from "./offerRedux";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};
//////////////////////////Products////////////////////////////
export const getProducts = async (dispatch) => {
	dispatch(getProductStart());
	try {
		const res = await publicRequest.get("/products");
		dispatch(getProductSuccess(res.data));
	} catch (err) {
		dispatch(getProductFailure());
	}
};

export const deleteProduct = async (id, dispatch) => {
	const res = await userRequest.delete(`/products/${id}`);
	dispatch(deleteProductStart());
	try {
		dispatch(deleteProductSuccess(id));
	} catch (err) {
		dispatch(deleteProductFailure());
	}
};

export const updateProduct = async (id, product, dispatch) => {
	dispatch(updateProductStart());
	try {
		dispatch(updateProductSuccess({ id, product }));
	} catch (err) {
		dispatch(updateProductFailure());
	}
};
export const addProduct = async (product, dispatch) => {
	dispatch(addProductStart());
	try {
		const res = await userRequest.post(`/products`, product);
		dispatch(addProductSuccess(res.data));
	} catch (err) {
		dispatch(addProductFailure());
	}
};
////////////////////////////User//////////////////////////
export const getUser = async (dispatch) => {
	dispatch(getUserStart());
	try {
		const res = await userRequest.get(`/users`);
		dispatch(getUserSuccess(res.data));
	} catch (err) {
		dispatch(getUserFailure());
		console.log(err);
	}
};

// export const deleteUser = async (id, dispatch) => {
// 	const res = await userRequest.delete(`/users/${id}`);
// 	dispatch(deleteUserStart());
// 	try {
// 		dispatch(deleteUserSuccess(id));
// 	} catch (err) {
// 		dispatch(deleteUserFailure());
// 	}
// };

// export const updateUser = async (id, user, dispatch) => {
// 	dispatch(updateUserStart());
// 	try {
// 		const res = await userRequest.put(`/users/${id}`, user);
// 		dispatch(updateUserSuccess(res.data));
// 	} catch (err) {
// 		dispatch(updateUserFailure());
// 	}
// };

// export const addUser = async (user, dispatch) => {
// 	dispatch(addUserStart());
// 	try {
// 		const res = await userRequest.post(`/users`, user);
// 		dispatch(addUserSuccess(res.data));
// 	} catch (err) {
// 		dispatch(addUserFailure());
// 	}
// };
//////////////////////////////////////////////////////
export const getOffer = async (dispatch) => {
		dispatch(getOfferStart());
		try {
			const res = await userRequest.get(`/offer`);
			dispatch(getOfferSuccess(res.data));
		} catch (err) {
			dispatch(getOfferFailure());
			console.log(err);
		}
	};
	