import React from 'react';
import { useState } from 'react';
import './headerMobile.css';
import { AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai';
import MobileMenuComp from './MobileMenu';
import ToggleComponent from './ToggleComponent';
import { Link } from 'react-router-dom';

const HeaderMobile = () => {
	return (
		<div className='mobile-top snipcss-OsEnD'>
			<div className='container'>
				<div className='mobile-header-content'>
					<div className='mobile-menu'>
						<ToggleComponent>
							<MobileMenuComp />
						</ToggleComponent>
					</div>
					<div className='mobile-logo'>
						<img
							src='https://emarche.net/wp-content/uploads/2017/02/Logo-resized.png'
							alt='Logo Mobile'
							width='157'
							height='35'
						/>
					</div>
					<div className='mobile-cart'>
						<div
							id='minicart-mobile'
							className='minicart-mobile'>
							<span className='hidden'>Cart Mobile</span>
							<div
								data-block='minicart'
								className='mobile-wrapper'>
								<Link
									to={'/cart'}
									className='mobile action showcart'
									data-bind="scope: 'minicart_content'">
									<AiOutlineShoppingCart />
								</Link>
								<div
									role='dialog'
									className='ui-dialog ui-corner-all ui-widget ui-widget-content ui-front mage-dropdown-dialog style-pwEon'
									aria-describedby='ui-id-1'
									id='style-pwEon'>
									<div
										className='block block-minicart ui-dialog-content ui-widget-content style-fjlot'
										data-role='dropdownDialog'
										id='ui-id-1'>
										<div
											id='minicart-content-wrapper'
											data-bind="scope: 'minicart_content'">
											<div className='block-title'>
												<strong>
													<span
														className='text'
														data-bind="i18n: 'My Cart'">
														My Cart
													</span>
													<span
														className='qty empty'
														title='Items in Cart'></span>
												</strong>
											</div>
											<div className='block-content'>
												<button
													type='button'
													id='btn-minicart-close'
													className='action close'
													data-action='close'
													title='Close'>
													<span data-bind="i18n: 'Close'">
														Close
													</span>
												</button>
												<strong
													className='subtitle empty'
													data-bind="i18n: 'You have no items in your shopping cart.'">
													You have no items in your shopping cart.
												</strong>
												<div
													id='minicart-widgets'
													className='minicart-widgets'></div>
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
