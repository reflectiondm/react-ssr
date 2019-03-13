import path from 'path';
import { renderToString } from 'react-dom/server';
import express from 'express';
import React from 'react';
import App from '../app/App';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/*', (req, res) => {

  console.log('page is loaded');
  
  const reactApp = renderToString(<App />);

  res.end(htmlTemplate(reactApp));
});

function htmlTemplate( reactDom ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script src="./app.bundle.js"></script>
      </body>
      </html>
  `;
}

app.listen(3000, () => (console.log('server is listening on 3000')));
