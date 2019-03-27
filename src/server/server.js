import path from 'path';
import { renderToString } from 'react-dom/server';
import express from 'express';
import React from 'react';
import App from '../app/App';
import { ServerDataContextProvider } from '../app/useDataApiHook';
import { DataFetcher } from '../app/dataFetcher';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/favicon.ico', (_, res) => res.sendStatus(404));




app.get('/*', (req, res) => {
  console.log('page is being loaded');
  const dataFetcher = DataFetcher();

  renderToString(
    <ServerDataContextProvider value={{isServer: true, dataFetcher }}>
      <App />
    </ServerDataContextProvider>
  );

  dataFetcher.waitForData()
    .then(() => {
      console.log('page is loaded');
      console.log(JSON.stringify(dataFetcher.getIsDataReady()));
      const reactApp = renderToString(
        <ServerDataContextProvider value={{isServer: true, dataFetcher }}>
          <App />
        </ServerDataContextProvider>
      );
    
      res.end(htmlTemplate(reactApp, dataFetcher.fetchedData));
    });
});

function htmlTemplate( reactDom, fetchedData ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script>
            window.__FETCHED_DATA__ = ${JSON.stringify(fetchedData)}
          </script>
          <script src="./app.bundle.js"></script>
      </body>
      </html>
  `;
}

app.listen(3000, () => (console.log('server is listening on 3000')));
