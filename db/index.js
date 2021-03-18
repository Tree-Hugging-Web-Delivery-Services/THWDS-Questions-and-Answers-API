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
  connection.query(`SELECT * FROM questions, answers, photos WHERE questions.product_id = ${productId} AND answers.question_id = questions.id AND photos.answer_id = answers.id`, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  retrieveQAforProduct
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