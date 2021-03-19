// Transform database output to response object
const formatData = (queryData, callback) => {
  var questions = {};
  var answers = {};
  var photos = {};

  queryData.forEach(item => {
    if (!questions[item.questionId]) {
      questions[item.questionId] = {
        question_id: item.questionId,
        question_body: item.question_body,
        question_date: item.question_date,
        asker_name: item.asker_name,
        question_helpfulness: item.question_helpful,
        reported: item.question_reported ? true : false,
        answers: {}
      };
    }
    if (!answers[item.answerId]) {
      answers[item.answerId] = {
        question_id: item.question_id,
        id: item.answerId,
        body: item.answer_body,
        date: item.answer_date,
        answerer_name: item.answerer_name,
        helpfulness: item.answer_helpful,
        reported: item.answer_reported ? true : false,
        photos: []
      }
    }
    if (!photos[item.photoId]) {
      photos[item.photoId] = {
        answer_id: item.answer_id,
        url: item.url
      };
    }
  });

  for (var i in photos) {
    for (var j in answers) {
      if (photos[i].answer_id === answers[j].id) {
        answers[j].photos.push(photos[i].url);
      }
    }
  }

  for (var i in answers) {
    for (var j in questions) {
      if (answers[i].question_id === questions[j].question_id) {
        questions[j].answers[answers[i].id] = answers[i];
        delete questions[j].answers[answers[i].id].question_id;
      }
    }
  }

  var resObj = {
    product_id: queryData[0].product_id,
    results: []
  };
  for (var k in questions) {
    resObj.results.push(questions[k]);
  }
  callback(resObj);
};

module.exports = {
  formatData
};

