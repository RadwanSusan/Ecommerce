import React from "react";
import "./offer.css";
import styled from "styled-components";
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { IoGitCompareOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { mobile } from "../responsive";
import { useEffect } from "react";
import axios from "axios";
import { categoriesOffer } from "../data";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";


const Wrapper1 = styled.div`
	height: 100%;
	display: flex;
	transition: all 0.75s ease;
	transform: translateX(${(props) => props.slideIndex * -15}vw);
`;

const Offer = () => {

	// window.onload = function () {

    //     //// SLIDER
    //     var slider = document.getElementsByClassName("sliderBlock_items");
    //     var slides = document.getElementsByClassName("sliderBlock_items__itemPhoto");
    //     var next = document.getElementsByClassName("sliderBlock_controls__arrowForward")[0];
    //     var previous = document.getElementsByClassName("sliderBlock_controls__arrowBackward")[0];
    //     var items = document.getElementsByClassName("sliderBlock_positionControls")[0];
    //     var currentSlideItem = document.getElementsByClassName("sliderBlock_positionControls__paginatorItem");
    
    //     var currentSlide = 0;
    //     var slideInterval = setInterval(nextSlide, 5000);  /// Delay time of slides
    
    //     function nextSlide() {
    //         goToSlide(currentSlide + 1);
    //     }
    
    //     function previousSlide() {
    //         goToSlide(currentSlide - 1);
    //     }
    
    
    //     function goToSlide(n) {
    //         slides[currentSlide].className = 'sliderBlock_items__itemPhoto';
    //         items.children[currentSlide].className = 'sliderBlock_positionControls__paginatorItem';
    //         currentSlide = (n + slides.length) % slides.length;
    //         slides[currentSlide].className = 'sliderBlock_items__itemPhoto sliderBlock_items__showing';
    //         items.children[currentSlide].className = 'sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active';
    //     }
    
    
    //     next.onClick = function () {
    //         nextSlide();
    //     };
    //     previous.onClick = function () {
    //         previousSlide();
    //     };
    
    
    //     function goToSlideAfterPushTheMiniBlock() {
    //         for (var i = 0; i < currentSlideItem.length; i++) {
    //             currentSlideItem[i].onClick = function (i) {
    //                 var index = Array.prototype.indexOf.call(currentSlideItem, this);
    //                 goToSlide(index);
    //             }
    //         }
    //     }
    
    //     goToSlideAfterPushTheMiniBlock();
    
    
    // /////////////////////////////////////////////////////////
    
    // ///// Specification Field
    
    
    //     var buttonFullSpecification = document.getElementsByClassName("block_specification")[0];
    //     var buttonSpecification = document.getElementsByClassName("block_specification__specificationShow")[0];
    //     var buttonInformation = document.getElementsByClassName("block_specification__informationShow")[0];
    
    //     var blockCharacteristiic = document.querySelector(".block_descriptionCharacteristic");
    //     var activeCharacteristic = document.querySelector(".block_descriptionCharacteristic__active");
    
    
    //     buttonFullSpecification.onClick = function () {
    
    //         console.log("OK");
    
    
    //         buttonSpecification.classList.toggle("hide");
    //         buttonInformation.classList.toggle("hide");
    
    
    //         blockCharacteristiic.classList.toggle("block_descriptionCharacteristic__active");
    
    
    //     };
    
    
    // /////  QUANTITY ITEMS
    
    //     var up = document.getElementsByClassName('block_quantity__up')[0],
    //         down = document.getElementsByClassName('block_quantity__down')[0],
    //         input = document.getElementsByClassName('block_quantity__number')[0];
    //         // let show_cart = document.querySelectorAll('show-cart');

	// 		document.querySelectorAll(".show-cart").forEach((item) =>
	// 	item.addEventListener("click", (e) => {
	// 	document.querySelector(".productCard_block").style.display = "block";	
	// 	}),
	// );


	// document.querySelectorAll(".AiFillCloseCircle").forEach((item) =>
	// 	item.addEventListener("click", (e) => {
	// 	document.querySelector(".productCard_block").style.display = "none";	
	// 	}),
	// );
    
    //     function getValue() {
    //         return parseInt(input.value);
    //     }
    
    //     up.onClick = function (event) {
    //         input.value = getValue() + 1;
    //     };
    //     down.onClick = function (event) {
    //         if (input.value <= 1) {
    //             return 1;
    //         } else {
    //             input.value = getValue() - 1;
    //         }
    
    //     }
    
    
    // };







	const [slideIndex, setSlideIndex] = useState(0);
	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};

	const [offer, setOffer] = useState([]);
	useEffect(() => {
		const getOffer = async () => {
			try {
				const res = await axios.get(
					categoriesOffer.cat
						? `http://localhost:4000/api/offer?category=${categoriesOffer[0].cat}`
						: "http://localhost:4000/api/offer",
				);
				setOffer(res.data);
			} catch (err) {}
		};
		getOffer(getOffer);
	}, [categoriesOffer.cat]);
	console.log(offer);
	console.log(categoriesOffer[0].cat);


	return (
		<>
		
{/* 		
		<div className="column small-centered">
			<div className="productCard_block">
				<div className="row11">
					<div className="small-12 large-6 columns11">
						<div className="productCard_leftSide clearfix">
							

							<div className="sliderBlock">
								<ul className="sliderBlock_items">
									<li className="sliderBlock_items__itemPhoto sliderBlock_items__showing">
										<img src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true" alt="headphones" />
									</li>
									<li className="sliderBlock_items__itemPhoto">
										<img src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true"  alt="headphones" />
									</li>
									<li className="sliderBlock_items__itemPhoto">
										<img src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true"  alt="headphones" />
									</li>
									<li className="sliderBlock_items__itemPhoto">
										<img src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true"  alt="headphones" />
									</li>
									<li className="sliderBlock_items__itemPhoto">
										<img src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true"  alt="headphones" />
									</li>
								</ul>

								
								<div className="sliderBlock_controls">
									<div className="sliderBlock_controls__navigatin">
										<div className="sliderBlock_controls__wrapper">
											<div className="sliderBlock_controls__arrow sliderBlock_controls__arrowBackward">
												<i className="fa fa-angle-left" aria-hidden="true"></i>
											</div>
											<div className="sliderBlock_controls__arrow sliderBlock_controls__arrowForward">
												<i className="fa fa-angle-right" aria-hidden="true"></i>
											</div>
										</div>
									</div>

									<ul className="sliderBlock_positionControls">
										<li className="sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active"></li>
										<li className="sliderBlock_positionControls__paginatorItem"></li>
										<li className="sliderBlock_positionControls__paginatorItem"></li>
										<li className="sliderBlock_positionControls__paginatorItem"></li>
										<li className="sliderBlock_positionControls__paginatorItem"></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="small-12 large-6 columns11">
						<div className="AiFillCloseCircle">
						<AiFillCloseCircle  />

						</div>
						<div className="productCard_rightSide">
							<div className="block_specification">
								<div className="block_specification__specificationShow">
									<i className="fa fa-cog block_specification__button block_specification__button__rotate"
									   aria-hidden="true"></i>
									<span className="block_specification__text">spec</span>
								</div>
								<div className="block_specification__informationShow hide">
									<i className="fa fa-info-circle block_specification__button block_specification__button__jump"
									   aria-hidden="true"></i>
									<span className="block_specification__text">inform</span>
								</div>
							</div>

							<p className="block_model">
								<span className="block_model__text">Model: </span>
								<span className="block_model__number">505795</span>
							</p>

							<div className="block_product">
								<h2 className="block_name block_name__mainName">MOMENTUM<sup>&reg; </sup></h2>
								<h2 className="block_name block_name__addName">Wireless Black</h2>

								<p className="block_product__advantagesProduct">
									Wireless headphones with integrated microphone
								</p>

								<div className="block_informationAboutDevice">

									<div className="block_descriptionCharacteristic block_descriptionCharacteristic__disActive">
										<table className="block_specificationInformation_table">
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
												<td>Dual omni-directional microphone <br />2 mic beam forming array
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


									<div className="block_descriptionInformation">
										<span>Peak performance with active noise cancelation. Sennheiser's new MOMENTUM Wireless
										- Closed circumauralheadphone featuring <a className="block_product__link"
																				   href="#">Bluetooth<sup>&reg;</sup></a>  wireless technology and NoiseGard Hybrid active noise cancelation
										</span>
									</div>

									<div className="block_rating clearfix">
										<fieldset className="block_rating__stars">
											<input type="radio" id="star5" name="rating" value="5"/><label
												className="full" for="star5" title="Awesome - 5 stars"></label>
											<input type="radio" id="star4half" name="rating"
												   value="4 and a half"/><label className="half" for="star4half"
																				title="Pretty good - 4.5 stars"></label>
											<input type="radio" id="star4" name="rating" value="4"/><label
												className="full" for="star4" title="Good - 4 stars"></label>
											<input type="radio" id="star3half" name="rating"
												   value="3 and a half"/><label className="half" for="star3half"
																				title="Above average - 3.5 stars"></label>
											<input type="radio" id="star3" name="rating" value="3"/><label
												className="full" for="star3" title="Average - 3 stars"></label>
											<input type="radio" id="star2half" name="rating"
												   value="2 and a half"/><label className="half" for="star2half"
																				title="Kinda bad - 2.5 stars"></label>
											<input type="radio" id="star2" name="rating" value="2"/><label
												className="full" for="star2"
												title="Kinda bad - 2 stars"></label>
											<input type="radio" id="star1half" name="rating"
												   value="1 and a half"/><label className="half" for="star1half"
																				title="Meh - 1.5 stars"></label>
											<input type="radio" id="star1" name="rating" value="1"/><label
												className="full" for="star1"
												title="Sucks big time - 1 star"></label>
											<input type="radio" id="starhalf" name="rating"
												   value="half"/><label
												className="half" for="starhalf"
												title="Sucks big time - 0.5 stars"></label>
										</fieldset>

										<span className="block_rating__avarage">4.25</span>
										<span className="block_rating__reviews">(153 reviews)</span>

									</div>
									<div className="row11 ">
										<div className="large-6 small-12 column left-align">
											<div className="block_price">
												<p className="block_price__currency">$499.95</p>
												<p className="block_price__shipping">Shipping and taxes extra</p>
											</div>
											<div className="block_quantity clearfix">
												<span className="text_specification">Quantity</span>
												<div className="block_quantity__chooseBlock">
													<input className="block_quantity__number" name="quantityNumber"
														   type="text" min="1" value="1" />
													<button className="block_quantity__button block_quantity__up"></button>
													<button className="block_quantity__button block_quantity__down"></button>
												</div>
											</div>
										</div>
 <div className="large-6 small-12 column end">
											<div className="block_goodColor">
												<span className="text_specification">Choose your colors:</span>
												<div className="block_goodColor__allColors">
													<input type="radio" name="colorOfItem" className="radio_button"
														   id="radioColor" checked/>
													<label for="radioColor"
														   className="block_goodColor__radio block_goodColor__black"></label>
													<input type="radio" name="colorOfItem" className="radio_button"
														   id="radioColor2"/>
													<label for="radioColor2"
														   className="block_goodColor__radio block_goodColor__silver"></label>
												</div>
											</div>
											<button className="button button_addToCard">
												Add to Cart
											</button>
										</div>
						  
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	




		
	

 */}






		<div
			className="group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC"
			id="style-sCNUC"
		>	
			<div
				data-owl="owl-slider"
				data-autoplay="false"
				data-nav="true"
				data-dots="false"
				data-screen0="1"
				data-screen481="1"
				data-screen768="2"
				data-screen992="3"
				data-screen1200="2"
				data-screen1441="2"
				data-screen1681="2"
				data-screen1920="2"
				data-margin="30"
				data-autoplayhoverpause="true"
				data-loop="false"
				data-center="false"
				data-stagepadding="0"
				data-mousedrag="true"
				data-touchdrag="true"
			>
				<div className="block block-list-products">
					<div className="block-title">
						<strong>Hot Deals</strong>
					</div>
					<div className="block-content">
						<div id="filterproducts_1" className="product-deal-list">
						<Link to={`/offer/${categoriesOffer[0].cat}`}>
							<div className="deal-left">
								<div className="deal-description">
									<div>
										Special Offer!
										<br />
										up to
										<span id="style-Leion" className="style-Leion">
											50%
										</span>
										Off
									</div>
								</div>
								<div className="timer-content">
									<div className="timer-title">Hurry Up! Offer End In:</div>
									<div className="deals-countdown" data-timer="2021/06/24 00:00:00">
										Now!
									</div>
								</div>
							</div>
							</Link>
							
							<div className="deal-content">
								<div className="owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag">
									<div className="owl-stage-outer">
										<Wrapper1
											className="owl-stage style-FUF77"
											id="style-FUF77"
											slideIndex={slideIndex}
										>
											{offer.slice(0, 4).map((data) => (
												
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
																	to={`/product/${data._id}`}
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
																				src={data.img}
																				data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg /"
																				loading="lazy"
																				width="300"
																				height="300"
																				alt={data.img}
																			/>
																			
																		</span>
																	</span>
																</div>
																<Link
																	to={"/"}
																	className="action quickview-handler
																	sm_quickview_handler"
																	title="Quick View"
																	href=""
																>
																	<AiOutlineEye className="show-cart" offer-id={data._id}  />
																	<span>Quick View</span>
																</Link>
															</div>
															</Link>
															<div className="product details product-item-details">
																<strong className="product name product-item-name">
																	<a className="product-item-link" href="">
																		{data.title}
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
																			<span className="price">$ {data.price}</span>
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
																				<span>{data.timeLeft}</span>
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
												
											))}
										</Wrapper1>
									</div>
									<div className="owl-nav">
										<div
											role="presentation"
											className="owl-prev disabled"
											onClick={() => handleClick("left")}
										>
											<BiChevronLeft />
										</div>
										<div
											role="presentation"
											className="owl-next"
											onClick={() => handleClick("right")}
										>
											<BiChevronRight />
										</div>
									</div>
									<div className="owl-dots disabled"></div>
								</div>
								<div className="loading-content">
									<span className="hidden">Loading...</span>
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
