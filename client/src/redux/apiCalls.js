import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../requestMethods';
import { decode as jwtDecode } from 'jsonwebtoken';
export const login = async (dispatch, user) => {
	dispatch(loginStart(user.username));
	try {
		const res = await publicRequest.post('/auth/login', user);
		if (res.data.verified === false) {
			return dispatch(loginFailure());
		}
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};
export const logoutUser = () => {
	localStorage.removeItem('persist:root');
	window.location.href = '/login';
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
export const purchaseSuccessfulEmail = async (email) => {
	try {
		const res = await publicRequest.post('auth/sendEmail', email);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};
export const purchaseSuccessfulEmailAdmin = async () => {
	try {
		const res = await publicRequest.post('auth/sendEmailAdmin');
		return res.data;
	} catch (err) {
		console.log(err);
	}
};
export const TokenValidator = ({ children, logOut }) => {
	const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
	const currentUser = user && JSON.parse(user).currentUser;
	const TOKEN = currentUser?.accessToken;
	if (TOKEN) {
		const decodedToken = jwtDecode(TOKEN);
		const currentTime = Date.now() / 1000;
		if (decodedToken.exp < currentTime) {
			logOut();
			return null;
		}
	}
	return children;
};
setInterval(() => {
	const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
	const currentUser = user && JSON.parse(user).currentUser;
	const TOKEN = currentUser?.accessToken;
	if (TOKEN) {
		const decodedToken = jwtDecode(TOKEN);
		const currentTime = Date.now() / 1000;
		if (decodedToken.exp < currentTime) {
			localStorage.removeItem('persist:root');
			window.location.reload();
		}
	}
}, 3600000);
