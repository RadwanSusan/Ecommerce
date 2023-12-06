import {
	FavoriteBorderOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { IoGitCompareOutline } from 'react-icons/io5';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { AiOutlineEye, AiFillCloseCircle } from 'react-icons/ai';
import {
	BsHeart,
	BsArrowUpCircle,
	BsArrowDownCircle,
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { wishlist, userWishListArrayGet } from '../redux/apiCalls';
import axios from 'axios';
import { categoriesOffer } from '../data';
import { userRequest } from '../requestMethods';
import * as timeago from 'timeago.js';
import swal from 'sweetalert';
import { addProduct, getAllProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { mobile } from '../responsive';

const Info = styled.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`;

const Container = styled.div`
	flex: 1;
	margin: 5px;
	min-width: 280px;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;
	&:hover ${Info} {
		opacity: 1;
	}
`;

const Circle = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`;

const Image = styled.img`
	height: 75%;
	z-index: 2;
`;

const Icon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;
	transition: all 0.5s ease;
	&:hover {
		background-color: #e9f5f5;
		transform: scale(1.1);
	}
`;

const Product = ({ item }) => {
	const [wishlistLogin, setWishlistLogin] = useState(false);

	const handleWichlist = (id, ele) => {
		if (ele.target.classList[0] === 'add-to-wish' && wishlistLogin == true) {

			ele.target.style.display = 'none';
			ele.target.nextSibling.style.display = 'block';
		}
		if (ele.target.classList[0] === 'add-to-wish2' && wishlistLogin == true) {

			ele.target.parentNode.style.display = 'none';
			ele.target.parentNode.previousSibling.style.display = 'block';
		}
	};

	const addToWishlist = async (productId, identifier, ele) => {
		if (!wishlistLogin) {
			await swal({
				title: 'You have to login !',
				icon: 'warning',
				buttons: true,
				confirmButtonColor: '#42a5f5',
				confirmButtonText: 'Login',
				showCancelButton: true,
				closeOnConfirm: false,
			});
			window.location.href = '/login';
			return;
		}

		let targetElement = ele.target;
		if (targetElement.tagName === 'path') {
			targetElement = targetElement.parentNode;
		}
		const targetClass = targetElement.classList[0];

		try {
			await wishlist(productId, userId);
			if (identifier === 'remove') {
				if (targetClass === 'add-to-wish2') {
					targetElement.style.display = 'none';
					targetElement.previousSibling.style.display = 'block';
				}
				swal('Success', 'Product removed from wishlist!', 'success');
			} else if (identifier === 'addCatog') {
				if (targetClass === 'add-to-wish') {
					targetElement.style.display = 'none';
					targetElement.nextSibling.children[0].style.display = 'block';
					targetElement.nextSibling.style.display = 'block';
				}
				swal('Success', 'Product added to wishlist!', 'success');
			}
		} catch (error) {
			swal('Error', 'Something went wrong', 'error');
		}
	};

	const isMountedRef = useRef(true);
	const [wishlistData, setWishlistData] = useState([]);
	let userId = localStorage.getItem('persist:root');

	useEffect(async () => {
		if (JSON.parse(userId).user) {
			try {
				userId = JSON.parse(userId);
				userId = userId?.user;
				userId = JSON.parse(userId);
				userId = userId?.currentUser?._id;
				if (userId !== undefined) {
					setWishlistLogin(true);
				}

				const res = await userWishListArrayGet(userId);
				if (isMountedRef.current) {
					setWishlistData([...res]);
				}
			} catch (error) {
				console.error(error);
			}
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [userId]);

	if (!isMountedRef.current) {
		return null;
	}

	return (
		<Container>
			<Circle />
			<Image src={item.variants[0].img[0]} />

			<Info>
				<Icon>
					<Link to={`/product/${item._id}`}>
						<SearchOutlined />
					</Link>
				</Icon>
				<Icon>
					<div className='action towishlist1'>
						{wishlistData.includes(item._id) ? (
							<>
								<BsHeart
									className='add-to-wish list-wish'
									onClick={(ele) => {
										addToWishlist(item._id, 'addCatog', ele);
									}}
									style={{
										display: 'none',
									}}
								/>
								<svg
									className='add-to-wish2 list-wish bi bi-heart-fill'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									viewBox='0 0 16 16'
								>
									<path
										className='add-to-wish2'
										fill-rule='evenodd'
										d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
										onClick={(ele) => {
											addToWishlist(item._id, 'remove', ele);
										}}
									/>
								</svg>
							</>
						) : (
							<>
								<BsHeart
									className='add-to-wish list-wish'
									onClick={(ele) => {
										addToWishlist(item._id, 'addCatog', ele);
									}}
								/>
								<svg
									className='add-to-wish2 list-wish bi bi-heart-fill'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									viewBox='0 0 16 16'
									style={{
										display: 'none',
									}}
								>
									<path
										className='add-to-wish2'
										fill-rule='evenodd'
										d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
										onClick={(ele) => {
											addToWishlist(item._id, 'remove', ele);
										}}
									/>
								</svg>
							</>
						)}
					</div>
				</Icon>
			</Info>
		</Container>
	);
};

export default Product;
