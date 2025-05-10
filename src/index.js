import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import fetchReducer from './Features/Fecthing';
import alertReducer from './Features/PopAlert';
import profileReducer from './Features/Profile';
import themeReducer from './Features/Theme';
import './index.scss';
import App from './v2/App';

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
		<App />
	</React.StrictMode>
);
