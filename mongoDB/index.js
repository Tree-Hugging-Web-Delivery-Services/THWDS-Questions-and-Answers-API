const mongoose = require('mongoose');
const fs = require('fs');
const readline = require('readline');


mongoose.connect('mongodb://localhost/QA', { useNewUrlParser: true });


let QASchema = mongoose.Schema({
  "product_id": { type: Number, index: true },
  "questions": [{
    "question_id": Number,
    "question_body": String,
    "question_date": Date,
    "asker_name": String,
    "asker_email": String,
    "reported": Boolean,
    "question_helpfulness": Number,
    "answers": [{
      "id": { type: Number, index: true },
      "body": String,
      "date": Date,
      "answerer_name": String,
      "answerer_email": String,
      "reported": Boolean,
      "helpfulness": Number,
      "photos": [{
        "photo_id": { type: Number, index: true },
        "photo_url": String
      }]
    }]
  }]
});

let QA = mongoose.model('QA', QASchema);

let find = () => {
  QA.findOne({product_id: 1})
  .then(results => {
    console.log('RESULTS: ', results.questions[2].answers[2]);
  });
};
//find();

let createProducts = (filePath) => {
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  });

  lineReader.on('line', (line) => {
    if (line[0] === 'i') {
      return;
    }
    let values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let productId = values[1];
    QA.create({product_id: productId})
    .then(product => {
      console.log('new product');
    })
    .catch((err) => {
      console.log(err);
    })
  });
};
//createProducts('../QA_data/questions.csv');

let addQuestions = (filePath) => {
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  });

  lineReader.on('line', (line) => {
    if (line[0] === 'i') {
      return;
    }
    let values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let productId = values[1];
    let question = {
      question_id: values[0],
      question_body: values[2],
      question_date: values[3],
      asker_name: values[4],
      asker_email: values[5],
      reported: values[6],
      question_helpfulness: values[7],
      answers: []
    };
    QA.findOne({product_id: productId})
    .then(product => {
      product.questions.push(question);
      product.save((err) => {
        if (err) {
          console.log('save error: ', err);
        }
        console.log('success!');
      })
    })
    .catch((err) => {
      console.log(err);
    })
  });
};
//addQuestions('../QA_data/questions.csv');

let addAnswers = (filePath) => {
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  });

  lineReader.on('line', (line) => {
    if (line[0] === 'i') {
      return;
    }
    let values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let questionId = values[1];
    let answer = {
      id: values[0],
      body: values[2],
      date: values[3],
      answerer_name: values[4],
      answerer_email: values[5],
      reported: values[6],
      helpfulness: values[7],
      photos: []
    };
    QA.findOne({'questions.question_id': questionId})
    .then(product => {
      if (!product) {
        return;
      }
      product.questions.forEach(question => {
        if (question.question_id === Number(questionId)) {
          question.answers.push(answer);
          product.save((err) => {
            if (err) {
              console.log('save error: ', err);
            }
            console.log('successss!!!!');
          })
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
  });
};
addAnswers('../QA_data/answers.csv');

let addPhotos = (filePath) => {
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  });

  lineReader.on('line', (line) => {
    if (line[0] === 'i') {
      return;
    }
    let values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let answerId = values[1];
    let photo = {
      id: values[0],
      photo_url: values[2]
    };
    QA.findOne({'questions.answers.id': answerId})
    .then(product => {
      if (!product) {
        return;
      }
      product.questions.forEach(question => {
        question.answers.forEach(answer => {
          if (answer.id === Number(answerId)) {
            answer.photos.push(photo)
            console.log(answer);
            product.save((err) => {
              if (err) {
                console.log('save error: ', err);
              }
              console.log('success!!!!!!!!!');
            })
          }
        })
      });
    })
    .catch((err) => {
      console.log(err);
    })
  });
};
//addPhotos('../QA_data/examplePhotos.csv');

module.exports = QA;

/*
var lineReader = readline.createInterface({
  input: fs.createReadStream('../QA_data/exampleQuestions.csv')
});

lineReader.on('line', (line) => {
  console.log('Line: ', line);
});
*/