import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';
import { userRequest } from '../requestMethods';

import axios from 'axios';

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
useEffect(() => {
  console.log(matchedOrders);
}, [matchedOrders]);

  return (
    <Container>
      {matchedOrders.map((order) => (
        <Product item={order} key={order._id} />
      ))}
    </Container>
  );
};

export default Woffer;
