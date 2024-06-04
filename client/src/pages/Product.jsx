import React from 'react';
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import FooterNew from '../components/FooterNew';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { selectCurrentUserId } from '../redux/userRedux';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { LanguageContext } from '../components/LanguageContext';

const Container = styled.div`
	user-select: none;
`;

const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ padding: '10px', flexDirection: 'column' })}
	${(props) => props.language === 'ar' && 'flex-direction: row-reverse'}
`;

const ImgContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Image = styled.img`
	width: 100%;
	height: 500px;
	object-fit: contain;
	${mobile({ height: '300px' })}
`;

const CenterIcons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: '10px' })}
	${(props) =>
		props.language === 'ar' &&
		`
    text-align: -webkit-right;
  `}
`;

const Title = styled.h1`
	font-weight: 200;
	margin-bottom: 20px;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const PriceContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
	margin-right: 20px;

	&.original-price {
		text-decoration: line-through;
		color: #999;
	}
`;

const FilterContainer = styled.div`
	margin-bottom: 30px;
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	flex-direction: ${(props) =>
		props.language === 'ar' ? 'row-reverse' : 'row'};
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
	margin-right: 10px;
`;

const FilterVariants = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const FilterVariant = styled.div`
	padding: 10px 15px;
	margin-right: 10px;
	margin-bottom: 10px;
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: ${(props) => (props.selected ? '#f0f0f0' : 'transparent')};
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #f0f0f0;
	}

	${(props) =>
		props.language === 'ar' &&
		`
    margin-left: 10px;
    margin-right: 0;
  `}
`;

const AddContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ flexDirection: 'column' })}
`;

const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;

const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 10px;
`;

