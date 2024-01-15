import React, { useState } from 'react';
import ar from './ar.json';
import en from './en.json';
import dayjs from 'dayjs';
export const LanguageContext = React.createContext();
export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState('en');
	const dictionaries = {
		en,
		ar,
	};
	const dictionary = dictionaries[language];
	const changeLanguage = (lang) => {
		setLanguage(lang);
		dayjs.locale(lang);
		document.documentElement.lang = lang;
	};
	return (
		<LanguageContext.Provider
			value={{ language, dictionary, changeLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
