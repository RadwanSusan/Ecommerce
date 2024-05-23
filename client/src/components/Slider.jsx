import styled from 'styled-components';
import { sliderItems, sliderItemsArabic } from '../data';
import { useContext } from 'react';
import { mobile } from '../responsive';
import { LanguageContext } from '../components/LanguageContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './slider.css';

const Container = styled.div`
	width: 100%;
	height: 90vh;
`;

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	width: 100%;
`;

const Slide = styled.div`
	display: flex;
	transition: opacity 0.5s ease-in-out;
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
	backgroundcolor: #1d1308;
	margin-top: 200px;
`;

const Title = styled.h1`
	font-size: 60px;
`;

const Desc = styled.p`
	margin: 50px 0px;
	font-size: 17px;
	font-weight: 500;
	letter-spacing: 3px;
`;

const Button = styled.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
`;

const CustomSlider = () => {
	const { language } = useContext(LanguageContext);
	const isArabic = language === 'ar';
	const currentSliderItems =
		language === 'ar' ? sliderItemsArabic : sliderItems;
	const settings = {
		infinite: true,
		speed: 500,
		slidesToScroll: 1,
		rtl: language === 'ar',
		autoplay: true,
		autoplaySpeed: 4000,
		arrows: false,
		pauseOnHover: false,
		pauseOnFocus: false,
		initialSlide: 0,
		slidesToShow: 1,
		pauseOnDotsHover: true,
		dots: true,
		dotsClass: 'slick-dots',
		cssEase: 'linear',
		draggable: true,
		edgeFriction: 0.15,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Container>
			<div>
				<Slider {...settings}>
					{currentSliderItems.map((item) => (
						<Slide
							bg={item.bg}
							key={item.id}>
							<Wrapper>
								<ImgContainer className='slideImag'>
									<Image src={item.img} />
								</ImgContainer>
								<InfoContainer>
									<Title>{item.title}</Title>
									<Desc>{item.desc}</Desc>
									<Button className='btn10'>
										{isArabic ? 'مشاهدة' : 'Watch Now'}
									</Button>
								</InfoContainer>
							</Wrapper>
						</Slide>
					))}
				</Slider>
			</div>
		</Container>
	);
};

export default CustomSlider;
