const express = require('express');
const proxy = require('http-proxy-middleware');
const proxy2 = require('express-http-proxy');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
console.log(path.join(__dirname, 'public'))
app.use(morgan('dev'));
app.use('/:company', express.static(path.join(__dirname, '../public')));

app.use('/api/stockPricePoints/', proxy({target: 'http://ec2-54-193-68-253.us-west-1.compute.amazonaws.com:3002/'}));
app.use('/api/people-also-bought/', proxy({target: 'http://ec2-18-223-100-41.us-east-2.compute.amazonaws.com:3003/'}));
app.use('/api/sideBar', proxy({target: 'http://ec2-52-53-155-25.us-west-1.compute.amazonaws.com:3004/'}));
app.use('/api', proxy2('https://robinhackers-stockfluctuation.herokuapp.com/'));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});