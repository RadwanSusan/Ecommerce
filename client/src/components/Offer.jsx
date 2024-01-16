import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from 'react';
import './offer.css';
import styled from 'styled-components';
import { IoGitCompareOutline } from 'react-icons/io5';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { AiOutlineEye, AiFillCloseCircle } from 'react-icons/ai';
import {
	BsHeart,
	BsArrowUpCircle as ArrowUp,
	BsArrowDownCircle as ArrowDown,
} from 'react-icons/bs';
import { wishlist, userWishListArrayGet } from '../redux/apiCalls';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';
import swal from 'sweetalert';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import Slider from 'react-slick';
import ImageSlider from './ImageSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
const FilterSizeCatog = styled.select`
	margin-left: 10px;
	padding: 5px;
`;
function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<BiChevronRight
			className={className}
			style={{ ...style, display: 'block', fontSize: '30px' }}
			onClick={onClick}
		/>
	);
}
function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<BiChevronLeft
			className={className}
			style={{ ...style, display: 'block', fontSize: '30px' }}
			onClick={onClick}
		/>
	);
}
const Offer = () => {
	const cartSelector = (state) => state.cart;
	const [offer, setOffer] = useState([]);
	const [wishlistLogin, setWishlistLogin] = useState(false);
	const [product_id, setProduct_id] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState('');
	const cartProducts = useSelector(cartSelector);
	const [AllProducts, setAllProducts] = useState([]);
	const [isProductAvailable, setIsProductAvailable] = useState(false);
	const [productGet, setProductGet] = useState({});
	const [offerGet, setOfferGet] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedVariants, setSelectedVariants] = useState([]);
	const [cartQuantityValue, setCartQuantity] = useState(0);
	const [viewArrCatog, setViewArrCatog] = useState(null);
	const [resetTrigger, setResetTrigger] = useState(0);
	const filterSizeCatog = document.querySelector('.FilterSizeCatog2');
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	const addCartBtn = document.querySelector('.AddCart2');
	const sizesTranslation = dictionary['sizes'];
	dayjs.extend(relativeTime);
	const dispatch = useDispatch();
	document.querySelectorAll('.CloseCatogCard').forEach((item) =>
		item.addEventListener('click', (e) => {
			document.querySelector('.CatogCard2').style.display = 'none';
			document.body.style.overflow = '';
			document.querySelector('.CatogCard2').style.overflow = '';
			document.querySelector('.backLayerForShowCart2').style.display =
				'none';
		}),
	);
	useEffect(() => {
		if (isLoading) {
			setIsProductAvailable(chekAvail2());
		}
	}, [isLoading]);
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
			const catogCard = document.querySelector('.CatogCard2');
			const productCard_block2 = document.querySelector(
				'.productCard_block2',
			);
			const backLayerForShowCart = document.querySelector(
				'.backLayerForShowCart2',
			);
			catogCard.style.display = 'block';
			catogCard.style.overflow = 'hidden';
			backLayerForShowCart.style.display = 'block';
			backLayerForShowCart.style.overflow = 'hidden';
			productCard_block2.style.display = 'block';
			productCard_block2.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
			document.querySelector('.CatogCardDesc2').textContent =
				language === 'en' ? viewArrCatog.desc : viewArrCatog.desc_ar;
			aramex.innerHTML = '';
			setProduct_id(viewArrCatog._id);
			document.querySelector('.nameProducts2').innerHTML =
				language === 'en' ? viewArrCatog.title : viewArrCatog.title_ar;
			document
				.querySelector('.block_product__advantagesProduct')
				.append(
					language === 'en' ? viewArrCatog.desc : viewArrCatog.desc_ar,
				);
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
	const enableAddCartBtn = (btn) => {
		btn.pointerEvents = 'auto';
		btn.style.opacity = '1';
		btn.style.cursor = 'pointer';
	};
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
		const filterSizeCatog = document.querySelector('.FilterSizeCatog2');
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
				setSelectedVariants([selectedVariant]);
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
		setSelectedVariants,
		setSelectedSize,
		setQuantity,
	]);
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
								setSelectedVariants([selectedVariant]);
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
	const findItemById = (id) => {
		const items = [...productGet, ...offerGet];
		return items.find((item) => item._id === id);
	};
	const chekAvail2 = () => {
		return true;
	};
	const addToCart = (ele) => {
		const productId = ele.target.getAttribute('product_id2');
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
		const sizeSelected = document.querySelector('.FilterSizeCatog2').value;
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
			const filterSizeCatog2 = document.querySelector('.FilterSizeCatog2');
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
					: 'تمت اضافة المنتج الى السلة',
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
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		getProducts();
	}, []);
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
	function formatNumberToArabic(number) {
		return new Intl.NumberFormat('ar-EG').format(number);
	}
	const settings = {
		dots: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		infinite: true,
		speed: 500,
		slidesToShow: offer.length >= 2 ? 2 : 1,
		slidesToScroll: 1,
		rtl: language === 'ar',
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		pauseOnFocus: true,
		pauseOnDotsHover: true,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<>
			<div className='backLayerForShowCart2'></div>
			<div className='column small-centered'>
				<div className='productCard_block2 CatogCard2'>
					<div className='row11'>
						<div className='small-12 large-6 columns11'>
							<div className='productCard_leftSide clearfix'>
								<ImageSlider />
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
														key={resetTrigger}
														className='block_quantity__chooseBlock'>
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
													<div className='block_goodColor__allColors CatogallColors'></div>
													<FilterSizeCatog
														className='FilterSizeCatog2'
														onChange={(e) =>
															setSize(e.target.value)
														}></FilterSizeCatog>
												</div>
												{isLoading ? (
													isProductAvailable ? (
														<button
															className='AddCart2'
															product_id2={product_id}
															onClick={(ele) => {
																addToCart(ele);
															}}>
															{language === 'en'
																? 'Add to cart'
																: 'اضف الى السلة'}
														</button>
													) : (
														<button
															className='AddCart2'
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
			<div
				className='group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC'
				id='style-sCNUC'>
				<div>
					<div className='block block-list-products'>
						<div className='block-title'>
							<strong>
								{language === 'ar' ? 'عروض خاصة' : 'Special Offers'}
							</strong>
						</div>
						<div className='block-content'>
							<div
								id='filterproducts_1'
								className={`product-deal-list ${
									language === 'ar' ? 'product-deal-list-ar' : ''
								}`}>
								<Link to={`/`}>
									<div className='deal-left'>
										<div className='deal-description'>
											<div>
												{language === 'ar'
													? 'عرض خاص'
													: 'Special Offer!'}
												<br />
												{language === 'ar' ? ' أعلى من' : 'up to'}
												<span
													id='style-Leion'
													className='style-Leion'>
													{language === 'en'
														? ' 50%'
														: `${formatNumberToArabic(50)}%`}
												</span>
												{language === 'ar' ? ' خصم' : ' off'}
											</div>
										</div>
										<div className='timer-content'>
											<div className='timer-title'>
												{language === 'ar'
													? ' أسرع - بسرعة! انقر هنا لإظهار كافة العروض'
													: 'Hurry Up! Click here to show All Offer'}
											</div>
										</div>
									</div>
								</Link>
								<div
									className={
										language === 'ar'
											? 'deal-contentAr'
											: 'deal-content'
									}>
									<div className='owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag'>
										<div className='owl-stage-outer'>
											<Slider {...settings}>
												{offer.map((data) => (
													<div
														className='owl-item active style-Ke3kW'
														id='style-Ke3kW'>
														<div className='item product product-item'>
															<div
																className={`product-item-info ${
																	language === 'ar'
																		? 'product-item-info-ar'
																		: ''
																} `}
																data-container='product-grid'>
																<Link
																	to={`/product/${data._id}`}
																	className='action quickview-handler
																	sm_quickview_handler'
																	title='Quick View'
																	href=''>
																	<div className='image-product'>
																		<div className='product photo product-item-photo'>
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
																			className='action quickview-handler sm_quickview_handler show-cart3'
																			title='Quick View'
																			catog-id={data._id}>
																			<AiOutlineEye />
																			<span>
																				{language === 'en'
																					? 'Quick View'
																					: 'مشاهدة سريعة'}
																			</span>
																		</Link>
																	</div>
																</Link>
																<div className='product details product-item-details'>
																	<strong className='product name product-item-name'>
																		<div className='product-item-link'>
																			{language === 'ar'
																				? data.title_ar
																				: data.title}
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
																					{language ===
																					'ar'
																						? 'التوفر:'
																						: 'Availability:'}
																					<span>150</span>
																				</div>
																				<div
																					className={
																						language ===
																						'ar'
																							? 'time-leftAr'
																							: 'time-left'
																					}>
																					{language ===
																					'ar'
																						? 'الوقت المتبقي'
																						: 'Time left: '}
																					<span
																						style={{
																							color: '#ff4444',
																						}}>
																						{dayjs(
																							data
																								.discount
																								.endDate,
																						).fromNow()}
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
																	<div
																		className={
																			language === 'ar'
																				? 'product-item-actions'
																				: 'product-item-actions'
																		}>
																		<div className='actions-primary'>
																			<Link
																				to={`/product/${data._id}`}>
																				<button
																					className='action tocart primary'
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/13\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																					type='button'
																					title='Add to Cart'>
																					<span>
																						{language ===
																						'ar'
																							? 'اضف الى السلة'
																							: 'Add to Cart'}
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
																					'ar'
																						? 'اضف الى المفضلة'
																						: 'Add to Wishlist'}
																				</span>
																			</div>
																			<div
																				className='action tocompare'
																				title='Add to Compare'>
																				<IoGitCompareOutline />
																				<span>
																					{language ===
																					'ar'
																						? 'اضف للمقارنة'
																						: 'Add to Compare'}
																				</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}
											</Slider>
										</div>
									</div>
									<div className='loading-content'>
										<span className='hidden'>
											{language === 'ar' ? 'تحميل...' : 'Loading...'}
										</span>
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
