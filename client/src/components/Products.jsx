// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { popularProducts } from '../data';
// import Product from './Product';
// import axios from 'axios';

// const Container = styled.div`
// 	padding: 20px;
// 	display: flex;
// 	flex-wrap: wrap;
// 	justify-content: space-between;
// `;

// const Products = ({ cat, filters, sort }) => {
// 	const [products, setProducts] = useState([]);
// 	const [filteredProducts, setFilteredProducts] = useState([]);

// 	useEffect(() => {
// 		const getProducts = async () => {
// 			try {
// 				const res = await axios.get(
// 					cat
// 						? `http://194.195.86.67:4000/api/products?supplier=${cat}`
// 						: 'http://194.195.86.67:4000/api/products',
// 				);
// 				setProducts(res.data);
// 			} catch (err) {}
// 		};
// 		getProducts(getProducts);
// 	}, [cat]);

// 	useEffect(() => {
// 		cat &&
// 			setFilteredProducts(
// 				products.filter((item) =>
// 					Object.entries(filters).every(([key, value]) =>
// 						item[key].includes(value),
// 					),
// 				),
// 			);
// 	}, [products, cat, filters]);

// 	useEffect(() => {
// 		if (sort === 'newest') {
// 			setFilteredProducts((prev) =>
// 				[...prev].sort((a, b) => a.createdAt - b.createdAt),
// 			);
// 		} else if (sort === 'asc') {
// 			setFilteredProducts((prev) =>
// 				[...prev].sort((a, b) => a.price - b.price),
// 			);
// 		} else {
// 			setFilteredProducts((prev) =>
// 				[...prev].sort((a, b) => b.price - a.price),
// 			);
// 		}
// 	}, [sort]);

// 	return (
// 		<Container>
// 			{cat
// 				? filteredProducts.map((item) => (
// 						<Product
// 							item={item}
// 							key={item.id}
// 						/>
// 				  ))
// 				: products.map((item) => (
// 						<Product
// 							item={item}
// 							key={item.id}
// 						/>
// 				  ))}
// 		</Container>
// 	);
// };

// export default Products;
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ supplier, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					supplier
						? `http://194.195.86.67:4000/api/products?supplier=${supplier}`
						: 'http://194.195.86.67:4000/api/products',
				);
				setProducts(res.data);
			} catch (err) {
				console.error('Error fetching products:', err);
			}
		};
		getProducts();
	}, [supplier]);

	useEffect(() => {
		supplier &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value),
					),
				),
			);
	}, [products, supplier, filters]);

	useEffect(() => {
		if (sort === 'newest') {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt),
			);
		} else if (sort === 'asc') {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price),
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price),
			);
		}
	}, [sort]);

	return (
		<Container>
			{supplier
				? filteredProducts.map((item) => (
						<Product
							item={item}
							key={item.id}
						/>
				  ))
				: products.map((item) => (
						<Product
							item={item}
							key={item.id}
						/>
				  ))}
		</Container>
	);
};

export default Products;
