// Format photo url values for query statement
const formatQuery = (answerId, answerObj, callback) => {
  var values = ''
  answerObj.photos.forEach(photo => {
    values += `(${answerId}, "${photo}"), `;
  });
  values = values.slice(0, values.length - 2);
  values += ';';
  callback(values);
};

module.exports = {
  formatQuery
};

/*
var id = 12392947;
var obj = {
  "body": "test answer",
  "name": "test",
  "email": "test@test.com",
  "photos": ['url1', 'url2']
};
*/