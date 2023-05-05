import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import { mobile } from '../responsive';
import { useEffect, useState } from 'react';
import FooterNew from '../components/FooterNew';
import { userRequest } from '../requestMethods';
import { Link } from 'react-router-dom';

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
	display: flex;
	flex-wrap: wrap;
`;

const Product = styled.div`
	display: flex;
	width: 48%;
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

const OrderHave = () => {
	const [matchedOrders, setMatchedOrders] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = JSON.parse(
					JSON.parse(localStorage.getItem('persist:root')).user,
				).currentUser._id;

				const [ordersRes, productsRes, offersRes] = await Promise.all([
					userRequest.get(`/orders/find/${userId}`),
					userRequest.get('/products'),
					userRequest.get('/offer'),
				]);

				const orders = ordersRes.data;
				const products = productsRes.data;
				const offers = offersRes.data;
				const matchedItems = [];

				for (const order of orders) {
					const matchedItem = [...products, ...offers].find((item) =>
						order.products.some((product) => product._id === item._id),
					);
					if (matchedItem) {
						matchedItems.push({ ...matchedItem, amount: order.amount });
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
        <Title>YOUR ORDERS</Title>
        <Top>
          <Link to={'/'}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
        </Top>
        {matchedOrders.length !== 0 ? (
          <Bottom>
            <Info>
              {matchedOrders.map((order) => (
                <Product key={order._id}>
                  {' '}
                  <ProductDetail>
                    <Image src={order.img[0]} />{' '}
                    <Details>
                      <ProductName>
                        <b>Product:</b> {order.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {order._id}
                      </ProductId>
                      <ProductColor />
                      <ProductSize>
                        <b>Amount:</b> {order.amount}
                      </ProductSize>
                      <ProductSize>
                        <b>Quantity:</b> {order.quantity}
                      </ProductSize>
                      <ProductSize />
                    </Details>
                  </ProductDetail>
                  <ProductPrice>${order.price}</ProductPrice>{' '}
                </Product>
              ))}
              <Hr />
            </Info>
          </Bottom>
        ) : (
          <div
            style={{ display:"flex", padding: '70px', fontSize: '30px',justifyContent:"center" }}
            
          >
            No Orders Yet!
          </div>
        )}
      </Wrapper>
      <FooterNew />
    </Container>
  );
};

export default OrderHave;