const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #f8f4f4;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}
`;

const cartSelector = (state) => state.cart;

const Product = () => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [variant, setVariant] = useState(null);
	const dispatch = useDispatch();
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const [wishlistLogin, setWishlistLogin] = useState(false);
	const userId = useSelector(selectCurrentUserId);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const cartProducts = useSelector(cartSelector);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [availableQuantityAfterUpdate, setAvailableQuantityAfterUpdate] =
		useState(0);
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	const [selectedOptions, setSelectedOptions] = useState({});

	useEffect(() => {
		if (userId !== undefined) {
			setWishlistLogin(true);
		}
	}, [userId]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const getProduct = async () => {
			try {
				let res = await publicRequest.get('/products/find/' + id);
				if (res.data == null) {
					res = await publicRequest.get('/offer/find/' + id);
				}
				setProduct(res.data);
				console.log('product', res.data.type);
				if (res.data.type === 'variable') {
					const initialSelectedOptions =
						res.data.variants[0].keyValue.reduce(
							(acc, { key, value }) => {
								acc[key] = value;
								return acc;
							},
							{},
						);
					setSelectedOptions(initialSelectedOptions);
					setVariant(res.data.variants[0]);
				}
			} catch {
				console.log('error');
			}
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		const cartProduct = mergedCart.find(
			(item) =>
				item._id === product._id &&
				item.selectedVariant?._id === variant?._id,
		);
		const cartQuantity = cartProduct ? cartProduct.quantity : 0;
		const availableQuantity =
			variant?.quantity !== undefined
				? variant.quantity - cartQuantity
				: product.quantity - cartQuantity;

		if (type === 'dec') {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			if (quantity >= availableQuantity) {
				swal(
					'Info',
					'You have exceeded the number of available products!',
					'info',
				);
			} else {
				setQuantity(quantity + 1);
			}
		}
	};

	const mergedCart = cartProducts.products.reduce((acc, curr) => {
		const existingItem = acc.find(
			(item) =>
				item._id === curr._id &&
				item.selectedVariant?._id === curr.selectedVariant?._id,
		);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);

	const handleOptionChange = (key, value) => {
		setSelectedOptions((prevOptions) => {
			const newOptions = { ...prevOptions, [key]: value };
			const selectedVariant = product.variants.find((variant) =>
				variant.keyValue.every(
					({ key, value }) => newOptions[key] === value,
				),
			);

			if (selectedVariant) {
				setVariant(selectedVariant);
				setQuantity(1);
				const cartProduct = mergedCart.find(
					(item) =>
						item._id === product._id &&
						item.selectedVariant._id === selectedVariant._id,
				);
				if (cartProduct) {
					setAvailableQuantityAfterUpdate(
						selectedVariant.quantity - cartProduct.quantity,
					);
				} else {
					setAvailableQuantityAfterUpdate(selectedVariant.quantity);
				}
				checkAvailability();
			}

			return newOptions;
		});
	};

	const checkAvailability = useCallback(() => {
		if ((variant || product.type === 'simple') && mergedCart) {
			const cartProduct = mergedCart.find(
				(item) =>
					item._id === product._id &&
					item.selectedVariant?._id === variant?._id,
			);
			const cartQuantity = cartProduct ? cartProduct.quantity : 0;
			const availableQuantity =
				variant?.quantity !== undefined
					? variant.quantity - cartQuantity
					: product.quantity - cartQuantity;
			setAvailableQuantityAfterUpdate(availableQuantity);
			setIsButtonDisabled(availableQuantity <= 0);
		}
	}, [mergedCart, product._id, variant, product.type, product.quantity]);

	useEffect(() => {
		checkAvailability();
	}, [
		mergedCart,
		product._id,
		variant,
		quantity,
		checkAvailability,
		availableQuantityAfterUpdate,
		product.type,
		product.quantity,
	]);

	useEffect(() => {
		const cartProduct = mergedCart.find(
			(item) =>
				item?._id === product?._id &&
				item?.selectedVariant?._id === variant?._id,
		);
		if (cartProduct) {
			setAvailableQuantityAfterUpdate(
				variant?.quantity !== undefined
					? variant.quantity - cartProduct.quantity
					: product.quantity - cartProduct.quantity,
			);
		} else {
			setAvailableQuantityAfterUpdate(
				variant?.quantity !== undefined
					? variant.quantity
					: product.quantity,
			);
		}
	}, [variant, mergedCart, product._id, product.quantity]);

	const setVariant2 = (selectedVariant) => {
		setVariant(selectedVariant);
		setQuantity(1);
		const cartProduct = mergedCart.find(
			(item) =>
				item._id === product._id &&
				item.selectedVariant._id === selectedVariant._id,
		);
		if (cartProduct) {
			setAvailableQuantityAfterUpdate(
				selectedVariant.quantity - cartProduct.quantity,
			);
		} else {
			setAvailableQuantityAfterUpdate(selectedVariant.quantity);
		}
		checkAvailability();
	};

	function formatPrice(price, language) {
		return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
			style: 'decimal',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	}

	const handleClick = () => {
		if (product.type === 'variable' && !variant) {
			swal('Please select a variant');
			return;
		}
		if (wishlistLogin === false) {
			swal({
				title: 'You have to login !',
				icon: 'warning',
				confirmButtonColor: '#42A5F5',
				confirmButtonText: 'Login',
				showCancelButton: true,
				closeOnConfirm: false,
			}).then((e) => {
				if (e) {
					window.location.href = '/login';
				}
			});
		} else {
			const productToAdd = {
				...product,
				price: product.price,
				quantity: quantity,
				selectedVariant: variant,
			};
			dispatch(addProduct(productToAdd));
			setQuantity(1);
			setAvailableQuantityAfterUpdate(
				variant?.quantity !== undefined
					? variant.quantity - quantity
					: product.quantity - quantity,
			);
			swal('Success', 'Product added to cart!', 'success');
			checkAvailability();
		}
	};

	function formatNumberToArabic(number) {
		return new Intl.NumberFormat('ar-EG').format(number);
	}

	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Wrapper language={language}>
				<ImgContainer>
					{variant ? (
						<>
							<Image
								src={variant.images[currentIndex]}
								alt={`product-${currentIndex}`}
							/>
							<CenterIcons>
								<button
									style={{ marginRight: '10px' }}
									onClick={() =>
										setCurrentIndex((prevIndex) =>
											prevIndex === 0
												? variant.images.length - 1
												: prevIndex - 1,
										)
									}>
									<FaArrowLeft />
								</button>
								<button
									style={{ marginLeft: '10px' }}
									onClick={() =>
										setCurrentIndex((prevIndex) =>
											prevIndex === variant.images.length - 1
												? 0
												: prevIndex + 1,
										)
									}>
									<FaArrowRight />
								</button>
							</CenterIcons>
						</>
					) : (
						<ImgContainer>
							{product.images && product.images.length > 0 ? (
								<>
									<Image
										src={product.images[0]}
										alt='product'
									/>
									{product.images.length > 1 && (
										<CenterIcons>
											<button
												style={{ marginRight: '10px' }}
												onClick={() =>
													setCurrentIndex((prevIndex) =>
														prevIndex === 0
															? product.images.length - 1
															: prevIndex - 1,
													)
												}>
												<FaArrowLeft />
											</button>
											<button
												style={{ marginLeft: '10px' }}
												onClick={() =>
													setCurrentIndex((prevIndex) =>
														prevIndex ===
														product.images.length - 1
															? 0
															: prevIndex + 1,
													)
												}>
												<FaArrowRight />
											</button>
										</CenterIcons>
									)}
								</>
							) : (
								<p>No images available</p>
							)}
						</ImgContainer>
					)}
				</ImgContainer>
				<InfoContainer language={language}>
					<Title>
						{language === 'ar' ? product.title_ar : product.title}
					</Title>
					<Desc>{language === 'ar' ? product.desc_ar : product.desc}</Desc>
					<PriceContainer>
						<Price>
							{variant
								? language === 'ar'
									? `${formatPrice(variant.price, language)} $`
									: `$ ${formatPrice(variant.price, language)}`
								: language === 'ar'
								? `${formatPrice(product.price, language)} $`
								: `$ ${formatPrice(product.price, language)}`}
						</Price>
					</PriceContainer>
					<FilterContainer>
						{product.variants && (
							<>
								{[
									...new Set(
										product.variants.flatMap((v) =>
											v.keyValue.map((kv) => kv.key),
										),
									),
								].map((key) => (
									<Filter
										key={key}
										language={language}>
										<FilterTitle>{key}:</FilterTitle>
										<FilterVariants>
											{[
												...new Set(
													product.variants
														.filter((v) =>
															v.keyValue.some(
																(kv) => kv.key === key,
															),
														)
														.map(
															(v) =>
																v.keyValue.find(
																	(kv) => kv.key === key,
																).value,
														),
												),
											].map((value) => (
												<FilterVariant
													key={value}
													selected={selectedOptions[key] === value}
													onClick={() =>
														handleOptionChange(key, value)
													}
													language={language}>
													{value}
												</FilterVariant>
											))}
										</FilterVariants>
									</Filter>
								))}
							</>
						)}
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={() => handleQuantity('dec')} />
							<Amount>
								{language === 'ar'
									? formatNumberToArabic(quantity)
									: quantity}
							</Amount>
							<Add onClick={() => handleQuantity('inc')} />
						</AmountContainer>
						<Button
							className='AddCart'
							onClick={handleClick}
							disabled={isButtonDisabled}>
							{dictionary.addToCart}
						</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter />
			<FooterNew />
		</Container>
	);
};

export default Product;
