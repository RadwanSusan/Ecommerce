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
import { publicRequest, userRequest } from '../requestMethods';
import { addProduct, getAllProduct } from '../redux/cartRedux';
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
`;
const Image = styled.img`
	width: 90%;
	height: 70vh;
	object-fit: cover;
	${mobile({ height: '40vh' })}
`;
const Image2 = styled.img`
	height: 500px;
	width: 900px;
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
`;
const Desc = styled.p`
	margin: 20px 0px;
`;
const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
`;
const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ width: '100%' })}
`;
const Filter = styled.div`
	display: flex;
	align-items: center;
	flex-direction: ${(props) =>
		props.language === 'ar' ? 'row-reverse' : 'row'};
`;
const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`;
const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	cursor: pointer;
	margin-left: 10px;
	&:hover {
		outline: 3px solid #292931;
	}
	> * {
		&:first-child {
			outline: 3px solid #292931;
		}
	}
	${(props) =>
		props.language === 'ar' &&
		`
    margin-right: 10px; /* margin for RTL */
    margin-left: 0; /* reset default margin for RTL */
  `}
`;
const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
	${(props) =>
		props.language === 'ar' &&
		`
	margin-right: 10px;
	margin-left: 0;
 `}
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: '100%' })}
`;
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;
const CenterIcons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px 0px;
`;
const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`;
const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`;
const cartSelector = (state) => state.cart;
const Product = () => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	const dispatch = useDispatch();
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const [wishlistLogin, setWishlistLogin] = useState(false);
	const userId = useSelector(selectCurrentUserId);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const cartProducts = useSelector(cartSelector);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [availableSizes, setAvailableSizes] = useState([]);
	const [availableColors, setAvailableColors] = useState([]);
	const [selectedVariant, setSelectedVariant] = useState(null);
	const [availableQuantityAfterUpdate, setavailableQuantityAfterUpdate] =
		useState(selectedVariant?.quantity);
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	const [imageSrc, setImageSrc] = useState(null);
	useEffect(() => {
		if (userId !== undefined) {
			setWishlistLogin(true);
		}
	}, [userId]);
	useEffect(() => {
		const getProduct = async () => {
			try {
				let res = await publicRequest.get('/products/find/' + id);
				if (res.data == null) {
					res = await publicRequest.get('/offer/find/' + id);
				}
				setProduct(res.data);
				const colors = Array.from(
					new Set(res.data.variants.flatMap((variant) => variant.color)),
				);
				setAvailableColors(colors);
				const sizes = Array.from(
					new Set(res.data.variants.flatMap((variant) => variant.size)),
				);
				setAvailableSizes(sizes);
				setImageSrc(res.data.variants[0].img);
			} catch {}
		};
		getProduct();
	}, [id]);
	document.querySelectorAll('.Color').forEach((item) =>
		item.addEventListener('click', (e) => {
			document.querySelectorAll('.Color').forEach((item2) => {
				item2.style.outline = 'none';
			});
			e.target.style.outline = '3px solid #292931';
		}),
	);
	const handleQuantity = (type) => {
		const cartProduct = mergedCart.find(
			(item) =>
				item._id === product._id &&
				item.selectedVariant._id === selectedVariant._id,
		);
		const cartQuantity = cartProduct ? cartProduct.quantity : 0;
		const availableQuantity = selectedVariant
			? selectedVariant.quantity - cartQuantity
			: 0;
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
				item.selectedVariant._id === curr.selectedVariant._id,
		);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);
	let totalAvailableQuantity = selectedVariant ? selectedVariant.quantity : 0;
	const checkAvailability = useCallback(() => {
		if (selectedVariant && mergedCart) {
			const cartProduct = mergedCart.find((item) =>
				item.variants.find(
					(variant) => variant._id === selectedVariant._id,
				),
			);
			if (cartProduct) {
				cartProducts.products.map((item) => {
					if (
						item.selectedVariant._id === cartProduct.selectedVariant._id
					) {
						setavailableQuantityAfterUpdate(
							item.selectedVariant.quantity - item.quantity,
						);
					}
				});
			}
		}
		if (selectedVariant && mergedCart) {
			const updatedCart = mergedCart.map((item) => {
				const zaid = item.variants.find(
					(variant) => variant._id === selectedVariant._id,
				);
				if (zaid) {
					return {
						...item,
						variants: item.variants.map((variant) => {
							if (variant._id === selectedVariant._id) {
								const zaid2 =
									variant.quantity - availableQuantityAfterUpdate;
								totalAvailableQuantity = totalAvailableQuantity - zaid2;
								if (zaid2 <= 0) {
									setIsButtonDisabled(true);
								}
							} else {
								setIsButtonDisabled(false);
								return variant;
							}
						}),
					};
				}
			});
		}
		let availableQuantity;
		if (availableQuantityAfterUpdate > 0) {
			availableQuantity = availableQuantityAfterUpdate;
		} else {
			availableQuantity = totalAvailableQuantity;
		}
		setIsButtonDisabled(availableQuantity <= 0);
	}, [
		mergedCart,
		product._id,
		selectedVariant,
		quantity,
		availableQuantityAfterUpdate,
	]);
	useEffect(() => {
		checkAvailability();
	}, [
		mergedCart,
		product._id,
		selectedVariant,
		quantity,
		checkAvailability,
		availableQuantityAfterUpdate,
	]);
	useEffect(() => {
		const cartProduct = mergedCart.find(
			(item) =>
				item?._id === product?._id &&
				item?.selectedVariant?._id === selectedVariant?._id,
		);
		if (cartProduct) {
			setavailableQuantityAfterUpdate(
				selectedVariant.quantity - cartProduct.quantity,
			);
		} else {
			setavailableQuantityAfterUpdate(
				selectedVariant ? selectedVariant.quantity : 0,
			);
		}
	}, [selectedVariant, mergedCart, product._id]);
	const setColor2 = (color) => {
		const variants = product.variants.filter((variant) =>
			variant.color.includes(color),
		);
		const sizes = variants.flatMap((variant) => variant.size);
		setAvailableSizes(sizes);
		const newSelectedVariant = variants[0];
		setSelectedVariant(newSelectedVariant);
		setQuantity(1);
		setColor(color);
		const defaultSize = sizes[0];
		setSize(defaultSize);
		const selectedVariant = variants.find((variant) =>
			variant.size.includes(defaultSize),
		);
		const cartProduct = mergedCart.find(
			(item) =>
				item._id === product._id &&
				item.selectedVariant._id === newSelectedVariant._id,
		);
		if (cartProduct) {
			setavailableQuantityAfterUpdate(
				newSelectedVariant.quantity - cartProduct.quantity,
			);
		} else {
			setavailableQuantityAfterUpdate(
				newSelectedVariant ? newSelectedVariant.quantity : 0,
			);
		}
		setImageSrc(newSelectedVariant.img);
		checkAvailability();
	};
	const setSize2 = (size) => {
		const variants = product.variants.filter((variant) =>
			variant.size.includes(size),
		);
		const colors = variants.flatMap((variant) => variant.color);
		setAvailableColors(colors);
		setSelectedVariant(variants[0]);
		const newSelectedVariant = variants[0];
		setSelectedVariant(newSelectedVariant);
		setQuantity(1);
		setSize(size);
		const cartProduct = mergedCart.find(
			(item) =>
				item._id === product._id &&
				item.selectedVariant._id === newSelectedVariant._id,
		);
		if (cartProduct) {
			setavailableQuantityAfterUpdate(
				newSelectedVariant.quantity - cartProduct.quantity,
			);
		} else {
			setavailableQuantityAfterUpdate(
				newSelectedVariant ? newSelectedVariant.quantity : 0,
			);
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
		if (!selectedVariant) {
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
			console.log(product);
			dispatch(
				addProduct({
					...product,
					price: product.offerPrice || product.price,

					quantity: quantity,
					selectedVariant,
				}),
			);
			setQuantity(1);
			setavailableQuantityAfterUpdate(selectedVariant.quantity - quantity);
			swal('Success', 'Product added to cart!', 'success');
			checkAvailability();
		}
	};
	const findSelectedVariant = () => {
		if (
			product &&
			product.variants &&
			availableSizes.length === 1 &&
			availableColors.length === 1
		) {
			const selectedVariant2 = product.variants.find(
				(variant) =>
					variant.size.includes(availableSizes[0]) &&
					variant.color.includes(availableColors[0]),
			);
			setSelectedVariant(selectedVariant2);
		} else if (product && product.variants) {
			const selectedVariant2 = product.variants.find(
				(variant) =>
					variant.size.includes(size) && variant.color.includes(color),
			);
			setSelectedVariant(selectedVariant2);
		}
	};
	function formatNumberToArabic(number) {
		return new Intl.NumberFormat('ar-EG').format(number);
	}
	useEffect(() => {
		findSelectedVariant();
	}, [
		size,
		color,
		product.variants,
		checkAvailability,
		availableQuantityAfterUpdate,
		setColor,
		setColor2,
	]);
	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Wrapper language={language}>
				<ImgContainer>
					{Product ? (
						<>
							<Image2
								src={imageSrc}
								alt={`product-${currentIndex}`}
							/>
							<CenterIcons>
								<button style={{ marginRight: '10px' }}>
									<FaArrowLeft />
								</button>
								<button style={{ marginLeft: '10px' }}>
									<FaArrowRight />
								</button>
							</CenterIcons>
						</>
					) : (
						<p>No images available</p>
					)}
				</ImgContainer>

				<InfoContainer language={language}>
					<Title>
						{language === 'ar' ? product.title_ar : product.title}
					</Title>
					<Desc>{language === 'ar' ? product.desc_ar : product.desc}</Desc>
					{product.offerPrice !== undefined &&
					product.offerPrice !== null &&
					product.offerPrice !== '' ? (
						<>
							<Price className='price55'> {product.price}</Price>
						</>
					) : (
						<Price>
							{language === 'ar'
								? `${formatPrice(product.price, language)} $`
								: `$ ${formatPrice(product.price, language)}`}
						</Price>
					)}
					<FilterContainer>
						<Filter language={language}>
							<FilterTitle language={language}>
								{dictionary.color}{' '}
							</FilterTitle>
							{availableColors.map((c) => (
								<FilterColor
									className='Color'
									color={c}
									key={c}
									language={language}
									onClick={() => setColor2(c)}
								/>
							))}
						</Filter>
						<Filter language={language}>
							<FilterTitle language={language}>
								{dictionary.size}
							</FilterTitle>
							<FilterSize
								language={language}
								onChange={(e) => setSize2(e.target.value)}>
								{availableSizes.map((s) => (
									<FilterSizeOption key={s}>
										{dictionary.sizes[s] || s}
									</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
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
