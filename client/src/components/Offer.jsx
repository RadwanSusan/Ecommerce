import React from 'react';
import './offer.css';
import styled from 'styled-components';
import { useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { IoGitCompareOutline } from 'react-icons/io5';
import { AiOutlineEye } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import { mobile } from '../responsive';
import { useEffect } from 'react';
import axios from 'axios';
import { categoriesOffer } from '../data';
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';

import {
	AiFillCloseCircle,
	AiOutlineArrowUp,
	AiOutlineArrowDown,
} from 'react-icons/ai';
import swal from 'sweetalert';
import { addProduct, getAllProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const Wrapper1 = styled.div`
	height: 100%;
	display: flex;
	transition: all 0.75s ease;
	transform: translateX(${(props) => props.slideIndex * -35}vw);
`;

const Offer = () => {
	const [zaidVar, setZaidVar] = useState(0);
	const [product_id, setProduct_id] = useState(0);
	window.onload = function () {
		var slider = document.getElementsByClassName('sliderBlock_items');
		var slides = document.getElementsByClassName('sliderBlock_items__itemPhoto');
		var next = document.getElementsByClassName(
			'sliderBlock_controls__arrowForward',
		)[0];
		var previous = document.getElementsByClassName(
			'sliderBlock_controls__arrowBackward',
		)[0];
		var items = document.getElementsByClassName(
			'sliderBlock_positionControls',
		)[0];
		var currentSlideItem = document.getElementsByClassName(
			'sliderBlock_positionControls__paginatorItem',
		);
		var currentSlide = 0;
		var slideInterval = setInterval(nextSlide, 5000);
		function nextSlide() {
			goToSlide(currentSlide + 1);
		}
		function previousSlide() {
			goToSlide(currentSlide - 1);
		}
		function goToSlide(n) {
			slides[currentSlide].className = 'sliderBlock_items__itemPhoto';
			items.children[currentSlide].className =
				'sliderBlock_positionControls__paginatorItem';
			currentSlide = (n + slides.length) % slides.length;
			slides[currentSlide].className =
				'sliderBlock_items__itemPhoto sliderBlock_items__showing';
			items.children[currentSlide].className =
				'sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active';
		}
		next.onClick = function () {
			nextSlide();
		};
		previous.onClick = function () {
			previousSlide();
		};
		function goToSlideAfterPushTheMiniBlock() {
			for (var i = 0; i < currentSlideItem.length; i++) {
				currentSlideItem[i].onClick = function (i) {
					var index = Array.prototype.indexOf.call(currentSlideItem, this);
					goToSlide(index);
				};
			}
		}
		goToSlideAfterPushTheMiniBlock();
		var buttonFullSpecification = document.getElementsByClassName(
			'block_specification',
		)[0];
		var buttonSpecification = document.getElementsByClassName(
			'block_specification__specificationShow',
		)[0];
		var buttonInformation = document.getElementsByClassName(
			'block_specification__informationShow',
		)[0];
		var blockCharacteristiic = document.querySelector(
			'.block_descriptionCharacteristic',
		);
		var activeCharacteristic = document.querySelector(
			'.block_descriptionCharacteristic__active',
		);
		buttonFullSpecification.onClick = function () {
			buttonSpecification.classList.toggle('hide');
			buttonInformation.classList.toggle('hide');
			blockCharacteristiic.classList.toggle(
				'block_descriptionCharacteristic__active',
			);
		};

		// let up = document.getElementsByClassName("up5"),
		//   down = document.getElementsByClassName("down5"),
		let input = document.getElementsByClassName('block_quantity__number')[0];
		// let show_cart = document.querySelectorAll('show-cart');
		let idOffer;
		document.querySelectorAll('.show-cart').forEach((item) =>
			item.addEventListener('click', (e) => {
				document.querySelector('.productCard_block').style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.querySelector('.productCard_block').style.overflow = 'hidden';
				document.querySelector('.backLayerForShowCart').style.display = 'block';
				document.querySelector('.backLayerForShowCart').style.overflow = 'hidden';
				idOffer = item.getAttribute('offer-id');
				const viewArr = offer.find((offer) => offer._id === idOffer);
				document.querySelector('.block_product__advantagesProduct').innerHTML = '';
				document
					.querySelector('.block_product__advantagesProduct')
					.append(viewArr.desc);
				let aramex = document.querySelector('.block_goodColor__allColors');
				document.querySelector('.block_goodColor__allColors').innerHTML = '';
				setZaidVar(viewArr._id);
				setProduct_id(viewArr._id);
				//   const document.querySelector(".radio_button");
				viewArr.color.map((e) => {
					let input1 = document.createElement('input');
					input1.classList.add('radio_button');
					input1.setAttribute('id', 'radioColor');
					input1.setAttribute('name', 'colorOfItem');
					input1.setAttribute('checked', 'checked');
					let label = document.createElement('label');
					label.setAttribute('for', 'radioColor');
					label.classList.add('block_goodColor__radio', 'block_goodColor__black');
					label.style.backgroundColor = `${e}`;
					aramex.append(input1);
					aramex.append(label);
					//   let input = document.createElement("");
					//   input.classList.add("block_price__currency");
					//   let input = document.createElement("");
				});
				document.querySelector('.block_price__currency').innerHTML = '';
				document.querySelector('.block_price__currency').append('$');
				document.querySelector('.block_price__currency').append(viewArr.price);
			}),
		);
		document.querySelectorAll('.AiFillCloseCircle').forEach((item) =>
			item.addEventListener('click', (e) => {
				document.querySelector('.productCard_block').style.display = 'none';
				document.body.style.overflow = '';
				document.querySelector('.productCard_block').style.overflow = '';
				document.querySelector('.backLayerForShowCart').style.display = 'none';
			}),
		);
	};
	const [quantityUp, setQuantityUp] = useState(1);
	const [slideIndex, setSlideIndex] = useState(0);
	const handleClick = (direction) => {
		if (direction === 'left') {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
		}
	};
	const [offer, setOffer] = useState({});
	useEffect(() => {
		const getOffer = async () => {
			try {
				const res = await axios.get(
					categoriesOffer.cat
						? `http://localhost:4000/api/offer?category=${categoriesOffer[0].cat}`
						: 'http://localhost:4000/api/offer',
				);
				setOffer(res.data);
			} catch (err) {}
		};
		getOffer(getOffer);
	}, [categoriesOffer.cat]);

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
	const [cart, setCart] = useState([]);
	const dispatch = useDispatch();

	// document.querySelectorAll('.Color').forEach((item) =>
	// 	item.addEventListener('click', (e) => {
	// 		document.querySelectorAll('.Color').forEach((item2) => {
	// 			item2.style.outline = 'none';
	// 		});
	// 		e.target.style.outline = '3px solid #292931';
	// 	}),
	// );
	const [AllProducts, setAllProducts] = useState([]);
	const [AllOffers, setAllOffers] = useState([]);
	let [productGet, setProductGet] = useState({});
	let [offerGet, setOfferGet] = useState({});
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
	const handleQuantity = (type, id) => {
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
	const chekAvail = () => {
		let newQuantity = mergedCart.map((item) => {
			if (item._id === offer._id) {
				return {
					quantity: offer.quantity - item.quantity,
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
		if (offer.length > 0) {
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
				<div className='productCard_block'>
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
							<div className='AiFillCloseCircle'>
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
										=
										<div className='row11 '>
											<div className='large-6 small-12 column left-align'>
												<div className='block_price'>
													<p className='block_price__currency'>$</p>
													<p className='block_price__shipping'>Shipping and taxes extra</p>
												</div>
												<div className='block_quantity clearfix'>
													<span className='text_specification'>Quantity</span>
													<div className='block_quantity__chooseBlock'>
														<input
															className='block_quantity__number'
															name='quantityNumber'
															type='text'
															min='1'
															value={quantity}
														/>
														<button className='block_quantity__button block_quantity__up'>
															<BsArrowDownCircle
																onClick={() => {
																	handleQuantity('dec', zaidVar);
																}}
																className='AiOutlineArrowUpanddown down5'
															/>
														</button>
														<button className='block_quantity__button block_quantity__down'>
															<BsArrowUpCircle
																onClick={() => {
																	handleQuantity('inc', zaidVar);
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
													<div className='block_goodColor__allColors'></div>
												</div>
												{chekAvail() ? (
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
			=
			<div
				className='group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC'
				id='style-sCNUC'
			>
				<div
					data-owl='owl-slider'
					data-autoplay='false'
					data-nav='true'
					data-dots='false'
					data-screen0='1'
					data-screen481='1'
					data-screen768='2'
					data-screen992='3'
					data-screen1200='2'
					data-screen1441='2'
					data-screen1681='2'
					data-screen1920='2'
					data-margin='30'
					data-autoplayhoverpause='true'
					data-loop='false'
					data-center='false'
					data-stagepadding='0'
					data-mousedrag='true'
					data-touchdrag='true'
				>
					<div className='block block-list-products'>
						<div className='block-title'>
							<strong>Hot Deals</strong>
						</div>
						<div className='block-content'>
							<div
								id='filterproducts_1'
								className='product-deal-list'
							>
								<Link to={`/offer/${categoriesOffer[0].cat}`}>
									<div className='deal-left'>
										<div className='deal-description'>
											<div>
												Special Offer!
												<br />
												up to
												<span
													id='style-Leion'
													className='style-Leion'
												>
													50%
												</span>
												Off
											</div>
										</div>
										<div className='timer-content'>
											<div className='timer-title'>Hurry Up! Offer End In:</div>
											<div
												className='deals-countdown'
												data-timer='2021/06/24 00:00:00'
											>
												Now!
											</div>
										</div>
									</div>
								</Link>
								<div className='deal-content'>
									<div className='owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag'>
										<div className='owl-stage-outer'>
											<Wrapper1
												className='owl-stage style-FUF77'
												id='style-FUF77'
												slideIndex={slideIndex}
											>
												{Object.keys(offer).map(function (data) {
													return (
                            <div
                              className="owl-item active style-Ke3kW"
                              id="style-Ke3kW"
                            >
                              <div className="item product product-item">
                                <div
                                  className="product-item-info"
                                  data-container="product-grid"
                                >
                                  <Link
                                    to={`/product/${offer[data]["_id"]}`}
                                    className="action quickview-handler
																	sm_quickview_handler"
                                    title="Quick View"
                                    href=""
                                  >
                                    <div className="image-product">
                                      <div
                                        className="product photo product-item-photo"
                                        tabindex="-1"
                                      >
                                        <span
                                          className="product-image-container product-image-container-13 style-j6oeg"
                                          id="style-j6oeg"
                                        >
                                          <span
                                            className="product-image-wrapper style-gKGpW"
                                            id="style-gKGpW"
                                          >
                                            <img
                                              className="product-image-photo"
                                              src={offer[data]["img"]}
                                              data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg /"
                                              loading="lazy"
                                              width="250"
                                              height="250"
                                              alt={offer[data]["img"]}
                                            />
                                          </span>
                                        </span>
                                      </div>
                                      <Link
                                        to={""}
                                        className="action quickview-handler
																	sm_quickview_handler show-cart"
                                        title="Quick View"
                                        offer-id={offer[data]["_id"]}
                                      >
                                        <AiOutlineEye
                                          className="show-cart"
                                          offer-id={offer[data]["_id"]}
                                        />
                                        <span>Quick View</span>
                                      </Link>
                                    </div>
                                  </Link>
                                  <div className="product details product-item-details">
                                    <strong className="product name product-item-name">
                                      <a className="product-item-link" href="">
                                        {offer[data]["title"]}
                                      </a>
                                    </strong>
                                    <div
                                      className="price-box price-final_price"
                                      data-role="priceBox"
                                      data-product-id="13"
                                      data-price-box="product-id-13"
                                    >
                                      <span className="price-container price-final_price tax weee">
                                        <span
                                          id="product-price-13"
                                          data-price-amount="250"
                                          data-price-type="finalPrice"
                                          className="price-wrapper "
                                        >
                                          <span className="price">
                                            $ {offer[data]["price"]}
                                          </span>

                                          <span className="priceOffer">
                                            $ {offer[data]["offerPrice"]}
                                          </span>
                                        </span>
                                      </span>
                                    </div>
                                    <div className="time-countdown-slide">
                                      <div className="time-wrapper">
                                        <div className="time-label clearfix">
                                          <div className="stock-qty">
                                            Availability:
                                            <span>150</span>
                                          </div>
                                          <div className="time-left">
                                            Time left:
                                            <span>
                                              {offer[data]["timeEnd"]}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="time-ranger">
                                          <div
                                            className="time-pass style-Tx4nd"
                                            id="style-Tx4nd"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="product-item-actions">
                                      <div className="actions-primary">
                                        <Link to={``}>
                                          <button
                                            className="action tocart primary"
                                            data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/13\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
                                            type="button"
                                            title="Add to Cart"
                                          >
                                            <span>Add to Cart</span>
                                          </button>
                                        </Link>
                                      </div>
                                      <div
                                        className="actions-secondary"
                                        data-role="add-to-links"
                                      >
                                        <a
                                          href="#"
                                          className="action towishlist"
                                          data-action="add-to-wishlist"
                                          title="Add to Wish List"
                                        >
                                          <BsHeart />
                                          <span>Add to Wish List</span>
                                        </a>
                                        <a
                                          href="#"
                                          className="action tocompare"
                                          title="Add to Compare"
                                        >
                                          <IoGitCompareOutline />
                                          <span>Add to Compare</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
												})}
											</Wrapper1>
										</div>
										<div className='owl-nav'>
											<div
												role='presentation'
												className='owl-prev disabled'
												onClick={() => handleClick('left')}
											>
												<BiChevronLeft />
											</div>
											<div
												role='presentation'
												className='owl-next'
												onClick={() => handleClick('right')}
											>
												<BiChevronRight />
											</div>
										</div>
										<div className='owl-dots disabled'></div>
									</div>
									<div className='loading-content'>
										<span className='hidden'>Loading...</span>
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

export default Offer;
