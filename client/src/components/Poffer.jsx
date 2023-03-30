import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Poffer = ({ cat, filters, sort }) => {
	const [offer, setOffer] = useState([]);
	const [filteredOffer, setFilteredOffer] = useState([]);

	useEffect(() => {
		const getOffer = async () => {
			try {
				const res = await axios.get(
					cat
						? `http://localhost:4000/api/offer?category=${cat}`
						: "http://localhost:4000/api/offer",
				);
				setOffer(res.data);
			} catch (err) {}
		};
		getOffer(getOffer);
	}, [cat]);

	useEffect(() => {
		cat &&
			setFilteredOffer(
				offer.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value),
					),
				),
			);
	}, [offer, cat, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredOffer((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt),
			);
		} else if (sort === "asc") {
			setFilteredOffer((prev) =>
				[...prev].sort((a, b) => a.price - b.price),
			);
		} else {
			setFilteredOffer((prev) =>
				[...prev].sort((a, b) => b.price - a.price),
			);
		}
	}, [sort]);

	return (
		<Container>
			{cat
				? filteredOffer.map((item) => <Product item={item} key={item.id} />)
				: offer.map((item) => <Product item={item} key={item.id} />)}
		</Container>
	);
};

export default Poffer;
