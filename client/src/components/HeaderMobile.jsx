import React from "react";
import { useState } from "react";
import "./headerMobile.css";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";

const HeaderMobile = () => {
	return (
		<div class="mobile-top snipcss-OsEnD">
			<div class="container">
				<div class="mobile-header-content">
					<div class="mobile-menu">
						<a id="btn-nav-mobile" href="javascript:void(0);">
							<AiOutlineMenu />
						</a>
					</div>
					<div class="mobile-logo">
						<a href="http://magento2.magentech.com/themes/sm_venuse/pub/french/">
							<img
								src="http://magento2.magentech.com/themes/sm_venuse/pub/media/logomobile/default/logo-mobile.png"
								width="157"
								height="35"
							/>
						</a>
					</div>
					<div class="mobile-cart">
						<div id="minicart-mobile" class="minicart-mobile">
							<span class="hidden">Cart Mobile</span>
							<div data-block="minicart" class="mobile-wrapper">
								<a
									class="mobile action showcart"
									href="http://magento2.magentech.com/themes/sm_venuse/pub/french/checkout/cart/"
									data-bind="scope: 'minicart_content'"
								>
									<AiOutlineShoppingCart />
									<span class="text">My Cart</span>
									<span
										class="counter qty empty"
										data-bind="css: { empty: !!getCartParam('summary_count') == false }, blockLoader: isLoading"
									>
										<span class="counter-number">0</span>
										<span class="counter-label"></span>
									</span>
									<span class="price-minicart">
										<div class="subtotal">
											<div class="amount price-container">
												<span class="price-wrapper">
													<span class="price">$0.00</span>
												</span>
											</div>
										</div>
									</span>
								</a>
								<div
									tabindex="-1"
									role="dialog"
									class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-pwEon"
									aria-describedby="ui-id-1"
									id="style-pwEon"
								>
									<div
										class="block block-minicart ui-dialog-content ui-widget-content style-fjlot"
										data-role="dropdownDialog"
										id="ui-id-1"
									>
										<div
											id="minicart-content-wrapper"
											data-bind="scope: 'minicart_content'"
										>
											<div class="block-title">
												<strong>
													<span class="text" data-bind="i18n: 'My Cart'">
														My Cart
													</span>
													<span
														class="qty empty"
														data-bind="css: { empty: !!getCartParam('summary_count') == false },
                                                         attr: { title: $t('Items in Cart') }, text: getCartParam('summary_count')"
														title="Items in Cart"
													></span>
												</strong>
											</div>
											<div class="block-content">
												<button
													type="button"
													id="btn-minicart-close"
													class="action close"
													data-action="close"
													title="Close"
												>
													<span data-bind="i18n: 'Close'">Close</span>
												</button>
												<strong
													class="subtitle empty"
													data-bind="i18n: 'You have no items in your shopping cart.'"
												>
													You have no items in your shopping cart.
												</strong>
												<div
													id="minicart-widgets"
													class="minicart-widgets"
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
	);
};
export default HeaderMobile;
