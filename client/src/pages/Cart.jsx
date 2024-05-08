import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import { mobile } from '../responsive';
import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import FooterNew from '../components/FooterNew';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { removeProduct } from '../redux/cartRedux';
import { increase, decrease, calc, reset } from '../redux/cartRedux';
import { useHistory, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import {
	updateProductOrOffer,
	addToCart,
	addOrder,
	purchaseSuccessfulEmail,
	purchaseSuccessfulEmailAdmin,
} from '../redux/apiCalls';
import { clear } from '../redux/cartRedux';
import { LanguageContext } from '../components/LanguageContext';
const Container = styled.div`
	user-select: none;
`;
const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: '10px' })}
`;
const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;
const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === 'filled' && 'none'};
	background-color: ${(props) =>
		props.type === 'filled' ? 'black' : 'transparent'};
	color: ${(props) => props.type === 'filled' && 'white'};
`;
const TopTexts = styled.div`
	${mobile({ display: 'none' })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;
const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: 'column' })}
	flex-direction: ${(props) =>
		props.language === 'ar' ? 'row-reverse' : 'row'};
`;
const Info = styled.div`
	flex: 3;
	padding: 5px;
`;
const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: 'column' })};
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
	flex-direction: ${(props) =>
		props.language === 'ar' ? 'row-reverse' : 'row'};
`;
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
	flex-direction: ${(props) =>
		props.language === 'ar' ? 'row-reverse' : 'row'};
`;
const Image = styled.img`
	width: 200px;
	height: 250px;
	object-fit: cover;
	border-radius: 5px;
`;
const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: ${(props) => (props.language === 'ar' ? 'right' : 'left')};
`;
const ProductName = styled.span``;
const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;
const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: '5px 15px' })}
	border-bottom:1px solid black;
`;
const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: '20px' })}
`;
const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;
const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;
const SummaryTitle = styled.h1`
	font-weight: 200;
	text-align: ${(props) => props.language === 'ar' && 'right'};
`;
const SummaryItem = styled.div`
	margin: 20px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === 'total' && '500'};
	font-size: ${(props) => props.type === 'total' && '24px'};
	flex-direction: ${(props) => props.language === 'ar' && 'row-reverse'};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
`;
const Button1 = styled.button`
	width: 100%;
	padding: 10px;
	background-color: #eee;
	color: black;
	font-weight: 800;
	cursor: pointer;
	margin-top: 5px;
	font-size: 12px;
	border-radius: 10%;
	${mobile({ width: '100%' })};
