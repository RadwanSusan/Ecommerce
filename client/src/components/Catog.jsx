import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './catog.css';
import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { IoGitCompareOutline } from 'react-icons/io5';
import {
	BsArrowUpCircle as ArrowUp,
	BsArrowDownCircle as ArrowDown,
} from 'react-icons/bs';
import { userRequest } from '../requestMethods';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import swal from 'sweetalert';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';

const FilterSizeCatog = styled.select`
	margin-left: 10px;
	padding: 5px;
`;

const FilterSizeOption = styled.option``;

const Catog = ({ item }) => {
	const [zaidVar, setZaidVar] = useState(0);
	const [product_id, setProduct_id] = useState(0);
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					item.cat
						? `http://localhost:4000/api/products?category=${item.cat}`
						: 'http://localhost:4000/api/products',
				);
				setProducts(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, [item.cat]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productsRes, offersRes] = await Promise.all([
					userRequest.get('/products'),
					userRequest.get('/offer'),
				]);
				setAllProducts(productsRes.data);
				setProductGet(productsRes.data);
				setAllOffers(offersRes.data);
				setOfferGet(offersRes.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);
	let idProduct;
	const [products, setProducts] = useState([]);
	document.querySelectorAll('.show-cart2').forEach((item) =>
		item.addEventListener('click', (e) => {
			document.querySelector('.CatogCard').style.display = 'block';
			document.body.style.overflow = 'hidden';
			document.querySelector('.CatogCard').style.overflow = 'hidden';
			document.querySelector('.backLayerForShowCart').style.display = 'block';
			document.querySelector('.backLayerForShowCart').style.overflow = 'hidden';
			idProduct = item.getAttribute('offer-id');
			const viewArrCatog = AllProducts.find(
				(products) => products._id === idProduct,
			);
			if (!viewArrCatog) {
				return;
			}
			document.querySelector('.block_product__advantagesProduct').innerHTML = '';
			document
				.querySelector('.block_product__advantagesProduct')
				.append(viewArrCatog.desc);
			let aramex = document.querySelector('.CatogallColors');
			document.querySelector('.CatogallColors').innerHTML = '';
			setZaidVar(viewArrCatog._id);
			setProduct_id(viewArrCatog._id);
			const getSiblings = (e) => {
				let siblings = [];
				if (!e.parentNode) {
					return siblings;
				}
				let sibling = e.parentNode.firstChild;
				while (sibling) {
					if (sibling.nodeType === 1 && sibling !== e) {
						siblings.push(sibling);
					}
					sibling = sibling.nextSibling;
				}
				return siblings;
			};
			viewArrCatog.color.map((e) => {
				let input1 = document.createElement('input');
				input1.classList.add('radio_button');
				input1.setAttribute('id', 'radioColor');
				input1.setAttribute('name', 'colorOfItem');
				input1.setAttribute('checked', 'checked');
				input1.setAttribute('value', e);
				let label = document.createElement(`label`);
				label.setAttribute('for', 'radioColor');
				label.classList.add('block_goodColor__radio', 'block_goodColor__black');
				label.style.backgroundColor = `${e}`;
				aramex.append(input1);
				aramex.append(label);
				setColor('');
				input1.addEventListener('click', (e) => {
					if (e.target.nextElementSibling.style.border === '3px solid black') {
						e.target.nextElementSibling.style.border = 'none';
						setColor('');
					} else {
						setColor(e.target.value);
						let siblings = getSiblings(e.target);
						siblings.forEach((sibling) => {
							sibling.style.border = 'none';
						});
						e.target.nextElementSibling.style.border = '3px solid black';
					}
				});
				return input1;
			});
			document.querySelector('.FilterSizeCatog').innerHTML = '';
			viewArrCatog.size.map((e) => {
				const option = document.createElement('option');
				option.innerHTML = e;
				option.setAttribute('key', e);
				document.querySelector('.FilterSizeCatog').append(option);
				return option;
			});
			document.querySelector('.currency').innerHTML = '';
			document.querySelector('.currency').append('$');
			document.querySelector('.currency').append(viewArrCatog.price);
		}),
	);
	document.querySelectorAll('.CloseCatogCard').forEach((item) =>
		item.addEventListener('click', (e) => {
			document.querySelector('.CatogCard').style.display = 'none';
			document.body.style.overflow = '';
			document.querySelector('.CatogCard').style.overflow = '';
			document.querySelector('.backLayerForShowCart').style.display = 'none';
		}),
	);
	let cartProducts = JSON.parse(localStorage.getItem('persist:root'));
	cartProducts = cartProducts.cart;
	cartProducts = JSON.parse(cartProducts);
	const mergedCart = cartProducts.products.reduce((acc, curr) => {
		const existingItem = acc.find((item) => item._id === curr._id);
		if (existingItem) {
			existingItem.quantity += curr.quantity;
		} else {
			acc.push({ ...curr });
		}
		return acc;
	}, []);
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	const dispatch = useDispatch();
	const [AllProducts, setAllProducts] = useState([]);
	const [AllOffers, setAllOffers] = useState([]);
	let [productGet, setProductGet] = useState({});
	let [offerGet, setOfferGet] = useState({});
	const handleQuantity2 = (type, id) => {
		const item = [...productGet, ...offerGet].find((item) => item._id === id);
		const productMerged = mergedCart.find((item) => item._id === id);
		const maxQuantity = item.quantity - 1;
		if (productMerged !== undefined) {
			if (type === 'dec') {
				if (quantity <= 1) {
					swal('Info', 'The minimum quantity is 1', 'info');
				} else {
					setQuantity(quantity - 1);
				}
			} else {
				if (productMerged.quantity > maxQuantity) {
					swal(
						'Info',
						'You have exceeded the number of available products!, the quantity will be reset',
						'info',
					);
				} else {
					const newQuantity = productMerged.quantity + 1;
					if (newQuantity > maxQuantity) {
						swal(
							'Info',
							'You have exceeded the number of available products!',
							'info',
						);
					} else {
						setQuantity(newQuantity);
					}
				}
			}
		} else {
			if (type === 'dec') {
				if (quantity <= 1) {
					swal('Info', 'The minimum quantity is 1', 'info');
				} else {
					setQuantity(quantity - 1);
				}
			} else {
				if (quantity > maxQuantity) {
					swal(
						'Info',
						'You have exceeded the number of available products!, the quantity will be reset',
						'info',
					);
				} else {
					setQuantity(quantity + 1);
				}
			}
		}
	};
	const chekAvail2 = () => {
		let newQuantity = mergedCart.map((item) => {
			if (item._id === products._id) {
				return {
					quantity: products.quantity - item.quantity,
				};
			}
		});
		newQuantity = newQuantity.filter((item) => item !== undefined);
		if (newQuantity.length > 0) {
			if (newQuantity[0].quantity < 1) {
				return false;
			} else {
				return true;
			}
		}
		return true;
	};
	const addToCart = (productId) => {
		const item = [...productGet, ...offerGet].find(
			(item) => item._id === productId,
		);
		const product = [...productGet, ...offerGet].find(
			(item) => item._id === productId,
		);
		if (products.length > 0) {
			const cartItem = mergedCart.find((item) => item._id === productId);
			if (cartItem) {
				if (cartItem.quantity === item.quantity) {
					swal('Info', 'You already have the maximum amount!', 'info');
					document.querySelector('.AddCart').disabled = true;
					return;
				}
				if (cartItem.quantity + quantity <= item.quantity) {
					dispatch(
						addProduct({
							...cartItem,
							quantity,
							color,
							size,
						}),
					);
					if (cartItem.quantity < 1) {
						document.querySelector('.AddCart').disabled = true;
						return;
					}
					cartItem.quantity -= quantity;
					setQuantity(1);
					swal('Success', 'Product added to cart!', 'success');
					if (cartItem.quantity <= 1) {
						document.querySelector('.AddCart').disabled = true;
					}
				} else {
					swal('Info', 'Try with a different amount!', 'info');
					return;
				}
			} else {
				dispatch(
					addProduct({
						...product,
						quantity,
						color,
						size,
					}),
				);
				item.quantity -= quantity;
				setQuantity(1);
				swal('Success', 'Product added to cart!', 'success');
				if (quantity === item.quantity) {
					document.querySelector('.AddCart').disabled = true;
					return;
				}
			}
		}
	};
	return (
		<>
			<div className='backLayerForShowCart'></div>
			<div className='column small-centered'>
				<div className='productCard_block CatogCard'>
					<div className='row11'>
						<div className='small-12 large-6 columns11'>
							<div className='productCard_leftSide clearfix'>
								<div className='sliderBlock'>
									<ul className='sliderBlock_items'>
										<li className='sliderBlock_items__itemPhoto sliderBlock_items__showing'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true'
												alt='headphones'
											/>
										</li>
										<li className='sliderBlock_items__itemPhoto'>
											<img
												src='https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true'
												alt='headphones'
											/>
										</li>
									</ul>
									<div className='sliderBlock_controls'>
										<div className='sliderBlock_controls__navigatin'>
											<div className='sliderBlock_controls__wrapper'>
												<div className='sliderBlock_controls__arrow sliderBlock_controls__arrowBackward'>
													<i
														className='fa fa-angle-left'
														aria-hidden='true'
													>
														<BsFillArrowLeftCircleFill className='sliderBlock_controls__arrowBackward' />
													</i>
												</div>
												<div className='sliderBlock_controls__arrow sliderBlock_controls__arrowForward'>
													<i
														className='fa fa-angle-right'
														aria-hidden='true'
													>
														<BsFillArrowRightCircleFill className='sliderBlock_controls__arrowForward ' />
													</i>
												</div>
											</div>
										</div>
										<ul className='sliderBlock_positionControls'>
											<li className='sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
											<li className='sliderBlock_positionControls__paginatorItem'></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className='small-12 large-6 columns11'>
							<div className='AiFillCloseCircle CloseCatogCard'>
								<AiFillCloseCircle />
							</div>
							<div className='productCard_rightSide'>
								<div className='block_specification'>
									<div className='block_specification__specificationShow'>
										<i
											className='fa fa-cog block_specification__button block_specification__button__rotate'
											aria-hidden='true'
										></i>
										<span className='block_specification__text'>spec</span>
									</div>
									<div className='block_specification__informationShow hide'>
										<i
											className='fa fa-info-circle block_specification__button block_specification__button__jump'
											aria-hidden='true'
										></i>
										<span className='block_specification__text'>inform</span>
									</div>
								</div>
								<p className='block_model'>
									<span className='block_model__text'>Model: </span>
									<span className='block_model__number'>505795</span>
								</p>
								<div className='block_product'>
									<h2 className='block_name block_name__mainName'>
										MOMENTUM<sup>&reg; </sup>
									</h2>
									<h2 className='block_name block_name__addName'>Wireless Black</h2>
									<p className='block_product__advantagesProduct'></p>
									<div className='block_informationAboutDevice'>
										<div className='block_descriptionCharacteristic block_descriptionCharacteristic__disActive'>
											<table className='block_specificationInformation_table'>
												<tr>
													<th>Characteristic</th>
													<th>Value</th>
												</tr>
												<tr>
													<td>Ear Coupling</td>
													<td>Around Ear</td>
												</tr>
												<tr>
													<td>Transducer Principle</td>
													<td>Dynamic, Closed-back</td>
												</tr>
												<tr>
													<td>Frequency Response</td>
													<td>16Hz – 22kHz</td>
												</tr>
												<tr>
													<td>Sound Pressure Level (SPL)</td>
													<td>113 dB (Passive: 1 kHz/1 Vrms)</td>
												</tr>
												<tr>
													<td>Total Harmonic Distortion (THD)</td>
													<td>&lt;0.5% (1 kHz, 100 dB SPL)</td>
												</tr>
												<tr>
													<td>Volume Control</td>
													<td>Earcup control when Bluetooth connected</td>
												</tr>
												<tr>
													<td>Microphone Type</td>
													<td>
														Dual omni-directional microphone <br />2 mic beam forming array
													</td>
												</tr>
												<tr>
													<td>Cable / Connector</td>
													<td>1.4m (Detachable) / 3.5mm Angled</td>
												</tr>
												<tr>
													<td>Weight</td>
													<td>260g (9.17 oz)</td>
												</tr>
											</table>
										</div>
										<div className='block_descriptionInformation'>
											<span>
												Peak performance with active noise cancelation. Sennheiser's new
												MOMENTUM Wireless - Closed circumauralheadphone featuring{' '}
												<a
													className='block_product__link'
													href='#'
												>
													Bluetooth<sup>&reg;</sup>
												</a>{' '}
												wireless technology and NoiseGard Hybrid active noise cancelation
											</span>
										</div>
										<div className='row11 '>
											<div className='large-6 small-12 column left-align'>
												<div className='block_price'>
													<p className='block_price__currency currency'>$</p>
													<p className='block_price__shipping'>Shipping and taxes extra</p>
												</div>
												<div className='block_quantity clearfix'>
													<span className='text_specification'>Quantity</span>
													<div className='block_quantity__chooseBlock'>
														<input
															className='block_quantity__number block_quantity__number2'
															name='quantityNumber'
															type='text'
															min='1'
															value={quantity}
														/>
														<button className='block_quantity__button block_quantity__up'>
															<ArrowDown
																onClick={() => {
																	handleQuantity2('dec', zaidVar);
																}}
																className='AiOutlineArrowUpanddown down5'
															/>
														</button>
														<button className='block_quantity__button block_quantity__down'>
															<ArrowUp
																onClick={() => {
																	handleQuantity2('inc', zaidVar);
																}}
																className='AiOutlineArrowUpanddown up5'
															/>
														</button>
													</div>
												</div>
											</div>
											<div className='large-6 small-12 column end'>
												<div className='block_goodColor'>
													<span className='text_specification'>Choose your colors:</span>
													<div
														className='zaid'
														style={{ display: 'hidden' }}
													></div>
													<div className='block_goodColor__allColors CatogallColors'></div>
													<FilterSizeCatog
														className='FilterSizeCatog'
														onChange={(e) => setSize(e.target.value)}
													></FilterSizeCatog>
												</div>
												{chekAvail2() ? (
													<button
														className='AddCart'
														onClick={() => addToCart(product_id)}
													>
														Add to Cart
													</button>
												) : (
													<button
														className='AddCart'
														disabled
													>
														ADD TO CART
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				id='listingtabs_0'
				className='block sm-listing-tabs tab-cms-block slider snipcss-X3nN9'
			>
				<h2>{item.title}</h2>
				<div className='block-content'>
					<div className='ltabs-wrap'>
						<div className='ltabs-tabs-container'>
							<div
								className='ltabs-tabs-wrap'
								tabindex='-1'
							>
								<span className='ltabs-current-select'>Accessories for iPhone</span>
							</div>
						</div>
						<div className='listingtabs-cms'>
							<div className='cms-container'>
								<div className='banner-image container-hidd'>
									<Link to={`/products/${item.cat}`}>
										<img
											className='mark-lazy new-lazy'
											src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg'
											data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg'
											alt='Banner Image'
											width='350'
											height='370'
										/>
									</Link>
								</div>
							</div>
							<div className='ltabs-items-container '>
								<div className='ltabs-items  ltabs-items-selected ltabs-items-loaded  ltabs-items-15'>
									<div className='ltabs-items-inner'>
										<div className='products wrapper grid products-grid'>
											<ol className='products list items product-items owl-carousel owl-theme owl-loaded owl-drag'>
												<div className='owl-stage-outer'>
													<div
														className='owl-stage style-pO7ki'
														id='style-pO7ki'
													>
														{products.slice(0, 4).map((data) => (
															<div
																className='owl-item active style-SmoEo'
																id='style-SmoEo'
															>
																<Link
																	to={`/product/${data._id}`}
																	className='action quickview-handler sm_quickview_handler'
																	title='Quick View'
																	href=''
																>
																	<li className='item product product-item '>
																		<div
																			className='product-item-info'
																			data-container='product-grid'
																		>
																			<div className='image-product'>
																				<a
																					href=''
																					className='product photo product-item-photo'
																					tabindex='-1'
																				>
																					<span
																						className='product-image-container product-image-container-1 style-bH5WH'
																						id='style-bH5WH'
																					>
																						<span
																							className='product-image-wrapper style-MbttD'
																							id='style-MbttD'
																						>
																							<img
																								className='product-image-photo'
																								src={data.img}
																								data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg'
																								loading='lazy'
																								width='300'
																								height='300'
																								alt={data.title}
																							/>
																						</span>
																					</span>
																				</a>
																				<Link
																					to={``}
																					className='action quickview-handler sm_quickview_handler show-cart2'
																					title='Quick View'
																					href=''
																					offer-id={data._id}
																				>
																					<AiOutlineEye />
																					<span>Quick View</span>
																				</Link>
																			</div>
																			<div className='product details product-item-details'>
																				<strong className='product name product-item-name'>
																					{data.title}
																					<a
																						className='product-item-link'
																						href=''
																					></a>
																				</strong>
																				<div
																					className='price-box price-final_price'
																					data-role='priceBox'
																					data-product-id='1'
																					data-price-box='product-id-1'
																				>
																					<span className='price-container price-final_price tax weee'>
																						<span
																							id='product-price-1'
																							data-price-amount='250'
																							data-price-type='finalPrice'
																							className='price-wrapper '
																						>
																							<span className='price'>$ {data.price}</span>
																						</span>
																					</span>
																				</div>
																				<div className='product-item-inner'>
																					<div className='product actions product-item-actions'>
																						<div className='actions-primary'></div>
																						<div
																							data-role='add-to-links'
																							className='actions-secondary'
																						></div>
																						<Link to={`/product/${data._id}`}>
																							<button className='Add-to-Cart-new'>Add to Cart</button>
																						</Link>
																						<div
																							className='actions-secondary'
																							data-role='add-to-links'
																						>
																							<a
																								href='#'
																								className='action towishlist'
																								data-action='add-to-wishlist'
																								title='Add to Wish List'
																							>
																								<BsHeart />
																								<span>Add to Wish List</span>
																							</a>
																							<a
																								href='#'
																								className='action tocompare'
																								data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																								title='Add to Compare'
																							>
																								<IoGitCompareOutline />
																								<span>Add to Compare</span>
																							</a>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</li>
																</Link>
															</div>
														))}
													</div>
												</div>
												<div className='owl-nav'>
													<div
														role='presentation'
														className='owl-prev disabled'
													>
														<span aria-label='Previous'>‹</span>
													</div>
													<div
														role='presentation'
														className='owl-next'
													>
														<span aria-label='Next'>›</span>
													</div>
												</div>
												<div className='owl-dots disabled'></div>
											</ol>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Catog;
