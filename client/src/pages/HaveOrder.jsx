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

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-wrap: wrap;
`;

const Product = styled.div`
	display: flex;
	width: 100%;
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
const Hr2 = styled.hr`
  background-color: #bbb;
  border: none;
  height: 5px;
`;
// const OrderHave = () => {
// 	const [matchedOrders, setMatchedOrders] = useState([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const userId = JSON.parse(
// 					JSON.parse(localStorage.getItem('persist:root')).user,
// 				).currentUser._id;

// 				const [ordersRes, productsRes, offersRes] = await Promise.all([
// 					userRequest.get(`/orders/find/${userId}`),
// 					userRequest.get('/products'),
// 					userRequest.get('/offer'),
// 				]);

// 				const orders = ordersRes.data;

// 				const products = productsRes.data;
// 				const offers = offersRes.data;
// 				const matchedItems = [];

// 				for (const order of orders) {
// 					for (const item of order.products) {
// 						const matchedItem = [...products, ...offers].find(
// 							(product) => product._id === item._id,
// 						);
// 						if (matchedItem) {
// 							matchedItems.push({
// 								...matchedItem,
// 								amount: item.quantity * matchedItem.price,
// 								quantity: item.quantity,
// 							});
// 						}
// 					}
// 				}
// 				setMatchedOrders(matchedItems);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		fetchData();
// 	}, []);

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
					for (const item of order.products) {
						const matchedItem = [...products, ...offers].find(
							(product) => product._id === item._id,
						);
						if (matchedItem) {
							matchedItems.push({
								...matchedItem,
								amount: item.quantity * matchedItem.price,
								quantity: item.quantity,
								seperator: false,
							});
						}
					}
					matchedItems.push({
						seperator: true,
					});
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
              {matchedOrders.map((order) =>
                order.seperator === true ? (
                  <Hr2 />
                ) : (
                  <Product key={order._id} className='product_hr'>
                    <ProductDetail>
                      <Image src={order.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {order.title}
                        </ProductName>
                        <ProductColor />
                        <ProductSize>
                          <b>Price:</b> {order.amount}
                        </ProductSize>
                        <ProductSize>
                          <b>Quantity:</b> {order.quantity}
                        </ProductSize>
                        <ProductSize />
                      </Details>
                    </ProductDetail>
                    <ProductPrice>${order.price}</ProductPrice>
                  </Product>
                )
              )}
              <Hr />
            </Info>
          </Bottom>
        ) : (
          <div
            style={{
              display: 'flex',
              padding: '70px',
              fontSize: '30px',
              justifyContent: 'center',
            }}
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
