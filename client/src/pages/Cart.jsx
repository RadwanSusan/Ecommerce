import { Add, AddOutlined, Check, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import { mobile } from '../responsive';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FooterNew from '../components/FooterNew';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useHistory } from 'react-router';
import { removeProduct } from '../redux/cartRedux';
import { increase, decrease, calc, reset } from '../redux/cartRedux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import {
  updateProductOrOffer,
  addToCart,
  addOrder,
  purchaseSuccessfulEmail,
  purchaseSuccessfulEmailAdmin,
} from "../redux/apiCalls";

import { clear } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE;

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
	${mobile({ display: 'none' })};
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
`;

const SummaryItem = styled.div`
	margin: 20px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === 'total' && '500'};
	font-size: ${(props) => props.type === 'total' && '24px'};
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
	${mobile({ width: '100%' })};
`;

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const total = useSelector((state) => state.total);
	const [product, setProduct] = useState({});
	const [offer, setOffer] = useState({});
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	let [productGet, setProductGet] = useState({});
	let [offerGet, setOfferGet] = useState({});
	const cartId = cart.products;
	const [stripeToken, setStripeToken] = useState(null);
	const [AllProducts, setAllProducts] = useState([]);
	const [AllOffers, setAllOffers] = useState([]);
	const history = useHistory();
	const onToken = (token) => {
		setStripeToken(token);
	};
	let userId = localStorage.getItem('persist:root');
	userId = JSON.parse(userId);
	userId = userId.user;
	userId = JSON.parse(userId);
	userId = userId.currentUser._id;



let email = localStorage.getItem("persist:root");
	email = JSON.parse(email);
	
	email = email.user;
	
	
email = JSON.parse(email);
	email = email.currentUser.email;
	// console.log(email);


	const handleClick2 = (id) => {
		dispatch(removeProduct(id));
		// dispatch(clear());
	};
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
		const getAllProducts = async () => {
			try {
				const res = await userRequest.get('/products');
				setAllProducts(res.data);
				setProductGet(res.data);
			} catch (err) {
				console.log('🚀 ~ file: Cart.jsx:209 ~ getAllProducts ~ err:', err);
			}
		};
		getAllProducts();
		const getAllOffers = async () => {
			try {
				const res = await userRequest.get('/offer');
				setAllOffers(res.data);
				setOfferGet(res.data);
			} catch (err) {
				console.log('🚀 ~ file: Cart.jsx:216 ~ getAllOffers ~ err:', err);
			}
		};
		getAllOffers();
	}, []);
	useEffect(() => {
		const makeRequest = async () => {
			if (cart.total * 100 === 0) {
				swal('Your cart is empty');
				return;
			}
			try {
				const res = await userRequest.post('/checkout/payment', {
					tokenId: stripeToken.id,
					amount: cart.total * 100,
				});
				setProduct(res.data);
				mergedCart.map((item) => {
					AllProducts.map((product) => {
						if (product._id === item._id) {
							product.quantity -= item.quantity;
							updateProductOrOffer(
								{
									quantity: product.quantity,
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
				console.log(
					`🚀 ~ file: Cart.jsx:298 ~ mergedCart.map ~ mergedCart:`,
					mergedCart,
				);
				mergedCart.map((item) => {
					originalPrice += item.originalPrice * item.quantity;
				});
				console.log(originalPrice);
				let newArr = {
					userId: userId,
					products: mergedCart,
				};
				console.log(`🚀 ~ file: Cart.jsx:296 ~ makeRequest ~ res:`, res);
				dispatch(clear());
				let newArr2 = {
          userId: userId,
          products: mergedCart,
          amountOrgin: originalPrice,
          amount: res.data.amount / 100,
          address: res.data.billing_details.address,
          status: 'pending',
        };
				addToCart(newArr);
				addOrder(newArr2);
				purchaseSuccessfulEmail(email);
				purchaseSuccessfulEmailAdmin();
			} catch (err) {
				console.log('🚀 ~ file: Cart.jsx:245 ~ makeRequest ~ err:', err);
			}
		};
		stripeToken && makeRequest();
	}, [stripeToken, cart.total, history]);
	const handleQuantity = (type, id) => {
		const productFind = productGet.find((item) => item._id === id);
		const offerFind = offerGet.find((item) => item._id === id);
		const productOrOffer = productFind || offerFind;
		const productMerged = mergedCart.find((item) => item._id === id);
		if (type === 'dec') {
			if (productMerged.quantity <= 1) {
				swal('Info', 'The minimum quantity is 1', 'info');
			} else {
				if (document.querySelector(`.AddQuantity${id}`).style.display == 'none') {
					document.querySelector(`.AddQuantity${id}`).style.display = 'block';
				}
				setQuantity(productMerged.quantity - 1);
			}
		} else {
			if (productMerged.quantity >= productOrOffer.quantity - 1) {
				dispatch(reset(id));
				swal(
					'Info',
					'You have exceeded the number of available products!, the quantity will be reset',
					'info',
				);
			} else {
				if (productMerged.quantity + 1 > productOrOffer.quantity - 1) {
					setQuantity(1);
					document.querySelector(`.AddQuantity${id}`).style.display = 'none';
					swal(
						'Info',
						'You have exceeded the number of available products!',
						'info',
					);
				} else {
					setQuantity(productMerged.quantity + 1);
					if (document.querySelector(`.DecQuantity${id}`).style.display == 'none') {
						document.querySelector(`.DecQuantity${id}`).style.display = 'block';
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
	const [orderHave, setOrderHave] = useState([]);
    const [wish, setWish] = useState([]);
	

	useEffect(() => {
		dispatch(calc());
	}, [cart.products]);
	 useEffect(() => {
     const getOrders = async () => {
       try {
         const res = await userRequest.get('/orders/find/' + userId);
         setOrderHave(res.data);
       } catch (err) {
         console.log('error');
       }
     };
     getOrders();
   }, []);

	console.log(orderHave.length);
	
	const [matchedOrders, setMatchedOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(
          JSON.parse(localStorage.getItem('persist:root')).user
        ).currentUser._id;

        const [ordersRes, productsRes, offersRes] = await Promise.all([
          userRequest.get(`/users/userWishListArray/${userId}`),
          userRequest.get('/products'),
          userRequest.get('/offer'),
        ]);

        const orders = ordersRes.data;
        console.log(orders);
        const products = productsRes.data;
        console.log(products);

        const offers = offersRes.data;
        console.log(offers);

        const matchedItems = [];

        for (const order of orders) {
          const matchedItem = [...products, ...offers].find(
            (item) => item._id === order
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
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={'/'}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <Link to={'/orderHave'}>
              <TopText>Shopping Bag({orderHave.length})</TopText>
            </Link>
            <Link to={'/wishList'}>
              <TopText>Your Wishlist ({matchedOrders.length})</TopText>
            </Link>
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
                        handleQuantity('dec', product._id);
                      }}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add
                      className={`AddQuantity${product._id}`}
                      onClick={() => {
                        dispatch(increase(product._id));
                        handleQuantity('inc', product._id);
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
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='PME Shop'
              image='https://avatars.githubusercontent.com/u/1486366?v=4'
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
