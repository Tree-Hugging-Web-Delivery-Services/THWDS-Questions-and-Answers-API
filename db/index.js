var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QA'
});

connection.connect(() => {
  console.log('Connected to the DB!!!!!!!')
});

const retrieveQAforProduct = (productId, callback) => {
  connection.query(`SELECT * FROM questions q LEFT OUTER JOIN answers a ON q.questionId = a.question_id LEFT OUTER JOIN photos p ON a.answerId = p.answer_id WHERE q.product_id = ${productId}`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const retrieveQuestions = (productId, callback) => {
  connection.query(`SELECT * FROM questions WHERE questions.product_id = ${productId}`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  retrieveQAforProduct,
  retrieveQuestions
};

/*
connection.query('SELECT * FROM questions, answers, photos WHERE questions.product_id = 1 AND answers.question_id = questions.id AND photos.answer_id = answers.id', function (error, results, fields) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
  }
});
*/