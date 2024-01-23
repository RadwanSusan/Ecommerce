import React from 'react';
import './welcom.css';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';
const Welcom = () => {
	const { dictionary, language } = useContext(LanguageContext);
	return (
		<div
			className='text-branner snipcss-gfhgY style-E5bOJ'
			id='style-E5bOJ'>
			<div className='hot-item'>
				{dictionary.Welcom['Welcome to Venus Store']}
			</div>
			<div className='text-offer'>
				{dictionary.Welcom['Wrap new offers']}
				<span className={`coupon-code ${language === 'ar' ? '' : 'ltr'}`}>
					{dictionary.Welcom['New Coupon code']}{' '}
					<strong>T0mly81x9z0334c1</strong>
				</span>
				<div className='explorer'>{dictionary.Welcom['Explorer Now']}</div>
			</div>
		</div>
	);
};
export default Welcom;
