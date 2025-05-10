import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Features/Theme'
import alertReducer from './Features/PopAlert'
import profileReducer from './Features/Profile'
import fetchReducer from './Features/Fecthing'
import Login from './v2/pages/login/Login';
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
		{/* <Provider store={store}>
			<App />
		</Provider> */}
		<App />

	</React.StrictMode>
);
