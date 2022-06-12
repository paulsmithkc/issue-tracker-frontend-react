import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// check if browser supports service workers
if (navigator.serviceWorker) {
  // wait for the page to load
  window.addEventListener('load', () => {
    if (process.env.NODE_ENV === 'production') {
      // register service worker in prod environment
      navigator.serviceWorker.register(
        `${process.env.PUBLIC_URL}/service-worker.js`
      );
    } else {
      // unregister service worker in dev environment
      navigator.serviceWorker.ready
        .then((registration) => registration.unregister())
        .catch((error) => console.error(error.message));
    }
  });
}