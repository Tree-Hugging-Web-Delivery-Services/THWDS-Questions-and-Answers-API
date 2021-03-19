const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const helpers = require('./helpers.js');

const app = express();
app.use(express.json());


app.get('/qa/questions', (req, res) => {
  db.retrieveQAforProduct(req.query.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      helpers.formatData(data, (resObj) => {
        res.status(200).send(resObj);
      });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});