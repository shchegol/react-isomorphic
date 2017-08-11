import {createServer} from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router'
import App from './App'

createServer((req, res) => {
    const context = {}

    const html = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}
        >
            <App/>
        </StaticRouter>
    );

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end()
    } else {
        res.write(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Hello React</title>
                    <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
                    </head>
                <body>
                    <div id="react-view">${componentHTML}</div>
                    <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
                </body>
            </html>
        `)
        res.end()
    }
}).listen(3000)


// import express  from 'express';
// import React    from 'react';
// import ReactDom from 'react-dom/server';
// import App      from 'components/HelloWorldPage/HelloWorldPage';
//
// const app = express();
//
// app.use((req, res) => {
//     const componentHTML = ReactDom.renderToString(<App />);
//
//     return res.end(renderHTML(componentHTML));
// });
//
// const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';
//
// function renderHTML(componentHTML) {
//     return `
//     <!DOCTYPE html>
//       <html>
//       <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Hello React</title>
//           <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
//       </head>
//       <body>
//         <div id="react-view">${componentHTML}</div>
//         <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
//       </body>
//     </html>
//   `;
// }
//
// const PORT = process.env.PORT || 3001;
//
// app.listen(PORT, () => {
//     console.log(`Server listening on: ${PORT}`);
// });


