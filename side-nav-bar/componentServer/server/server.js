const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const sideBar = require('./router/sideBar');
const db = require('../db/db.js');
const logger = require('morgan');
const app = express();
const PORT = 3004;
app.use(parser.json());
app.use(logger("dev"));


app.use(express.static(path.join(__dirname, '../public')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:company', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

mongoose.connect('mongodb://rvlee:kanjani8@ds111113.mlab.com:11113/fecdata', {useNewUrlParser: true}, (err) => {
	console.log(err||"mongoDB connected!")
})


app.get('/api/sideBar', function(req, res) {
  db.find({}, function(err, results) {
  	if (err) {
  		return console.log(err)
  	} else {
  	res.json(results)
  }
  })
})


// app.get('/api/sideBar/:companyName', (req, res) => {
//   const company = req.params.companyName;
  // db.find({ companyName: company }, (err, company) => {
//     if (err) return console.log(err);
//     res.json(company);
//   })
// })

app.get('/api/sideBar/:company', (req, res) => {
  const company = req.params.company;
  console.log(company)
  db.find({ company }, null, (err, result) => {
    if (err) {
      return console.log('callback error');
    } else {
    console.log(result)
    return res.json(result);
    }
  })
})

app.use('/api/sideBar', sideBar)

app.listen(PORT, () => {
  console.log("Listening to port: ", PORT)
})