const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const helpers = require('./helpers.js');

const app = express();
app.use(express.json());

// Get question & answer data for a product
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

// Post a new question for a product
app.post('/qa/questions', (req, res) => {
  db.insertQuestion(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

// Post a new answer (and photos) for a question
app.post('/qa/questions/:questionId/answers', (req, res) => {
  db.insertAnswer(req.params.questionId, req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

// Update question OR answer helpfulness
app.put('/qa/:path/:id/helpful', (req, res) => {
  db.updateHelpful(req.params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

// Update question OR answer reported
app.put('/qa/:path/:id/report', (req, res) => {
  db.updateReported(req.params, (err, data) => {
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

/*
app.get('/qa/questions/:productId', (req, res) => {
  db.retrieveQuestions(req.params.productId, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});
*/