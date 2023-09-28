import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Woffer from '../components/Woffer';
import Newsletter from '../components/Newsletter';
// import Footer from "../components/Footer";
import { mobile } from '../responsive';
import NavbarBottom from '../components/NavbarBottom';
import FooterNew from '../components/FooterNew';
// import { useLocation } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';

import axios from 'axios';

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

const Wishlist = () => {
	return (
		<Container>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<Title>Wishlist</Title>
			<Woffer />
			<Newsletter />
			<FooterNew />
		</Container>
	);
};

export default Wishlist;
