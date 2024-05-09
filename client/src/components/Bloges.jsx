import React from 'react';
import './bloges.css';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

const Bloges = () => {
	const { dictionary, language } = useContext(LanguageContext);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (language === 'ar') {
			return date.toLocaleDateString('ar-SA', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		} else {
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		}
	};

	return (
		<>
			<div className='blog_title'>
				<h2>{dictionary.blog['Latest Blogs']}</h2>
			</div>
			<div className='block block-slider-post snipcss-Pb3fd'>
				<div className='block-content'>
					<div className='owl-carousel owl-theme owl-loaded owl-drag'>
						<div className='owl-stage-outer'>
							<div
								className='owl-stage style-MG8jI'
								id='style-MG8jI'>
								<div
									className='owl-item active style-3lVoL'
									id='style-3lVoL'>
									<div className='item'>
										<div className='image-post'>
											<a
												href=''
												title='Join millions of others'>
												<img
													className=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/8.jpg'
													width='1'
													height='1'
													alt='Join millions of others'
												/>
											</a>
										</div>
										<div className='info-post'>
											<div className='post-date'>
												<span className='label'>
													{dictionary.blog['Posted']}
												</span>
												<span className='value'>
													{formatDate('June 17, 2019')}
												</span>
											</div>
											<div className='post-title'>
												<div className='post-item-link'>
													{dictionary.blog['title1']}
												</div>
											</div>
											<div className='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description1'
														]
													}
												</p>
											</div>
											<div className='post-read-more'>
												<a
													href=''
													title='Join millions of others'>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
								<div
									className='owl-item active style-7pgTY'
									id='style-7pgTY'>
									<div className='item'>
										<div className='image-post'>
											<a
												href=''
												title='Choose the perfect design'>
												<img
													className=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/6.jpg'
													width='1'
													height='1'
													alt='Choose the perfect design'
												/>
											</a>
										</div>
										<div className='info-post'>
											<div className='post-date'>
												<span className='label'>
													{dictionary.blog['Posted']}
												</span>
												<span className='value'>
													{formatDate('June 17, 2019')}
												</span>
											</div>
											<div className='post-title'>
												<div className='post-item-link'>
													{dictionary.blog['title2']}
												</div>
											</div>
											<div className='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description2'
														]
													}
												</p>
											</div>
											<div className='post-read-more'>
												<a
													href=''
													title='Choose the perfect design'>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
								<div
									className='owl-item style-Tg8VU'
									id='style-Tg8VU'>
									<div className='item'>
										<div className='image-post'>
											<a
												href=''
												title='What are some good electronic'>
												<img
													className=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-22.jpg'
													width='1'
													height='1'
													alt='What are some good electronic'
												/>
											</a>
										</div>
										<div className='info-post'>
											<div className='post-date'>
												<span className='label'>
													{dictionary.blog['Posted']}
												</span>
												<span className='value'>
													{formatDate('May 16, 2019')}
												</span>
											</div>
											<div className='post-title'>
												<div className='post-item-link'>
													{dictionary.blog['title3']}
												</div>
											</div>
											<div className='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description3'
														]
													}
												</p>
											</div>
											<div className='post-read-more'>
												<a
													href=''
													title='What are some good electronic'>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
								<div
									className='owl-item style-PoS2p'
									id='style-PoS2p'>
									<div className='item'>
										<div className='image-post'>
											<a
												href=''
												title='Standard Blog Post Examples'>
												<img
													className=''
													src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg'
													data-src='http://magento2.magentech.com/themes/sm_venuse/pub/media/magefan_blog/blog-12.jpg'
													width='1'
													height='1'
													alt='Standard Blog Post Examples'
												/>
											</a>
										</div>
										<div className='info-post'>
											<div className='post-date'>
												<span className='label'>
													{dictionary.blog['Posted']}
												</span>
												<span className='value'>
													{formatDate('May 16, 2019')}
												</span>
											</div>
											<div className='post-title'>
												<div className='post-item-link'>
													{dictionary.blog['title4']}
												</div>
											</div>
											<div className='post-short-description'>
												<p>
													{
														dictionary.blog[
															'post-short-description4'
														]
													}
												</p>
											</div>
											<div className='post-read-more'>
												<a
													href=''
													title='Standard Blog Post Examples'>
													{dictionary.blog['Read more']}
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='owl-nav'>
							<div
								role='presentation'
								className='owl-prev disabled'>
								<span aria-label='Previous'>‹</span>
							</div>
							<div
								role='presentation'
								className='owl-next'>
								<span aria-label='Next'>›</span>
							</div>
						</div>
						<div className='owl-dots disabled'></div>
					</div>
					<div className='loading-content'>
						<span className='hidden'>Loading...</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Bloges;
