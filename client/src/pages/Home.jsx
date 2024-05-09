import React from 'react';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import HeaderMobile from '../components/HeaderMobile';
import MobileSearch from '../components/MobileSearch';
import Offer from '../components/Offer.jsx';
import Image from '../components/Image';
import CustomSlider from '../components/Slider';
import Welcom from '../components/Welcom';
import Bloges from '../components/Bloges';
import FooterNew from '../components/FooterNew';

const Home = () => {
	return (
		<div>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<HeaderMobile />
			<MobileSearch />
			<CustomSlider />
			<Offer />
			<Welcom />
			<Categories />
			<Image />
			<Bloges />
			<FooterNew />
		</div>
	);
};

export default Home;
