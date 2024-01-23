import React from 'react';
import { useState } from 'react';
import './headerMobile.css';
import { AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai';
import MobileMenuComp from './MobileMenu';
import ToggleComponent from './ToggleComponent';
import { Link } from 'react-router-dom';
const HeaderMobile = () => {
	return (
		<div class='mobile-top snipcss-OsEnD'>
			<div class='container'>
				<div class='mobile-header-content'>
					<div class='mobile-menu'>
						<ToggleComponent>
							<MobileMenuComp />
						</ToggleComponent>
					</div>
					<div class='mobile-logo'>
						<img
							src='http://magento2.magentech.com/themes/sm_venuse/pub/media/logomobile/default/logo-mobile.png'
							width='157'
							height='35'
						/>
					</div>
					<div class='mobile-cart'>
						<div
							id='minicart-mobile'
							class='minicart-mobile'>
							<span class='hidden'>Cart Mobile</span>
							<div
								data-block='minicart'
								class='mobile-wrapper'>
								<Link
									to={'/cart'}
									class='mobile action showcart'
									data-bind="scope: 'minicart_content'">
									<AiOutlineShoppingCart />
								</Link>
								<div
									tabindex='-1'
									role='dialog'
									class='ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-pwEon'
									aria-describedby='ui-id-1'
									id='style-pwEon'>
									<div
										class='block block-minicart ui-dialog-content ui-widget-content style-fjlot'
										data-role='dropdownDialog'
										id='ui-id-1'>
										<div
											id='minicart-content-wrapper'
											data-bind="scope: 'minicart_content'">
											<div class='block-title'>
												<strong>
													<span
														class='text'
														data-bind="i18n: 'My Cart'">
														My Cart
													</span>
													<span
														class='qty empty'
														title='Items in Cart'></span>
												</strong>
											</div>
											<div class='block-content'>
												<button
													type='button'
													id='btn-minicart-close'
													class='action close'
													data-action='close'
													title='Close'>
													<span data-bind="i18n: 'Close'">
														Close
													</span>
												</button>
												<strong
													class='subtitle empty'
													data-bind="i18n: 'You have no items in your shopping cart.'">
													You have no items in your shopping cart.
												</strong>
												<div
													id='minicart-widgets'
													class='minicart-widgets'></div>
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
