import React from 'react';
import {
	AiOutlineHome,
	AiOutlinePhone,
	AiOutlineMail,
	AiOutlineTwitter,
	AiOutlineInstagram,
	AiOutlineCreditCard,
	AiOutlineLike,
} from 'react-icons/ai';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { FaFacebookF, FaPinterest, FaLinkedinIn } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { GiTicket, GiWorld } from 'react-icons/gi';

export const FooterNew = () => {
	const { language } = useContext(LanguageContext);
	const { dictionary } = useContext(LanguageContext);
	return (
		<div
			id='foodter_v1'
			className='footer footer-v1 snipcss-Ehoar tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center'>
			<div className='footer-top footer-top-1'>
				<div className='container'>
					<aside
						id='automatic-static-block-2'
						className='widget automatic_widget_staticblock'>
						<div className='automatic-widget automatic-static-block'>
							<div className='vc_row wpb_row vc_row-fluid'>
								<div className='wpb_column vc_column_container vc_col-sm-12'>
									<div className='vc_column-inner'>
										<div className='wpb_wrapper'>
											<div className='automatic-icon list au_fadeIn animated fadeIn'>
												<div className='text-center icon-size-md'>
													<div className='line-row'>
														<div className='border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 first'>
															<div className='icon'>
																<span className='icon'>
																	<GiTicket />
																</span>
															</div>
															<div className='box-content'>
																<h4 className='title-icon'>
																	{
																		dictionary.footer[
																			'GREAT VALUE'
																		]
																	}
																</h4>
																<div>
																	{dictionary.footer['desc1']}
																</div>
															</div>
														</div>
														<div className='border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 '>
															<div className='icon'>
																<span className='icon'>
																	<GiWorld />
																</span>
															</div>
															<div className='box-content'>
																<h4 className='title-icon'>
																	{
																		dictionary.footer[
																			'WORLDWIDE DELIVERY'
																		]
																	}
																</h4>
																<div>
																	{dictionary.footer['desc2']}
																</div>
															</div>
														</div>
														<div className='border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 '>
															<div className='icon'>
																<span className='icon'>
																	<AiOutlineCreditCard />
																</span>
															</div>
															<div className='box-content'>
																<h4 className='title-icon'>
																	{
																		dictionary.footer[
																			'SAFE PAMENT'
																		]
																	}
																</h4>
																<div>
																	{dictionary.footer['desc3']}
																</div>
															</div>
														</div>
														<div className='border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 '>
															<div className='icon'>
																<span className='icon'>
																	<AiOutlineLike />
																</span>
															</div>
															<div className='box-content'>
																<h4 className='title-icon'>
																	{
																		dictionary.footer[
																			'SHOP WITH CONFIDENCE'
																		]
																	}
																</h4>
																<div>
																	{dictionary.footer['desc4']}
																</div>
															</div>
														</div>
														<div className='border col-xs-15 col-sm-15 col-md-15 col-lg-15 col-xl-15 '>
															<div className='icon'>
																<span className='icon'>
																	<BiSupport />
																</span>
															</div>
															<div className='box-content'>
																<h4 className='title-icon'>
																	{
																		dictionary.footer[
																			'HELP CENTER'
																		]
																	}
																</h4>
																<div>
																	{dictionary.footer['desc5']}
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
					</aside>
				</div>
			</div>
			<div className='container'>
				<div className='footer-center padding-bottom-100'>
					<aside
						id='automatic-static-block-3'
						className='widget automatic_widget_staticblock'>
						<div className='automatic-widget automatic-static-block'>
							<div
								data-vc-full-width='true'
								data-vc-full-width-init='true'
								className='vc_row wpb_row vc_row-fluid home1-newletter background-default vc_custom_1489394616135 snipcss0-0-0-1 tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center style-4TY4e'
								id='style-4TY4e'>
								<div className='wpb_column vc_column_container vc_col-sm-7 snipcss0-1-1-2'>
									<div className='vc_column-inner snipcss0-2-2-3'>
										<div className='wpb_wrapper snipcss0-3-3-4'>
											<div className='wpb_widgetised_column wpb_content_element snipcss0-4-4-5'>
												<div className='wpb_wrapper snipcss0-5-5-6'>
													<aside
														id='mc4wp_form_widget-3'
														className='widget widget_mc4wp_form_widget snipcss0-6-6-7'>
														<form
															id='mc4wp-form-1'
															className='mc4wp-form mc4wp-form-200 snipcss0-7-7-8'
															method='post'
															data-id='200'
															data-name=''>
															<div className='mc4wp-form-fields snipcss0-8-8-9'>
																<p className='snipcss0-9-9-10'>
																	<label className='snipcss0-10-10-11'>
																		{
																			dictionary.footer[
																				'SUBSCRIPTION'
																			]
																		}
																	</label>
																	<input
																		type='email'
																		name='EMAIL'
																		placeholder={
																			dictionary.footer[
																				'Your email address'
																			]
																		}
																		required
																		className='snipcss0-10-10-12'
																	/>
																	<span className='submit-over snipcss0-10-10-13'>
																		<input
																			type='submit'
																			value={
																				dictionary.footer[
																					'Subscribe us'
																				]
																			}
																			className='snipcss0-11-13-14'
																		/>
																	</span>
																</p>
															</div>
															<label
																className='snipcss0-8-8-15 style-U78xg'
																id='style-U78xg'>
																{
																	dictionary.footer[
																		'Leave this field'
																	]
																}
																<input
																	type='text'
																	name='_mc4wp_honeypot'
																	value=''
																	tabindex='-1'
																	autocomplete='off'
																	className='snipcss0-9-15-16'
																/>
															</label>
															<input
																type='hidden'
																name='_mc4wp_timestamp'
																value='1679394145'
																className='snipcss0-8-8-17'
															/>
															<input
																type='hidden'
																name='_mc4wp_form_id'
																value='200'
																className='snipcss0-8-8-18'
															/>
															<input
																type='hidden'
																name='_mc4wp_form_element_id'
																value='mc4wp-form-1'
																className='snipcss0-8-8-19'
															/>
															<div className='mc4wp-response snipcss0-8-8-20'></div>
														</form>
													</aside>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='wpb_column vc_column_container vc_col-sm-5 snipcss0-1-1-21'>
									<div className='vc_column-inner vc_custom_1486623379385 snipcss0-2-21-22'>
										<div className='wpb_wrapper snipcss0-3-22-23'>
											<div className='wpb_text_column wpb_content_element snipcss0-4-23-24'>
												<div className='wpb_wrapper snipcss0-5-24-25'>
													<div className='call-us snipcss0-6-25-26'>
														{
															dictionary.footer[
																'GOT QUESTIONS? CALL US 24/7'
															]
														}
														<i className='automaticicon-phone snipcss0-7-26-27'></i>
														<span className='call-phone snipcss0-7-26-28'>
															(40) 1257 7058
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='vc_row-full-width vc_clearfix'></div>
						</div>
					</aside>
				</div>
				<div className='footer-logo'>
					<aside
						id='automatic-logo-2'
						className='widget automatic_widget_logo snipcss0-1-1-2'>
						<div className='footer-logo'>
							<a
								href=''
								className='snipcss0-3-3-4'>
								<img
									src='https://emarche.net/wp-content/uploads/2017/02/Logo-resized.png'
									alt='eMarche'
									className='snipcss0-4-4-5'
								/>
							</a>
							<span className='text snipcss0-3-3-6'>
								{dictionary.footer['everything you love, in one place']}
							</span>
						</div>
					</aside>
				</div>
				<div className='footer-top'>
					<div className='row snipcss0-0-0-1 tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center snipcss0-0-0-1Ar '>
						<div className='col-md-8 col-lg-8 col-sm-7 col-xs-12 middle-right snipcss0-1-1-2'>
							<div className='row snipcss0-2-2-3 snipcss0-2-2-3Ar'>
								<div className='col-md-6 col-lg-6 col-sm-12 col-xs-12 snipcss0-3-3-4 ipad'>
									<div className='row snipcss0-4-4-5 snipcss0-4-4-5Ar'>
										<div className='col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-5-6'>
											<aside
												id='text-2'
												className='widget widget_text snipcss0-6-6-7'>
												<h3 className='widget-title snipcss0-7-7-8'>
													{dictionary.footer['INFORMATION']}
												</h3>
												<div className='textwidget snipcss0-7-7-9'>
													<ul
														id='menu-infomation'
														className='menu snipcss0-8-9-10'>
														<li
															id='menu-item-2347'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2347 snipcss0-9-10-11'>
															<a
																href='https://emarche.net/#'
																className='snipcss0-10-11-12'>
																{
																	dictionary.footer[
																		'About store'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2348'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2348 snipcss0-9-10-13'>
															<a
																href='#'
																className='snipcss0-10-13-14'>
																{
																	dictionary.footer[
																		'New collections'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2349'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2349 snipcss0-9-10-15'>
															<a
																href='#'
																className='snipcss0-10-15-16'>
																{
																	dictionary.footer[
																		'Woman dress'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2350'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2350 snipcss0-9-10-17'>
															<a
																href='#'
																className='snipcss0-10-17-18'>
																{
																	dictionary.footer[
																		'Contact us'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2351'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2351 snipcss0-9-10-19'>
															<a
																href='#'
																className='snipcss0-10-19-20'>
																{
																	dictionary.footer[
																		'Latest news'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2352'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2352 snipcss0-9-10-21'>
															<a
																href='#'
																className='snipcss0-10-21-22'>
																{
																	dictionary.footer[
																		'Our sitemap'
																	]
																}
															</a>
														</li>
													</ul>
												</div>
											</aside>
										</div>
										<div className='col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-5-23'>
											<aside
												id='nav_menu-3'
												className='widget widget_nav_menu snipcss0-6-23-24'>
												<div className='menu-location-container snipcss0-7-24-25'>
													<ul
														id='menu-location'
														className='menu snipcss0-8-25-26'>
														<li
															id='menu-item-2375'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2375 snipcss0-9-26-27'>
															<a
																href='#'
																className='snipcss0-10-27-28'>
																{dictionary.footer['New York']}
															</a>
														</li>
														<li
															id='menu-item-2376'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2376 snipcss0-9-26-29'>
															<a
																href='#'
																className='snipcss0-10-29-30'>
																{dictionary.footer['London SF']}
															</a>
														</li>
														<li
															id='menu-item-2377'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2377 snipcss0-9-26-31'>
															<a
																href='#'
																className='snipcss0-10-31-32'>
																{
																	dictionary.footer[
																		'Cockfosters BP'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2378'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2378 snipcss0-9-26-33'>
															<a
																href='#'
																className='snipcss0-10-33-34'>
																{
																	dictionary.footer[
																		'Los Angeles'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2379'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2379 snipcss0-9-26-35'>
															<a
																href='#'
																className='snipcss0-10-35-36'>
																{dictionary.footer['Chicago']}
															</a>
														</li>
														<li
															id='menu-item-2380'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2380 snipcss0-9-26-37'>
															<a
																href='#'
																className='snipcss0-10-37-38'>
																{dictionary.footer['Las Vegas']}
															</a>
														</li>
													</ul>
												</div>
											</aside>
										</div>
									</div>
								</div>
								<div className='col-md-6 col-lg-6 col-sm-12 col-xs-12 snipcss0-3-3-39'>
									<div className='row snipcss0-4-39-40'>
										<div className='col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-40-41'>
											<aside
												id='nav_menu-4'
												className='widget widget_nav_menu snipcss0-6-41-42'>
												<div className='menu-useful-links-container snipcss0-7-42-43'>
													<ul
														id='menu-useful-links'
														className='menu snipcss0-8-43-44'>
														<li
															id='menu-item-2381'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2381 snipcss0-9-44-45'>
															<a
																href='#'
																className='snipcss0-10-45-46'>
																{
																	dictionary.footer[
																		'Privacy Policy'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2382'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2382 snipcss0-9-44-47'>
															<a
																href='#'
																className='snipcss0-10-47-48'>
																{dictionary.footer['Returns']}
															</a>
														</li>
														<li
															id='menu-item-2383'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2383 snipcss0-9-44-49'>
															<a
																href='#'
																className='snipcss0-10-49-50'>
																{
																	dictionary.footer[
																		'Terms & Conditions'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2384'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2384 snipcss0-9-44-51'>
															<a
																href='#'
																className='snipcss0-10-51-52'>
																{
																	dictionary.footer[
																		'Contact us'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2385'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2385 snipcss0-9-44-53'>
															<a
																href='#'
																className='snipcss0-10-53-54'>
																{
																	dictionary.footer[
																		'Latest news'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2386'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2386 snipcss0-9-44-55'>
															<a
																href='#'
																className='snipcss0-10-55-56'>
																{
																	dictionary.footer[
																		'Our sitemap'
																	]
																}
															</a>
														</li>
													</ul>
												</div>
											</aside>
										</div>
										<div className='col-md-6 col-lg-6 col-sm-6 col-xs-6 snipcss0-5-40-57'>
											<aside
												id='nav_menu-5'
												className='widget widget_nav_menu snipcss0-6-57-58'>
												<div className='menu-menu-container snipcss0-7-58-59'>
													<ul
														id='menu-menu'
														className='menu snipcss0-8-59-60'>
														<li
															id='menu-item-2387'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2387 snipcss0-9-60-61'>
															<a
																href='#'
																className='snipcss0-10-61-62'>
																{dictionary.footer['Instagram']}
															</a>
														</li>
														<li
															id='menu-item-2388'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2388 snipcss0-9-60-63'>
															<a
																href='#'
																className='snipcss0-10-63-64'>
																{dictionary.footer['Facebook']}
															</a>
														</li>
														<li
															id='menu-item-2389'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2389 snipcss0-9-60-65'>
															<a
																href='#'
																className='snipcss0-10-65-66'>
																{
																	dictionary.footer[
																		'Contact us'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2390'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2390 snipcss0-9-60-67'>
															<a
																href='#'
																className='snipcss0-10-67-68'>
																{
																	dictionary.footer[
																		'Latest news'
																	]
																}
															</a>
														</li>
														<li
															id='menu-item-2391'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2391 snipcss0-9-60-69'>
															<a
																href='#'
																className='snipcss0-10-69-70'>
																{dictionary.footer['Purchase']}
															</a>
														</li>
														<li
															id='menu-item-2392'
															className='menu-item menu-item-type-custom menu-item-object-custom menu-item-2392 snipcss0-9-60-71'>
															<a
																href='#'
																className='snipcss0-10-71-72'>
																F.A.Q
															</a>
														</li>
													</ul>
												</div>
											</aside>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-4 col-lg-4 col-sm-5 col-xs-12 middle-left snipcss0-1-1-73'>
							<aside
								id='automatic-contact-2'
								className='widget automatic_widget_contact snipcss0-2-73-74'>
								<h3 className='widget-title snipcss0-3-74-75'>
									{dictionary.footer['Contact us']}
								</h3>
								<div className='footer-info-v1 snipcss0-3-74-76'>
									<div className='links snipcss0-4-76-77'>
										<ul className='snipcss0-5-77-78'>
											<li className='snipcss0-6-78-79'>
												<em className='automaticicon-home snipcss0-7-79-80'>
													<AiOutlineHome />
												</em>
												<span className='text snipcss0-7-79-81'>
													{
														dictionary.footer[
															'Pasig City, Philippines'
														]
													}
												</span>
											</li>
											<li className='snipcss0-6-78-82'>
												<em className='automaticicon-phone snipcss0-7-82-83'>
													<AiOutlinePhone />
												</em>
												<a
													href='tel:+639668461690'
													className='snipcss0-7-82-84'>
													{dictionary.footer['Tel']}
													<span className='text snipcss0-8-84-85'>
														+639668461690
													</span>
												</a>
											</li>
											<li className='snipcss0-6-78-86'>
												<em className='automaticicon-mail snipcss0-7-86-87'>
													<AiOutlineMail />
												</em>
												<a
													href='mailto:support@emarche.net'
													className='snipcss0-7-86-88'>
													{dictionary.footer['Mail']}
													<span className='text snipcss0-8-88-89'>
														support@emarche.net
													</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</aside>
							<aside
								id='automatic-social-2'
								className='widget automatic_widget_social snipcss0-2-73-90'>
								<div className='social-login-options snipcss0-3-90-91 snipcss0-3-90-91Ar'>
									<div className='social snipcss0-4-91-92'>
										<a
											href='#'
											target='_blank'
											className='snipcss0-5-92-93'>
											<FaFacebookF />
										</a>
									</div>
									<div className='social snipcss0-4-91-95'>
										<a
											href='#'
											target='_blank'
											className='snipcss0-5-95-96'>
											<AiOutlineTwitter />
										</a>
									</div>
									<div className='social snipcss0-4-91-98'>
										<a
											href='#'
											target='_blank'
											className='snipcss0-5-98-99'>
											<FaPinterest />
										</a>
									</div>
									<div className='social snipcss0-4-91-101'>
										<a
											href='#'
											target='_blank'
											className='snipcss0-5-101-102'>
											<AiOutlineInstagram />
										</a>
									</div>
									<div className='social snipcss0-4-91-104'>
										<a
											href='#'
											target='_blank'
											className='snipcss0-5-104-105'>
											<FaLinkedinIn />
										</a>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</div>
			<div className='bottom-footer'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6 col-lg-6 col-sm-6 col-xs-12'>
							<div className='pull-left footercopyright'>
								{language === 'ar' ? (
									<>
										<a href='#'>PME</a>
										{
											dictionary.footer[
												'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY'
											]
										}
									</>
								) : (
									<>
										{
											dictionary.footer[
												'© 2022 eMARCHE. ALL RIGHTS RESERVED | POWERED BY'
											]
										}
										<a href='#'>PME</a>
									</>
								)}
							</div>
						</div>
						<div className='col-md-6 col-lg-6 col-sm-6 col-xs-12'>
							<div className='pull-right'>
								<img
									className='alignnone wp-image-368 size-medium'
									src='https://emarche.net/wp-content/uploads/2017/01/bank-2-300x26.png'
									alt=''
									width='300'
									height='26'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
