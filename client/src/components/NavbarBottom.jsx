import React, { useContext } from 'react';
import { useState } from 'react';
import './navbar-bottom.css';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../components/LanguageContext';
const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const { dictionary } = useContext(LanguageContext);
	const { language } = useContext(LanguageContext);

	const handleClick = () => {
		setIsActive((current) => !current);
	};
	return (
		<div className='header-bottom ontop-element snipcss-7ocdx'>
			<div className='container'>
				<div className='desktop-menu'>
					<div className='vertical-block'>
						<div className='vertical-menu'>
							<div
								className='vertical-menu-block'
								onClick={handleClick}
							>
								<div className='block-title-menu'>
									{dictionary.navbar['All Categories']}{' '}
									<RiArrowDropDownLine />
								</div>
								<div
									className='vertical-menu-content'
									style={{
										display: isActive ? 'block' : '',
									}}
								>
									<nav className='sm_megamenu_wrapper_vertical_menu sambar'>
										<div className='sambar-inner'>
											<Link to={`/products/women`}>
												<div className='more-w'>
													<span className='more-view line'>
														{dictionary.navbar['Women']}
													</span>
												</div>
											</Link>
											<Link to={`/products/coat`}>
												<div className='more-w'>
													<span className='more-view line'>
														{dictionary.navbar['Coats']}
													</span>
												</div>
											</Link>
											<Link to={`/products/jeans`}>
												<div className='more-w'>
													<span className='more-view'>
														{dictionary.navbar['Jeans']}
													</span>
												</div>
											</Link>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
					<div className='horizontal-block'>
						<div className='horizontal-menu'>
							<div className='horizontal-megamenu-block'>
								<nav className='sm_megamenu_wrapper_horizontal_menu sambar'>
									<div className='sambar-inner'>
										<div className='mega-content'>
											<ul
												className={`horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black ${
													language === 'ar'
														? 'sm_megamenu_menuAr'
														: ''
												}`}
												data-jsapi='on'
											>
												<li className='home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop'>
													<a
														className='sm_megamenu_head sm_megamenu_drop'
														href=''
													>
														<span className='sm_megamenu_icon sm_megamenu_nodesc'>
															<span className='sm_megamenu_title'>
																{dictionary.navbar['Home']}
															</span>
														</span>
													</a>
												</li>
												<span className='btn-submobile'></span>
												<li className='other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  '>
													<a
														className='sm_megamenu_head sm_megamenu_drop '
														href=''
													>
														<span className='icon_items'>
															<img
																src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/sale.png'
																alt='icon items'
																width='1'
																height='1'
															/>
														</span>
														<span className='sm_megamenu_icon sm_megamenu_nodesc'>
															<span className='sm_megamenu_title'>
																{dictionary.navbar['Shop']}
															</span>
														</span>
													</a>
												</li>
												<li className='other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  '>
													<a
														className='sm_megamenu_head sm_megamenu_drop '
														href=''
													>
														<span className='sm_megamenu_icon sm_megamenu_nodesc'>
															<span className='sm_megamenu_title'>
																{dictionary.navbar['Blog']}
															</span>
														</span>
													</a>
												</li>
												<li className='other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  '>
													<a
														className='sm_megamenu_head sm_megamenu_drop '
														href=''
													>
														<span className='sm_megamenu_icon sm_megamenu_nodesc'>
															<span className='sm_megamenu_title'>
																{dictionary.navbar['About Us']}
															</span>
														</span>
													</a>
												</li>
												<li className='other-toggle  sm_megamenu_lv1 sm_megamenu_drop parent  '>
													<a
														className='sm_megamenu_head sm_megamenu_drop '
														href=''
													>
														<span className='sm_megamenu_icon sm_megamenu_nodesc'>
															<span className='sm_megamenu_title'>
																{
																	dictionary.navbar[
																		'Contact Us'
																	]
																}
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
						<div className='promotion-block'>
							<Link to={`/offer/new-offers`}>
								{dictionary.navbar['Black Friday!']}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
