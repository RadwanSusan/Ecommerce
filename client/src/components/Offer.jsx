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

	const [offer, setOffer] = useState([]);
	useEffect(() => {
		const getOffer = async () => {
			try {
				const res = await axios.get(
					categoriesOffer.cat
						? `http://localhost:4000/api/offer?category=${categoriesOffer.cat}`
						: "http://localhost:4000/api/offer",
				);
				setOffer(res.data);
			} catch (err) {}
		};
		getOffer(getOffer);
	}, [categoriesOffer.cat]);

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
											{offer.slice(0, 4).map((data) => (
												<div
													class="owl-item active style-Ke3kW"
													id="style-Ke3kW"
												>
													<div class="item product product-item">
														<div
															class="product-item-info"
															data-container="product-grid"
														>
															<div class="image-product">
																<div
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
																	to={`/product/${data._id}`}
																	class="action quickview-handler
																	sm_quickview_handler"
																	title="Quick View"
																	href=""
																>
																	<AiOutlineEye />
																	<span>Quick View</span>
																</Link>
															</div>
															<div class="product details product-item-details">
																<strong class="product name product-item-name">
																	<a class="product-item-link" href="">
																		{data.title}
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
																			<span class="price">$ {data.price}</span>
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
																				<span>{data.timeLeft}</span>
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
																		<Link to={`/product/${data._id}`}>
																			<button
																				class="action tocart primary"
																				data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo\/product\/13\/","data":{"product":"13","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
																				type="button"
																				title="Add to Cart"
																			>
																				<span>Add to Cart</span>
																			</button>
																		</Link>
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
											))}
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
