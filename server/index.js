//@Flow
"use strict";

const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const pino = require('pino')();
const config = require('./../config');
const Stock = require('./models/stock');


//=========== DB ================
const PORT = process.env.PORT || 3000;
mongoose.connect(config.dbUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  pino.info('connected');
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.use((function (req, res, next) {
//do some loging if necesary
//   pino.info('=>',req.body.name);
//   pino.info('=>',req.params.name);
  next();
}));

router.route('/stocks')
  .post(function (req, res) {
    const stock = new Stock();
    stock.name = req.body.name;

    stock.save(function (err) {
      if (err) res.send(err);

      res.json({message: 'stock saved'});
    });
  })

  .get(function (req, res) {
    Stock.find(function (err, stocks) {
      if (err) res.send(err);

      res.json(stocks);
    });
  });

router.route('/stocks/:stock_id')
  .get(function (req, res) {
    Stock.findOne({name: req.params.stock_id}, function (err, stock) {
      if (err) res.send(err);

      res.json(stock);
    });
  })

  .delete(function (req, res) {
    Stock.remove({name: req.params.stock_id}, function (err, stock) {
      if (err) res.send(err);

      res.json({message: 'Stock deleted'});
    })
  });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});