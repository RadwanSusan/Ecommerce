import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { userRequest } from '../requestMethods';


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Woffer = () => {
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
      const products = productsRes.data;

      const offers = offersRes.data;

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
}, [matchedOrders]);


  return (
    <Container>
      {matchedOrders.length!==0?
      matchedOrders.map((order) => (
        <Product item={order} key={order._id} />
      )) :
        <div style={{margin:"auto", padding:"100px", fontSize:"30px" }} >
          No Products in Wishlist!
        </div>
      }
    </Container>
  );
};

export default Woffer;
