import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import LogoImg from '../Media/Img/SvgLogo.svg';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './navbar.css';
import Table from './Table';
import axios from 'axios';

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const cart = useSelector((state) => state.cart);
	let newQuantity = 0;
	cart.products.reduce((acc, curr) => {
		const existingItem = acc.find((item) => item._id === curr._id);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
			++newQuantity;
		}
		return acc;
	}, []);
	// const [value, setValue] = useState('')
	const total = useSelector((state) => state.cart.total);
	// const onChange = (event) => {
	// 	setValue(event.target.value);
	// }
	const [queryName, setQueryName] = useState('');
	const [dataAll, setDataAll] = useState([]);
	const [catogName, setCatogName] = useState('');
	document.addEventListener('DOMContentLoaded', () => {
		const selectElement = document.querySelector('.cat');
		selectElement.addEventListener('change', () => {
			updateSelectedCategory();
			
		});
		function updateSelectedCategory() {
			const selectedOption = selectElement.options[selectElement.selectedIndex];
			const selectedValue = selectedOption.value;
			setCatogName(selectedValue);
			setQueryName("");
			
		}
		updateSelectedCategory();
	});
	useEffect(() => {
		const fetchData = async () => {
			if (queryName === '') {
				setDataAll([]);
				return;
			}
			console.log(catogName);
			const res = await axios.get(
				`http://localhost:4000/api/products/search/${queryName}?category=${catogName}`,
			);
			setDataAll(res.data);
		};
		if (queryName.length === 0 || queryName.length >= 1) fetchData();
	}, [queryName]);
	const onSearch = (queryName) => {
		console.log(queryName);
		
  };
	return (
    <div className="header-middle snipcss-LbbnX">
      <div className="container">
        <div className="middle-content">
          <div className="logo-container">
            <h1 className="logo-content">
              <strong>Venus - Powerful Responsive Magento 2 Theme</strong>
              <a
                className="logo"
                href=""
                title="Venus - Powerful Responsive Magento 2 Theme"
              >
                <img src={LogoImg} alt="ZAID" width="157" height="35" />
              </a>
            </h1>
          </div>
          <div className="right-container">
            <div className="right-content">
              <div
                id="sm_searchbox14558078331679218424"
                className="block block-search search-pro"
              >
                <div className="block block-content">
                  <div
                    className="form minisearch active"
                    id="searchbox_mini_form"
                  >
                    <div className="field search">
                      <div className="control">
                        <select className="cat searchbox-cat" name="cat">
                          <option value="">All Categories</option>
                          <option value="jeans">- Jeans</option>
                          <option value="coat">- Coat</option>
                          <option value="women">- Women</option>
                        </select>
                        <input
                          id="searchbox"
                          type="text"
                          name="q"
                          placeholder="Enter keywords to search..."
                          className="input-text input-searchbox"
                          maxlength="128"
                          role="combobox"
                          aria-haspopup="false"
                          aria-expanded="true"
                          aria-autocomplete="both"
                          autocomplete="off"
                          value={queryName}
                          onChange={(e) =>
                            setQueryName(e.target.value.toLowerCase())
                          }
                        />
                        {<Table data={dataAll} />}
                          <div
                            id="searchbox_autocomplete"
                            className="search-autocomplete"
                          ></div>
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        // type="submit"
                        title="Search"
                        // className="btn-searchbox"
                        // disabled=""
                        onClick={() => onSearch(queryName)}
                      >
                        <FaSearch />
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="minicart-header" data-move="minicart-mobile">
                <div data-block="minicart" className="minicart-wrapper">
                  <Link to="/cart" className="action showcart" href="#">
                    <FaShoppingCart />
                    <span className="text">My Cart</span>
                    <span className="counter qty empty">
                      <span className="counter-number">{newQuantity}</span>
                      <span className="counter-label"></span>
                    </span>
                    <span className="price-minicart">
                      <div className="subtotal">
                        <div className="amount price-container">
                          <span className="price-wrapper">
                            <span className="price">${total}</span>
                          </span>
                        </div>
                      </div>
                    </span>
                  </Link>
                  <div
                    tabindex="-1"
                    className="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-PDTJ9"
                    id="style-PDTJ9"
                  >
                    <div className="block block-minicart ui-dialog-content ui-widget-content style-PjXZg">
                      <div id="minicart-content-wrapper">
                        <div className="block-title">
                          <strong>
                            <span className="text">My Cart</span>
                            <span
                              className="qty empty"
                              title="Items in Cart"
                            ></span>
                          </strong>
                        </div>
                        <div className="block-content">
                          <button
                            type="button"
                            id="btn-minicart-close"
                            className="action close"
                            data-action="close"
                            title="Close"
                          >
                            <span>Close</span>
                          </button>
                          <strong className="subtitle empty">
                            {" "}
                            You have no items in your shopping cart.{" "}
                          </strong>
                          <div
                            id="minicart-widgets"
                            className="minicart-widgets"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
