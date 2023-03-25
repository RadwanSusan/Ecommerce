import React from "react";
import { useState } from "react";
import "./navbar-bottom.css";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const handleClick = () => {
		setIsActive((current) => !current);
	};
	return (
		<div className="header-bottom ontop-element snipcss-7ocdx">
			<div className="container">
				<div className="desktop-menu">
					<div className="vertical-block">
						<div className="vertical-menu">
							<div className="vertical-menu-block" onClick={handleClick}>
								<div className="block-title-menu">
									All Categories <RiArrowDropDownLine />
								</div>
								<div
									className="vertical-menu-content"
									style={{
										display: isActive ? "block" : "",
									}}
								>
									<nav
										className="sm_megamenu_wrapper_vertical_menu sambar"
										id="sm_megamenu_menu6416d6f8c6146"
										data-sam="9254467321679218424"
									>
										<div className="sambar-inner">
											<div className="more-w">
												<span className="more-view line">More Categories</span>
											</div>
											<div className="more-w">
												<span className="more-view line">More Categories</span>
											</div>
											<div className="more-w">
												<span className="more-view">More Categories</span>
											</div>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
					<div className="horizontal-block">
						<div className="horizontal-menu">
							<div className="horizontal-megamenu-block">
								<nav
									className="sm_megamenu_wrapper_horizontal_menu sambar"
									id="sm_megamenu_menu6416d6fa8700d"
									data-sam="2394106391679218426"
								>
									<div className="sambar-inner">
										<div className="mega-content">
											<ul
												className="horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black"
												data-jsapi="on"
											>
												<li className="home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop">
													<a
														className="sm_megamenu_head sm_megamenu_drop"
														href=""
													>
														<span className="sm_megamenu_icon sm_megamenu_nodesc">
															<span className="sm_megamenu_title">Home</span>
														</span>
													</a>
												</li>
												<span className="btn-submobile"></span>
												<li className="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
													<a
														className="sm_megamenu_head sm_megamenu_drop "
														href=""
														id="sm_megamenu_15"
													>
														<span className="icon_items">
															<img
																src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/sale.png"
																alt="icon items"
																width="1"
																height="1"
															/>
														</span>
														<span className="sm_megamenu_icon sm_megamenu_nodesc">
															<span className="sm_megamenu_title">Shop</span>
														</span>
													</a>
												</li>
												<li className="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
													<a
														className="sm_megamenu_head sm_megamenu_drop "
														href=""
														id="sm_megamenu_19"
													>
														<span className="sm_megamenu_icon sm_megamenu_nodesc">
															<span className="sm_megamenu_title">Blog</span>
														</span>
													</a>
												</li>
												<li className="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
													<a
														className="sm_megamenu_head sm_megamenu_drop "
														href=""
														id="sm_megamenu_17"
													>
														<span className="sm_megamenu_icon sm_megamenu_nodesc">
															<span className="sm_megamenu_title">
																About Us
															</span>
														</span>
													</a>
												</li>
												<li className="other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  ">
													<a
														className="sm_megamenu_head sm_megamenu_drop "
														href=""
														id="sm_megamenu_18"
													>
														<span className="sm_megamenu_icon sm_megamenu_nodesc">
															<span className="sm_megamenu_title">
																Contact Us
															</span>
														</span>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</nav>
							</div>
						</div>
						<div className="promotion-block">
							<a className="BlackFriday" href="#">
								Black Friday!
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