`;
const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [product, setProduct] = useState({});
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	let [productGet, setProductGet] = useState({});
	let [offerGet, setOfferGet] = useState({});
	const [stripeToken, setStripeToken] = useState(null);
	const [AllProducts, setAllProducts] = useState([]);
	const [AllOffers, setAllOffers] = useState([]);
	const history = useHistory();
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	const sizesTranslation = dictionary['sizes'];
	const onToken = (token) => {
		setStripeToken(token);
	};
	let userId = localStorage.getItem('persist:root');
	userId = JSON.parse(userId);
	userId = userId.user;
	userId = JSON.parse(userId);
	userId = userId.currentUser._id;
	let email = localStorage.getItem('persist:root');
	email = JSON.parse(email);
	email = email.user;
	email = JSON.parse(email);
	email = email.currentUser.email;
	const mergedCart = cart.products.reduce((acc, curr) => {
		const existingItem = acc.find(
			(item) =>
				item?._id === curr?._id &&
				item.selectedVariant?.color === curr.selectedVariant?.color &&
				item.selectedVariant?.size === curr.selectedVariant?.size,
		);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);
	useEffect(() => {
		const getAllProducts = async () => {
			try {
				const res = await userRequest.get('/products');
				setAllProducts(res.data);
				setProductGet(res.data);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		getAllProducts();
		const getAllOffers = async () => {
			try {
				const res = await userRequest.get('/offer');
				setAllOffers(res.data);
				setOfferGet(res.data);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		getAllOffers();
	}, []);
	useEffect(() => {
		const makeRequest = async () => {
			if (cart.total * 100 === 0) {
				swal(
					'Error',
					language === 'ar' ? 'السلة فارغة' : 'Your cart is empty',
					'error',
				);
				return;
			}
			try {
				const res = await userRequest.post('/checkout/payment', {
					tokenId: stripeToken.id,
					amount: cart.total * 100,
				});
				setProduct(res.data);
				mergedCart.map((item) => {
					console.log(item);
					AllProducts.map((product) => {
						console.log(product);
						if (product._id === item._id) {
							console.log(item._id);
							console.log(product._id);

							// const selectedVariant = product.variants.find(
							// 	(variant) =>
							// 		variant.color === item.selectedVariant.color &&
							// 		variant.size === item.selectedVariant.size,
							// 	console.log(variant.color),
							// 	console.log(variant.size),

							// 	console.log(item.selectedVariant.color),
							// 	console.log(item.selectedVariant.size),
							// );
							// console.log(selectedVariant);
							const selectedVariant = product.variants.find(
								(variant) =>
									JSON.stringify(variant.color) ===
										JSON.stringify(item.selectedVariant.color) &&
									JSON.stringify(variant.size) ===
										JSON.stringify(item.selectedVariant.size),
							);
							console.log(selectedVariant);
							console.log(selectedVariant.quantity);

							selectedVariant.quantity -= item.quantity;
							console.log(selectedVariant.quantity);

							updateProductOrOffer(
								{
									quantity: selectedVariant.quantity,
								},
								item._id,
							);
						}
					});
					AllOffers.map((offer) => {
						if (offer._id === item._id) {
							offer.quantity -= item.quantity;
							updateProductOrOffer(
								{
									quantity: offer.quantity,
								},
								item._id,
							);
						}
					});
				});
				history.push('/success', {
					stripeData: res.data,
					products: cart,
				});
				let originalPrice = 0;
				mergedCart.map((item) => {
					originalPrice += item.originalPrice * item.quantity;
				});
				let newArr = {
					userId: userId,
					products: mergedCart,
				};
				dispatch(clear());
				console.log(res.data);
				let address = {};
				if (res.data.billing_details && res.data.billing_details.address) {
					address = {
						line1: res.data.billing_details.address.line1 || '',
						line2: res.data.billing_details.address.line2 || '',
						city: res.data.billing_details.address.city || '',
						state: res.data.billing_details.address.state || '',
						postal_code:
							res.data.billing_details.address.postal_code || '',
						country: res.data.billing_details.address.country || '',
					};
				}
				let newArr2 = {
					userId: userId,
					products: mergedCart,
					amountOrgin: originalPrice,
					amount: cart.total,
					// address: res.data.billing_details.address,
					address: address,
					status: 'pending',
				};
				addToCart(newArr);
				addOrder(newArr2);
				purchaseSuccessfulEmail(email);
				purchaseSuccessfulEmailAdmin();
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		stripeToken && makeRequest();
	}, [stripeToken, cart.total, history]);
	function formatNumberToArabic(number) {
		return new Intl.NumberFormat('ar-EG').format(number);
	}
	function formatPrice(price, language) {
		return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
			style: 'decimal',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	}
	const handleQuantity = (type, id, selectedVariantId) => {
		const productFind = productGet.find((item) => item._id === id);
		const productFindSelected = productFind.variants.find(
			(item) => item._id === selectedVariantId,
		);
		const updatedQuantity = cart.products.find(
			(item) => item.selectedVariant._id === selectedVariantId,
		);
		if (type === 'dec') {
			if (updatedQuantity.quantity <= 1) {
				dispatch(reset(selectedVariantId));
				swal(
					'Info',
					language === 'ar'
						? 'الحد الادنى للكمية هو 1'
						: 'The minimum quantity is 1',
					'info',
				);
			} else {
				setQuantity(updatedQuantity.quantity - 1);
			}
		} else {
			if (updatedQuantity.quantity >= productFindSelected.quantity) {
				dispatch(reset(selectedVariantId));
				swal(
					'Info',
					language === 'ar'
						? 'لقد تجاوزت الحد الاقصى للكمية'
						: 'You have exceeded the number of available products!, the quantity will be reset',
					'info',
				);
			}
		}
	};
	const [orderHave, setOrderHave] = useState([]);
	useEffect(() => {
		dispatch(calc());
	}, [cart.products]);
	useEffect(() => {
		const getOrders = async () => {
			try {
				const res = await userRequest.get('/orders/find/' + userId);
				setOrderHave(res.data);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		};
		getOrders();
	}, []);
	const [matchedOrders, setMatchedOrders] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = JSON.parse(
					JSON.parse(localStorage.getItem('persist:root')).user,
				).currentUser._id;
				const [ordersRes, productsRes, offersRes] = await Promise.all([
					userRequest.get(`/users/userWishListArray/${userId}`),
					userRequest.get('/products'),
					userRequest.get('/offer'),
				]);
				const orders = ordersRes.data;
				const products = productsRes.data;
				const offers = offersRes.data;
				const matchedItems = [];
				for (const order of orders) {
					const matchedItem = [...products, ...offers].find(
						(item) => item._id === order,
					);
					if (matchedItem) {
						matchedItems.push({ ...matchedItem });
					}
				}
				setMatchedOrders(matchedItems);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Wrapper>
				<Title>{dictionary.cart['YOUR BAG']}</Title>
				<Top>
					<Link to={'/'}>
						<TopButton>{dictionary.cart['CONTINUE SHOPPING']}</TopButton>
					</Link>
					<TopTexts>
						<Link to={'/orderHave'}>
							<TopText>
								{dictionary.cart['Shopping Bag']}({orderHave.length})
							</TopText>
						</Link>
						<Link to={'/wishList'}>
							<TopText>
								{dictionary.cart['Your Wishlist']} (
								{matchedOrders.length})
							</TopText>
						</Link>
					</TopTexts>
				</Top>
				<Bottom language={language}>
					<Info>
						{mergedCart.length === 0 ? (
							<div>{dictionary.cart['No products in the cart']}</div>
						) : (
							mergedCart.map((product) => (
								<Product language={language}>
									<ProductDetail language={language}>
										<Image src={product.selectedVariant?.img[0]} />
										<Details language={language}>
											<ProductName>
												<b>{dictionary.cart['Product:']}</b>{' '}
												{language === 'en'
													? product.title
													: product.title_ar}
											</ProductName>
											<ProductColor
												color={product.selectedVariant?.color}
											/>
											<ProductSize>
												<b>{dictionary.cart['Size:']}</b>{' '}
												{
													sizesTranslation[
														product.selectedVariant?.size
													]
												}
											</ProductSize>
											<ProductSize>
												<Button1
													onClick={() => {
														dispatch(
															removeProduct({
																productId: product._id,
																variantId:
																	product.selectedVariant._id,
															}),
														);
														swal(
															'Info',
															language === 'ar'
																? 'تمت العملية بنجاح'
																: 'Successfully removed',
															'info',
														);
													}}>
													{dictionary.cart['Remove']}
												</Button1>
											</ProductSize>
										</Details>
									</ProductDetail>
									<PriceDetail>
										<ProductAmountContainer>
											<Remove
												className={`DecQuantity${product._id}`}
												onClick={() => {
													dispatch(
														decrease(product.selectedVariant._id),
													);
													handleQuantity(
														'dec',
														product._id,
														product.selectedVariant._id,
													);
												}}
											/>
											<ProductAmount>
												{language === 'ar'
													? formatNumberToArabic(product.quantity)
													: product.quantity}
											</ProductAmount>
											<Add
												className={`AddQuantity${product._id}`}
												onClick={() => {
													dispatch(
														increase(product.selectedVariant._id),
													);
													handleQuantity(
														'inc',
														product._id,
														product.selectedVariant._id,
													);
												}}
											/>
										</ProductAmountContainer>
										<ProductPrice>
											${' '}
											{language === 'ar'
												? formatNumberToArabic(
														product.price * product.quantity,
												  )
												: product.price * product.quantity}
										</ProductPrice>
									</PriceDetail>
								</Product>
							))
						)}
						<Hr />
					</Info>
					<Summary>
						<SummaryTitle language={language}>
							{dictionary.cart['ORDER SUMMARY']}
						</SummaryTitle>
						<SummaryItem language={language}>
							<SummaryItemText>
								{dictionary.cart['Subtotal']}
							</SummaryItemText>
							<SummaryItemPrice>
								$
								{language === 'ar'
									? formatNumberToArabic(cart.total)
									: cart.total}
							</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem language={language}>
							<SummaryItemText>
								{dictionary.cart['Estimated Shipping']}
							</SummaryItemText>
							<SummaryItemPrice>
								${language === 'ar' ? formatNumberToArabic(5.9) : 5.9}
							</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem language={language}>
							<SummaryItemText>
								{dictionary.cart['Shipping Discount']}
							</SummaryItemText>
							<SummaryItemPrice>
								${language === 'ar' ? formatNumberToArabic(-5.9) : -5.9}
							</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem
							type='total'
							language={language}>
							<SummaryItemText>
								{dictionary.cart['Total']}
							</SummaryItemText>
							<SummaryItemPrice>
								${' '}
								{language === 'ar'
									? formatNumberToArabic(cart.total)
									: cart.total}
							</SummaryItemPrice>
						</SummaryItem>
						<StripeCheckout
							name='PME Shop'
							image='https://avatars.githubusercontent.com/u/1486366?v=4'
							billingAddress
							shippingAddress
							description={`Your total is $${cart.total}`}
							amount={cart.total * 100}
							token={onToken}
							stripeKey={
								'pk_test_51MmDtYCeaBijWGLTN2mFTxcOEi10brXyAJfemQB0rkFLQjgrpJ1gMdvweORFdWPAcJMpq48d6DGIyTMXuckAra5t00mB2J9FJP'
							}>
							<Button>{dictionary.cart['CHECKOUT NOW']}</Button>
						</StripeCheckout>
					</Summary>
				</Bottom>
			</Wrapper>
			<FooterNew />
		</Container>
	);
};
export default Cart;
