const mysql = require('mysql');

const connection = mysql.createConnection({
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
