import React, { useState, useEffect, useCallback } from 'react';
import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';

const ImageSlider = ({ viewArrCatog }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slides = (viewArrCatog?.variants || []).map((variant) => ({
		image: variant.img[0],
		alt: viewArrCatog.title,
	}));
	const goToNextSlide = useCallback(() => {
		setCurrentSlide((prevSlide) =>
			prevSlide >= slides.length - 1 ? 0 : prevSlide + 1,
		);
	}, [slides.length]);
	const goToPreviousSlide = useCallback(() => {
		setCurrentSlide((prevSlide) =>
			prevSlide <= 0 ? slides.length - 1 : prevSlide - 1,
		);
	}, [slides.length]);
	useEffect(() => {
		const interval = setInterval(goToNextSlide, 3000);
		return () => clearInterval(interval);
	}, [goToNextSlide]);
	return (
		<div className='sliderBlock'>
			<ul className='sliderBlock_items50'>
				{slides.map((slide, index) => (
					<li
						key={slide.image}
						className={`sliderBlock_items__itemPhoto2 ${
							index === currentSlide ? 'sliderBlock_items__showing2' : ''
						}`}>
						<img
							src={slide.image}
							loading='lazy'
							alt={slide.alt}
							style={{ width: '240px', height: '380px' }}
						/>
					</li>
				))}
			</ul>
			<div className='sliderBlock_controls'>
				<div className='sliderBlock_controls__navigatin'>
					<div className='sliderBlock_controls__wrapper'>
						<div
							className='sliderBlock_controls__arrow sliderBlock_controls__arrowForward2'
							onClick={goToNextSlide}>
							<BsFillArrowRightCircleFill className='sliderBlock_controls__arrowForward2' />
						</div>
						<div
							className='sliderBlock_controls__arrow sliderBlock_controls__arrowBackward2'
							onClick={goToPreviousSlide}>
							<BsFillArrowLeftCircleFill className='sliderBlock_controls__arrowBackward2' />
						</div>
					</div>
				</div>
				<ul className='sliderBlock_positionControls'>
					{slides.map((_, index) => (
						<li
							key={index}
							className={`sliderBlock_positionControls__paginatorItem2 ${
								index === currentSlide
									? 'sliderBlock_positionControls__active2'
									: ''
							}`}></li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default ImageSlider;
