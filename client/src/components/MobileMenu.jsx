import React from 'react';
import './mobileMenu.css';
import { Link } from 'react-router-dom';

const MobileMenuComp = () => {
	return (
		<div className='sidebar-nav-mobile snipcss-JRPk3'>
			<div
				className='tab-content-mobile'
				id='nav-tabContent'>
				<div
					className='tab-panel fade show active'
					id='menu-mobile'
					role='tabpanel'
					aria-labelledby='menu-mobile-tab'>
					<div className='nav-mobile-container sidebar-type'>
						<nav
							id='navigation-mobile'
							className='navigation-mobile'>
							<ul
								className='horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black'
								data-jsapi='on'>
								<li className='home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop'>
									<Link to={`/products/women`}>
										<span className='sm_megamenu_icon sm_megamenu_nodesc'>
											<span className='sm_megamenu_title'>
												Women
											</span>
										</span>
									</Link>
								</li>
								<li className='other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item'>
									<Link to={`/products/coat`}>
										<span className='icon_items'>
											<img
												src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png'
												alt='icon items'
												width='1'
												height='1'
											/>
										</span>
										<span className='sm_megamenu_icon sm_megamenu_nodesc'>
											<span className='sm_megamenu_title'>Coat</span>
										</span>
									</Link>
									<span className='btn-submobile'></span>
								</li>
								<li className='other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item'>
									<Link to={`/products/jeans`}>
										<span className='icon_items'>
											<img
												src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png'
												alt='icon items'
												width='1'
												height='1'
											/>
										</span>
										<span className='sm_megamenu_icon sm_megamenu_nodesc'>
											<span className='sm_megamenu_title'>
												Jeans
											</span>
										</span>
									</Link>
									<span className='btn-submobile'></span>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MobileMenuComp;
