import React, { useState } from 'react';

export const ImageSlider = ({ allimages }) => {
	const [current, setCurrent] = useState(0);
	// const length = allimages.length;

	// const nextSlide = () => {
	// 	setCurrent(current === length - 1 ? 0 : current + 1);
	// };

	// const prevSlide = () => {
	// 	setCurrent(current === 0 ? length - 1 : current - 1);
	// };

	return (
		<section className='slider'>
			<button
				className='left-arrow'
				// onClick={prevSlide}
			>
				Previous
			</button>
			<button
				className='right-arrow'
				// onClick={nextSlide}
			>
				Next
			</button>
			{allimages.map((allimages, index) => {
				return (
					<div
						className={index === current ? 'slide active' : 'slide'}
						key={index}
					>
						{index === current && (
							<img
								src={allimages}
								alt='product allimages'
								className='allimages'
							/>
						)}
					</div>
				);
			})}
		</section>
	);
};
