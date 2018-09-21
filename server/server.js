const express = require('express');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
console.log(path.join(__dirname, 'public'))
app.use(morgan('dev'));
app.use('/:company', express.static(path.join(__dirname, '../public')));

app.use('/api/graph/', proxy({target: 'http://localhost:3001'}));
app.use('/api/stockPricePoints/', proxy({target: 'http://localhost:3002'}));
app.use('/api/people-also-bought/', proxy({target: 'http://localhost:3003'}));
app.use('/api/sideBar', proxy({target: 'http://localhost:3004'}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});