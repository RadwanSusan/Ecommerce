import React from 'react';
import './bloges.css';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const Bloges = () => {
	const { dictionary } = useContext(LanguageContext);

	return (
		<>
			<div class='blog_title'>
				<h2>{dictionary.blog['Latest Blogs']}</h2>
			</div>
			<div class='block block-slider-post snipcss-Pb3fd'>
				<div class='block-content'>
					<div class='owl-carousel owl-theme owl-loaded owl-drag'>
						<div class='owl-stage-outer'>
							<div
								class='owl-stage style-MG8jI'
								id='style-MG8jI'
							>
								<div
									class='owl-item active style-3lVoL'
									id='style-3lVoL'
								>
									<div class='item'>
										<div class='image-post'>
											<a
												href=''
												title='Join millions of others'
											>
												<img
													class=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg'
													width='1'
													height='1'
													alt='Join millions of others'
												/>
											</a>
										</div>
										<div class='info-post'>
											<div class='post-date'>
												<span class='label'>Posted:</span>
												<span class='value'>June 17, 2019</span>
											</div>
											<div class='post-title'>
												<div class='post-item-link'>
													{dictionary.blog['title1']}
												</div>
											</div>
											<div class='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description1'
														]
													}
												</p>
											</div>
											<div class='post-read-more'>
												<a
													href=''
													title='Join millions of others'
												>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
								<div
									class='owl-item active style-7pgTY'
									id='style-7pgTY'
								>
									<div class='item'>
										<div class='image-post'>
											<a
												href=''
												title='Choose the perfect design'
											>
												<img
													class=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg'
													width='1'
													height='1'
													alt='Choose the perfect design'
												/>
											</a>
										</div>
										<div class='info-post'>
											<div class='post-date'>
												<span class='label'>Posted:</span>
												<span class='value'>June 17, 2019</span>
											</div>
											<div class='post-title'>
												<div class='post-item-link'>
													{dictionary.blog['title2']}
												</div>
											</div>
											<div class='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description2'
														]
													}
												</p>
											</div>
											<div class='post-read-more'>
												<a
													href=''
													title='Choose the perfect design'
												>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
								<div
									class='owl-item style-Tg8VU'
									id='style-Tg8VU'
								>
									<div class='item'>
										<div class='image-post'>
											<a
												href=''
												title='What are some good electronic'
											>
												<img
													class=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg'
													width='1'
													height='1'
													alt='What are some good electronic'
												/>
											</a>
										</div>
										<div class='info-post'>
											<div class='post-date'>
												<span class='label'>Posted:</span>
												<span class='value'>May 16, 2019</span>
											</div>
											<div class='post-title'>
												<div class='post-item-link'>
													{dictionary.blog['title3']}
												</div>
											</div>
											<div class='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description3'
														]
													}
												</p>
											</div>
											<div class='post-read-more'>
												<a
													href=''
													title='What are some good electronic'
												>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
								<div
									class='owl-item style-PoS2p'
									id='style-PoS2p'
								>
									<div class='item'>
										<div class='image-post'>
											<a
												href=''
												title='Standard Blog Post Examples'
											>
												<img
													class=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg'
													width='1'
													height='1'
													alt='Standard Blog Post Examples'
												/>
											</a>
										</div>
										<div class='info-post'>
											<div class='post-date'>
												<span class='label'>Posted:</span>
												<span class='value'>May 16, 2019</span>
											</div>
											<div class='post-title'>
												<div class='post-item-link'>
													{dictionary.blog['title4']}
												</div>
											</div>
											<div class='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description4'
														]
													}
												</p>
											</div>
											<div class='post-read-more'>
												<a
													href=''
													title='Standard Blog Post Examples'
												>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class='owl-nav'>
							<div
								role='presentation'
								class='owl-prev disabled'
							>
								<span aria-label='Previous'>‹</span>
							</div>
							<div
								role='presentation'
								class='owl-next'
							>
								<span aria-label='Next'>›</span>
							</div>
						</div>
						<div class='owl-dots disabled'></div>
					</div>
					<div class='loading-content'>
						<span class='hidden'>Loading...</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Bloges;
