import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SORT_TYPES = {
  NEWEST: "newest",
  ASC: "asc",
  DESC: "desc",
};

const Poffer = React.memo(({ filters, sort }) => {
  const [products, setProducts] = useState([]);

  const filteredOffer = useMemo(() => {
    const currentDate = new Date();
    return products
      .filter(
        (product) =>
          product.discount &&
          new Date(product.discount.startDate) <= currentDate &&
          new Date(product.discount.endDate) >= currentDate
      )
      .filter((product) =>
        product.variants.some((variant) =>
          Object.entries(filters).every(([key, value]) =>
            variant[key].includes(value)
          )
        )
      )
      .sort((a, b) => {
        if (sort === SORT_TYPES.NEWEST) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          const lowestPriceA = Math.min(
            ...a.variants.map((variant) => variant.price)
          );
          const lowestPriceB = Math.min(
            ...b.variants.map((variant) => variant.price)
          );
          return sort === SORT_TYPES.ASC
            ? lowestPriceA - lowestPriceB
            : lowestPriceB - lowestPriceA;
        }
      });
  }, [sort, filters, products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      {filteredOffer.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
});

export default Poffer;
