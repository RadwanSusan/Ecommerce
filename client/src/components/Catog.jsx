import React, {
	useEffect,
	useState,
	useRef,
	useCallback,
	useMemo,
	useContext,
} from 'react';
import axios from 'axios';
import './catog.css';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineEye, AiFillCloseCircle } from 'react-icons/ai';
import {
	BsHeart,
	BsArrowUpCircle as ArrowUp,
	BsArrowDownCircle as ArrowDown,
} from 'react-icons/bs';
import { IoGitCompareOutline } from 'react-icons/io5';
import { userRequest } from '../requestMethods';
import { wishlist, userWishListArrayGet } from '../redux/apiCalls';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import ImageSlider from './ImageSlider';
import { LanguageContext } from './LanguageContext';
const FilterSizeCatog = styled.select`
	margin-left: 10px;
	padding: 5px;
`;
const Catog = ({ item }) => {
	const cartSelector = (state) => state.cart;
	const [product_id, setProduct_id] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState('');
	const [AllProducts, setAllProducts] = useState([]);
	const [productGet, setProductGet] = useState({});
	const [offerGet, setOfferGet] = useState({});
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState(null);
	const cartProducts = useSelector(cartSelector);
	const [viewArrCatog, setViewArrCatog] = useState(null);
	const [wishlistLogin, setWishlistLogin] = useState(false);
	const [wishlistData, setWishlistData] = useState([]);
	const [isProductAvailable, setIsProductAvailable] = useState(false);
	const [cartQuantityValue, setCartQuantity] = useState(0);
	const filterSizeCatog = document.querySelector('.FilterSizeCatog1');
	const showCartItems = Array.from(document.querySelectorAll('.show-cart2'));
	const aramex = document.querySelector('.CatogallColors2');
	const addCartBtn = document.querySelector('.AddCart');
	const selectedVariantTemp = useRef();
	const isMountedRef = useRef(true);
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	const sizesTranslation = dictionary['sizes'];
	const dispatch = useDispatch();
	useEffect(() => {
		if (isLoading) {
			setIsProductAvailable(chekAvail2());
		}
	}, [isLoading]);
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					item?.cat
						? `http://localhost:4000/api/products`
						: 'http://localhost:4000/api/products',
				);
				setProducts(res.data);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		getProducts();
	}, [item?.cat]);
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
	const disableAddCartBtn = (btn) => {
		btn.pointerEvents = 'none';
		btn.style.opacity = '0.5';
		btn.style.cursor = 'not-allowed';
	};
	const enableAddCartBtn = (btn) => {
		btn.pointerEvents = 'auto';
		btn.style.opacity = '1';
		btn.style.cursor = 'pointer';
	};
	const showInfoMessage = (message) => {
		swal('Info', message, 'info');
	};
	const showSuccessMessage = (message) => {
		swal('Success', message, 'success');
	};
	const createRadioElement = (color) => {
		const input = document.createElement('input');
		input.classList.add('radio_button2');
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
		if (viewArrCatog) {
			selectedVariantTemp.current = viewArrCatog.variants[0];
		}
	}, [viewArrCatog]);
	useEffect(() => {
		if (viewArrCatog) {
			const catogCard = document.querySelector('.CatogCard');
			const backLayerForShowCart = document.querySelector(
				'.backLayerForShowCart',
			);
			catogCard.style.display = 'block';
			catogCard.style.overflow = 'hidden';
			backLayerForShowCart.style.display = 'block';
			backLayerForShowCart.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
			document.querySelector('.CatogCardDesc').textContent =
				language === 'en' ? viewArrCatog.desc : viewArrCatog.desc_ar;
			document.querySelector('.nameProducts4').textContent =
				language === 'en' ? viewArrCatog.title : viewArrCatog.title_ar;
			aramex.innerHTML = '';
			setProduct_id(viewArrCatog._id);
			document
				.querySelector('.block_product__advantagesProduct')
				.append(
					language === 'en' ? viewArrCatog.desc : viewArrCatog.desc_ar,
				);
		}
	}, [viewArrCatog]);
	const handleQuantityDecrement = () => {
		const selectedOption =
			filterSizeCatog.options[filterSizeCatog.length - 1];
		const quantity501 = parseInt(selectedOption.getAttribute('quantity'));
		if (quantity <= 1) {
			displayAlert(
				'Info',
				language === 'en'
					? 'The minimum quantity is 1'
					: 'الحد الادنى للكمية هو 1',
				'info',
			);
		} else {
			setQuantity(quantity - 1);
			selectedOption.setAttribute('quantity', quantity501 + 1);
		}
	};
	const handleQuantityIncrement = () => {
		const selectedColorLabel = document.querySelector('label.selectedColor');
		const associatedInput = document?.getElementById(
			selectedColorLabel?.getAttribute('for'),
		)?.value;
		const filterSizeCatog = document.querySelector('.FilterSizeCatog1');
		const selectedSizeNew =
			filterSizeCatog.options[filterSizeCatog.length - 1].getAttribute(
				'selected',
			);
		if (!associatedInput) {
			swal(
				'Error',
				language === 'en' ? 'Please select a color' : 'يرجى تحديد اللون',
				'error',
			);
			return;
		}
		if (!selectedSize && !selectedSizeNew) {
			swal(
				'Error',
				language === 'en' ? 'Please select a size' : 'يرجى تحديد الحجم',
				'error',
			);

			return;
		}
		const selectedOption =
			filterSizeCatog.options[filterSizeCatog.length - 1];
		const quantity501 = parseInt(selectedOption.getAttribute('quantity'));
		if (!quantity501) {
			swal(
				'Error',
				language === 'en' ? 'Please select a size' : 'يرجى تحديد الحجم',
				'error',
			);
			return;
		}
		if (viewArrCatog) {
			if (quantity501 - 1 <= 0) {
				swal(
					'Error',
					language === 'en'
						? 'The maximum quantity is ' + quantity
						: 'The maximum quantity is ' + quantity,
					'error',
				);
			} else {
				setQuantity((prevQuantity) => {
					const newQuantity = prevQuantity + 1;
					selectedOption.setAttribute('quantity', quantity501 - 1);
					return newQuantity;
				});
			}
		}
	};
	useEffect(() => {
		if (!viewArrCatog || selectedSize) return;
		aramex.innerHTML = '';
		filterSizeCatog.innerHTML = '';
		const addedColors = new Set();
		const allSizes = new Set();
		viewArrCatog.variants.forEach((variant) => {
			variant.color.forEach((color) => {
				if (!addedColors.has(color)) {
					addedColors.add(color);
					allSizes.add(...variant.size);
					const { input, label } = createRadioElement(color);
					aramex.appendChild(input);
					aramex.appendChild(label);
				}
			});
		});
		const uniqueSizes = Array.from(allSizes);
		uniqueSizes.forEach((size) => {
			const translatedSize = sizesTranslation[size];
			const option = new Option(translatedSize, size);
			setSize(size);
			filterSizeCatog.appendChild(option);
		});
		const handleSizeChange = (event) => {
			setSelectedSize(event.target.value);
			const selectedVariant = viewArrCatog.variants.find((variant) =>
				variant.size.includes(event.target.value),
			);
			selectedVariantTemp.current = selectedVariant;
			if (selectedVariant) {
				setQuantity(1);
				if (selectedVariant.quantity > 0) {
					enableAddCartBtn(addCartBtn);
				} else {
					disableAddCartBtn(addCartBtn);
				}
			}
		};
		filterSizeCatog.addEventListener('click', handleSizeChange);
	}, [
		viewArrCatog,
		selectedVariantTemp,
		setSelectedColor,
		setSelectedSize,
		setQuantity,
	]);
	// console.log('viewArrCatog', viewArrCatog);
	const mergedCart = useMemo(() => {
		return cartProducts.products.reduce((acc, curr) => {
			const existingItem = acc.find(
				(item) =>
					item._id === curr._id &&
					item.selectedVariant._id === curr.selectedVariant._id,
			);
			if (existingItem) {
				existingItem.quantity += curr.quantity;
			} else {
				acc.push({ ...curr });
			}
			return acc;
		}, []);
	}, [cartProducts]);
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
							document
								.querySelectorAll('.block_quantity__number')
								.forEach((input) => {
									input.value = 1;
								});
							setQuantity(1);
							filterSizeCatog.innerHTML = '';
							filterSizeCatog.addEventListener('click', (event) => {
								setSize(event.target.value);
								const selectedVariant = selectedVariants.find(
									(variant) =>
										variant.size.includes(event.target.value),
								);
								selectedVariantTemp.current = selectedVariant;
								setQuantity(1);
								sizesForSelectedColor.find((size) => {
									if (size === event.target.value) {
										option.setAttribute('selected', 'selected');
										const cartItem = mergedCart.find(
											(item) =>
												item.selectedVariant._id ===
												selectedVariant._id,
										);
										const cartQuantity =
											cartItem && cartItem.quantity
												? cartItem.quantity
												: cartQuantityValue;
										option.setAttribute(
											'quantity',
											selectedVariant.quantity - cartQuantity,
										);
										if (option.getAttribute('quantity') === '0') {
											disableAddCartBtn(addCartBtn);
										}
									}
								});
							});
							sizesForSelectedColor.forEach((size) => {
								const translatedSize = sizesTranslation[size];
								option = new Option(translatedSize, size);
								setSize(size);
								filterSizeCatog.appendChild(option);
							});
							enableAddCartBtn(addCartBtn);
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
		cartQuantityValue,
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
	const displayAlert = (title, message, type) => {
		swal(title, message, type);
	};
	const chekAvail2 = () => {
		return true;
	};
	const findItemById = (id) => {
		const items = [...productGet, ...offerGet];
		return items.find((item) => item._id === id);
	};
	const addToCart = (ele) => {
		const productId = ele.target.getAttribute('product_id');
		const selectedLabel = document.querySelector('.selectedColor');
		const inputId = selectedLabel ? selectedLabel.htmlFor : null;
		const inputElement = document.getElementById(inputId);

		if (!inputElement || !inputElement.value) {
			showInfoMessage(
				language === 'en'
					? 'Please select a color and size'
					: 'الرجاء تحديد اللون والمقاس',
			);
			return;
		}
		const colorSelected = inputElement.value;
		const sizeSelected = document.querySelector('.FilterSizeCatog1').value;
		const item = findItemById(productId);
		const selectedvariantsNew = item.variants.find(
			(variant) =>
				variant.color[0] === colorSelected &&
				variant.size[0] === sizeSelected,
		);
		if (selectedvariantsNew === undefined) {
			showInfoMessage(
				language === 'en'
					? 'Please select a color and size'
					: 'الرجاء تحديد اللون والمقاس',
			);
			return;
		}
		if (!item) {
			showInfoMessage(
				language === 'en' ? 'Product not found!' : 'المنتج غير موجود!',
				s,
			);
			return;
		}
		const cartItem = mergedCart.find(
			(item) => item.selectedVariant._id === selectedvariantsNew._id,
		);
		const cartQuantity =
			cartItem && cartItem.quantity ? cartItem.quantity : 0;
		if (quantity > selectedvariantsNew.quantity - cartQuantity) {
			disableAddCartBtn(addCartBtn);
			return;
		}
		if (quantity > 0) {
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
				existingItem.quantity += newItem.quantity;
			} else {
				existingProducts.push(newItem);
			}
			const selectedColorLabel = document.querySelector(
				'label.selectedColor',
			);
			const associatedInput = document?.getElementById(
				selectedColorLabel?.getAttribute('for'),
			)?.value;
			const filterSizeCatog2 = document.querySelector('.FilterSizeCatog1');
			const selectedSizeNew =
				filterSizeCatog2.options[filterSizeCatog2.length - 1].getAttribute(
					'selected',
				);
			if (!associatedInput) {
				swal(
					'Error',
					language === 'en' ? 'Please select a color' : 'يرجى تحديد لون',
					'error',
				);
				return;
			}
			if (!selectedSize && !selectedSizeNew) {
				swal(
					'Error',
					language === 'en' ? 'Please select a size' : 'يرجى تحديد حجم',
					'error',
				);
				return;
			}
			const selectedOption =
				filterSizeCatog2.options[filterSizeCatog2.length - 1];
			const quantity501 = parseInt(selectedOption.getAttribute('quantity'));
			if (!quantity501) {
				swal(
					'Error',
					language === 'en' ? 'Please select a size' : 'يرجى تحديد حجم',
					'error',
				);
				return;
			}
			dispatch(addProduct(newItem));
			selectedOption.setAttribute(
				'quantity',
				selectedvariantsNew.quantity - quantity,
			);
			setCartQuantity(selectedvariantsNew.quantity - quantity);
			setQuantity(1);
			showSuccessMessage(
				language === 'en'
					? 'Product added to cart!'
					: 'تمت اضافة المنتج للعربة!',
			);
			if (selectedOption.getAttribute('quantity') === '0') {
				disableAddCartBtn(addCartBtn);
			}
		} else {
			showInfoMessage(
				language === 'en'
					? 'Try with a different amount!'
					: 'يرجى تحديد مبلغ مختلف',
			);
		}
	};
	const addToWishlist = async (productId, identifier, ele) => {
		if (!wishlistLogin) {
			await swal({
				title:
					language === 'en' ? 'You have to login !' : 'يجب تسجيل الدخول',
				icon: 'warning',
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
				swal(
					'Success',
					language === 'en'
						? 'Product removed from wishlist!'
						: 'تمت ازالة المنتج من قائمة الرغبات',
					'success',
				);
			} else if (identifier === 'addCatog') {
				if (targetClass === 'add-to-wish') {
					targetElement.style.display = 'none';
					targetElement.nextSibling.children[0].style.display = 'block';
					targetElement.nextSibling.style.display = 'block';
				}
				swal(
					'Success',
					language === 'en'
						? 'Product added to wishlist!'
						: 'تمت اضافة المنتج الى قائمة الرغبات',
					'success',
				);
			}
		} catch (error) {
			swal(
				'Error',
				language === 'en' ? 'Something went wrong!' : 'حدث خطأ',
				'error',
			);
		}
	};
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
	useEffect(() => {
		setQuantity(1);
	}, [selectedColor, selectedSize]);
	if (!isMountedRef.current) {
		return null;
	}
	const getDiscountedPrice = (product) => {
		const now = new Date();
		const startDate = new Date(product.discount.startDate);
		const endDate = new Date(product.discount.endDate);
		if (now >= startDate && now <= endDate) {
			return `$ ${(product.price * product.discount.discount) / 100}  `;
		} else {
			return `$ ${product.price}`;
		}
	};
	const getDiscountedPrice2 = (product) => {
		const now = new Date();
		const startDate = new Date(product.discount.startDate);
		const endDate = new Date(product.discount.endDate);
		if (now >= startDate && now <= endDate) {
			return (product.price * (100 - product.discount.discount)) / 100;
		} else {
			return product.price;
		}
	};
	function formatPrice(price, language) {
		return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
			style: 'decimal',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	}

	const categoryImages = {
		women: 'https://images.unsplash.com/photo-1675667804657-be9a9d0a6860?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		coat: 'https://images.unsplash.com/photo-1584156930330-c6b925f50065?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		jeans: 'https://images.unsplash.com/photo-1511280303142-0051e93baeeb?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	};

	const suppliers = ['661fc87956155222d9a7b8e1', '661ec09579b26e415350f750'];

	return (
		<>
			<div className='backLayerForShowCart'></div>
			<div className='column small-centered'>
				<div className='productCard_block CatogCard'>
					<div className='row11'>
						<div className='small-12 large-6 columns11'>
							<div className='productCard_leftSide clearfix'>
								<ImageSlider viewArrCatog={viewArrCatog} />
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
									<h2 className='block_name block_name__mainName nameProducts4'></h2>
									<p className='block_product__advantagesProduct CatogCardDesc'></p>
									<div className='block_informationAboutDevice'>
										<div className='row11 '>
											<div className='large-6 small-12 column left-align'>
												<div className='block_price'>
													<p className='block_price__currency currency'>
														{language === 'ar'
															? `${formatPrice(
																	viewArrCatog?.price,
																	language,
															  )} $`
															: `$ ${formatPrice(
																	viewArrCatog?.price,
																	language,
															  )}`}
													</p>
													<p className='block_price__shipping'>
														{language === 'en'
															? 'Shipping and taxes extra'
															: 'الشحن والضريبة'}
													</p>
												</div>
												<div className='block_quantity clearfix'>
													<span className='text_specification'>
														{language === 'en'
															? 'Quantity'
															: 'الكمية:'}
													</span>
													<div
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
																	handleQuantityDecrement();
																}}
																className='AiOutlineArrowUpanddown down5'
															/>
														</button>
														<button className='block_quantity__button block_quantity__down'>
															<ArrowUp
																onClick={() => {
																	handleQuantityIncrement();
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
														{language === 'en'
															? 'Choose your colors:'
															: 'اختر الالوان:'}
													</span>
													<div
														className='zaid'
														style={{
															display: 'hidden',
														}}></div>
													<div className='block_goodColor__allColors2 CatogallColors2'></div>
													<FilterSizeCatog
														className='FilterSizeCatog1'
														onClick={(e) =>
															setSize(e.target.value)
														}></FilterSizeCatog>
												</div>
												{isLoading ? (
													isProductAvailable ? (
														<button
															className='AddCart'
															product_id={product_id}
															onClick={(ele) => {
																addToCart(ele);
															}}>
															{language === 'en'
																? 'Add to cart'
																: 'اضف الى السلة'}
														</button>
													) : (
														<button
															className='AddCart'
															disabled>
															{language === 'en'
																? 'Out of stock'
																: 'غير متوفر'}
														</button>
													)
												) : (
													<p>
														{language === 'en'
															? 'Loading'
															: 'جاري التحميل'}
													</p>
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
			{/* <div
				id='listingtabs_0'
				className='block sm-listing-tabs tab-cms-block slider snipcss-X3nN9'>
				<h2>{language === 'en' ? item?.title : item?.title_ar}</h2>
				<div className='block-content'>
					<div className='ltabs-wrap'>
						<div className='ltabs-tabs-container'>
							<div
								className='ltabs-tabs-wrap'
								tabindex='-1'>
								<span className='ltabs-current-select'>
									{language === 'en'
										? 'Accessories for iPhone'
										: 'إكسسوارات للايفون'}
								</span>
							</div>
						</div>
						<div className='listingtabs-cms'>
							<div className='cms-container'>
								<div className='banner-image container-hidd'>
									<Link to={`/products/661fc87956155222d9a7b8e1`}>
										<img
											className='mark-lazy new-lazy'
											src={
												categoryImages[item?.cat] ||
												'default_image_url'
											}
											data-src={
												categoryImages[item?.cat] ||
												'default_image_url'
											}
											alt='BannerImage'
										/>
									</Link>
								</div>
							</div>
							<div className='ltabs-items-container'>
								<div className='ltabs-items  ltabs-items-selected ltabs-items-loaded  ltabs-items-15'>
									<div className='ltabs-items-inner'>
										<div className='products wrapper grid products-grid'>
											<ol className='products list items product-items owl-carousel owl-theme owl-loaded owl-drag'>
												<div className='owl-stage-outer'>
													<div
														className='owl-stage style-pO7ki'
														id='style-pO7ki'>
														{products.slice(0, 4).map((data) => (
															<div
																className='owl-item active style-SmoEo'
																id='style-SmoEo'>
																<li className='item product product-item'>
																	<div
																		className='product-item-info'
																		data-container='product-grid'>
																		<Link
																			to={`/product/${data._id}`}
																			className='action quickview-handler sm_quickview_handler'
																			title='Quick View'
																			href=''>
																			<div className='image-product'>
																				<a
																					href='#'
																					className='product photo product-item-photo'
																					tabindex='-1'>
																					<span
																						className='product-image-container product-image-container-1 style-bH5WH'
																						id='style-bH5WH'>
																						<span
																							className='product-image-wrapper style-MbttD'
																							id='style-MbttD'>
																							<img
																								className='product-image-photo'
																								src={
																									data
																										.variants[0]
																										.img
																								}
																								data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg'
																								loading='lazy'
																								alt={
																									language ===
																									'en'
																										? data.title
																										: data.title_ar
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
																					}>
																					<AiOutlineEye />
																					<span>
																						{language ===
																						'en'
																							? 'Quick View'
																							: 'مشاهدة سريعة'}
																					</span>
																				</Link>
																			</div>
																		</Link>
																		<div className='product details product-item-details'>
																			<strong className='product name product-item-name'>
																				{language === 'en'
																					? data.title
																					: data.title_ar}
																				<a
																					className='product-item-link'
																					href='#'></a>
																			</strong>
																			<div
																				className='price-box price-final_price'
																				data-role='priceBox'
																				data-product-id='1'
																				data-price-box='product-id-1'>
																				<span className='price-container price-final_price tax weee'>
																					<span
																						id='product-price-1'
																						data-price-amount='250'
																						data-price-type='finalPrice'
																						className='price-wrapper'>
																						<span className='price'>
																							{language ===
																							'ar'
																								? `${formatPrice(
																										getDiscountedPrice2(
																											data,
																										),
																										language,
																								  )} $`
																								: `$ ${formatPrice(
																										getDiscountedPrice2(
																											data,
																										),
																										language,
																								  )}`}
																						</span>
																					</span>
																				</span>
																			</div>
																			<div className='product-item-inner'>
																				<div className='product actions product-item-actions'>
																					<div className='actions-primary'></div>
																					<div
																						data-role='add-to-links'
																						className='actions-secondary'></div>
																					<Link
																						to={`/product/${data._id}`}>
																						<button className='Add-to-Cart-new'>
																							{language ===
																							'en'
																								? 'Add to Cart'
																								: 'اضف الى السلة'}
																						</button>
																					</Link>
																					<div
																						className='actions-secondary'
																						data-role='add-to-links'>
																						<div
																							className='action towishlist'
																							data-action='add-to-wishlist'
																							title='Add to Wish List'>
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
																										viewBox='0 0 16 16'>
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
																										viewBox='0 0 16 16'>
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
																								{language ===
																								'en'
																									? 'Add to Wish List'
																									: 'اضف الى القائمة المفضلة'}
																							</span>
																						</div>
																						<div
																							className='action tocompare'
																							data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																							title='Add to Compare'>
																							<IoGitCompareOutline />
																							<span>
																								{language ===
																								'en'
																									? 'Add to Compare'
																									: 'اضف للمقارنة'}
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
														className='owl-prev disabled'>
														<span aria-label='Previous'>‹</span>
													</div>
													<div
														role='presentation'
														className='owl-next'>
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
			</div> */}
			<div>
				{/* <div
					id='listingtabs_0'
					className='block sm-listing-tabs tab-cms-block slider snipcss-X3nN9'>
					<h2>
						{language === 'en'
							? 'Products by Category'
							: 'المنتجات حسب الفئة'}
					</h2>
					<div className='block-content'>
						<div className='ltabs-wrap'>
							<div className='ltabs-tabs-container'>
								<div
									className='ltabs-tabs-wrap'
									tabindex='-1'>
									<span className='ltabs-current-select'>
										{language === 'en' ? item?.title : item?.title_ar}
									</span>
								</div>
							</div>
							<div className='listingtabs-cms'>
								<div className='cms-container'>
									<div className='banner-image container-hidd'>
										<Link to={`/products/${item?.cat}`}>
											<img
												className='mark-lazy new-lazy'
												src={
													categoryImages[item?.cat] ||
													'default_image_url'
												}
												data-src={
													categoryImages[item?.cat] ||
													'default_image_url'
												}
												alt='BannerImage'
											/>
										</Link>
									</div>
								</div>
								<div className='ltabs-items-container'>
									<div className='ltabs-items ltabs-items-selected ltabs-items-loaded ltabs-items-15'>
										<div className='ltabs-items-inner'>
											<div className='products wrapper grid products-grid'>
												<ol className='products list items product-items owl-carousel owl-theme owl-loaded owl-drag'>
													<div className='owl-stage-outer'>
														<div
															className='owl-stage style-pO7ki'
															id='style-pO7ki'>
															{products
																.slice(0, 4)
																.map((data) => (
																	<div
																		className='owl-item active style-SmoEo'
																		id='style-SmoEo'>
																		<li className='item product product-item'>
																			<div
																				className='product-item-info'
																				data-container='product-grid'>
																				<Link
																					to={`/product/${data._id}`}
																					className='action quickview-handler sm_quickview_handler'
																					title='Quick View'
																					href=''>
																					<div className='image-product'>
																						<a
																							href='#'
																							className='product photo product-item-photo'
																							tabindex='-1'>
																							<span
																								className='product-image-container product-image-container-1 style-bH5WH'
																								id='style-bH5WH'>
																								<span
																									className='product-image-wrapper style-MbttD'
																									id='style-MbttD'>
																									<img
																										className='product-image-photo'
																										src={
																											data
																												.variants[0]
																												.img
																										}
																										data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg'
																										loading='lazy'
																										alt={
																											language ===
																											'en'
																												? data.title
																												: data.title_ar
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
																							}>
																							<AiOutlineEye />
																							<span>
																								{language ===
																								'en'
																									? 'Quick View'
																									: 'مشاهدة سريعة'}
																							</span>
																						</Link>
																					</div>
																				</Link>
																				<div className='product details product-item-details'>
																					<strong className='product name product-item-name'>
																						{language ===
																						'en'
																							? data.title
																							: data.title_ar}
																						<a
																							className='product-item-link'
																							href='#'></a>
																					</strong>
																					<div
																						className='price-box price-final_price'
																						data-role='priceBox'
																						data-product-id='1'
																						data-price-box='product-id-1'>
																						<span className='price-container price-final_price tax weee'>
																							<span
																								id='product-price-1'
																								data-price-amount='250'
																								data-price-type='finalPrice'
																								className='price-wrapper'>
																								<span className='price'>
																									{language ===
																									'ar'
																										? `${formatPrice(
																												getDiscountedPrice2(
																													data,
																												),
																												language,
																										  )} $`
																										: `$ ${formatPrice(
																												getDiscountedPrice2(
																													data,
																												),
																												language,
																										  )}`}
																								</span>
																							</span>
																						</span>
																					</div>
																					<div className='product-item-inner'>
																						<div className='product actions product-item-actions'>
																							<div className='actions-primary'></div>
																							<div
																								data-role='add-to-links'
																								className='actions-secondary'></div>
																							<Link
																								to={`/product/${data._id}`}>
																								<button className='Add-to-Cart-new'>
																									{language ===
																									'en'
																										? 'Add to Cart'
																										: 'اضف الى السلة'}
																								</button>
																							</Link>
																							<div
																								className='actions-secondary'
																								data-role='add-to-links'>
																								<div
																									className='action towishlist'
																									data-action='add-to-wishlist'
																									title='Add to Wish List'>
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
																												viewBox='0 0 16 16'>
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
																												viewBox='0 0 16 16'>
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
																										{language ===
																										'en'
																											? 'Add to Wish List'
																											: 'اضف الى القائمة المفضلة'}
																									</span>
																								</div>
																								<div
																									className='action tocompare'
																									data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																									title='Add to Compare'>
																									<IoGitCompareOutline />
																									<span>
																										{language ===
																										'en'
																											? 'Add to Compare'
																											: 'اضف للمقارنة'}
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
															className='owl-prev disabled'>
															<span aria-label='Previous'>
																‹
															</span>
														</div>
														<div
															role='presentation'
															className='owl-next'>
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
				</div> */}

				<div
					id='listingtabs_1'
					className='block sm-listing-tabs tab-cms-block slider snipcss-X3nN9'>
					<h2>
						{language === 'en'
							? 'Products from Supplier 1'
							: 'منتجات المورد 1'}
					</h2>
					<div className='block-content'>
						<div className='ltabs-wrap'>
							<div className='ltabs-tabs-container'>
								<div
									className='ltabs-tabs-wrap'
									tabindex='-1'>
									<span className='ltabs-current-select'>
										{language === 'en'
											? 'Supplier 1 Products'
											: 'منتجات المورد 1'}
									</span>
								</div>
							</div>
							<div className='listingtabs-cms'>
								<div className='cms-container'>
									<div className='banner-image container-hidd'>
										<Link to={`/products/661ec09579b26e415350f750`}>
											<img
												className='mark-lazy new-lazy'
												src={
													categoryImages['coat'] ||
													'default_image_url'
												}
												data-src={
													categoryImages['coat'] ||
													'default_image_url'
												}
												alt='BannerImage'
											/>
										</Link>
									</div>
								</div>
								<div className='ltabs-items-container'>
									<div className='ltabs-items ltabs-items-selected ltabs-items-loaded ltabs-items-15'>
										<div className='ltabs-items-inner'>
											<div className='products wrapper grid products-grid'>
												<ol className='products list items product-items owl-carousel owl-theme owl-loaded owl-drag'>
													<div className='owl-stage-outer'>
														<div
															className='owl-stage style-pO7ki'
															id='style-pO7ki'>
															{products
																.filter(
																	(data) =>
																		data.supplier ===
																		'661ec09579b26e415350f750',
																)
																.slice(0, 4)
																.map((data) => (
																	<div
																		className='owl-item active style-SmoEo'
																		id='style-SmoEo'>
																		<li className='item product product-item'>
																			<div
																				className='product-item-info'
																				data-container='product-grid'>
																				<Link
																					to={`/product/${data._id}`}
																					className='action quickview-handler sm_quickview_handler'
																					title='Quick View'
																					href=''>
																					<div className='image-product'>
																						<a
																							href='#'
																							className='product photo product-item-photo'
																							tabindex='-1'>
																							<span
																								className='product-image-container product-image-container-1 style-bH5WH'
																								id='style-bH5WH'>
																								<span
																									className='product-image-wrapper style-MbttD'
																									id='style-MbttD'>
																									<img
																										className='product-image-photo'
																										src={
																											data
																												.variants[0]
																												.img
																										}
																										data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg'
																										loading='lazy'
																										alt={
																											language ===
																											'en'
																												? data.title
																												: data.title_ar
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
																							}>
																							<AiOutlineEye />
																							<span>
																								{language ===
																								'en'
																									? 'Quick View'
																									: 'مشاهدة سريعة'}
																							</span>
																						</Link>
																					</div>
																				</Link>
																				<div className='product details product-item-details'>
																					<strong className='product name product-item-name'>
																						{language ===
																						'en'
																							? data.title
																							: data.title_ar}
																						<a
																							className='product-item-link'
																							href='#'></a>
																					</strong>
																					<div
																						className='price-box price-final_price'
																						data-role='priceBox'
																						data-product-id='1'
																						data-price-box='product-id-1'>
																						<span className='price-container price-final_price tax weee'>
																							<span
																								id='product-price-1'
																								data-price-amount='250'
																								data-price-type='finalPrice'
																								className='price-wrapper'>
																								<span className='price'>
																									{language ===
																									'ar'
																										? `${formatPrice(
																												getDiscountedPrice2(
																													data,
																												),
																												language,
																										  )} $`
																										: `$ ${formatPrice(
																												getDiscountedPrice2(
																													data,
																												),
																												language,
																										  )}`}
																								</span>
																							</span>
																						</span>
																					</div>
																					<div className='product-item-inner'>
																						<div className='product actions product-item-actions'>
																							<div className='actions-primary'></div>
																							<div
																								data-role='add-to-links'
																								className='actions-secondary'></div>
																							<Link
																								to={`/product/${data._id}`}>
																								<button className='Add-to-Cart-new'>
																									{language ===
																									'en'
																										? 'Add to Cart'
																										: 'اضف الى السلة'}
																								</button>
																							</Link>
																							<div
																								className='actions-secondary'
																								data-role='add-to-links'>
																								<div
																									className='action towishlist'
																									data-action='add-to-wishlist'
																									title='Add to Wish List'>
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
																												viewBox='0 0 16 16'>
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
																												viewBox='0 0 16 16'>
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
																										{language ===
																										'en'
																											? 'Add to Wish List'
																											: 'اضف الى القائمة المفضلة'}
																									</span>
																								</div>
																								<div
																									className='action tocompare'
																									data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																									title='Add to Compare'>
																									<IoGitCompareOutline />
																									<span>
																										{language ===
																										'en'
																											? 'Add to Compare'
																											: 'اضف للمقارنة'}
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
															className='owl-prev disabled'>
															<span aria-label='Previous'>
																‹
															</span>
														</div>
														<div
															role='presentation'
															className='owl-next'>
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

				<div
					id='listingtabs_2'
					className='block sm-listing-tabs tab-cms-block slider snipcss-X3nN9'>
					<h2>
						{language === 'en'
							? 'Products from Supplier 2'
							: 'منتجات المورد 2'}
					</h2>
					<div className='block-content'>
						<div className='ltabs-wrap'>
							<div className='ltabs-tabs-container'>
								<div
									className='ltabs-tabs-wrap'
									tabindex='-1'>
									<span className='ltabs-current-select'>
										{language === 'en'
											? 'Supplier 2 Products'
											: 'منتجات المورد 2'}
									</span>
								</div>
							</div>
							<div className='listingtabs-cms'>
								<div className='cms-container'>
									<div className='banner-image container-hidd'>
										<Link to={`/products/661fc87956155222d9a7b8e1`}>
											<img
												className='mark-lazy new-lazy'
												src={
													categoryImages['jeans'] ||
													'default_image_url'
												}
												data-src={
													categoryImages['jeans'] ||
													'default_image_url'
												}
												alt='BannerImage'
											/>
										</Link>
									</div>
								</div>
								<div className='ltabs-items-container'>
									<div className='ltabs-items ltabs-items-selected ltabs-items-loaded ltabs-items-15'>
										<div className='ltabs-items-inner'>
											<div className='products wrapper grid products-grid'>
												<ol className='products list items product-items owl-carousel owl-theme owl-loaded owl-drag'>
													<div className='owl-stage-outer'>
														<div
															className='owl-stage style-pO7ki'
															id='style-pO7ki'>
															{console.log(products)}
															{products
																.filter(
																	(data) =>
																		data.supplier ===
																		'661fc87956155222d9a7b8e1',
																)
																.slice(0, 4)
																.map((data) => (
																	<div
																		className='owl-item active style-SmoEo'
																		id='style-SmoEo'>
																		<li className='item product product-item'>
																			<div
																				className='product-item-info'
																				data-container='product-grid'>
																				<Link
																					to={`/product/${data._id}`}
																					className='action quickview-handler sm_quickview_handler'
																					title='Quick View'
																					href=''>
																					<div className='image-product'>
																						<a
																							href='#'
																							className='product photo product-item-photo'
																							tabindex='-1'>
																							<span
																								className='product-image-container product-image-container-1 style-bH5WH'
																								id='style-bH5WH'>
																								<span
																									className='product-image-wrapper style-MbttD'
																									id='style-MbttD'>
																									<img
																										className='product-image-photo'
																										src={
																											data
																												.variants[0]
																												.img
																										}
																										data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg'
																										loading='lazy'
																										alt={
																											language ===
																											'en'
																												? data.title
																												: data.title_ar
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
																							}>
																							<AiOutlineEye />
																							<span>
																								{language ===
																								'en'
																									? 'Quick View'
																									: 'مشاهدة سريعة'}
																							</span>
																						</Link>
																					</div>
																				</Link>
																				<div className='product details product-item-details'>
																					<strong className='product name product-item-name'>
																						{language ===
																						'en'
																							? data.title
																							: data.title_ar}
																						<a
																							className='product-item-link'
																							href='#'></a>
																					</strong>
																					<div
																						className='price-box price-final_price'
																						data-role='priceBox'
																						data-product-id='1'
																						data-price-box='product-id-1'>
																						<span className='price-container price-final_price tax weee'>
																							<span
																								id='product-price-1'
																								data-price-amount='250'
																								data-price-type='finalPrice'
																								className='price-wrapper'>
																								<span className='price'>
																									{language ===
																									'ar'
																										? `${formatPrice(
																												getDiscountedPrice2(
																													data,
																												),
																												language,
																										  )} $`
																										: `$ ${formatPrice(
																												getDiscountedPrice2(
																													data,
																												),
																												language,
																										  )}`}
																								</span>
																							</span>
																						</span>
																					</div>
																					<div className='product-item-inner'>
																						<div className='product actions product-item-actions'>
																							<div className='actions-primary'></div>
																							<div
																								data-role='add-to-links'
																								className='actions-secondary'></div>
																							<Link
																								to={`/product/${data._id}`}>
																								<button className='Add-to-Cart-new'>
																									{language ===
																									'en'
																										? 'Add to Cart'
																										: 'اضف الى السلة'}
																								</button>
																							</Link>
																							<div
																								className='actions-secondary'
																								data-role='add-to-links'>
																								<div
																									className='action towishlist'
																									data-action='add-to-wishlist'
																									title='Add to Wish List'>
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
																												viewBox='0 0 16 16'>
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
																												viewBox='0 0 16 16'>
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
																										{language ===
																										'en'
																											? 'Add to Wish List'
																											: 'اضف الى القائمة المفضلة'}
																									</span>
																								</div>
																								<div
																									className='action tocompare'
																									data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																									title='Add to Compare'>
																									<IoGitCompareOutline />
																									<span>
																										{language ===
																										'en'
																											? 'Add to Compare'
																											: 'اضف للمقارنة'}
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
															className='owl-prev disabled'>
															<span aria-label='Previous'>
																‹
															</span>
														</div>
														<div
															role='presentation'
															className='owl-next'>
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
			</div>
		</>
	);
};
export default Catog;
