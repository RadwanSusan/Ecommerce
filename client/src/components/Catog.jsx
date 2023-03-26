import React from "react";
import "./catog.css";
import { AiOutlineEye } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { IoGitCompareOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Catog = ({item}) => {
	// console.log(item ,"checking")
	return (
		<div
			id="listingtabs_0"
			className="block sm-listing-tabs tab-cms-block slider snipcss-X3nN9">
			
			
			<h2>{item.title}</h2>
			
			<div className="block-content">
				<div className="ltabs-wrap">
					<div className="ltabs-tabs-container">
						<div className="ltabs-tabs-wrap" tabindex="-1">
							<span className="ltabs-current-select">
								Accessories for iPhone
							</span>
						</div>
					</div>
					<div className="listingtabs-cms">
						<div className="cms-container">
							<div className="banner-image container-hidd">
								<Link to={`/products/${item.cat}`}> 
									<img 
										className="mark-lazy new-lazy"
										src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg"
										data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/banner/item-6.jpg"
										alt="Banner Image"
										width="350"
										height="370"
									/>
									</Link>
								
							</div>
						</div>
						<div className="ltabs-items-container ">
							<div className="ltabs-items  ltabs-items-selected ltabs-items-loaded  ltabs-items-15">
								<div className="ltabs-items-inner">
									<div className="products wrapper grid products-grid">
										<ol className="products list items product-items owl-carousel owl-theme owl-loaded owl-drag">
											<div className="owl-stage-outer">
												<div className="owl-stage style-pO7ki" id="style-pO7ki">
													<div
														className="owl-item active style-SmoEo"
														id="style-SmoEo"
													>
														<li className="item product product-item ">
															<div
																className="product-item-info"
																data-container="product-grid"
															>
																<div className="image-product">
																	<a
																		href=""
																		className="product photo product-item-photo"
																		tabindex="-1"
																	>
																		<span
																			className="product-image-container product-image-container-1 style-bH5WH"
																			id="style-bH5WH"
																		>
																			<span
																				className="product-image-wrapper style-MbttD"
																				id="style-MbttD"
																			>
																				<img
																					className="product-image-photo"
																					src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg"
																					data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-01.jpg"
																					loading="lazy"
																					width="300"
																					height="300"
																					alt="Apple iPhone 6s Plus a1687"
																				/>
																			</span>
																		</span>
																	</a>
																	<a
																		className="action quickview-handler sm_quickview_handler"
																		title="Quick View"
																		href=""
																	>
																		<AiOutlineEye />
																		<span>Quick View</span>
																	</a>
																</div>
																<div className="product details product-item-details">
																	<strong className="product name product-item-name">
																		<a className="product-item-link" href="">
																			Apple iPhone 6s Plus a1687
																		</a>
																	</strong>
																	<div
																		className="price-box price-final_price"
																		data-role="priceBox"
																		data-product-id="1"
																		data-price-box="product-id-1"
																	>
																		<span className="price-container price-final_price tax weee">
																			<span
																				id="product-price-1"
																				data-price-amount="250"
																				data-price-type="finalPrice"
																				className="price-wrapper "
																			>
																				<span className="price">$250.00</span>
																			</span>
																		</span>
																	</div>
																	<div className="product-item-inner">
																		<div className="product actions product-item-actions">
																			<div className="actions-primary"></div>
																			<div
																				data-role="add-to-links"
																				className="actions-secondary"
																			></div>
																			<button className="Add-to-Cart-new">
																				Add to Cart
																			</button>
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
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"1","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
														</li>
													</div>
													<div
														className="owl-item active style-TgWkF"
														id="style-TgWkF"
													>
														<li className="item product product-item ">
															<div
																className="product-item-info"
																data-container="product-grid"
															>
																<div className="image-product">
																	<a
																		href=""
																		className="product photo product-item-photo"
																		tabindex="-1"
																	>
																		<span
																			className="product-image-container product-image-container-8 style-lfkFz"
																			id="style-lfkFz"
																		>
																			<span
																				className="product-image-wrapper style-eeoN4"
																				id="style-eeoN4"
																			>
																				<img
																					className="product-image-photo"
																					src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-08_1.jpg"
																					data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-08_1.jpg"
																					loading="lazy"
																					width="300"
																					height="300"
																					alt="Apple iPhone Verizon Unlocked"
																				/>
																			</span>
																		</span>
																	</a>
																	<a
																		className="action quickview-handler sm_quickview_handler"
																		title="Quick View"
																		href=""
																	>
																		<AiOutlineEye />
																		<span>Quick View</span>
																	</a>
																</div>
																<div className="product details product-item-details">
																	<strong className="product name product-item-name">
																		<a className="product-item-link" href="">
																			Apple iPhone Verizon Unlocked
																		</a>
																	</strong>
																	<div
																		className="price-box price-final_price"
																		data-role="priceBox"
																		data-product-id="8"
																		data-price-box="product-id-8"
																	>
																		<span className="price-container price-final_price tax weee">
																			<span
																				id="product-price-8"
																				data-price-amount="520"
																				data-price-type="finalPrice"
																				className="price-wrapper "
																			>
																				<span className="price">$520.00</span>
																			</span>
																		</span>
																	</div>
																	<div className="product-item-inner">
																		<div className="product actions product-item-actions">
																			<div className="actions-primary"></div>
																			<div
																				data-role="add-to-links"
																				className="actions-secondary"
																			></div>
																			<button className="Add-to-Cart-new">
																				Add to Cart
																			</button>

																			<div
																				className="actions-secondary"
																				data-role="add-to-links"
																			>
																				<a
																					href="#"
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/wishlist\/index\/add\/","data":{"product":8,"uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"8","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
														</li>
													</div>
													<div
														className="owl-item active style-XfG6f"
														id="style-XfG6f"
													>
														<li className="item product product-item ">
															<div
																className="product-item-info"
																data-container="product-grid"
															>
																<div className="image-product">
																	<a
																		href=""
																		className="product photo product-item-photo"
																		tabindex="-1"
																	>
																		<span
																			className="product-image-container product-image-container-4 style-bJHjQ"
																			id="style-bJHjQ"
																		>
																			<span
																				className="product-image-wrapper style-7LQJV"
																				id="style-7LQJV"
																			>
																				<img
																					className="product-image-photo"
																					src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-04_3.jpg"
																					data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-04_3.jpg"
																					loading="lazy"
																					width="300"
																					height="300"
																					alt="Besiva Phone Case Compatible"
																				/>
																			</span>
																		</span>
																	</a>
																	<div className="product-labels">
																		<div className="product-label sale-label">
																			Sale
																		</div>
																	</div>
																	<a
																		className="action quickview-handler sm_quickview_handler"
																		title="Quick View"
																		href=""
																	>
																		<AiOutlineEye />
																		<span>Quick View</span>
																	</a>
																</div>
																<div className="product details product-item-details">
																	<strong className="product name product-item-name">
																		<a className="product-item-link" href="">
																			Besiva Phone Case Compatible
																		</a>
																	</strong>
																	<div
																		className="price-box price-final_price"
																		data-role="priceBox"
																		data-product-id="4"
																		data-price-box="product-id-4"
																	>
																		<span className="special-price">
																			<span className="price-container price-final_price tax weee">
																				<span className="price-label">
																					Special Price
																				</span>
																				<span
																					id="product-price-4"
																					data-price-amount="450"
																					data-price-type="finalPrice"
																					className="price-wrapper "
																				>
																					<span className="price">$450.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="old-price">
																			<span className="price-container price-final_price tax weee">
																				<span className="price-label">
																					Regular Price
																				</span>
																				<span
																					id="old-price-4"
																					data-price-amount="500"
																					data-price-type="oldPrice"
																					className="price-wrapper "
																				>
																					<span className="price">$500.00</span>
																				</span>
																			</span>
																		</span>
																	</div>
																	<div className="product-item-inner">
																		<div className="product actions product-item-actions">
																			<div className="actions-primary"></div>
																			<div
																				data-role="add-to-links"
																				className="actions-secondary"
																			></div>
																			<button className="Add-to-Cart-new">
																				Add to Cart
																			</button>

																			<div
																				className="actions-secondary"
																				data-role="add-to-links"
																			>
																				<a
																					href="#"
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/wishlist\/index\/add\/","data":{"product":4,"uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"4","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
														</li>
													</div>
													<div
														className="owl-item active style-8BeF9"
														id="style-8BeF9"
													>
														<li className="item product product-item ">
															<div
																className="product-item-info"
																data-container="product-grid"
															>
																<div className="image-product">
																	<a
																		href=""
																		className="product photo product-item-photo"
																		tabindex="-1"
																	>
																		<span
																			className="product-image-container product-image-container-10 style-lHCFN"
																			id="style-lHCFN"
																		>
																			<span
																				className="product-image-wrapper style-xzFWw"
																				id="style-xzFWw"
																			>
																				<img
																					className="product-image-photo"
																					src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-10.jpg"
																					data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/m/-/m-10.jpg"
																					loading="lazy"
																					width="300"
																					height="300"
																					alt="Cover Samsung Galaxy Note 9"
																				/>
																			</span>
																		</span>
																	</a>
																	<a
																		className="action quickview-handler sm_quickview_handler"
																		title="Quick View"
																		href=""
																	>
																		<AiOutlineEye />
																		<span>Quick View</span>
																	</a>
																</div>
																<div className="product details product-item-details">
																	<strong className="product name product-item-name">
																		<a className="product-item-link" href="">
																			Cover Samsung Galaxy Note 9
																		</a>
																	</strong>
																	<div
																		className="price-box price-final_price"
																		data-role="priceBox"
																		data-product-id="10"
																		data-price-box="product-id-10"
																	>
																		<span className="price-container price-final_price tax weee">
																			<span
																				id="product-price-10"
																				data-price-amount="650"
																				data-price-type="finalPrice"
																				className="price-wrapper "
																			>
																				<span className="price">$650.00</span>
																			</span>
																		</span>
																	</div>
																	<div className="product-item-inner">
																		<div className="product actions product-item-actions">
																			<div className="actions-primary"></div>
																			<button className="Add-to-Cart-new">
																				Add to Cart
																			</button>

																			<div
																				data-role="add-to-links"
																				className="actions-secondary"
																			></div>
																			<div
																				className="actions-secondary"
																				data-role="add-to-links"
																			>
																				<a
																					href="#"
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/wishlist\/index\/add\/","data":{"product":10,"uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
																					data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"10","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
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
														</li>
													</div>
												</div>
											</div>
											<div className="owl-nav">
												<div role="presentation" className="owl-prev disabled">
													<span aria-label="Previous">‹</span>
												</div>
												<div role="presentation" className="owl-next">
													<span aria-label="Next">›</span>
												</div>
											</div>
											<div className="owl-dots disabled"></div>
										</ol>
									</div>
								</div>
							</div>
							<div className="ltabs-items  ltabs-items-16">
								<div className="ltabs-items-inner">
									<div className="ltabs-loading"></div>
								</div>
							</div>
							<div className="ltabs-items  ltabs-items-17">
								<div className="ltabs-items-inner">
									<div className="ltabs-loading"></div>
								</div>
							</div>
							<div className="ltabs-items  ltabs-items-18">
								<div className="ltabs-items-inner">
									<div className="ltabs-loading"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Catog;
