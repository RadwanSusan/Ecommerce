import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { sliderItems, sliderItemsArabic } from '../data';
import { useContext, useEffect } from 'react';
import { mobile } from '../responsive';
import { LanguageContext } from '../components/LanguageContext';
import './slider.css';

const Container = styled.div`
	width: 100%;
	height: 90vh;
	display: flex;
	position: relative;
	overflow: hidden;
`;

const Arrow = styled.div`
	width: 50px;
	height: 50px;
	background-color: #f0cba4;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === 'left' && '10px'};
	right: ${(props) => props.direction === 'right' && '10px'};
	margin: auto;
	cursor: pointer;
	opacity: 0.4;
	z-index: 2;
`;

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	transition: all 2s ease;

	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
	height: 100%;
	flex: 1;
	${mobile({ display: 'none' })}
`;

const Image = styled.img`
	height: 80%;
	width: 100%;
	background-size: cover;
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 50px;
`;

const Title = styled.h1`
	font-size: 70px;
`;

const Desc = styled.p`
	margin: 50px 0px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`;

const Button = styled.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
	cursor: pointer;
`;

const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const { language } = useContext(LanguageContext); // Use the language from your
	const isArabic = language === 'ar';
	const currentSliderItems =
		language === 'ar' ? sliderItemsArabic : sliderItems; // Choose the slider items based on the current language
	useEffect(() => {
		const slideInterval = setInterval(() => {
			setSlideIndex(
				(prevIndex) => (prevIndex + 1) % currentSliderItems.length,
			);
		}, 5000); // Change the interval to 2 seconds

		return () => clearInterval(slideInterval);
	}, [currentSliderItems.length]);

	const handleClick = (direction) => {
		if (direction === 'left') {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};

	return (
		<Container>
			<Arrow
				direction='left'
				onClick={() => handleClick('left')}
			>
				<ArrowLeftOutlined style={{ fontSize: '2em' }} />
			</Arrow>
			<Wrapper slideIndex={slideIndex}>
				{currentSliderItems.map((item) => (
					<Slide
						bg={item.bg}
						key={item.id}
					>
						<ImgContainer className='slideImag'>
							<Image src={item.img} />
						</ImgContainer>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Button>{isArabic ? 'مشاهدة' : 'Watch Now'}</Button>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			<Arrow
				direction='right'
				onClick={() => handleClick('right')}
			>
				<ArrowRightOutlined style={{ fontSize: '2em' }} />
			</Arrow>
		</Container>
	);
};

export default Slider;
