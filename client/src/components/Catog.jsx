import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import './catog.css';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineEye, AiFillCloseCircle } from 'react-icons/ai';
import { useMemo } from 'react';

import {
	BsHeart,
	BsArrowUpCircle as ArrowUp,
	BsArrowDownCircle as ArrowDown,
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { IoGitCompareOutline } from 'react-icons/io5';
import { userRequest } from '../requestMethods';
import { wishlist, userWishListArrayGet } from '../redux/apiCalls';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
// import ImageSlider from '../pages/ImageSlider.dart';

const FilterSizeCatog = styled.select`
	margin-left: 10px;
	padding: 5px;
`;

const Catog = ({ item }) => {
	const imagesSlider = [];

	const [zaidVar, setZaidVar] = useState(0);
	const [idSelected, setIdSelected] = useState(0);
	const [product_id, setProduct_id] = useState(0);
	const [quantity, setQuantity] = useState(1);
	// const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	const dispatch = useDispatch();
	const [AllProducts, setAllProducts] = useState([]);
	const [productGet, setProductGet] = useState({});
	const [offerGet, setOfferGet] = useState({});
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedColorElement, setSelectedColorElement] = useState(null);

	const [selectedVariants, setSelectedVariants] = useState([]);

	const [viewArrCatog, setViewArrCatog] = useState(null);

	const [resetTrigger, setResetTrigger] = useState(0);
	const filterSizeCatog = document.querySelector('.FilterSizeCatog');

	useEffect(() => {
		console.log('Selected color has changed to:', selectedColor); // Add this line
		setQuantity(1);
		setResetTrigger((prev) => prev + 1); // Increment the reset trigger to force re-render

		//make filter on the size
	}, [selectedColor]);

	// let selectedVariantTemp;
	const selectedVariantTemp = useRef();
	useEffect(() => {
		console.log('60');
		const getProducts = async () => {
			try {
				const res = await axios.get(
					item?.cat
						? `http://localhost:4000/api/products?category=${item?.cat}`
						: 'http://localhost:4000/api/products',
				);
				setProducts(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, [item?.cat]);

	useEffect(() => {
		console.log('76');
		const fetchData = async () => {
			try {
				const [productsRes, offersRes] = await Promise.all([
					userRequest.get('/products'),
					userRequest.get('/offer'),
				]);
				setAllProducts(productsRes.data);
				setProductGet(productsRes.data);
				setOfferGet(offersRes.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData()
			.then(() => {})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			})
			.finally(() => {
				if (AllProducts.length === 0) {
					setIsLoading(true);
				}
			});
	}, [AllProducts.length]);

	const showCartItems = Array.from(document.querySelectorAll('.show-cart2'));
	const aramex = document.querySelector('.CatogallColors');
	const currency = document.querySelector('.currency');

	const getSiblings = (e) => {
		let siblings = [];
		if (!e.parentNode) {
			return siblings;
		}
		let sibling = e.parentNode.firstChild;
		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== e) {
				siblings.push(sibling);
			}
			sibling = sibling.nextSibling;
		}
		return siblings;
	};

	const createRadioElement = (color) => {
		const input = document.createElement('input');
		input.classList.add('radio_button');
		input.setAttribute('id', `radioColor ${color}`);
		input.setAttribute('name', 'colorOfItem');
		input.setAttribute('checked', 'checked');
		input.setAttribute('value', color);
		const label = document.createElement('label');
		label.setAttribute('for', `radioColor ${color}`);
		label.classList.add('block_goodColor__radio', 'block_goodColor__black');
		label.style.backgroundColor = color;
		return { input, label };
	};

	const handleShowCartClick = useCallback(
		(event, item) => {
			event.preventDefault();
			document.querySelectorAll('.AddCart').forEach((item) => {
				item.removeAttribute('color');
			});

			const idProduct = item.getAttribute('catog-id');

			setViewArrCatog(
				isLoading
					? [...productGet, ...offerGet]?.find(
							(product) => product._id === idProduct,
					  )
					: AllProducts?.find((product) => product._id === idProduct),
			);
			setSelectedColor('');
			setSelectedSize(null);
		},
		[AllProducts, isLoading, offerGet, productGet],
	);

	useEffect(() => {
		console.log('156');
		if (viewArrCatog) {
			selectedVariantTemp.current = viewArrCatog.variants[0];
			console.log('FIRST USEEFFECT');
		}
	}, [viewArrCatog]);

	useEffect(() => {
		console.log('163');
		if (viewArrCatog) {
			const setAttributeForQuintity =
				document.querySelector('.selectedColor');
			const catogCard = document.querySelector('.CatogCard');
			const backLayerForShowCart = document.querySelector(
				'.backLayerForShowCart',
			);
			const sliderItemsContainer = document.querySelector(
				'.sliderBlock_items50',
			);

			console.log(`viewArrCatog`, viewArrCatog);

			catogCard.style.display = 'block';
			catogCard.style.overflow = 'hidden';
			backLayerForShowCart.style.display = 'block';
			backLayerForShowCart.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
			document.querySelector('.CatogCardDesc').textContent =
				viewArrCatog.desc;
			aramex.innerHTML = '';
			setZaidVar(viewArrCatog._id);

			setProduct_id(viewArrCatog._id);
			document.querySelector('.nameProducts2').innerHTML =
				viewArrCatog.title;

			document
				.querySelector('.block_product__advantagesProduct')
				.append(viewArrCatog.desc);

			// Rest of your code that relies on `viewArrCatog`
		}
	}, [viewArrCatog]);

	const handleQuantityIncrement = () => {
		const selectedColorLabel = document.querySelector('label.selectedColor');
		const associatedInput = document?.getElementById(
			selectedColorLabel?.getAttribute('for'),
		)?.value;
		console.log('associatedInput', associatedInput);

		const filterSizeCatog = document.querySelector('.FilterSizeCatog');
		console.log('filterSizeCatog', filterSizeCatog);
		// iwant get  if the size is selected
		const selectedSizeNew =
			filterSizeCatog.options[filterSizeCatog.length - 1].getAttribute(
				'selected',
			);

		console.log('selectedSizeNew', selectedSizeNew);

		if (!associatedInput) {
			swal('Error', 'Please select a color', 'error');
			return;
		}
		if (!selectedSize && !selectedSizeNew) {
			swal('Error', 'Please select a size', 'error');
			return;
		}
		const selectedOption =
			filterSizeCatog.options[filterSizeCatog.length - 1];
		console.log(selectedOption);
		const quantity501 = parseInt(selectedOption.getAttribute('quantity'));
		console.log(quantity501);
		if (!quantity501) {
			swal('Error', 'Please select a size', 'error');
			return;
		}

		if (viewArrCatog) {
			if (quantity501 < quantity + 1) {
				swal('Error', 'The maximum quantity is ' + quantity, 'error');
			} else {
				setQuantity((prevQuantity) => {
					const newQuantity = prevQuantity + 1;

					return newQuantity;
				});
			}
		}
	};

	useEffect(() => {
		if (viewArrCatog && !selectedSize) {
			aramex.innerHTML = '';
			let option;
			const addedColors = new Set();

			viewArrCatog.variants.forEach((variant) => {
				variant.color.forEach((color) => {
					if (!addedColors.has(color)) {
						addedColors.add(color);
						const { input, label } = createRadioElement(color);
						aramex.appendChild(input);
						aramex.appendChild(label);
						input.addEventListener('click', (event) => {
							setSelectedColor(event.target.value);
							const previousSelectedColor =
								document.querySelector('.selectedColor');
							if (previousSelectedColor) {
								previousSelectedColor.classList.remove('selectedColor');
							}
							label.classList.add('selectedColor');

							const selectedVariants = viewArrCatog.variants.filter(
								(variant) => variant.color.includes(event.target.value),
							);
							console.log('selectedVariants', selectedVariants);
							console.log('2');

							const sizesForSelectedColor = Array.from(
								new Set(
									selectedVariants.flatMap((variant) => variant.size),
								),
							);
							console.log(
								'sizesForSelectedColor',
								sizesForSelectedColor,
							);

							setQuantity(1);

							filterSizeCatog.innerHTML = '';

							sizesForSelectedColor.forEach((size) => {
								option = new Option(size, size);

								filterSizeCatog.appendChild(option);
								filterSizeCatog.addEventListener('change', (event) => {
									setSelectedSize(event.target.value);
									const selectedVariant = viewArrCatog.variants.find(
										(variant) =>
											variant.size.includes(event.target.value),
									);
									selectedVariantTemp.current = selectedVariant;
									option.setAttribute(
										'quantity',
										selectedVariant.quantity,
									);

									setSelectedVariants([selectedVariant]);
									setIdSelected(selectedVariant._id);
									setQuantity(1);

									sizesForSelectedColor.forEach((size) => {
										if (size === event.target.value) {
											option.setAttribute('selected', 'selected');
										}
									});
								});
							});
						});
					}
				});
			});

			const allSizes = viewArrCatog.variants.flatMap(
				(variant) => variant.size,
			);
			const uniqueSizes = Array.from(new Set(allSizes));

			filterSizeCatog.innerHTML = '';
			uniqueSizes.forEach((size) => {
				const option = new Option(size, size);
				filterSizeCatog.appendChild(option);
				if (size === uniqueSizes[0]) {
					option.selected = true;
					setSize(size);
				}
			});
			filterSizeCatog.addEventListener('change', (event) => {
				setSelectedSize(event.target.value);
				const selectedVariant = viewArrCatog.variants.find((variant) =>
					variant.size.includes(event.target.value),
				);
				selectedVariantTemp.current = selectedVariant;
				// option.setAttribute('quantity', selectedVariant.quantity);
				setSelectedVariants([selectedVariant]);
				setIdSelected(selectedVariant?._id);
				setQuantity(1);
			});
		}
	}, [
		viewArrCatog,
		selectedVariantTemp,
		setSelectedColor,
		setSelectedVariants,
		setSelectedSize,
		setQuantity,
	]);
	useEffect(() => {
		if (viewArrCatog && !selectedSize) {
			aramex.innerHTML = '';
			let option;
			const addedColors = new Set();

			viewArrCatog.variants.forEach((variant) => {
				variant.color.forEach((color) => {
					if (!addedColors.has(color)) {
						addedColors.add(color);
						const { input, label } = createRadioElement(color);
						aramex.appendChild(input);
						aramex.appendChild(label);
						input.addEventListener('click', (event) => {
							setSelectedColor(event.target.value);

							const previousSelectedColor =
								document.querySelector('.selectedColor');
							if (previousSelectedColor) {
								previousSelectedColor.classList.remove('selectedColor');
							}
							label.classList.add('selectedColor');

							const selectedVariants = viewArrCatog.variants.filter(
								(variant) => variant.color.includes(event.target.value),
							);
							console.log('selectedVariants', selectedVariants);

							const sizesForSelectedColor = Array.from(
								new Set(
									selectedVariants.flatMap((variant) => variant.size),
								),
							);

							setQuantity(1);

							filterSizeCatog.innerHTML = '';

							filterSizeCatog.addEventListener('click', (event) => {
								console.log(event.target.value);
								console.log(selectedSize);

								// const selectedVariant = viewArrCatog.variants.find(
								// 	(variant) =>
								// 		variant.size.includes(event.target.value) ,
								// );

								const selectedVariant = selectedVariants.find(
									(variant) =>
										variant.size.includes(event.target.value),
								);
								console.log(selectedVariant);

								selectedVariantTemp.current = selectedVariant;
								// option.setAttribute('quantity', selectedVariant.quantity);
								setSelectedVariants([selectedVariant]);
								console.log(selectedVariants);
								setIdSelected(selectedVariant?._id);
								setQuantity(1);
								console.log(sizesForSelectedColor);
								sizesForSelectedColor.find((size) => {
									if (size === event.target.value) {
										option.setAttribute('selected', 'selected');
										option.setAttribute(
											'quantity',
											selectedVariant.quantity,
										);
									}
								});
							});

							sizesForSelectedColor.forEach((size) => {
								option = new Option(size, size);
								console.log(size);
								console.log(event.target.value);
								// setSelectedSize(size);
								// console.log(selectedSize);

								if (size === event.target.value) {
									// option.setAttribute('selected', 'selected');
									console.log('selected');
								}

								filterSizeCatog.appendChild(option);
								console.log(option);
							});
						});
					}
				});
			});
		}
	}, [
		viewArrCatog,
		selectedVariantTemp,
		setSelectedColor,
		setSelectedSize,
		setQuantity,
	]);

	showCartItems.forEach((item) => {
		item.addEventListener('click', (event) => {
			setQuantity(1);
			handleShowCartClick(event, item);
		});
	});

	document.querySelectorAll('.CloseCatogCard').forEach((item) =>
		item.addEventListener('click', (e) => {
			document.querySelector('.CatogCard').style.display = 'none';
			document.body.style.overflow = '';
			document.querySelector('.CatogCard').style.overflow = '';
			document.querySelector('.backLayerForShowCart').style.display = 'none';
		}),
	);

	let cartProducts = localStorage.getItem('persist:root');
	if (cartProducts) {
		cartProducts = JSON.parse(cartProducts);
	} else {
		cartProducts = [];
	}

	let mergedCart = [];

	if (cartProducts && cartProducts.cart && cartProducts.cart.length !== 0) {
		cartProducts = cartProducts.cart;
		console.log(cartProducts.cart);
		mergedCart = JSON.parse(cartProducts).products.reduce((acc, curr) => {
			const existingItem = acc.find((item) => item._id === curr._id);
			if (existingItem) {
				existingItem.quantity += curr.quantity;
			} else {
				acc.push({ ...curr });
			}
			return acc;
		}, []);
	}

	const displayAlert = (title, message, type) => {
		swal(title, message, type);
	};

	const selectedVariantTempRef = useRef();

	const handleQuantityDecrement = () => {
		if (quantity <= 1) {
			displayAlert('Info', 'The minimum quantity is 1', 'info');
		} else {
			setQuantity(quantity - 1);
		}
	};

	const chekAvail2 = () => {
		let newQuantity = mergedCart.map((item) => {
			if (item._id === products._id) {
				return {
					quantity: products.quantity - item.quantity,
				};
			}
			return item;
		});
		console.log(newQuantity);
		newQuantity = newQuantity.filter((item) => item !== undefined);

		const lastQuantity = newQuantity.map((item) => item.quantity)[0];
		console.log(lastQuantity);
		if (lastQuantity > 5) {
			return false;
		}

		if (newQuantity.length > 0) {
			return newQuantity[0].quantity >= 1;
		}
		return true;
	};

	useEffect(() => {
		chekAvail2();
	}, [mergedCart, products._id, products.quantity, setQuantity, quantity]);

	const findItemById = (id) => {
		const items = [...productGet, ...offerGet];
		return items.find((item) => item._id === id);
	};

	const addCartBtn = document.querySelector('.AddCart');
	const cartItemMap = new Map(mergedCart.map((item) => [item._id, item]));

	const addToCart = (ele) => {
		const productId = ele.target.getAttribute('product_id');
		console.log(cartProducts);
		// console.log(cartProducts.cart);

		console.log(mergedCart);
		const quantityCart = mergedCart.map((item) => item.quantity)[0];
		console.log(quantityCart);

		console.log(cartProducts);

		// const colorSelected = document.querySelector('.radio_button').value;
		const selectedLabel = document.querySelector('.selectedColor');
		console.log(selectedLabel);

		const inputId = selectedLabel.htmlFor;
		console.log(inputId);
		// Get the input element
		const inputElement = document.getElementById(inputId);
		console.log(inputElement);
		// Get the color from the input element
		const colorSelected = inputElement.value;

		console.log(colorSelected);

		const sizeSelected = document.querySelector('.FilterSizeCatog').value;

		console.log(sizeSelected);

		const item = findItemById(productId);
		console.log(item);
		console.log(colorSelected);
		console.log(sizeSelected);
		console.log(
			item.variants.find(
				(variant) =>
					variant.color[0] === colorSelected &&
					variant.size[0] === sizeSelected,
			),
		);

		const selectedvariantsNew = item.variants.find(
			(variant) =>
				variant.color[0] === colorSelected &&
				variant.size[0] === sizeSelected,
		);
		console.log(selectedvariantsNew.quantity);

		if (!item) {
			showInfoMessage('Product not found!');
			return;
		}

		console.log(cartItemMap); ///??

		const cartItem = cartItemMap.get(productId);
		console.log(cartItem); ////?
		console.log(item);
		if (quantity > item.quantity) {
			// disableAddCartBtn(addCartBtn);
			showInfoMessage('You already have the maximum amount!');
			return;
		}
		console.log(item);
		console.log(selectedvariantsNew);

		if (true) {
			const newItem = {
				...item,
				quantity,
				selectedVariant: selectedvariantsNew,
			};

			let existingProducts = localStorage.getItem('persist:root');
			existingProducts = existingProducts
				? JSON.parse(existingProducts)
				: [];
			if (!Array.isArray(existingProducts)) {
				existingProducts = [];
			}

			const existingItem = existingProducts.find(
				(product) => product._id === newItem._id,
			);

			if (existingItem) {
				// If the item exists, increase its quantity
				existingItem.quantity += newItem.quantity;
			} else {
				// If the item doesn't exist, add it to the cart
				existingProducts.push(newItem);
			}

			localStorage.setItem('persist:root', JSON.stringify(existingProducts));

			// Update cartProducts and mergedCart
			cartProducts = existingProducts;
			mergedCart = cartProducts.reduce((acc, curr) => {
				const existingItem = acc.find((item) => item._id === curr._id);
				if (existingItem) {
					existingItem.quantity += curr.quantity;
				} else {
					acc.push({ ...curr });
				}
				return acc;
			}, []);

			dispatch(addProduct(newItem));

			console.log(cartProducts);
			// cartProducts = cartProducts.map((item) => {
			// 	return {
			// 		...item,
			// 		quantity: quantity,
			// 	};
			// });
			console.log(cartProducts);
			console.log(mergedCart);

			console.log({
				...item,
			});
			setQuantity(1);

			showSuccessMessage('Product added to cart!');
			console.log(quantityCart);
			console.log(selectedvariantsNew.quantity);
			if (quantityCart >= selectedvariantsNew.quantity) {
				disableAddCartBtn(addCartBtn);
				swal('Info', 'You already have the maximum amount!', 'info');
			}
		} else {
			showInfoMessage('Try with a different amount!');
		}
	};

	const disableAddCartBtn = (btn) => {
		// btn.disabled = true;
		btn.pointerEvents = 'none';
		btn.style.opacity = '0.5';
		btn.style.cursor = 'not-allowed';
	};

	const showInfoMessage = (message) => {
		swal('Info', message, 'info');
	};

	const showSuccessMessage = (message) => {
		swal('Success', message, 'success');
	};

	const [wishlistLogin, setWishlistLogin] = useState(false);

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

	window.addEventListener('DOMContentLoaded', () => {
		let currentSlide = 4;
		const slides = document.querySelectorAll('.sliderBlock_items__itemPhoto');
		const totalSlides = slides.length;
		const nextButton = document.querySelector(
			'.sliderBlock_controls__arrowForward1',
		);
		const prevButton = document.querySelector(
			'.sliderBlock_controls__arrowBackward1',
		);
		const paginatorItems = document.querySelectorAll(
			'.sliderBlock_positionControls__paginatorItem',
		);

		let timer = setInterval(() => {
			goToSlide(currentSlide + 1);
		}, 3000);
		if (nextButton !== null) {
			nextButton.addEventListener('click', function () {
				goToSlide(currentSlide + 1);
			});
		}
		if (prevButton !== null) {
			prevButton.addEventListener('click', function () {
				goToSlide(currentSlide - 1);
			});
		}
		goToSlide(currentSlide);

		function goToSlide(n) {
			if (n > totalSlides - 1) {
				currentSlide = totalSlides - 1;
			} else if (n < 5) {
				currentSlide = 5;
			} else if (n > 9) {
				currentSlide = 5;
			} else {
				currentSlide = n;
			}

			slides.forEach((slide, index) => {
				if (index === currentSlide) {
					slide.classList.add('sliderBlock_items__showing');
					paginatorItems[index].classList.add(
						'sliderBlock_positionControls__active',
					);
				} else {
					slide.classList.remove('sliderBlock_items__showing');
					paginatorItems[index].classList.remove(
						'sliderBlock_positionControls__active',
					);
				}
			});
		}
	});

	return (
		<>
			<div className='backLayerForShowCart'></div>
			<div className='column small-centered'>
				<div className='productCard_block CatogCard'>
					<div className='row11'>
						<div className='small-12 large-6 columns11'>
							<div className='productCard_leftSide clearfix'>
								<div className='sliderBlock'>
									<ul className='sliderBlock_items50'>
										<li className='sliderBlock_items__itemPhoto sliderBlock_items__showing'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true'
												alt='headphones'
											/>
										</li>
									</ul>
									<div className='sliderBlock_controls'>
										<div className='sliderBlock_controls__navigatin'>
											<div className='sliderBlock_controls__wrapper'>
												<div className='sliderBlock_controls__arrow sliderBlock_controls__arrowBackward'>
													<i
														className='fa fa-angle-left'
														aria-hidden='true'
													>
														<BsFillArrowLeftCircleFill className='sliderBlock_controls__arrowBackward1' />
													</i>
												</div>
												<div className='sliderBlock_controls__arrow sliderBlock_controls__arrowForward'>
													<i
														className='fa fa-angle-right'
														aria-hidden='true'
													>
														<BsFillArrowRightCircleFill className='sliderBlock_controls__arrowForward1' />
													</i>
												</div>
											</div>
										</div>
										<ul className='sliderBlock_positionControls'>
											<li className='sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
										</ul>
									</div>
									{/* zaid */}
								</div>
							</div>
						</div>
						<div className='small-12 large-6 columns11'>
							<div className='AiFillCloseCircle CloseCatogCard'>
								<AiFillCloseCircle />
							</div>
							<div className='productCard_rightSide'>
								<div className='block_specification'>
									<div className='block_specification__specificationShow'>
										<i
											className='fa fa-cog block_specification__button block_specification__button__rotate'
											aria-hidden='true'
										></i>
									</div>
								</div>

								<div className='block_product'>
									<h2 className='block_name block_name__mainName nameProducts2'></h2>

									<p className='block_product__advantagesProduct CatogCardDesc'></p>
									<div className='block_informationAboutDevice'>
										<div className='row11 '>
											<div className='large-6 small-12 column left-align'>
												<div className='block_price'>
													<p className='block_price__currency currency'>
														$ {viewArrCatog?.price}
													</p>
													<p className='block_price__shipping'>
														Shipping and taxes extra
													</p>
												</div>
												<div className='block_quantity clearfix'>
													<span className='text_specification'>
														Quantity
													</span>
													<div
														key={resetTrigger}
														zaid={resetTrigger}
														className='block_quantity__chooseBlock'
														readOnly
													>
														<input
															className='block_quantity__number block_quantity__number2'
															name='quantityNumber'
															type='text'
															min='1'
															value={quantity}
															readOnly
														/>
														<button className='block_quantity__button block_quantity__up'>
															<ArrowDown
																onClick={() => {
																	handleQuantityDecrement(
																		zaidVar,
																	);
																}}
																className='AiOutlineArrowUpanddown down5'
															/>
														</button>
														<button className='block_quantity__button block_quantity__down'>
															<ArrowUp
																onClick={() => {
																	handleQuantityIncrement(
																		zaidVar,
																		idSelected,
																	);
																}}
																className='AiOutlineArrowUpanddown up5'
															/>
														</button>
													</div>
												</div>
											</div>
											<div className='large-6 small-12 column end'>
												<div className='block_goodColor'>
													<span className='text_specification'>
														Choose your colors:
													</span>
													<div
														className='zaid'
														style={{
															display: 'hidden',
														}}
													></div>
													<div className='block_goodColor__allColors CatogallColors'></div>
													<FilterSizeCatog
														className='FilterSizeCatog'
														onChange={(e) =>
															setSize(e.target.value)
														}
													></FilterSizeCatog>
												</div>
												{isLoading ? (
													chekAvail2() ? (
														<button
															className='AddCart'
															product_id={product_id}
															onClick={(ele) => {
																addToCart(ele);
															}}
														>
															Add to Cart
														</button>
													) : (
														<button
															className='AddCart'
															disabled
														>
															ADD TO CART
														</button>
													)
												) : (
													<p>loading</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				id='listingtabs_0'
				className='block sm-listing-tabs tab-cms-block slider snipcss-X3nN9'
			>
				<h2>{item?.title}</h2>
				<div className='block-content'>
					<div className='ltabs-wrap'>
						<div className='ltabs-tabs-container'>
							<div
								className='ltabs-tabs-wrap'
								tabindex='-1'
							>
								<span className='ltabs-current-select'>
									Accessories for iPhone
								</span>
							</div>
						</div>
						<div className='listingtabs-cms'>
							<div className='cms-container'>
								<div className='banner-image container-hidd'>
									<Link to={`/products/${item?.cat}`}>
										<img
											className='mark-lazy new-lazy'
											src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg'
											data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg'
											alt='BannerImage'
											width='350'
											height='370'
										/>
									</Link>
								</div>
							</div>
							<div className='ltabs-items-container '>
								<div className='ltabs-items  ltabs-items-selected ltabs-items-loaded  ltabs-items-15'>
									<div className='ltabs-items-inner'>
										<div className='products wrapper grid products-grid'>
											<ol className='products list items product-items owl-carousel owl-theme owl-loaded owl-drag'>
												<div className='owl-stage-outer'>
													<div
														className='owl-stage style-pO7ki'
														id='style-pO7ki'
													>
														{products.slice(0, 4).map((data) => (
															<div
																className='owl-item active style-SmoEo'
																id='style-SmoEo'
															>
																<li className='item product product-item '>
																	<div
																		className='product-item-info'
																		data-container='product-grid'
																	>
																		<Link
																			to={`/product/${data._id}`}
																			className='action quickview-handler sm_quickview_handler'
																			title='Quick View'
																			href=''
																		>
																			<div className='image-product'>
																				<a
																					href='#'
																					className='product photo product-item-photo'
																					tabindex='-1'
																				>
																					<span
																						className='product-image-container product-image-container-1 style-bH5WH'
																						id='style-bH5WH'
																					>
																						<span
																							className='product-image-wrapper style-MbttD'
																							id='style-MbttD'
																						>
																							<img
																								className='product-image-photo'
																								src={
																									data
																										.variants[0]
																										.img
																								}
																								data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg'
																								loading='lazy'
																								width='300'
																								height='300'
																								alt={
																									data.title
																								}
																							/>
																						</span>
																					</span>
																				</a>
																				<Link
																					to={``}
																					className='action quickview-handler sm_quickview_handler show-cart2'
																					title='Quick View'
																					href=''
																					catog-id={
																						data._id
																					}
																				>
																					<AiOutlineEye />
																					<span>
																						Quick View
																					</span>
																				</Link>
																			</div>
																		</Link>
																		<div className='product details product-item-details'>
																			<strong className='product name product-item-name'>
																				{data.title}
																				<a
																					className='product-item-link'
																					href='#'
																				></a>
																			</strong>
																			<div
																				className='price-box price-final_price'
																				data-role='priceBox'
																				data-product-id='1'
																				data-price-box='product-id-1'
																			>
																				<span className='price-container price-final_price tax weee'>
																					<span
																						id='product-price-1'
																						data-price-amount='250'
																						data-price-type='finalPrice'
																						className='price-wrapper '
																					>
																						<span className='price'>
																							${' '}
																							{
																								data.price
																							}
																						</span>
																					</span>
																				</span>
																			</div>
																			<div className='product-item-inner'>
																				<div className='product actions product-item-actions'>
																					<div className='actions-primary'></div>
																					<div
																						data-role='add-to-links'
																						className='actions-secondary'
																					></div>
																					<Link
																						to={`/product/${data._id}`}
																					>
																						<button className='Add-to-Cart-new'>
																							Add to Cart
																						</button>
																					</Link>
																					<div
																						className='actions-secondary'
																						data-role='add-to-links'
																					>
																						<div
																							className='action towishlist'
																							data-action='add-to-wishlist'
																							title='Add to Wish List'
																						>
																							{wishlistData.includes(
																								data._id,
																							) ? (
																								<>
																									<BsHeart
																										className='add-to-wish list-wish'
																										onClick={(
																											ele,
																										) => {
																											addToWishlist(
																												data._id,
																												'addCatog',
																												ele,
																											);
																										}}
																										style={{
																											display:
																												'none',
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
																											onClick={(
																												ele,
																											) => {
																												addToWishlist(
																													data._id,
																													'remove',
																													ele,
																												);
																											}}
																										/>
																									</svg>
																								</>
																							) : (
																								<>
																									<BsHeart
																										className='add-to-wish list-wish'
																										onClick={(
																											ele,
																										) => {
																											addToWishlist(
																												data._id,
																												'addCatog',
																												ele,
																											);
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
																											onClick={(
																												ele,
																											) => {
																												addToWishlist(
																													data._id,
																													'remove',
																													ele,
																												);
																											}}
																											style={{
																												display:
																													'none',
																											}}
																										/>
																									</svg>
																								</>
																							)}
																							<span>
																								Add to
																								Wish
																								List
																							</span>
																						</div>
																						<div
																							className='action tocompare'
																							data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																							title='Add to Compare'
																						>
																							<IoGitCompareOutline />
																							<span>
																								Add to
																								Compare
																							</span>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</li>
															</div>
														))}
													</div>
												</div>
												<div className='owl-nav'>
													<div
														role='presentation'
														className='owl-prev disabled'
													>
														<span aria-label='Previous'>‹</span>
													</div>
													<div
														role='presentation'
														className='owl-next'
													>
														<span aria-label='Next'>›</span>
													</div>
												</div>
												<div className='owl-dots disabled'></div>
											</ol>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Catog;
