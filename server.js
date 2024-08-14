const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use('/', express.static('public'));

app.all('/login', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5000' });
});

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000')
});
