import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App.jsx';
import { ServerDataContextProvider } from '../app/useDataApiHook';
import '@babel/polyfill';
import { DataFetcher } from '../app/dataFetcher.js';

const app = document.getElementById('app');

const fetchedData = window.__FETCHED_DATA__;

const dataFetcher = DataFetcher(fetchedData);

ReactDOM.hydrate(
  <ServerDataContextProvider value={{isServer: false, dataFetcher}}>
    <App />
  </ServerDataContextProvider>, app);
