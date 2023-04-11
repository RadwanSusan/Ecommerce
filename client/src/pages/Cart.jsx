import { Add, Check, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NavbarBottom from "../components/NavbarBottom";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FooterNew from "../components/FooterNew";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { removeProduct } from "../redux/cartRedux";
import { increase, decrease, calc, reset } from "../redux/cartRedux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
	user-select: none;
`;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
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
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
	padding: 5px;
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })};
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
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
`;

const ProductName = styled.span``;

const ProductId = styled.span`

${mobile({ display: "none" })};

`;

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
	${mobile({ margin: "5px 15px" })}
	border-bottom:1px solid black;
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
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
`;

const SummaryItem = styled.div`
	margin: 20px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
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
	width: 40%;
	padding: 10px;
	background-color: #eee;
	color: black;
	font-weight: 800;
	cursor: pointer;
	margin-top: 5px;
	font-size: 12px;
	border-radius: 10%;
	${mobile({ width: "100%" })};


`;

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const total = useSelector((state) => state.total);
	const [product, setProduct] = useState({});
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	let [productGet, setProductGet] = useState({});
	let [offerGet, setOfferGet] = useState({});
	const cartId = cart.products;
	const [stripeToken, setStripeToken] = useState(null);
	const history = useHistory();
	const onToken = (token) => {
		setStripeToken(token);
	};
	const handleClick2 = (id) => {
		dispatch(removeProduct(id));
		// console.log(dispatch(removeProduct(id)));
	};
	// const handleClickDec = (id) => {
	// 	dispatch(decrease(id));
	// };
	// const handleClickInc = (id) => {
	// 	dispatch(increase(id));
	// };
	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await userRequest.post("/checkout/payment", {
					tokenId: stripeToken.id,
					amount: 500,
				});
				setProduct(res.data);
				history.push("/success", {
					stripeData: res.data,
					products: cart,
				});
			} catch {
				swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
					footer: "Please try again",
				});
			}
		};
		stripeToken && makeRequest();
	}, [stripeToken, cart.total, history]);
	const mergedCart = cart.products.reduce((acc, curr) => {
		const existingItem = acc.find((item) => item._id === curr._id);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await userRequest.get("/products");
				setProductGet(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, []);
	useEffect(() => {
		const getOffers = async () => {
			try {
				const res = await userRequest.get("/offer");
				setOfferGet(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getOffers();
	}, []);
	const handleQuantity = (type, id) => {
		const productFind = productGet.find((item) => item._id === id);
		const offerFind = offerGet.find((item) => item._id === id);
		const productOrOffer = productFind || offerFind;
		const productMerged = mergedCart.find((item) => item._id === id);
		if (type === "dec") {
			if (productMerged.quantity <= 1) {
				document.querySelector(`.DecQuantity${id}`).style.display = "none";
				swal("Info", "The minimum quantity is 1", "info");
			} else {
				if (
					document.querySelector(`.AddQuantity${id}`).style.display == "none"
				) {
					document.querySelector(`.AddQuantity${id}`).style.display = "block";
				}
				setQuantity(productMerged.quantity - 1);
			}
		} else {
			if (productMerged.quantity >= productOrOffer.quantity - 1) {
				dispatch(reset(id));
				swal(
					"Info",
					"You have exceeded the number of available products!, the quantity will be reset",
					"info",
				);
			} else {
				if (productMerged.quantity + 1 > productOrOffer.quantity - 1) {
					setQuantity(1);
					document.querySelector(`.AddQuantity${id}`).style.display = "none";
					swal(
						"Info",
						"You have exceeded the number of available products!",
						"info",
					);
				} else {
					setQuantity(productMerged.quantity + 1);
					if (
						document.querySelector(`.DecQuantity${id}`).style.display == "none"
					) {
						document.querySelector(`.DecQuantity${id}`).style.display = "block";
					}
				}
			}
		}
	};
	// const CheckStyle = (id) => {
	// 	const productFind = productGet.find((item) => item._id === id);
	// 	const offerFind = offerGet.find((item) => item._id === id);
	// 	const productOrOffer = productFind || offerFind;
	// 	const productMerged = mergedCart.find((item) => item._id === id);
	// 	console.log(
	// 		`🚀 ~ file: Cart.jsx:321 ~ CheckStyle ~ productMerged.quantity:`,
	// 		productMerged.quantity,
	// 	);
	// 	console.log(
	// 		`🚀 ~ file: Cart.jsx:321 ~ CheckStyle ~ productOrOffer.quantity:`,
	// 		productOrOffer.quantity,
	// 	);
	// 	if (productMerged.quantity < productOrOffer.quantity) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// };

	useEffect(() => {
		dispatch(calc());
	}, [cart.products]);

	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top>
					<Link to={"/"}>
						<TopButton>CONTINUE SHOPPING</TopButton>
					</Link>
					<TopTexts>
						<TopText>Shopping Bag(2)</TopText>
						<TopText>Your Wishlist (0)</TopText>
					</TopTexts>
					{/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
				</Top>
				<Bottom>
					<Info>

						 {mergedCart.map((product) => (
							<Product>
								<ProductDetail>
									<Image src={product.img} />
									<Details>
										<ProductName>
											<b>Product:</b> {product.title}
										</ProductName>
										<ProductId>
											<b>ID:</b> {product._id}
										</ProductId>
										<ProductColor color={product.color} />
										<ProductSize>
											<b>Size:</b> {product.size}
										</ProductSize>
										<ProductSize>
											<Button1
												onClick={function () {
													handleClick2(product._id);
												}}
											>
												Remove
											</Button1>
										</ProductSize>
									</Details>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
										<Remove
											className={`DecQuantity${product._id}`}
											onClick={() => {
												dispatch(decrease(product._id));
												handleQuantity("dec", product._id);
											}}
										/>
										<ProductAmount>{product.quantity}</ProductAmount>
										<Add
											className={`AddQuantity${product._id}`}
											onClick={() => {
												dispatch(increase(product._id));
												handleQuantity("inc", product._id);
											}}
											style={{
												display: "none",
											}}
										/>
										{/* )) */}
										{/* } */}
										{/* <Add
											className={`AddQuantity${product._id}`}
											onClick={() => {
												dispatch(increase(product._id));
												handleQuantity("inc", product._id);
											}}
										/> */}
									</ProductAmountContainer>
									<ProductPrice>
										$ {product.price * product.quantity}
									</ProductPrice>
								</PriceDetail>
							</Product>
						))}
						<Hr />
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Subtotal</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Estimated Shipping</SummaryItemText>
							<SummaryItemPrice>$ 5.90</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Shipping Discount</SummaryItemText>
							<SummaryItemPrice>$ -5.90</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem type="total">
							<SummaryItemText>Total</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<StripeCheckout
							name="PME Shop"
							image="https://avatars.githubusercontent.com/u/1486366?v=4"
							billingAddress
							shippingAddress
							description={`Your total is $${cart.total}`}
							amount={cart.total * 100}
							token={onToken}
							stripeKey={KEY}
						>
							<Button>CHECKOUT NOW</Button>
						</StripeCheckout>
					</Summary>
				</Bottom>
			</Wrapper>
			<FooterNew />
		</Container>
	);
};

export default Cart;
