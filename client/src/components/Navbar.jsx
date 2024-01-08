import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useContext,
	useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import LogoImg from '../Media/Img/SvgLogo.svg';
import './navbar.css';
import Table from './Table';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { LanguageContext } from '../components/LanguageContext';
const Navbar = () => {
	const { products, total } = useSelector((state) => state.cart);
	const [queryName, setQueryName] = useState('');
	const [dataAll, setDataAll] = useState([]);
	const [catogName, setCatogName] = useState('');
	const newQuantity = useMemo(() => {
		return products.reduce((acc, curr) => acc + curr.quantity, 0);
	}, [products]);
	const [showResults, setShowResults] = useState(false);
	const searchRef = useRef(null);
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	const [tokenState, setToken] = useState();
	// const currentUser = useSelector((state) => state.user.currentUser);
	// console.log(`🚀  file: Navbar.jsx:33  currentUser =>`, currentUser);
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
	// useEffect(() => {
	// 	const token = localStorage.getItem('persist:root');
	// 	if (token) {
	// 		const parsedToken = JSON.parse(JSON.parse(token)?.user);
	// 		if (parsedToken?.currentUser || parsedToken?.username) {
	// 			setToken(parsedToken);
	// 			console.log(parsedToken);
	// 		} else {
	// 			console.log(parsedToken);
	// 		}
	// 	}
	// }, []);
	const handleCategoryChange = (event) => {
		setCatogName(event.target.value);
		setQueryName('');
	};
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowResults(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	const handleSearchChange = (event) => {
		const value = event.target.value.toLowerCase();
		setQueryName(value);
		if (value === '') {
			setShowResults(false);
		} else {
			setShowResults(true);
		}
	};
	const handleFocus = () => {
		if (queryName) {
			setShowResults(true);
		}
	};
	const handleBlur = () => {
		setTimeout(() => {
			if (document.activeElement !== searchRef.current) {
				setShowResults(false);
			}
		}, 150);
	};
	return (
		<div className='header-middle snipcss-LbbnX'>
			<div className='container'>
				<div className='middle-content'>
					<div className='logo-container'>
						<h1 className='logo-content'>
							<strong>{dictionary.navbar.venus}</strong>
							<Link
								to='/'
								className='logo'
								title={dictionary.navbar.venus}>
								<img
									src={LogoImg}
									alt='Logo'
									width='157'
									height='35'
								/>
							</Link>
						</h1>
					</div>
					<div className='right-container'>
						<div className='right-content'>
							<div
								id='sm_searchbox14558078331679218424'
								className='block block-search search-pro'>
								<div className='block block-content'>
									<div
										className='form minisearch active'
										id='searchbox_mini_form'>
										<div className='field search'>
											<div className='control'>
												<select
													className='cat searchbox-cat'
													name='cat'
													value={catogName}
													onChange={handleCategoryChange}>
													<option value=''>
														{dictionary.navbar['All Categories']}
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
													value={queryName}
													onChange={handleSearchChange}
													onFocus={handleFocus}
													onBlur={handleBlur}
													ref={searchRef}
												/>
												{showResults && <Table data={dataAll} />}
											</div>
										</div>
										<div className='actions'>
											<button title='Search'>
												<FaSearch />
												<span>{dictionary.navbar.Search}</span>
											</button>
										</div>
									</div>
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
		</div>
	);
};
export default React.memo(Navbar);
