import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Woffer from '../components/Woffer';
import Newsletter from '../components/Newsletter';
import NavbarBottom from '../components/NavbarBottom';
import FooterNew from '../components/FooterNew';
const Container = styled.div``;
const Title = styled.h1`
	margin: 20px;
`;
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
