import React from 'react';
import './mobileMenu.css';
import { Link } from 'react-router-dom';
const MobileMenuComp = () => {
	return (
		<div class='sidebar-nav-mobile snipcss-JRPk3'>
			<div
				class='tab-content-mobile'
				id='nav-tabContent'>
				<div
					class='tab-panel fade show active'
					id='menu-mobile'
					role='tabpanel'
					aria-labelledby='menu-mobile-tab'>
					<div class='nav-mobile-container sidebar-type'>
						<nav
							id='navigation-mobile'
							class='navigation-mobile'>
							<ul
								class='horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black'
								data-jsapi='on'>
								<li class='home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop'>
									<Link to={`/products/women`}>
										<span class='sm_megamenu_icon sm_megamenu_nodesc'>
											<span class='sm_megamenu_title'>Women</span>
										</span>
									</Link>
								</li>
								<li class='other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item'>
									<Link to={`/products/coat`}>
										<span class='icon_items'>
											<img
												src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png'
												alt='icon items'
												width='1'
												height='1'
											/>
										</span>
										<span class='sm_megamenu_icon sm_megamenu_nodesc'>
											<span class='sm_megamenu_title'>Coat</span>
										</span>
									</Link>
									<span class='btn-submobile'></span>
								</li>
								<li class='other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item'>
									<Link to={`/products/jeans`}>
										<span class='icon_items'>
											<img
												src='http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png'
												alt='icon items'
												width='1'
												height='1'
											/>
										</span>
										<span class='sm_megamenu_icon sm_megamenu_nodesc'>
											<span class='sm_megamenu_title'>Jeans</span>
										</span>
									</Link>
									<span class='btn-submobile'></span>
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