/*
var testData = [
  {
      "questionId": 34,
      "product_id": 5,
      "question_body": "Can I wash it?",
      "question_date": "2017-01-04T07:00:00.000Z",
      "asker_name": "luaulover",
      "asker_email": "first.last@cbs.com",
      "question_reported": 1,
      "question_helpful": 1,
      "answerId": 10,
      "question_id": 34,
      "answer_body": "I've thrown it in the wash and it seems fine",
      "answer_date": "2017-01-04T07:00:00.000Z",
      "answerer_name": "skilover",
      "answerer_email": "first.last@cbs.com",
      "answer_reported": 0,
      "answer_helpful": 1,
      "photoId": 7,
      "answer_id": 10,
      "url": "https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80"
  },
  {
      "questionId": 34,
      "product_id": 5,
      "question_body": "Can I wash it?",
      "question_date": "2017-01-04T07:00:00.000Z",
      "asker_name": "luaulover",
      "asker_email": "first.last@cbs.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 10,
      "question_id": 34,
      "answer_body": "I've thrown it in the wash and it seems fine",
      "answer_date": "2017-01-04T07:00:00.000Z",
      "answerer_name": "skilover",
      "answerer_email": "first.last@cbs.com",
      "answer_reported": 0,
      "answer_helpful": 1,
      "photoId": 8,
      "answer_id": 10,
      "url": "https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  },
  {
      "questionId": 34,
      "product_id": 5,
      "question_body": "Can I wash it?",
      "question_date": "2017-01-04T07:00:00.000Z",
      "asker_name": "luaulover",
      "asker_email": "first.last@cbs.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 11,
      "question_id": 34,
      "answer_body": "It says not to",
      "answer_date": "2017-01-04T07:00:00.000Z",
      "answerer_name": "skilover",
      "answerer_email": "first.last@cbs.com",
      "answer_reported": 0,
      "answer_helpful": 2,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 34,
      "product_id": 5,
      "question_body": "Can I wash it?",
      "question_date": "2017-01-04T07:00:00.000Z",
      "asker_name": "luaulover",
      "asker_email": "first.last@cbs.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 12,
      "question_id": 34,
      "answer_body": "Yes",
      "answer_date": "2017-01-04T07:00:00.000Z",
      "answerer_name": "skilover",
      "answerer_email": "first.last@cbs.com",
      "answer_reported": 0,
      "answer_helpful": 3,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 34,
      "product_id": 5,
      "question_body": "Can I wash it?",
      "question_date": "2017-01-04T07:00:00.000Z",
      "asker_name": "luaulover",
      "asker_email": "first.last@cbs.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 43,
      "question_id": 34,
      "answer_body": "I wouldn't machine wash it",
      "answer_date": "2017-11-04T06:00:00.000Z",
      "answerer_name": "skilover",
      "answerer_email": "first.last@cbs.com",
      "answer_reported": 0,
      "answer_helpful": 5,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 34,
      "product_id": 5,
      "question_body": "Can I wash it?",
      "question_date": "2017-01-04T07:00:00.000Z",
      "asker_name": "luaulover",
      "asker_email": "first.last@cbs.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 55,
      "question_id": 34,
      "answer_body": "Only if you want to ruin it!",
      "answer_date": "2017-11-04T06:00:00.000Z",
      "answerer_name": "skilover",
      "answerer_email": "first.last@cbs.com",
      "answer_reported": 0,
      "answer_helpful": 5,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 35,
      "product_id": 5,
      "question_body": "Where is this product made?",
      "question_date": "2018-07-06T06:00:00.000Z",
      "asker_name": "bballfan",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 0,
      "answerId": 27,
      "question_id": 35,
      "answer_body": "Canada",
      "answer_date": "2018-08-06T06:00:00.000Z",
      "answerer_name": "footballfan",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 9,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 36,
      "product_id": 5,
      "question_body": "What fabric is the top made of?",
      "question_date": "2018-06-17T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 1,
      "question_id": 36,
      "answer_body": "Supposedly suede, but I think its synthetic",
      "answer_date": "2018-01-17T07:00:00.000Z",
      "answerer_name": "sillyguy",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 1,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 36,
      "product_id": 5,
      "question_body": "What fabric is the top made of?",
      "question_date": "2018-06-17T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 13,
      "question_id": 36,
      "answer_body": "Something pretty soft but I can't be sure",
      "answer_date": "2018-01-17T07:00:00.000Z",
      "answerer_name": "sillyguy",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 4,
      "photoId": 9,
      "answer_id": 13,
      "url": "https://images.unsplash.com/photo-1526880792616-4217886b9dc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
  },
  {
      "questionId": 36,
      "product_id": 5,
      "question_body": "What fabric is the top made of?",
      "question_date": "2018-06-17T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 13,
      "question_id": 36,
      "answer_body": "Something pretty soft but I can't be sure",
      "answer_date": "2018-01-17T07:00:00.000Z",
      "answerer_name": "sillyguy",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 4,
      "photoId": 10,
      "answer_id": 13,
      "url": "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
  },
  {
      "questionId": 36,
      "product_id": 5,
      "question_body": "What fabric is the top made of?",
      "question_date": "2018-06-17T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 15,
      "question_id": 36,
      "answer_body": "Its the best! Seriously magic fabric",
      "answer_date": "2018-01-17T07:00:00.000Z",
      "answerer_name": "sillyguy",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 6,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 36,
      "product_id": 5,
      "question_body": "What fabric is the top made of?",
      "question_date": "2018-06-17T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 1,
      "answerId": 28,
      "question_id": 36,
      "answer_body": "Suede",
      "answer_date": "2018-01-17T07:00:00.000Z",
      "answerer_name": "sillyguy",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 0,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 37,
      "product_id": 5,
      "question_body": "Why is this product cheaper here than other sites?",
      "question_date": "2018-10-18T06:00:00.000Z",
      "asker_name": "willsmith",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 4,
      "answerId": 68,
      "question_id": 37,
      "answer_body": "We are selling it here without any markup from the middleman!",
      "answer_date": "2018-08-18T06:00:00.000Z",
      "answerer_name": "Seller",
      "answerer_email": "null",
      "answer_reported": 0,
      "answer_helpful": 4,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 38,
      "product_id": 5,
      "question_body": "How long does it last?",
      "question_date": "2019-06-28T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 2,
      "answerId": 70,
      "question_id": 38,
      "answer_body": "Some of the seams started splitting the first time I wore it!",
      "answer_date": "2019-11-28T07:00:00.000Z",
      "answerer_name": "sillyguy",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 6,
      "photoId": null,
      "answer_id": null,
      "url": null
  },
  {
      "questionId": 38,
      "product_id": 5,
      "question_body": "How long does it last?",
      "question_date": "2019-06-28T06:00:00.000Z",
      "asker_name": "funnygirl",
      "asker_email": "first.last@gmail.com",
      "question_reported": 0,
      "question_helpful": 2,
      "answerId": 78,
      "question_id": 38,
      "answer_body": "9 lives",
      "answer_date": "2019-11-12T07:00:00.000Z",
      "answerer_name": "iluvdogz",
      "answerer_email": "first.last@gmail.com",
      "answer_reported": 0,
      "answer_helpful": 31,
      "photoId": 16,
      "answer_id": 78,
      "url": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  }
];
var result = formatData(testData);
console.log(result);
*/