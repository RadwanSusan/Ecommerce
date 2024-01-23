import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DarkModeContextProvider } from './context/darkModeContext';
import { LanguageProvider } from './components/LanguageContext';
ReactDOM.render(
	<Provider store={store}>
		<PersistGate
			loading={null}
			persistor={persistor}>
			<DarkModeContextProvider>
				<LanguageProvider>
					<App />
				</LanguageProvider>
			</DarkModeContextProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root'),
);
