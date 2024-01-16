import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import NavbarBottom from '../components/NavbarBottom';
import FooterNew from '../components/FooterNew';
import React, { lazy, Suspense } from 'react';
import { useState, useCallback } from 'react';
const Poffer = lazy(() => import('../components/Poffer'));

const Container = styled.div``;

const Title = styled.h1`
	margin: 20px;
`;

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
	${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({ marginRight: '0px' })}
`;

const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({ margin: '10px 0px' })}
`;
const Option = styled.option``;

const ProductList = () => {
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState('newest');

	const handleFilters = useCallback((e) => {
		const value = e.target.value;
		setFilters((prevFilters) => ({
			...prevFilters,
			[e.target.name]: value,
		}));
	}, []);

	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Title>Offers</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select
						name='color'
						onChange={handleFilters}>
						<Option disabled>Color</Option>
						<Option>White</Option>
						<Option>Black</Option>
						<Option>Red</Option>
						<Option>Blue</Option>
						<Option>Yellow</Option>
						<Option>Green</Option>
					</Select>
					<Select
						name='size'
						onChange={handleFilters}>
						<Option disabled>Size</Option>
						<Option>XS</Option>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select onChange={(e) => setSort(e.target.value)}>
						<Option value='newest'>Newest</Option>
						<Option value='asc'>Price (asc)</Option>
						<Option value='desc'>Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Suspense fallback={null}>
				<Poffer
					filters={filters}
					sort={sort}
				/>
			</Suspense>
			<Newsletter />
			<FooterNew />
		</Container>
	);
};

export default React.memo(ProductList);
