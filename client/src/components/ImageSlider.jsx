import React, { useState, useEffect, useCallback } from 'react';
import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
const slides = [
	{
		image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true',
		alt: 'headphones',
	},
	{
		image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true',
		alt: 'headphones',
	},
	{
		image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true',
		alt: 'headphones',
	},
	{
		image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true',
		alt: 'headphones',
	},
	{
		image: 'https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true',
		alt: 'headphones',
	},
];
const ImageSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const goToNextSlide = useCallback(() => {
		setCurrentSlide((prevSlide) =>
			prevSlide === slides.length - 1 ? 0 : prevSlide + 1,
		);
	}, [slides.length]);
	const goToPreviousSlide = useCallback(() => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
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
							alt={slide.alt}
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
