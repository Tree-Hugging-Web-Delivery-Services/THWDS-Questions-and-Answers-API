const QA = require('./index.js');

const getQAforProduct = (productId, callback) => {
  QA.findOne({product_id: productId})
  .then(product => {
    callback(product);
  })
  .catch(error => {
    callback(error);
  })
};

module.exports = {
  getQAforProduct
}
/*
exports.addQuestion = (questionObj, callback) => {
  let question = {
    question_body: questionObj.body,
    asker_name: questionObj.name,
    asker_email: questionObj.email,
    reported: 0,
    question_helpfulness: 0,
    answers: []
  };
  QA.findOne({product_id: questionObj.product_id})
  .then(product => {

  })
  .catch(error => {
    console.log(error);
  })
}
*/