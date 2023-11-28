import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import FooterNew from '../components/FooterNew';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { publicRequest, userRequest } from '../requestMethods';
import { addProduct, getAllProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { selectCurrentUserId } from '../redux/userRedux';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
	user-select: none;
`;

const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ padding: '10px', flexDirection: 'column' })}
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
`;

const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
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

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 	  setCurrentIndex(currentIndex + 1 )
	// 	}, 5000);

	// const [newQuantity, setNewQuantity] = useState(product.quantity);

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
		const cartProduct = mergedCart.find((item) => item._id === product._id);
		// console.log(cartProduct);
		const cartQuantity = cartProduct ? cartProduct.quantity : 0;
		// console.log(cartQuantity);

		const availableQuantity = selectedVariant
			? selectedVariant.quantity - cartQuantity
			: 0;
		// console.log(availableQuantity);

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
		const existingItem = acc.find((item) => item._id === curr._id);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);

	const checkAvailability = useCallback(() => {
		const totalAvailableQuantity = selectedVariant
			? selectedVariant.quantity
			: 0;
		//2 , 4
		console.log(
			`🚀  file: Product.jsx:267  totalAvailableQuantity =>`,
			totalAvailableQuantity,
		);
		//[]
		console.log(`🚀  file: Product.jsx:267  mergedCart =>`, mergedCart);
		// setSelectedVariant
		if (selectedVariant) {
			console.log(
				`🚀  file: Product.jsx:267  selectedVariant =>`,
				selectedVariant._id,
			);
		}

		let cartQuantity = 0;

		if (selectedVariant && mergedCart) {
			const cartProduct = mergedCart.find((item) =>
				item.variants.find(
					(variant) => variant._id === selectedVariant._id,
				),
			);

			console.log(`🚀  file: Product.jsx:267  cartProduct =>`, cartProduct);

			if (cartProduct) {
				cartQuantity = cartProduct.quantity;
			}
			console.log(`🚀  file: Product.jsx:267  cartProduct =>`, cartProduct);
			// cartQuantity = cartProduct ? cartProduct.quantity : 0;
		}
		if (selectedVariant && mergedCart) {
			const updatedCart = mergedCart.map((item) => {
				console.log(`🚀  file: Product.jsx:267  item =>`, item);
				const zaid = item.variants.find(
					(variant) => variant._id === selectedVariant._id,
				);
				console.log(`🚀  file: Product.jsx:267  zaid =>`, zaid);
				if (zaid) {
					return {
						...item,
						variants: item.variants.map((variant) => {
							if (variant._id === selectedVariant._id) {
								const zaid2 = selectedVariant.quantity - quantity;

								console.log(
									`🚀  file: Product.jsx:267  quantity =>`,
									quantity,
								);
								console.log(
									`🚀  file: Product.jsx:267  variant.quantity =>`,
									variant.quantity,
								);

								console.log(
									`🚀  file: Product.jsx:267  zaid2 =>`,
									zaid2,
								);
								if (zaid2 <= 0) {
									setIsButtonDisabled(true);
								}

								return {
									...variant,
									quantity:
										cartProducts.quantity - selectedVariant.quantity,
								};
							} else {
								setIsButtonDisabled(false);

								return variant;
							}
						}),
					};
				}
			});
			// let reduxLocal = JSON.parse(localStorage.getItem('persist:root'));
			// reduxLocal.cart = JSON.parse(JSON.stringify(updatedCart));
			// console.log(reduxLocal);
			// localStorage.setItem('persist:root', JSON.stringify(reduxLocal));
		}
		const availableQuantity = totalAvailableQuantity - cartQuantity;
		setIsButtonDisabled(availableQuantity <= 0);
	}, [mergedCart, product._id, selectedVariant]);
	useEffect(() => {
		checkAvailability();
	}, [mergedCart, product._id]);

	const handleClick = () => {
		if (!selectedVariant) {
			swal('Please select a variant');
			return;
		}

		if (wishlistLogin === false) {
			swal({
				title: 'You have to login !',
				icon: 'warning',
				buttons: true,
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
			dispatch(
				addProduct({
					...product,
					price: product.offerPrice || product.price,
					quantity,
					selectedVariant,
				}),
			);
			setQuantity(1);
			swal('Success', 'Product added to cart!', 'success');
		}
	};

	const setColor2 = (color) => {
		const variants = product.variants.filter((variant) =>
			variant.color.includes(color),
		);
		const sizes = variants.flatMap((variant) => variant.size);
		setAvailableSizes(sizes);
		setSelectedVariant(variants[0]);
		setQuantity(1); // Reset quantity
	};

	const setSize2 = (size) => {
		const variants = product.variants.filter((variant) =>
			variant.size.includes(size),
		);
		const colors = variants.flatMap((variant) => variant.color);
		setAvailableColors(colors);
		setSelectedVariant(variants[0]);
		setQuantity(1); // Reset quantity
	};

	const findSelectedVariant = () => {
		if (product.variants) {
			const selectedVariant = product.variants.find(
				(variant) => variant.size === size && variant.color === color,
			);
			setSelectedVariant(selectedVariant);
		}
	};

	useEffect(() => {
		findSelectedVariant();
	}, [size, color]);
	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Wrapper>
				<ImgContainer>
					{Product ? (
						<>
							<Image2
								src={product?.variants?.[0]?.img}
								alt={`product-${currentIndex}`}
							/>
							<CenterIcons>
								<button
									style={{ marginRight: '10px' }}
									// onClick={prevSlide}
								>
									<FaArrowLeft />
								</button>
								<button
									style={{ marginLeft: '10px' }}
									// onClick={nextSlide}
								>
									<FaArrowRight />
								</button>
							</CenterIcons>
						</>
					) : (
						<p>No images available</p>
					)}
				</ImgContainer>

				<InfoContainer>
					<Title>{product.title}</Title>
					<Desc>{product.desc}</Desc>
					{product.offerPrice !== undefined &&
					product.offerPrice !== null &&
					product.offerPrice !== '' ? (
						<>
							<Price className='price55'>$ {product.price}</Price>
							<Price>$ {product.offerPrice}</Price>
						</>
					) : (
						<Price>$ {product.price}</Price>
					)}
					<FilterContainer>
						<Filter>
							<FilterTitle>Color : </FilterTitle>
							{availableColors.map((c) => (
								<FilterColor
									className='Color'
									color={c}
									key={c}
									onClick={() => setColor2(c)}
									// onClick={() => setColor(c)}
								/>
							))}
						</Filter>
						<Filter>
							<FilterTitle>Size : </FilterTitle>
							<FilterSize onChange={(e) => setSize2(e.target.value)}>
								{availableSizes.map((s) => (
									<FilterSizeOption key={s}>{s}</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={() => handleQuantity('dec')} />
							<Amount>{quantity}</Amount>
							<Add onClick={() => handleQuantity('inc')} />
						</AmountContainer>
						<Button
							className='AddCart'
							onClick={handleClick}
							disabled={isButtonDisabled}
						>
							ADD TO CART
						</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter />
			<FooterNew />
			{/* <MobileMenu /> */}
		</Container>
	);
};

export default Product;
