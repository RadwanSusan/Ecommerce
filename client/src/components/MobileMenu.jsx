import React from "react";
import { useState } from "react";
import "./mobileSearch.css";
import { AiOutlineSearch } from "react-icons/ai";

const MobileMenu = () => {
	return (
		<div class="sidebar-nav-mobile snipcss-JRPk3">
			<nav>
				<div class="nav nav-tabs" id="nav-tab" role="tablist">
					<a
						class="nav-item nav-link active"
						id="menu-mobile-tab"
						data-toggle="tab"
						href="#menu-mobile"
						role="tab"
						aria-controls="menu-mobile"
						aria-selected="true"
					>
						Menu
					</a>
					<a
						class="nav-item nav-link"
						id="my-account-mobile-tab"
						data-toggle="tab"
						href="#account-mobile"
						role="tab"
						aria-controls="account-mobile"
						aria-selected="false"
					>
						Account
					</a>
					<a
						class="nav-item nav-link"
						id="setting-mobile-tab"
						data-toggle="tab"
						href="#setting-mobile"
						role="tab"
						aria-controls="setting-mobile"
						aria-selected="false"
					>
						Setting
					</a>
				</div>
			</nav>
			<div class="tab-content-mobile" id="nav-tabContent">
				<div
					class="tab-panel fade show active"
					id="menu-mobile"
					role="tabpanel"
					aria-labelledby="menu-mobile-tab"
				>
					<div class="nav-mobile-container sidebar-type">
						<nav id="navigation-mobile" class="navigation-mobile">
							<ul
								class="horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black"
								data-jsapi="on"
							>
								<li class="home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop">
									<a
										class="sm_megamenu_head sm_megamenu_drop"
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Home</span>
										</span>
									</a>
								</li>
								<li class="other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item">
									<a
										class="sm_megamenu_head sm_megamenu_drop sm_megamenu_haschild"
										href="javascript:void(0)"
										id="sm_megamenu_16"
									>
										<span class="icon_items">
											<img
												src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png"
												alt="icon items"
												width="1"
												height="1"
											/>
										</span>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Features</span>
										</span>
									</a>
									<div class="sm-megamenu-child sm_megamenu_dropdown_4columns ">
										<div
											data-link=""
											class="sm_megamenu_col_4 sm_megamenu_firstcolumn    "
										>
											<div
												data-link=""
												class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
											>
												<div class="sm_megamenu_head_item">
													<div class="sm_megamenu_title  ">
														<div class="sm_megamenu_content">
															<div class="mega-feature-content">
																<div class="row">
																	<div
																		class="col-lg-6 col-md-6 feature-column style-RC8eV"
																		id="style-RC8eV"
																	>
																		<h3 class="feature-title">Layouts</h3>
																		<ul>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default">
																					Home Layout 1
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/french">
																					Home Layout 2
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/belgium">
																					Boxed Layout
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/honduras">
																					Right to Left
																				</a>
																			</li>
																		</ul>
																	</div>
																	<div
																		class="col-lg-6 col-md-6 feature-column style-LrsHn"
																		id="style-LrsHn"
																	>
																		<h3 class="feature-title">
																			Listing Layouts
																		</h3>
																		<ul>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/categories-demo/without-sidebar.html">
																					Without Sidebar
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/categories-demo/left-sidebar.html">
																					Left Sidebar
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/categories-demo/right-sidebar.html">
																					Right Sidebar
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/categories-demo/left-right-sidebar.html">
																					Left - Right Sidebar
																				</a>
																			</li>
																		</ul>
																	</div>
																	<div class="col-lg-6 col-md-6 feature-column">
																		<h3 class="feature-title">
																			Detail Layouts
																		</h3>
																		<ul>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/lenovo-flex-15-6-inch-laptop.html">
																					Product Detail - Full
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/apple-iphone-6s-plus-a1687.html">
																					Product Detail - Left Sidebar
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/xiaomi-mi-9-128gb-6gb-ram.html">
																					Product Detail - Right Sidebar
																				</a>
																			</li>
																		</ul>
																	</div>
																	<div class="col-lg-6 col-md-6 feature-column">
																		<h3 class="feature-title">Tab Types</h3>
																		<ul>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/french/lenovo-flex-15-6-inch-laptop.html">
																					Vertical
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/default/xiaomi-mi-9-128gb-6gb-ram.html">
																					Horizontal
																				</a>
																			</li>
																			<li>
																				<a href="http://magento2.magentech.com/themes/sm_venuse/pub/german/xiaomi-mi-9-128gb-6gb-ram.html">
																					Accordion
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<span class="btn-submobile"></span>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/shop.html"
										id="sm_megamenu_15"
									>
										<span class="icon_items">
											<img
												src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/sale.png"
												alt="icon items"
												width="1"
												height="1"
											/>
										</span>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Shop</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/blog"
										id="sm_megamenu_19"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Blog</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/about-us.html"
										id="sm_megamenu_17"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">About Us</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/contact"
										id="sm_megamenu_18"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Contact Us</span>
										</span>
									</a>
								</li>
							</ul>
							<ul
								class="vertical-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black"
								data-jsapi="on"
							>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/smartphone-tablet.html"
										id="sm_megamenu_3"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">
												Smartphone &amp; Tablet
											</span>
										</span>
									</a>
								</li>
								<li class="other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item">
									<a
										class="sm_megamenu_head sm_megamenu_drop sm_megamenu_haschild"
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop.html"
										id="sm_megamenu_4"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Laptop</span>
										</span>
									</a>
									<div class="sm-megamenu-child sm_megamenu_dropdown_6columns ">
										<div
											data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
											class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
										>
											<div data-link="" class="sm_megamenu_col_2    ">
												<div class="sm_megamenu_head_item">
													<div class="sm_megamenu_title  ">
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Laptop Gaming
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming/msi-gs75-stealth.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				MSI GS75 Stealth
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming/razer-blade.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Razer Blade
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming/alienware-area-51m.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Alienware Area-51m
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming/acer-predator-triton-500.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Acer Predator Triton 500
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming/dell-g3-gaming-laptop.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Dell G3 Gaming Laptop
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-gaming/lenovo-legion-y7000.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Lenovo Legion Y7000
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Accessories for Laptop
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/keyboard.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Keyboard
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/mouse.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Mouse
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/software.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Software
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/vga-onboard.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				VGA Onboard
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/cleaner.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Cleaner
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/monitor.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Monitor
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/touch-pad.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Touch Pad
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/accessories-for-laptop/laptop-bags.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Laptop Bags
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div data-link="" class="sm_megamenu_col_2    ">
												<div class="sm_megamenu_head_item">
													<div class="sm_megamenu_title  ">
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Laptop Workstation
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation/aesthedes.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Aesthedes
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation/quantel-paintbox.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Quantel Paintbox
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation/lisp-machine.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Lisp Machine
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation/dell-precision.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Dell Precision
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation/thinkstation.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				ThinkStation
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-workstation/xerox-daybreak.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Xerox Daybreak
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Laptop Build Configuration
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration/ram.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Ram
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration/hdd.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				HDD
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration/vga.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				VGA
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration/monitor.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Monitor
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration/cpu.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				CPU
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/laptop/laptop-build-configuration/window-os.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Window OS
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div data-link="" class="sm_megamenu_col_2    ">
												<div class="sm_megamenu_head_item">
													<div class="sm_megamenu_title  ">
														<div class="sm_megamenu_content">
															<div class="product-megamenu hidden-block-title">
																<div class="block block-filterproducts">
																	<div class="block-title">
																		<strong>Hot Products</strong>
																	</div>
																	<div class="block-content">
																		<div
																			id="filterproducts_0"
																			class="grid products-grid"
																		>
																			<div class="products list items product-items filterproducts">
																				<div class="item product product-item">
																					<div
																						class="product-item-info"
																						data-container="product-grid"
																					>
																						<div class="image-product">
																							<a
																								href="http://magento2.magentech.com/themes/sm_venuse/pub/french/newest-premium-dell-15-6-fhd.html"
																								class="product photo product-item-photo"
																								tabindex="-1"
																							>
																								<span
																									class="product-image-container product-image-container-21 style-phxhh"
																									id="style-phxhh"
																								>
																									<span
																										class="product-image-wrapper style-G1nxb"
																										id="style-G1nxb"
																									>
																										<img
																											class="product-image-photo lazyload"
																											src="http://magento2.magentech.com/themes/sm_venuse/pub/media/lazyloading/blank.png"
																											data-src="http://magento2.magentech.com/themes/sm_venuse/pub/media/catalog/product/cache/dc42f9c8bdb17f8e403f23b47495efd2/l/-/l-13.jpg"
																											loading="lazy"
																											width="300"
																											height="300"
																											alt="Newest Premium Dell 15.6 FHD"
																										/>
																									</span>
																								</span>
																							</a>
																							<a
																								class="action quickview-handler sm_quickview_handler"
																								title="Quick View"
																								href="http://magento2.magentech.com/themes/sm_venuse/pub/french/cartquickpro/catalog_product/view/id/21"
																							>
																								<span>Quick View</span>
																							</a>
																						</div>
																						<div class="product details product-item-details">
																							<strong class="product name product-item-name">
																								<a
																									class="product-item-link"
																									href="http://magento2.magentech.com/themes/sm_venuse/pub/french/newest-premium-dell-15-6-fhd.html"
																								>
																									Newest Premium Dell 15.6 FHD
																								</a>
																							</strong>
																							<div class="product-reviews-summary short">
																								<div class="rating-summary">
																									<span class="label">
																										<span>Rating:</span>
																									</span>
																									<div
																										class="rating-result"
																										id="rating-result_21"
																										title="87%"
																									>
																										<span
																											id="style-sRWLU"
																											class="style-sRWLU"
																										>
																											<span>87%</span>
																										</span>
																									</div>
																								</div>
																								<div class="reviews-actions">
																									<a
																										class="action view"
																										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/newest-premium-dell-15-6-fhd.html#reviews"
																									>
																										1 &nbsp;
																										<span>Review</span>
																									</a>
																								</div>
																							</div>
																							<div
																								class="price-box price-final_price"
																								data-role="priceBox"
																								data-product-id="21"
																								data-price-box="product-id-21"
																							>
																								<span class="price-container price-final_price tax weee">
																									<span
																										id="product-price-21"
																										data-price-amount="690"
																										data-price-type="finalPrice"
																										class="price-wrapper "
																									>
																										<span class="price">
																											$690.00
																										</span>
																									</span>
																								</span>
																							</div>
																							<div class="product-item-actions">
																								<div class="actions-primary">
																									<button
																										class="action tocart primary"
																										data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/checkout\/cart\/add\/uenc\/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNoL2xhcHRvcC9sYXB0b3AtYnVpbGQtY29uZmlndXJhdGlvbi92Z2EuaHRtbA%2C%2C\/product\/21\/","data":{"product":"21","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNoL2xhcHRvcC9sYXB0b3AtYnVpbGQtY29uZmlndXJhdGlvbi92Z2EuaHRtbA,,"}}'
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
																										data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/wishlist\/index\/add\/","data":{"product":21,"uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNoL2xhcHRvcC9sYXB0b3AtYnVpbGQtY29uZmlndXJhdGlvbi92Z2EuaHRtbA,,"}}'
																										class="action towishlist"
																										data-action="add-to-wishlist"
																										title="Add to Wish List"
																									>
																										<span>
																											Add to Wish List
																										</span>
																									</a>
																									<a
																										href="#"
																										class="action tocompare"
																										data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/catalog\/product_compare\/add\/","data":{"product":"21","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNoL2xhcHRvcC9sYXB0b3AtYnVpbGQtY29uZmlndXJhdGlvbi92Z2EuaHRtbA,,"}}'
																										title="Add to Compare"
																									>
																										<span>Add to Compare</span>
																									</a>
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
													</div>
												</div>
											</div>
										</div>
									</div>
									<span class="btn-submobile"></span>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/computer.html"
										id="sm_megamenu_5"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Computer</span>
										</span>
									</a>
								</li>
								<li class="other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item">
									<a
										class="sm_megamenu_head sm_megamenu_drop sm_megamenu_haschild"
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics.html"
										id="sm_megamenu_6"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Electronics</span>
										</span>
									</a>
									<div class="sm-megamenu-child sm_megamenu_dropdown_3columns ">
										<div
											data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
											class="sm_megamenu_col_3 sm_megamenu_firstcolumn    "
										>
											<div data-link="" class="sm_megamenu_col_3    ">
												<div class="sm_megamenu_head_item">
													<div class="sm_megamenu_title  ">
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Refrigerators
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators/french-door.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				French Door
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators/bottom-freezer.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Bottom Freezer
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators/side-by-side.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Side-By-Side
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators/top-freezer.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Top Freezer
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators/wine-refrigerator.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Wine Refrigerator
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/refrigerators/compact-refrigerator.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Compact Refrigerator
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Air Conditioners
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/window-air-conditioners.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Window Air Conditioners
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/portable-air-conditioners.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Portable Air Conditioners
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/room-air-conditioners.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Room Air Conditioners
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/evaporative-coolers.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Evaporative Coolers
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/air-conditioner-accessories.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Air Conditioner Accessories
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/split-system-air-conditioners.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Split-System Air Conditioners
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/household-tower-fans.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Household Tower Fans
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/air-conditioners/door-air-conditioners.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Door Air Conditioners
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div
												data-link=""
												class="sm_megamenu_col_3 sm_megamenu_firstcolumn    "
											>
												<div class="sm_megamenu_head_item">
													<div class="sm_megamenu_title  ">
														<div
															data-link="http://magento2.magentech.com/themes/sm_venuse/pub/french"
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<a
																		class="sm_megamenu_nodrop "
																		href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine.html"
																	>
																		<span class="sm_megamenu_title_lv-3">
																			Washing Machine
																		</span>
																	</a>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine/clothes-washing-machines.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Clothes Washing Machines
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine/washers-dryers.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Washers &amp; Dryers
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine/specialty-laundry-machines.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Specialty Laundry Machines
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine/clothes-dryers.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Clothes Dryers
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine/stacked-washer-dryer-units.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Stacked Washer &amp; Dryer Units
																			</span>
																		</a>
																	</div>
																	<div class="sm_megamenu_title ">
																		<a
																			class="sm_megamenu_nodrop"
																			href="http://magento2.magentech.com/themes/sm_venuse/pub/french/electronics/washing-machine/washer-parts-accessories.html"
																		>
																			<span class="sm_megamenu_title_lv-3">
																				Washer Parts &amp; Accessories
																			</span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
														<div
															data-link=""
															class="sm_megamenu_col_6 sm_megamenu_firstcolumn    "
														>
															<div class="sm_megamenu_head_item">
																<div class="sm_megamenu_title  ">
																	<div class="sm_megamenu_content">
																		<div
																			class="banner-image style-fph71"
																			id="style-fph71"
																		>
																			<a href="#" title="Banner Image">
																				<img
																					src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/banner/item-1.jpg"
																					alt="Banner Image"
																				/>
																			</a>
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
									<span class="btn-submobile"></span>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/camera-photo.html"
										id="sm_megamenu_7"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Camera &amp; Photo</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/television-video.html"
										id="sm_megamenu_8"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">
												Television &amp; Video
											</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/accessories.html"
										id="sm_megamenu_9"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Accessories</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/game-accessories.html"
										id="sm_megamenu_10"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">
												Game &amp; Accessories
											</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/home-audio.html"
										id="sm_megamenu_11"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Home Audio</span>
										</span>
									</a>
								</li>
								<li class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/accessories-supplies.html"
										id="sm_megamenu_12"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">
												Accessories &amp; Supplies
											</span>
										</span>
									</a>
								</li>
								<li
									class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent   style-gx6vZ"
									id="style-gx6vZ"
								>
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/holiday-supplies-gifts.html"
										id="sm_megamenu_13"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">
												Holiday Supplies &amp; Gifts
											</span>
										</span>
									</a>
								</li>
								<li
									class="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent   style-tVyY7"
									id="style-tVyY7"
								>
									<a
										class="sm_megamenu_head sm_megamenu_drop "
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/apparel.html"
										id="sm_megamenu_14"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Apparel</span>
										</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div
					class="tab-panel fade"
					id="account-mobile"
					role="tabpanel"
					aria-labelledby="account-mobile-tab"
				>
					<div id="customer-mobile">
						<span class="hidden">Mobile Customer</span>
						<ul class="header links">
							<li class="link authorization-link" data-label="or">
								<a href="http://magento2.magentech.com/themes/sm_venuse/pub/french/customer/account/login/referer/aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNoLw%2C%2C/">
									Sign In
								</a>
							</li>
							<li>
								<a
									href="http://magento2.magentech.com/themes/sm_venuse/pub/french/customer/account/create/"
									id="idwnBYsUVr"
								>
									Create an Account
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div
					class="tab-panel fade"
					id="setting-mobile"
					role="tabpanel"
					aria-labelledby="setting-mobile-tab"
				>
					<div
						class="switcher language switcher-language"
						data-ui-id="language-switcher"
						id="switcher-language-nav"
					>
						<strong class="label switcher-label">
							<span>Language</span>
						</strong>
						<div class="switcher-content">
							<div class="action-switcher" id="switcher-language-trigger-nav">
								<div
									class="heading-switcher view-french style-qCxvc"
									id="style-qCxvc"
								>
									<span>French</span>
								</div>
							</div>
							<div class="dropdown-switcher">
								<ul class="list-item">
									<li class="view-default switcher-option">
										<a
											href="#"
											data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/stores\/store\/redirect\/","data":{"___store":"default","___from_store":"french","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZGVmYXVsdC8,"}}'
										>
											<span id="style-ZcKqL" class="style-ZcKqL">
												English
											</span>
										</a>
									</li>
									<li class="view-german switcher-option">
										<a
											href="#"
											data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/stores\/store\/redirect\/","data":{"___store":"german","___from_store":"french","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZ2VybWFuLw,,"}}'
										>
											<span id="style-hJ22p" class="style-hJ22p">
												German
											</span>
										</a>
									</li>
									<li class="view-belgium switcher-option">
										<a
											href="#"
											data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/stores\/store\/redirect\/","data":{"___store":"belgium","___from_store":"french","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvYmVsZ2l1bS8,"}}'
										>
											<span id="style-dJAef" class="style-dJAef">
												Belgium
											</span>
										</a>
									</li>
									<li class="view-honduras switcher-option">
										<a
											href="#"
											data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/stores\/store\/redirect\/","data":{"___store":"honduras","___from_store":"french","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvaG9uZHVyYXMv"}}'
										>
											<span id="style-wCPgq" class="style-wCPgq">
												Honduras
											</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div
						class="switcher currency switcher-currency"
						id="switcher-currency-nav"
					>
						<strong class="label switcher-label">
							<span>Currency</span>
						</strong>
						<div class="switcher-content">
							<div class="action-switcher" id="switcher-currency-trigger-nav">
								<div class="heading-switcher language-USD">
									<span>USD</span>
								</div>
							</div>
							<div class="dropdown-switcher">
								<ul class="list-item">
									<li class="currency-EUR switcher-option">
										<a
											href="#"
											data-post='{"action":"http:\/\/magento2.magentech.com\/themes\/sm_venuse\/pub\/french\/directory\/currency\/switch\/","data":{"currency":"EUR","uenc":"aHR0cDovL21hZ2VudG8yLm1hZ2VudGVjaC5jb20vdGhlbWVzL3NtX3ZlbnVzZS9wdWIvZnJlbmNo"}}'
										>
											EUR - Euro
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MobileMenu;
