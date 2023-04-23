import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post('/auth/login', user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const logoutUser = () => {
	localStorage.removeItem('persist:root');
	window.location.href = '/';
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

export const addToCart = async (product) => {
	try {
		const res = await publicRequest.post('/carts', product);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const addOrder = async (order) => {
	try {
		const res = await publicRequest.post('/orders', order);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};
export const wishlist = async (id) => {
	let userId = localStorage.getItem('persist:root');
	userId = JSON.parse(userId);
	userId = userId.user;
	userId = JSON.parse(userId);
	userId = userId.currentUser._id;
	try {
		const res = await publicRequest.get(`users/wishlist/${userId}?pid=${id}`);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};
export const wishlistCheek = async (id, userId) => {
	//   let userId = localStorage.getItem("persist:root");
	//   userId = JSON.parse(userId);
	//   userId = userId.user;
	//   userId = JSON.parse(userId);
	//   userId = userId.currentUser._id;
	try {
		const res = await publicRequest.get(
			`users/is-available/${userId}?value=${id}`,
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const userWishListArrayGet = async (id) => {
	try {
		const res = await publicRequest.get(`users/userWishListArray/${id}`);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};
