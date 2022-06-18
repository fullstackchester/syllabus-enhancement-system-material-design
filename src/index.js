import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Features/Theme'
import alertReducer from './Features/PopAlert'
import profileReducer from './Features/Profile'
import fetchReducer from './Features/Fecthing'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = configureStore({
	reducer: {
		theme: themeReducer,
		alert: alertReducer,
		profile: profileReducer,
		fetch: fetchReducer,
	}
})

root.render(

	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
