import React from "react";
import "./offer.css";
import styled from "styled-components";
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { IoGitCompareOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Wrapper1 = styled.div`
	height: 100%;
	display: flex;
	transition: all 0.75s ease;
	transform: translateX(${(props) => props.slideIndex * -15}vw);
`;

const Offer = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};
	return (
		<div
			class="group-deal-1 hidden-title-block nav-style-1 hover-to-show absolute-nav snipcss-s72N8 style-sCNUC"
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
				<div class="block block-list-products">
					<div class="block-title">
						<strong>Hot Deals</strong>
					</div>
					<div class="block-content">
						<div id="filterproducts_1" class="product-deal-list">
							<div class="deal-left">
								<div class="deal-description">
									<div>
										Special Offer!
										<br />
										up to
										<span id="style-Leion" class="style-Leion">
											50%
										</span>
										Off
									</div>
								</div>
								<div class="timer-content">
									<div class="timer-title">Hurry Up! Offer End In:</div>
									<div class="deals-countdown" data-timer="2021/06/24 00:00:00">
										Now!
									</div>
								</div>
							</div>
							<div class="deal-content">
								<div class="owl-carousel owl-theme list items product-items filterproducts owl-loaded owl-drag">
									<div class="owl-stage-outer">
										<Wrapper1
											class="owl-stage style-FUF77"
											id="style-FUF77"
											slideIndex={slideIndex}
										>
											<div class="owl-item active style-Ke3kW" id="style-Ke3kW">
												<div class="item product product-item">
													<div
														class="product-item-info"
														data-container="product-grid"
													>
														<div class="image-product">
															<a
																href=""
																class="product photo product-item-photo"
																tabindex="-1"
															>
																<span
																	class="product-image-container product-image-container-13 style-j6oeg"
																	id="style-j6oeg"
																>
																	<span
																		class="product-image-wrapper style-gKGpW"
																		id="style-gKGpW"
																	>
																		<img
																			class="product-image-photo"
																			src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg"
																			data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-03_1.jpg /"
																			loading="lazy"
																			width="300"
																			height="300"
																			alt="WLED Chromebook with Faster"
																		/>
																	</span>
																</span>
															</a>
															<a
																class="action quickview-handler sm_quickview_handler"
																title="Quick View"
																href=""
															>
																<AiOutlineEye />
																<span>Quick View</span>
															</a>
														</div>
														<div class="product details product-item-details">
															<strong class="product name product-item-name">
																<a class="product-item-link" href="">
																	WLED Chromebook with Faster
																</a>
															</strong>
															<div
																class="price-box price-final_price"
																data-role="priceBox"
																data-product-id="13"
																data-price-box="product-id-13"
															>
																<span class="price-container price-final_price tax weee">
																	<span
																		id="product-price-13"
																		data-price-amount="250"
																		data-price-type="finalPrice"
																		class="price-wrapper "
																	>
																		<span class="price">$250.00</span>
																	</span>
																</span>
															</div>
															<div class="time-countdown-slide">
																<div class="time-wrapper">
																	<div class="time-label clearfix">
																		<div class="stock-qty">
																			Availability:
																			<span>150</span>
																		</div>
																		<div class="time-left">
																			Time left:
																			<span>841day(s)</span>
																		</div>
																	</div>
																	<div class="time-ranger">
																		<div
																			class="time-pass style-Tx4nd"
																			id="style-Tx4nd"
																		></div>
																	</div>
																</div>
															</div>
															<div class="product-item-actions">
																<div class="actions-primary">
																	<button
																		class="action tocart primary"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/13\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																		type="button"
																		title="Add to Cart"
																	>
																		<span>Add to Cart</span>
																	</button>
																</div>
																<div
																	class="actions-secondary"
																	data-role="add-to-links"
																>
																	<a
																		href="#"
																		class="action towishlist"
																		data-action="add-to-wishlist"
																		title="Add to Wish List"
																	>
																		<BsHeart />
																		<span>Add to Wish List</span>
																	</a>
																	<a
																		href="#"
																		class="action tocompare"
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
											<div class="owl-item active style-8kfzK" id="style-8kfzK">
												<div class="item product product-item">
													<div
														class="product-item-info"
														data-container="product-grid"
													>
														<div class="image-product">
															<a
																href=""
																class="product photo product-item-photo"
																tabindex="-1"
															>
																<span
																	class="product-image-container product-image-container-22 style-75P4v"
																	id="style-75P4v"
																>
																	<span
																		class="product-image-wrapper style-P7Dkd"
																		id="style-P7Dkd"
																	>
																		<img
																			class="product-image-photo"
																			src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/e/-/e-01.jpg"
																			data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/e/-/e-01.jpg"
																			loading="lazy"
																			width="300"
																			height="300"
																			alt="Armor Safety Ear Muffs Hearing"
																		/>
																	</span>
																</span>
															</a>
															<a
																class="action quickview-handler sm_quickview_handler"
																title="Quick View"
																href=""
															>
																<AiOutlineEye />
																<span>Quick View</span>
															</a>
														</div>
														<div class="product details product-item-details">
															<strong class="product name product-item-name">
																<a class="product-item-link" href="">
																	Armor Safety Ear Muffs Hearing
																</a>
															</strong>
															<div
																class="price-box price-final_price"
																data-role="priceBox"
																data-product-id="22"
																data-price-box="product-id-22"
															>
																<span class="price-container price-final_price tax weee">
																	<span
																		id="product-price-22"
																		data-price-amount="780"
																		data-price-type="finalPrice"
																		class="price-wrapper "
																	>
																		<span class="price">$780.00</span>
																	</span>
																</span>
															</div>
															<div class="time-countdown-slide">
																<div class="time-wrapper">
																	<div class="time-label clearfix">
																		<div class="stock-qty">
																			Availability:
																			<span>150</span>
																		</div>
																		<div class="time-left">
																			Time left:
																			<span>934day(s)</span>
																		</div>
																	</div>
																	<div class="time-ranger">
																		<div
																			class="time-pass style-j3Afe"
																			id="style-j3Afe"
																		></div>
																	</div>
																</div>
															</div>
															<div class="product-item-actions">
																<div class="actions-primary">
																	<button
																		class="action tocart primary"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/22\/","data":{"product":"22","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																		type="button"
																		title="Add to Cart"
																	>
																		<span>Add to Cart</span>
																	</button>
																</div>
																<div
																	class="actions-secondary"
																	data-role="add-to-links"
																>
																	<a
																		href="#"
																		class="action towishlist"
																		data-action="add-to-wishlist"
																		title="Add to Wish List"
																	>
																		<BsHeart />
																		<span>Add to Wish List</span>
																	</a>
																	<a
																		href="#"
																		class="action tocompare"
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
											<div class="owl-item style-8hkKU" id="style-8hkKU">
												<div class="item product product-item">
													<div
														class="product-item-info"
														data-container="product-grid"
													>
														<div class="image-product">
															<a
																href=""
																class="product photo product-item-photo"
																tabindex="-1"
															>
																<span
																	class="product-image-container product-image-container-28 style-kagUT"
																	id="style-kagUT"
																>
																	<span
																		class="product-image-wrapper style-5Regc"
																		id="style-5Regc"
																	>
																		<img
																			class="product-image-photo"
																			src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/c/-/c-05_3.jpg"
																			data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/c/-/c-05_3.jpg"
																			loading="lazy"
																			width="300"
																			height="300"
																			alt="Accessory Bundle Includes 64GB"
																		/>
																	</span>
																</span>
															</a>
															<a
																class="action quickview-handler sm_quickview_handler"
																title="Quick View"
																href=""
															>
																<AiOutlineEye />
																<span>Quick View</span>
															</a>
														</div>
														<div class="product details product-item-details">
															<strong class="product name product-item-name">
																<a class="product-item-link" href="">
																	Accessory Bundle Includes 64GB
																</a>
															</strong>
															<div class="product-reviews-summary short">
																<div class="reviews-actions">
																	<a class="action view" href="">
																		1 &nbsp;
																		<span>Review</span>
																	</a>
																</div>
															</div>
															<div
																class="price-box price-final_price"
																data-role="priceBox"
																data-product-id="28"
																data-price-box="product-id-28"
															>
																<span class="price-container price-final_price tax weee">
																	<span
																		id="product-price-28"
																		data-price-amount="750"
																		data-price-type="finalPrice"
																		class="price-wrapper "
																	>
																		<span class="price">$750.00</span>
																	</span>
																</span>
															</div>
															<div class="time-countdown-slide">
																<div class="time-wrapper">
																	<div class="time-label clearfix">
																		<div class="stock-qty">
																			Availability:
																			<span>200</span>
																		</div>
																		<div class="time-left">
																			Time left:
																			<span>845day(s)</span>
																		</div>
																	</div>
																	<div class="time-ranger">
																		<div
																			class="time-pass style-wjF5n"
																			id="style-wjF5n"
																		></div>
																	</div>
																</div>
															</div>
															<div class="product-item-actions">
																<div class="actions-primary">
																	<button
																		class="action tocart primary"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/28\/","data":{"product":"28","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																		type="button"
																		title="Add to Cart"
																	>
																		<span>Add to Cart</span>
																	</button>
																</div>
																<div
																	class="actions-secondary"
																	data-role="add-to-links"
																>
																	<a
																		href="#"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/wishlist\/index\/add\/","data":{"product":28,"uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																		class="action towishlist"
																		data-action="add-to-wishlist"
																		title="Add to Wish List"
																	>
																		<BsHeart />
																		<span>Add to Wish List</span>
																	</a>
																	<a
																		href="#"
																		class="action tocompare"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"28","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
											<div class="owl-item style-KTgWy" id="style-KTgWy">
												<div class="item product product-item">
													<div
														class="product-item-info"
														data-container="product-grid"
													>
														<div class="image-product">
															<a
																href=""
																class="product photo product-item-photo"
																tabindex="-1"
															>
																<span
																	class="product-image-container product-image-container-29 style-jLddE"
																	id="style-jLddE"
																>
																	<span
																		class="product-image-wrapper style-RsQW3"
																		id="style-RsQW3"
																	>
																		<img
																			class="product-image-photo"
																			src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/c/-/c-06_4.jpg"
																			data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/c/-/c-06_4.jpg"
																			loading="lazy"
																			width="300"
																			height="300"
																			alt="Zoom Lens 32GB Accessory Bundle"
																		/>
																	</span>
																</span>
															</a>
															<a
																class="action quickview-handler sm_quickview_handler"
																title="Quick View"
																href=""
															>
																<AiOutlineEye />
																<span>Quick View</span>
															</a>
														</div>
														<div class="product details product-item-details">
															<strong class="product name product-item-name">
																<a class="product-item-link" href="">
																	Zoom Lens 32GB Accessory Bundle
																</a>
															</strong>
															<div
																class="price-box price-final_price"
																data-role="priceBox"
																data-product-id="29"
																data-price-box="product-id-29"
															>
																<span class="price-container price-final_price tax weee">
																	<span
																		id="product-price-29"
																		data-price-amount="260"
																		data-price-type="finalPrice"
																		class="price-wrapper "
																	>
																		<span class="price">$260.00</span>
																	</span>
																</span>
															</div>
															<div class="time-countdown-slide">
																<div class="time-wrapper">
																	<div class="time-label clearfix">
																		<div class="stock-qty">
																			Availability:
																			<span>140</span>
																		</div>
																		<div class="time-left">
																			Time left:
																			<span>886day(s)</span>
																		</div>
																	</div>
																	<div class="time-ranger">
																		<div
																			class="time-pass style-IaYTg"
																			id="style-IaYTg"
																		></div>
																	</div>
																</div>
															</div>
															<div class="product-item-actions">
																<div class="actions-primary">
																	<button
																		class="action tocart primary"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/29\/","data":{"product":"29","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																		type="button"
																		title="Add to Cart"
																	>
																		<span>Add to Cart</span>
																	</button>
																</div>
																<div
																	class="actions-secondary"
																	data-role="add-to-links"
																>
																	<a
																		href="#"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/wishlist\/index\/add\/","data":{"product":29,"uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																		class="action towishlist"
																		data-action="add-to-wishlist"
																		title="Add to Wish List"
																	>
																		<BsHeart />
																		<span>Add to Wish List</span>
																	</a>
																	<a
																		href="#"
																		class="action tocompare"
																		data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"29","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
										</Wrapper1>
									</div>
									<div class="owl-nav">
										<div
											role="presentation"
											class="owl-prev disabled"
											onClick={() => handleClick("left")}
										>
											<BiChevronLeft />
										</div>
										<div
											role="presentation"
											class="owl-next"
											onClick={() => handleClick("right")}
										>
											<BiChevronRight />
										</div>
									</div>
									<div class="owl-dots disabled"></div>
								</div>
								<div class="loading-content">
									<span class="hidden">Loading...</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Offer;
