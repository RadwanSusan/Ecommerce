import React, { useState } from 'react';
import ar from '../components/ar.json';
import en from '../components/en.json';

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
	};

	return (
		<LanguageContext.Provider
			value={{ language, dictionary, changeLanguage }}
		>
			{children}
		</LanguageContext.Provider>
	);
};
