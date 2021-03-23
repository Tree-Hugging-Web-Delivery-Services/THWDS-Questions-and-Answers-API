const mysql = require('mysql');
const helpers = require('./helpers.js');

const connection = mysql.createConnection({
  host: '3.138.183.244',
  user: 'root',
  password: '',
  database: 'QA'
});

connection.connect((err) => {
  console.log(err);
  console.log('Connected to the DB!!!!!!!')
});

// Select question & answer data for a product
const retrieveQAforProduct = (productId, callback) => {
  connection.query(`SELECT * FROM questions q LEFT OUTER JOIN answers a ON q.questionId = a.question_id LEFT OUTER JOIN photos p ON a.answerId = p.answer_id WHERE q.product_id = ${productId}`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// Insert new question for a product
const insertQuestion = (questionObj, callback) => {
  connection.query(`INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES (${questionObj.product_id}, "${questionObj.body}", "${questionObj.name}", "${questionObj.email}")`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// Insert new answer (and photos) for a question
const insertAnswer = (questionId, answerObj, callback) => {
  connection.query(`INSERT INTO answers (question_id, answer_body, answerer_name, answerer_email) VALUES (${questionId}, "${answerObj.body}", "${answerObj.name}", "${answerObj.email}")`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      if (!answerObj.photos || answerObj.photos.length === 0) {
        callback(null, results);
      } else {
        helpers.formatQuery(results.insertId, answerObj, (values) => {
          connection.query(`INSERT INTO photos (answer_id, url) VALUES ${values}`, (error, results, fields) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, results);
            }
          });
        });
      }
    }
  });
};

// Update question OR answer helpfullness
const updateHelpful = (params, callback) => {
  var table = params.path;
  var col = params.path.slice(0, params.path.length - 1) + '_helpful';
  var id = params.path.slice(0, params.path.length - 1) + 'Id';

  connection.query(`UPDATE ${table} SET ${col} = ${col} + 1 WHERE ${id} = ${params.id}`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// Update question OR answer reported
const updateReported = (params, callback) => {
  var table = params.path;
  var col = params.path.slice(0, params.path.length - 1) + '_reported';
  var id = params.path.slice(0, params.path.length - 1) + 'Id';

  connection.query(`UPDATE ${table} SET ${col} = 1 WHERE ${id} = ${params.id}`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  retrieveQAforProduct,
  insertQuestion,
  insertAnswer,
  updateHelpful,
  updateReported
};

/*
const retrieveQuestions = (productId, callback) => {
  connection.query(`SELECT * FROM questions WHERE questions.product_id = ${productId}`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};
*/
