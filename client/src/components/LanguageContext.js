import React, { useState } from 'react';

export const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState('en');

	const changeLanguage = (lang) => {
		setLanguage(lang);
	};

	return (
		<LanguageContext.Provider value={{ language, changeLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
