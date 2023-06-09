import '@babel/polyfill';
import 'url-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider, useSelector} from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
reportWebVitals();
