import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";
import LogoImg from "../Media/Img/SvgLogo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
	const quantity = useSelector(state=>state.cart.quantity)
	
	return (
		<div className="header-middle snipcss-LbbnX">
			<div className="container">
				<div className="middle-content">
					<div className="logo-container">
						<h1 className="logo-content">
							<strong>Venus - Powerful Responsive Magento 2 Theme</strong>
							<a
								className="logo"
								href=""
								title="Venus - Powerful Responsive Magento 2 Theme"
							>
								<img src={LogoImg} alt="ZAID" width="157" height="35" />
							</a>
						</h1>
					</div>
					<div className="right-container">
						<div className="right-content">
							<div
								id="sm_searchbox14558078331679218424"
								className="block block-search search-pro"
							>
								<div className="block block-content">
									<form
										className="form minisearch active"
										id="searchbox_mini_form"
										action=""
										method="get"
									>
										<div className="field search">
											<div className="control">
												<select className="cat searchbox-cat" name="cat">
													<option value="">All Categories</option>
													<option value="">- - Smartphone &amp; Tablet</option>
													<option value="">- - Accessories for iPhone</option>
													<option value="">- - Accessories for iPad</option>
												</select>

												<input
													id="searchbox"
													type="text"
													name="q"
													placeholder="Enter keywords to search..."
													className="input-text input-searchbox"
													maxlength="128"
													role="combobox"
													aria-haspopup="false"
													aria-expanded="true"
													aria-autocomplete="both"
													autocomplete="off"
												/>
												<div
													id="searchbox_autocomplete"
													className="search-autocomplete"
												></div>
											</div>
										</div>
										<div className="actions">
											<button
												type="submit"
												title="Search"
												className="btn-searchbox"
												disabled=""
											>
												<FaSearch />
												<span>Search</span>
											</button>
										</div>
									</form>
								</div>
							</div>
							<div className="minicart-header" data-move="minicart-mobile">
								<div data-block="minicart" className="minicart-wrapper">
									<Link  to="/cart" className="action showcart" href="#">
										<FaShoppingCart />
										<span className="text">My Cart</span>
										<span className="counter qty empty">
											<span className="counter-number">{quantity}</span>
											<span className="counter-label"></span>
										</span>
										<span className="price-minicart">
											<div className="subtotal">
												<div className="amount price-container">
													<span className="price-wrapper">
														<span className="price">$0.00</span>
													</span>
												</div>
											</div>
										</span>
									</Link>
									<div
										tabindex="-1"
										className="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-PDTJ9"
										id="style-PDTJ9"
									>
										<div className="block block-minicart ui-dialog-content ui-widget-content style-PjXZg">
											<div id="minicart-content-wrapper">
												<div className="block-title">
													<strong>
														<span className="text">My Cart</span>
														<span
															className="qty empty"
															title="Items in Cart"
														></span>
													</strong>
												</div>
												<div className="block-content">
													<button
														type="button"
														id="btn-minicart-close"
														className="action close"
														data-action="close"
														title="Close"
													>
														<span>Close</span>
													</button>
													<strong className="subtitle empty">
														{" "}
														You have no items in your shopping cart.{" "}
													</strong>
													<div
														id="minicart-widgets"
														className="minicart-widgets"
													></div>
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
	);
};

export default Navbar;
