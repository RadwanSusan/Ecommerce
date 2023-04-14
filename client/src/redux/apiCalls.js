import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const logoutUser = () => {
	localStorage.removeItem("persist:root");
	window.location.href = "/";
};

export const updateProductOrOffer = async (product, productId) => {
	try {
		const res = await publicRequest.put(`/offer/${productId}`, product);
		const res1 = await publicRequest.put(`/products/${productId}`, product);
		return res.data || res1.data;
	} catch (err) {
		console.log(err);
	}
};
