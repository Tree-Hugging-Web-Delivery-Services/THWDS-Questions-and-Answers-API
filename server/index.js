const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const helpers = require('./helpers.js');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://18.217.19.253");
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Get question & answer data for a product
app.get('/qa/questions', (req, res) => {
  db.retrieveQAforProduct(req.query.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      helpers.formatData(data, (resObj) => {
        if (Object.keys(resObj).length === 0) {
          res.sendStatus(404);
        } else {
          res.status(200).send(resObj);
        }

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

const port = 3001;
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
