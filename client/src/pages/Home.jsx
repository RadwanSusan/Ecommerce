import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarBottom from "../components/NavbarBottom";
import HeaderMobile from "../components/HeaderMobile";
import MobileSearch from "../components/MobileSearch";
// import MobileMenu from "../components/MobileMenu";
// import Offer from "../components/Offer.jsx";
import Image from "../components/Image";
// import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Welcom from "../components/Welcom";
// import Catog2 from "../components/Catog2";
// import Catog3 from "../components/Catog3";
// import Catog from "../components/Catog";
import Bloges from "../components/Bloges";
import FooterNew from "../components/FooterNew";

const Home = () => {
	return (
		<div>
			<Announcement />
			<Navbar />
			<NavbarBottom />
			<HeaderMobile />
			<MobileSearch />
			{/* <MobileMenu /> */}
			<Slider />
			{/* <Offer /> */}
			<Welcom />
			<Categories />
			{/* <Catog  /> */}
			{/* <Catog2 /> */}
			{/* <Catog3 /> */}
			<Image />
			<Bloges />
			<FooterNew />
			<Products />
			{/* <Newsletter/> */}
			{/* <Footer /> */}
		</div>
	);
};

export default Home;
