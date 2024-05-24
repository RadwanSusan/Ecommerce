import React, { useContext, useState } from 'react';
import './navbar-bottom.css';

import { Link } from 'react-router-dom';
import { LanguageContext } from '../components/LanguageContext';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa'; // Add FaBars import

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const { dictionary, language } = useContext(LanguageContext);

	const toggleMenu = () => setIsActive(!isActive);

	return (
		<div className='header-bottom ontop-element'>
			<div className='container'>
				<div className='desktop-menu'>
					<div className='vertical-block'>
						<div className='vertical-menu'>
							<div
								className='vertical-menu-block'
								onClick={toggleMenu}>
								<div className='block-title-menu'>
									{dictionary.navbar['All Categories']} <FaBars />
								</div>
								<div
									className='vertical-menu-content'
									style={{ display: isActive ? 'block' : 'none' }}>
									<nav className='sm_megamenu_wrapper_vertical_menu sambar'>
										<div className='sambar-inner'>
											<Link to='/products/women'>
												<div className='more-w'>
													<span className='more-view line'>
														{dictionary.navbar['Women']}
													</span>
												</div>
											</Link>
											<Link to='/products/coat'>
												<div className='more-w'>
													<span className='more-view line'>
														{dictionary.navbar['Coats']}
													</span>
												</div>
											</Link>
											<Link to='/products/jeans'>
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
												data-jsapi='on'>
												{[
													'Home',
													'Shop',
													'Blog',
													'About Us',
													'Contact Us',
												].map((item, index) => (
													<li
														key={item}
														className={`other-toggle sm_megamenu_lv1 sm_megamenu_drop ${
															index === 0 ? 'home-item' : ''
														}`}>
														<a
															className='sm_megamenu_head sm_megamenu_drop'
															href='#'>
															<span className='sm_megamenu_icon sm_megamenu_nodesc'>
																<span className='sm_megamenu_title'>
																	{dictionary.navbar[item]}
																</span>
															</span>
														</a>
													</li>
												))}
											</ul>
										</div>
									</div>
								</nav>
							</div>
						</div>
						<div className='promotion-block'>
							<Link to='/offer/new-offers'>
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
