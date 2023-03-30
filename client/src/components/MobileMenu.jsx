import React from "react";
import "./mobileMenu.css";

const MobileMenuComp = () => {
	return (
		<div class="sidebar-nav-mobile snipcss-JRPk3">
			<div class="tab-content-mobile" id="nav-tabContent">
				<div
					class="tab-panel fade show active"
					id="menu-mobile"
					role="tabpanel"
					aria-labelledby="menu-mobile-tab"
				>
					<div class="nav-mobile-container sidebar-type">
						<nav id="navigation-mobile" class="navigation-mobile">
							<ul
								class="horizontal-type sm-megamenu-hover sm_megamenu_menu sm_megamenu_menu_black"
								data-jsapi="on"
							>
								<li class="home-item other-toggle sm_megamenu_lv1 sm_megamenu_drop">
									<a
										class="sm_megamenu_head sm_megamenu_drop"
										href="http://magento2.magentech.com/themes/sm_venuse/pub/french/"
									>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Home</span>
										</span>
									</a>
								</li>
								<li class="other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item">
									<a
										class="sm_megamenu_head sm_megamenu_drop sm_megamenu_haschild"
										href="javascript:void(0)"
										id="sm_megamenu_16"
									>
										<span class="icon_items">
											<img
												src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png"
												alt="icon items"
												width="1"
												height="1"
											/>
										</span>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Features</span>
										</span>
									</a>
									<span class="btn-submobile"></span>
								</li>
								<li class="other-toggle sm_megamenu_lv1 sm_megamenu_drop parent parent-item">
									<a
										class="sm_megamenu_head sm_megamenu_drop sm_megamenu_haschild"
										href="javascript:void(0)"
										id="sm_megamenu_16"
									>
										<span class="icon_items">
											<img
												src="http://magento2.magentech.com/themes/sm_venuse/pub/media/wysiwyg/megamenu/icons/hot.png"
												alt="icon items"
												width="1"
												height="1"
											/>
										</span>
										<span class="sm_megamenu_icon sm_megamenu_nodesc">
											<span class="sm_megamenu_title">Features2</span>
										</span>
									</a>
									<span class="btn-submobile"></span>
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
