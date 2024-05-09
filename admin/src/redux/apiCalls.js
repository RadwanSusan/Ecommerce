import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest, userRequest } from '../requestMethods';
import { jwtDecode } from 'jwt-decode';
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
} from './productRedux';
import {
	getOfferStart,
	getOfferSuccess,
	getOfferFailure,
	addOfferStart,
	addOfferSuccess,
	addOfferFailure,
	deleteOfferStart,
	deleteOfferSuccess,
	deleteOfferFailure,
	updateOfferStart,
	updateOfferSuccess,
	updateOfferFailure,
} from './offerRedux';
import {
	getUserStart,
	getUserSuccess,
	getUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	addUserStart,
	addUserSuccess,
	addUserFailure,
} from './userAllRedux';

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post('/auth/login', user);
		// Redirect based on role
		if (res.data.role === 'superAdmin') {
			dispatch(loginSuccess(res.data));
			setTimeout(() => {
				window.location.href = '/';
			}, 1000); // Redirect super admin to home/dashboard after 1 second
		} else if (
			res.data.role === 'supplierType1' ||
			res.data.role === 'supplierType2'
		) {
			localStorage.setItem('supplierId', res.data._id);
			dispatch(loginSuccess(res.data));
			setTimeout(() => {
				window.location.href = '/products';
			}, 1000); // Redirect supplier type 1 to products after 1 second
		} else {
			dispatch(loginFailure());
			setTimeout(() => {
				window.location.href = '/login';
			}, 1000); // Redirect unauthorized/logged-out users to login after 1 second
		}
	} catch (err) {
		dispatch(loginFailure());
	}
};
export const logoutUser = () => {
	localStorage.removeItem('persist:root');
	localStorage.removeItem('supplierId');
	window.location.href = '/login';
};

export const getProducts = async (dispatch, supplierId) => {
	dispatch(getProductStart());
	try {
		const url = supplierId
			? `/products/adminsupplier?supplierId=${supplierId}`
			: '/products/adminsupplier';
		const res = await publicRequest.get(url);
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
		const res = await userRequest.put(`/products/${id}`, product);
		dispatch(updateProductSuccess(res.data));
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
export const getUser = async (dispatch) => {
	dispatch(getUserStart());
	try {
		const res = await userRequest.get('/users');
		dispatch(getUserSuccess(res.data));
	} catch (err) {
		dispatch(getUserFailure());
		console.error(err);
	}
};
export const deleteUser = async (id, dispatch) => {
	const res = await userRequest.delete(`/users/${id}`);
	dispatch(deleteUserStart());
	try {
		dispatch(deleteUserSuccess(id));
	} catch (err) {
		dispatch(deleteUserFailure());
	}
};
export const updateUser = async (id, user, dispatch) => {
	dispatch(updateUserStart());
	try {
		const res = await userRequest.put(`/users/${id}`, user);
		dispatch(updateUserSuccess(res.data));
	} catch (err) {
		dispatch(updateUserFailure());
	}
};
export const addUser = async (user, dispatch) => {
	dispatch(addUserStart());
	try {
		const res = await userRequest.post(`/auth/register`, user);
		dispatch(addUserSuccess(res.data));
	} catch (err) {
		dispatch(addUserFailure());
	}
};
export const getOffer = async (dispatch) => {
	dispatch(getOfferStart());
	try {
		const res = await userRequest.get(`/offer`);
		dispatch(getOfferSuccess(res.data));
	} catch (err) {
		dispatch(getOfferFailure());
		console.error(err);
	}
};
export const addOffer = async (offer, dispatch) => {
	dispatch(addOfferStart());
	try {
		const res = await userRequest.post(`/offer`, offer);
		dispatch(addOfferSuccess(res.data));
	} catch (err) {
		dispatch(addOfferFailure());
	}
};
export const deleteOffer = async (id, dispatch) => {
	const res = await userRequest.delete(`/offer/${id}`);
	dispatch(deleteOfferStart());
	try {
		dispatch(deleteOfferSuccess(id));
	} catch (err) {
		dispatch(deleteOfferFailure());
	}
};
export const updateOffer = async (id, offer, dispatch) => {
	dispatch(updateOfferStart());
	try {
		const res = await userRequest.put(`/offer/${id}`, offer);
		dispatch(updateOfferSuccess(res.data));
	} catch (err) {
		dispatch(updateOfferFailure());
	}
};
export const addAllProduct = async (product) => {
	try {
		const inputArray = [
			[
				'_id',
				'title',
				'desc',
				'img',
				'categories',
				'size',
				'color',
				'price',
				'originPrice',
				'inStock',
				'quantity',
				'width',
				'height',
				'length',
				'weight',
			],
		];
		const keys = product[0];
		const result = product.slice(1).map((row) => {
			return row.reduce((acc, value, index) => {
				acc[keys[index]] = value;
				return acc;
			}, {});
		});
		result.forEach((element) => {
			delete element._id;
		});
		result.forEach((element) => {
			try {
				const res = userRequest.post(`/products`, element);
			} catch (error) {
				console.error(error);
			}
		});
		console.error(result);
	} catch (err) {
		console.error(err);
	}
};
export const addAllOffer = async (offer) => {
	try {
		const inputArray = [
			[
				'_id',
				'title',
				'desc',
				'img',
				'categories',
				'size',
				'color',
				'price',
				'originPrice',
				'inStock',
				'quantity',
				'timeStart',
				'timeEnd',
				'offerPrice',
				'width',
				'height',
				'length',
				'weight',
			],
		];
		const keys = offer[0];
		const result = offer.slice(1).map((row) => {
			return row.reduce((acc, value, index) => {
				acc[keys[index]] = value;
				return acc;
			}, {});
		});
		result.forEach((element) => {
			delete element._id;
		});
		result.forEach((element) => {
			try {
				const res = userRequest.post(`/offer`, element);
			} catch (error) {
				console.error(error);
			}
		});
		console.error(result);
	} catch (err) {
		console.error(err);
	}
};
export const TokenValidator = ({ children, logOut }) => {
	const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
	const currentUser = user && JSON.parse(user).currentUser;
	const TOKEN = currentUser?.accessToken;
	const checkTokenValidity = () => {
		if (TOKEN) {
			const decodedToken = jwtDecode(TOKEN);
			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
				localStorage.removeItem('persist:root');
				window.location.reload();
			}
		}
	};
	setTimeout(checkTokenValidity, 3600000);
	setInterval(checkTokenValidity, 3600000);
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
export const addAllProduct2 = async (products, dispatch) => {
	dispatch(addProductStart());
	try {
		const res = await userRequest.post('/products/bulk', products);
		dispatch(addProductSuccess(res.data));
	} catch (err) {
		dispatch(addProductFailure());
	}
};
