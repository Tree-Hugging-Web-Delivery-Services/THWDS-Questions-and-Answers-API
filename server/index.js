const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();
app.use(express.json());


app.get('/qa/questions', (req, res) => {
  console.log(req.query.product_id);
  db.retrieveQAforProduct(req.query.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});