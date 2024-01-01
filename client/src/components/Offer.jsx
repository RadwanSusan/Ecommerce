import React, { useState, useEffect, useRef, useCallback } from 'react';
import './offer.css';
import styled from 'styled-components';
import { IoGitCompareOutline } from 'react-icons/io5';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { AiOutlineEye, AiFillCloseCircle } from 'react-icons/ai';
import {
	BsHeart,
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
	BsArrowUpCircle as ArrowUp,
	BsArrowDownCircle as ArrowDown,
} from 'react-icons/bs';
import { wishlist, userWishListArrayGet } from '../redux/apiCalls';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';
import * as timeago from 'timeago.js';
import swal from 'sweetalert';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
const Wrapper1 = styled.div`
	height: 100%;
	display: flex;
	transition: all 0.75s ease;
	transform: translateX(${(props) => props.slideIndex * -40}vw);
`;
const FilterSizeCatog = styled.select`
	margin-left: 10px;
	padding: 5px;
`;
const Offer = () => {
	const [offer, setOffer] = useState([]);
	const [wishlistLogin, setWishlistLogin] = useState(false);
	const [zaidVar, setZaidVar] = useState(0);
	const [idSelected, setIdSelected] = useState(0);
	const [product_id, setProduct_id] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState('');
	const dispatch = useDispatch();
	const [AllProducts, setAllProducts] = useState([]);
	const [productGet, setProductGet] = useState({});
	const [offerGet, setOfferGet] = useState({});
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedVariants, setSelectedVariants] = useState([]);
	const [viewArrCatog, setViewArrCatog] = useState(null);
	const [resetTrigger, setResetTrigger] = useState(0);
	const [slideIndex, setSlideIndex] = useState(0);
	const [visibleSlide, setVisibleSlide] = useState(0);
	const [currentSlide, setCurrentSlide] = useState(0);
	const filterSizeCatog = document.querySelector('.FilterSizeCatog2');
	let mergedCart = [];
	const slides = [
		{
			image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true',
			alt: 'headphones',
		},
		{
			image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true',
			alt: 'headphones',
		},
		{
			image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true',
			alt: 'headphones',
		},
		{
			image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true',
			alt: 'headphones',
		},
		{
			image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true',
			alt: 'headphones',
		},
	];
	useEffect(() => {
		const interval = setInterval(goToNextSlide, 3000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	const totalSlides = slides.length;
	document.querySelectorAll('.CloseCatogCard').forEach((item) =>
		item.addEventListener('click', (e) => {
			document.querySelector('.CatogCard2').style.display = 'none';
			document.body.style.overflow = '';
			document.querySelector('.CatogCard2').style.overflow = '';
			document.querySelector('.backLayerForShowCart2').style.display =
				'none';
		}),
	);
	const goToNextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === totalSlides - 1 ? 0 : prevSlide + 1,
		);
		setVisibleSlide((prevSlide) =>
			prevSlide === totalSlides - 1 ? 0 : prevSlide + 1,
		);
	};
	const goToPreviousSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? totalSlides - 1 : prevSlide - 1,
		);
		setVisibleSlide((prevSlide) =>
			prevSlide === 0 ? totalSlides - 1 : prevSlide - 1,
		);
	};
	const chekAvail2 = () => {
		return true;
	};
	useEffect(() => {
		setQuantity(1);
		setResetTrigger((prev) => prev + 1);
	}, [selectedColor]);
	const selectedVariantTemp = useRef();
	useEffect(() => {
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
				console.error('Error fetching data:', err);
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
	const showCartItems = Array.from(document.querySelectorAll('.show-cart3'));
	const aramex = document.querySelector('.CatogallColors');
	const currency = document.querySelector('.currency');
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
			document.querySelectorAll('.AddCart2').forEach((item) => {
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
		if (viewArrCatog) {
			selectedVariantTemp.current = viewArrCatog.variants[0];
		}
	}, [viewArrCatog]);
	useEffect(() => {
		if (viewArrCatog) {
			const setAttributeForQuintity =
				document.querySelector('.selectedColor');
			const catogCard = document.querySelector('.CatogCard2');
			const productCard_block2 = document.querySelector(
				'.productCard_block2',
			);
			const backLayerForShowCart = document.querySelector(
				'.backLayerForShowCart2',
			);
			const sliderItemsContainer = document.querySelector(
				'.sliderBlock_items50',
			);
			catogCard.style.display = 'block';
			catogCard.style.overflow = 'hidden';
			backLayerForShowCart.style.display = 'block';
			backLayerForShowCart.style.overflow = 'hidden';
			productCard_block2.style.display = 'block';
			productCard_block2.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
			document.querySelector('.CatogCardDesc2').textContent =
				viewArrCatog.desc;
			aramex.innerHTML = '';
			setZaidVar(viewArrCatog._id);
			setProduct_id(viewArrCatog._id);
			document.querySelector('.nameProducts2').innerHTML =
				viewArrCatog.title;
			document
				.querySelector('.block_product__advantagesProduct')
				.append(viewArrCatog.desc);
		}
	}, [viewArrCatog]);
	const displayAlert = (title, message, type) => {
		swal(title, message, type);
	};
	const showInfoMessage = (message) => {
		swal('Info', message, 'info');
	};
	const showSuccessMessage = (message) => {
		swal('Success', message, 'success');
	};
	const disableAddCartBtn = (btn) => {
		btn.pointerEvents = 'none';
		btn.style.opacity = '0.5';
		btn.style.cursor = 'not-allowed';
	};
	const handleQuantityDecrement = () => {
		if (quantity <= 1) {
			displayAlert('Info', 'The minimum quantity is 1', 'info');
		} else {
			setQuantity(quantity - 1);
		}
	};
	const handleQuantityIncrement = () => {
		const selectedColorLabel = document.querySelector('label.selectedColor');
		const associatedInput = document?.getElementById(
			selectedColorLabel?.getAttribute('for'),
		)?.value;
		const filterSizeCatog = document.querySelector('.FilterSizeCatog2');
		const selectedSizeNew =
			filterSizeCatog.options[filterSizeCatog.length - 1].getAttribute(
				'selected',
			);
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
		const quantity501 = parseInt(selectedOption.getAttribute('quantity'));
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
							const sizesForSelectedColor = Array.from(
								new Set(
									selectedVariants.flatMap((variant) => variant.size),
								),
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
							const sizesForSelectedColor = Array.from(
								new Set(
									selectedVariants.flatMap((variant) => variant.size),
								),
							);
							setQuantity(1);
							filterSizeCatog.innerHTML = '';
							filterSizeCatog.addEventListener('click', (event) => {
								const selectedVariant = selectedVariants.find(
									(variant) =>
										variant.size.includes(event.target.value),
								);
								selectedVariantTemp.current = selectedVariant;
								setSelectedVariants([selectedVariant]);
								setIdSelected(selectedVariant?._id);
								setQuantity(1);
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
								setSize(size);
								filterSizeCatog.appendChild(option);
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
	const findItemById = (id) => {
		const items = [...productGet, ...offerGet];
		return items.find((item) => item._id === id);
	};
	const addCartBtn = document.querySelector('.AddCart2');
	const cartItemMap = new Map(mergedCart.map((item) => [item._id, item]));
	const addToCart = (ele) => {
		const productId = ele.target.getAttribute('product_id');
		const quantityCart = mergedCart.map((item) => item.quantity)[0];
		const selectedLabel = document.querySelector('.selectedColor');
		const inputId = selectedLabel.htmlFor;
		const inputElement = document.getElementById(inputId);
		const colorSelected = inputElement.value;
		const sizeSelected = document.querySelector('.FilterSizeCatog2').value;
		const item = findItemById(productId);
		const selectedvariantsNew = item.variants.find(
			(variant) =>
				variant.color[0] === colorSelected &&
				variant.size[0] === sizeSelected,
		);
		if (quantity > item.quantity) {
			showInfoMessage('You already have the maximum amount!');
			return;
		}
		const newItem = {
			...item,
			quantity,
			selectedVariant: selectedvariantsNew,
		};
		let existingProducts = localStorage.getItem('persist:root');
		existingProducts = existingProducts ? JSON.parse(existingProducts) : [];
		if (!Array.isArray(existingProducts)) {
			existingProducts = [];
		}
		const existingItem = existingProducts.find(
			(product) => product._id === newItem._id,
		);
		if (existingItem) {
			existingItem.quantity += newItem.quantity;
		} else {
			existingProducts.push(newItem);
		}
		localStorage.setItem('persist:root', JSON.stringify(existingProducts));
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
		setQuantity(1);
		chekAvail2();
		showSuccessMessage('Product added to cart!');
		if (quantityCart >= selectedvariantsNew.quantity) {
			disableAddCartBtn(addCartBtn);
			swal('Info', 'You already have the maximum amount!', 'info');
		}
	};
	const handleClick = (direction) => {
		if (direction === 'left') {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
		}
	};
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get('http://localhost:4000/api/products');
				const currentDate = Date.parse(new Date());
				const filteredOffer = res.data
					.filter((product) => {
						const startDate = Date.parse(product.discount.startDate);
						const endDate = Date.parse(product.discount.endDate);

						return (
							product.discount &&
							startDate <= currentDate &&
							endDate >= currentDate
						);
					})
					.slice(0, 4);
				setOffer(filteredOffer);
				setProducts(res.data);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		getProducts();
	}, []);

	let cartProducts = JSON.parse(localStorage.getItem('persist:root'));
	if (
		cartProducts === null ||
		cartProducts === undefined ||
		cartProducts === ''
	) {
		localStorage.setItem('persist:root', JSON.stringify({ cart: [] }));
		cartProducts = JSON.parse(localStorage.getItem('persist:root'));
		cartProducts = cartProducts.cart;
	} else {
		cartProducts = cartProducts.cart;
	}
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
	const addToWishlist = (productId, identifier) => {
		if (wishlistLogin === false) {
			swal({
				title: 'You have to login !',
				icon: 'warning',
			}).then((e) => {
				if (e) {
					window.location.href = '/login';
				}
			});
			return;
		}
		if (identifier === 'remove' && wishlistLogin === true) {
			swal('Success', 'Product removed from wishlist!', 'success');
			wishlist(productId);
			return;
		}
		swal('Success', 'Product added to wishlist!', 'success');
		wishlist(productId);
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
		<>
			<div className='backLayerForShowCart2'></div>
			<div className='column small-centered'>
				<div className='productCard_block2 CatogCard2'>
					<div className='row11'>
						<div className='small-12 large-6 columns11'>
							<div className='productCard_leftSide clearfix'>
								<div className='sliderBlock'>
									<ul className='sliderBlock_items50'>
										{slides.map((slide, index) => (
											<li
												key={index}
												className={`sliderBlock_items__itemPhoto2 ${
													index === currentSlide
														? 'sliderBlock_items__showing2'
														: ''
												}`}>
												<img
													src={slide.image}
													alt={slide.alt}
												/>
											</li>
										))}
									</ul>

									<div className='sliderBlock_controls'>
										<div className='sliderBlock_controls__navigatin'>
											<div className='sliderBlock_controls__wrapper'>
												<div
													className='sliderBlock_controls__arrow sliderBlock_controls__arrowForward2'
													onClick={goToNextSlide}>
													<BsFillArrowRightCircleFill className='sliderBlock_controls__arrowForward2' />
												</div>
												<div
													className='sliderBlock_controls__arrow sliderBlock_controls__arrowBackward2'
													onClick={goToPreviousSlide}>
													<BsFillArrowLeftCircleFill className='sliderBlock_controls__arrowBackward2' />
												</div>
											</div>
										</div>
										<ul className='sliderBlock_positionControls'>
											{slides.map((_, index) => (
												<li
													key={index}
													className={`sliderBlock_positionControls__paginatorItem2 ${
														index === visibleSlide
															? 'sliderBlock_positionControls__active2'
															: ''
													}`}></li>
											))}
										</ul>
									</div>
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
											aria-hidden='true'></i>
									</div>
								</div>

								<div className='block_product'>
									<h2 className='block_name block_name__mainName nameProducts2'></h2>

									<p className='block_product__advantagesProduct CatogCardDesc2'></p>
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
														readOnly>
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
														}}></div>
													<div className='block_goodColor__allColors CatogallColors'></div>
													<FilterSizeCatog
														className='FilterSizeCatog2'
														onChange={(e) =>
															setSize(e.target.value)
														}></FilterSizeCatog>
												</div>
												{isLoading ? (
													chekAvail2() ? (
														<button
															className='AddCart2'
															product_id={product_id}
															onClick={(ele) => {
																addToCart(ele);
															}}>
															Add to Cart
														</button>
													) : (
														<button
															className='AddCart2'
															disabled>
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
				className='group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC'
				id='style-sCNUC'>
				<div>
					<div className='block block-list-products'>
						<div className='block-title'>
							<strong>Hot Deals</strong>
						</div>
						<div className='block-content'>
							<div
								id='filterproducts_1'
								className='product-deal-list'>
								<Link to={`/`}>
									<div className='deal-left'>
										<div className='deal-description'>
											<div>
												Special Offer!
												<br />
												up to
												<span
													id='style-Leion'
													className='style-Leion'>
													50%
												</span>
												Off
											</div>
										</div>
										<div className='timer-content'>
											<div className='timer-title'>
												Hurry Up! Click here to show All Offer
											</div>
										</div>
									</div>
								</Link>
								<div className='deal-content'>
									<div className='owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag'>
										<div className='owl-stage-outer'>
											<Wrapper1
												className='owl-stage style-FUF77'
												id='style-FUF77'
												slideIndex={slideIndex}>
												{offer.map((data) => (
													<div
														className='owl-item active style-Ke3kW'
														id='style-Ke3kW'>
														<div className='item product product-item'>
															<div
																className='product-item-info'
																data-container='product-grid'>
																<Link
																	to={`/product/${data._id}`}
																	className='action quickview-handler
																	sm_quickview_handler'
																	title='Quick View'
																	href=''>
																	<div className='image-product'>
																		<div
																			className='product photo product-item-photo'
																			tabindex='-1'>
																			<span
																				className='product-image-container product-image-container-13 style-j6oeg'
																				id='style-j6oeg'>
																				<span
																					className='product-image-wrapper style-gKGpW'
																					id='style-gKGpW'>
																					<img
																						className='product-image-photo'
																						src={
																							data
																								.variants[0]
																								.img
																						}
																						data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg /'
																						loading='lazy'
																						width='250'
																						height='250'
																						alt={
																							data.title
																						}
																					/>
																				</span>
																			</span>
																		</div>
																		<Link
																			to={``}
																			className='action quickview-handler
																	sm_quickview_handler show-cart3'
																			title='Quick View'
																			catog-id={data._id}>
																			<AiOutlineEye />
																			<span>Quick View</span>
																		</Link>
																	</div>
																</Link>
																<div className='product details product-item-details'>
																	<strong className='product name product-item-name'>
																		<div className='product-item-link'>
																			{data.title}
																		</div>
																	</strong>
																	<div
																		className='price-box price-final_price'
																		data-role='priceBox'
																		data-product-id='13'
																		data-price-box='product-id-13'>
																		<span className='price-container price-final_price tax weee'>
																			<span
																				id='product-price-13'
																				data-price-amount='250'
																				data-price-type='finalPrice'
																				className='price-wrapper '>
																				<span className='price55'>
																					$ {data.price}
																				</span>
																				<span className='priceOffer'>
																					${' '}
																					{
																						data.discount
																							.discount
																					}
																				</span>
																			</span>
																		</span>
																	</div>
																	<div className='time-countdown-slide'>
																		<div className='time-wrapper'>
																			<div className='time-label clearfix'>
																				<div className='stock-qty'>
																					Availability:
																					<span>150</span>
																				</div>
																				<div className='time-left'>
																					Time left:
																					<span>
																						{timeago.format(
																							data
																								.discount
																								.endDate,
																						)}
																					</span>
																				</div>
																			</div>
																			<div className='time-ranger'>
																				<div
																					className='time-pass style-Tx4nd'
																					id='style-Tx4nd'></div>
																			</div>
																		</div>
																	</div>
																	<div className='product-item-actions'>
																		<div className='actions-primary'>
																			<Link
																				to={`/product/${data._id}`}>
																				<button
																					className='action tocart primary'
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/13\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																					type='button'
																					title='Add to Cart'>
																					<span>
																						Add to Cart
																					</span>
																				</button>
																			</Link>
																		</div>
																		<div
																			className='actions-secondary'
																			data-role='add-to-links'>
																			<div className='action towishlist'>
																				{wishlistData.includes(
																					data._id,
																				) ? (
																					<>
																						<BsHeart
																							className='add-to-wish list-wish'
																							onClick={(
																								ele,
																							) => {
																								handleWichlist(
																									data._id,
																									ele,
																								);
																								addToWishlist(
																									data._id,
																									'remove',
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
																							onClick={(
																								ele,
																							) => {
																								handleWichlist(
																									data._id,
																									ele,
																								);
																								addToWishlist(
																									data._id,
																									'add',
																								);
																							}}>
																							<path
																								className='add-to-wish2'
																								fill-rule='evenodd'
																								d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
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
																								handleWichlist(
																									data._id,
																									ele,
																								);
																								addToWishlist(
																									data._id,
																									'add',
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
																							onClick={(
																								ele,
																							) => {
																								handleWichlist(
																									data._id,
																									ele,
																								);
																								addToWishlist(
																									data._id,
																									'remove',
																								);
																							}}
																							style={{
																								display:
																									'none',
																							}}>
																							<path
																								className='add-to-wish2'
																								fill-rule='evenodd'
																								d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
																							/>
																						</svg>
																					</>
																				)}
																				<span>
																					Add to Wish List
																				</span>
																			</div>
																			<div
																				href='#'
																				className='action tocompare'
																				title='Add to Compare'>
																				<IoGitCompareOutline />
																				<span>
																					Add to Compare
																				</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}
											</Wrapper1>
										</div>
										<div className='owl-nav'>
											<div
												role='presentation'
												className='owl-prev disabled'
												onClick={() => handleClick('left')}>
												<BiChevronLeft />
											</div>
											<div
												role='presentation'
												className='owl-next'
												onClick={() => handleClick('right')}>
												<BiChevronRight />
											</div>
										</div>
										<div className='owl-dots disabled'></div>
									</div>
									<div className='loading-content'>
										<span className='hidden'>Loading...</span>
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
export default Offer;
