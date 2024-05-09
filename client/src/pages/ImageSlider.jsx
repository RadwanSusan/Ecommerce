import React, { useState } from 'react';

export const ImageSlider = ({ allimages }) => {
	const [current, setCurrent] = useState(0);

	return (
		<section className='slider'>
			<button className='left-arrow'>Previous</button>
			<button className='right-arrow'>Next</button>
			{allimages.map((allimages, index) => {
				return (
					<div
						className={index === current ? 'slide active' : 'slide'}
						key={index}>
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
