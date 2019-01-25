import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App.jsx';

const app = document.getElementById('app');
ReactDOM.hydrate(<App />, app);
