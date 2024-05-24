import React, {
	useState,
	useEffect,
	useContext,
	useCallback,
	useRef,
	useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa'; // Add FaBars import
import { BiLogIn } from 'react-icons/bi';
import debounce from 'lodash.debounce';

import './navbar.css';
import Table from './Table';
import axios from 'axios';
import { LanguageContext } from '../components/LanguageContext';
const Navbar = () => {
	const { products, total } = useSelector((state) => state.cart);
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [category, setCategory] = useState('');
	const [queryName, setQueryName] = useState('');
	const [dataAll, setDataAll] = useState([]);
	const [catogName, setCatogName] = useState('');
	const newQuantity = useMemo(() => {
		return products.reduce((acc, curr) => acc + curr.quantity, 0);
	}, [products]);
	const [showResults, setShowResults] = useState(false);
	const { dictionary } = useContext(LanguageContext);
	// const [token, setToken] = useState(null);
	const [tokenState, setToken] = useState();

	const fetchData = useCallback(async (query, category) => {
		try {
			const res = await axios.get(
				`http://localhost:4000/api/products/search/${query}?category=${category}`,
			);
			setDataAll(res.data);
		} catch (error) {
			console.error(error);
		}
	}, []);
	const debouncedFetchData = useRef(debounce(fetchData, 350));
	useEffect(() => {
		debouncedFetchData.current = debounce(fetchData, 350);
		return () => {
			debouncedFetchData.current.cancel();
		};
	}, [fetchData]);
	const getToken = async () => {
		try {
			const token = await localStorage.getItem('persist:root');
			if (
				(token !== null &&
					token !== undefined &&
					token !== '' &&
					JSON.parse(JSON.parse(token)?.user)?.currentUser !== undefined &&
					JSON.parse(JSON.parse(token)?.user)?.currentUser !== null &&
					JSON.parse(JSON.parse(token)?.user)?.username !== undefined &&
					JSON.parse(JSON.parse(token)?.user)?.username !== null &&
					JSON.parse(JSON.parse(token)?.user)?.username !== undefined) ||
				JSON.parse(JSON.parse(token)?.user)?.username !== ''
			) {
				setToken(token);
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getToken();
	}, []);

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
		setQuery('');
	};

	const handleSearchChange = (event) => {
		const value = event.target.value.toLowerCase();
		setQuery(value);
		setShowResults(value !== '');
	};

	const handleClickOutside = (event) => {
		if (!event.target.closest('.block-search')) {
			setShowResults(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const uniqueProductVariants = products.reduce((acc, item) => {
		if (
			item.selectedVariant &&
			item.selectedVariant._id &&
			item.quantity > 0
		) {
			const productVariantKey = `${item.productId}-${item.selectedVariant._id}`;
			acc.add(productVariantKey);
		}
		return acc;
	}, new Set()).size;

	return (
		<header className='header-middle'>
			<div className='container'>
				<div className='middle-content'>
					<div className='logo-container'>
						<h1 className='logo-content'>
							<Link
								to='/'
								className='logo'
								title={dictionary.navbar.venus}>
								<img
									src='https://emarche.net/wp-content/uploads/2017/02/wide_logo4_white.png'
									alt='Logo'
									width='157'
									height='35'
								/>
							</Link>
						</h1>
					</div>
					<div className='right-container'>
						<div className='right-content'>
							<div className='block block-search search-pro'>
								<div className='block block-content'>
									<form
										className='form minisearch active'
										id='searchbox_mini_form'>
										<div className='field search'>
											<div className='control'>
												<select
													className='cat searchbox-cat'
													name='cat'
													value={category}
													onChange={handleCategoryChange}>
													<option value=''>
														{dictionary.navbar['All Categories']}{' '}
													</option>
													<option value='jeans'>
														{dictionary.navbar['- Jeans']}
													</option>
													<option value='coat'>
														{dictionary.navbar['- Coats']}
													</option>
													<option value='women'>
														{dictionary.navbar['- Women']}
													</option>
												</select>
												<input
													id='searchbox'
													type='text'
													placeholder={
														dictionary.navbar[
															'Enter keywords to search...'
														]
													}
													className='input-text input-searchbox'
													maxLength={128}
													autoComplete='off'
													value={query}
													onChange={handleSearchChange}
												/>
												{showResults && (
													<Table data={searchResults} />
												)}
											</div>
										</div>
										<div className='actions'>
											<button title='Search'>
												<FaSearch />
											</button>
										</div>
									</form>
								</div>
							</div>
							<div className='minicart-header'>
								<div className='minicart-wrapper'>
									{tokenState ? (
										<Link
											to='/cart'
											className='action showcart'>
											<FaShoppingCart />
											<span className='text'>
												{dictionary.navbar['My Cart']}
											</span>
											<span className='counter qty empty'>
												<span className='counter-number'>
													{newQuantity}
												</span>
											</span>
											<span className='counter-line'></span>{' '}
											<span className='price-minicart'>
												<div className='subtotal'>
													<div className='amount price-container'>
														<span className='price-wrapper'>
															<span className='price'>
																${total}
															</span>
														</span>
													</div>
												</div>
											</span>
										</Link>
									) : (
										<Link
											to='/login'
											className='action showcart'>
											<BiLogIn />
											<span className='text'>
												{dictionary.navbar.Login}
											</span>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
