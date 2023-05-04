import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Woffer from '../components/Poffer';
import Newsletter from '../components/Newsletter';
// import Footer from "../components/Footer";
import { mobile } from '../responsive';
import NavbarBottom from '../components/NavbarBottom';
import FooterNew from '../components/FooterNew';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
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
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/api/users/userWishListArray/644cd71b0e7fb80e5fa5d4a5'
        );
        setWishlist(res.data);
      } catch (err) {
        console.log('error');
      }
    };
    getWishlist();
  }, []);
  console.log(wishlist);
  const [offer, setOffer] = useState([]);

//   useEffect(() => {
//     const getOffer = async () => {
//       try {
//         const res = await axios.get('http://localhost:4000/api/offer');
//         setOffer(res.data);
//       } catch (err) {}
//     };
//     getOffer(getOffer);
//   }, []);
//   console.log(offer[0]._id);
    // const [filteredOffer, setFilteredOffer] = useState([]);

    //    useEffect(() => {

    //        setFilteredOffer(
    //            offer.filter((item) => {
    //                item._id = wishlist;
    //          }

    //          )
    //        );
    //    }, []);
    //   console.log(filteredOffer);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <NavbarBottom />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name='size' onChange={handleFilters}>
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
      <Woffer cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      {/* <Footer /> */}
      <FooterNew />
    </Container>
  );
};

export default Wishlist;
