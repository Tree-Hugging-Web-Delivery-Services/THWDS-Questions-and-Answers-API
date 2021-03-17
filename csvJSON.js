const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

readFilePromise('./QA_data/examplePhotos.csv', 'utf8')
  .then(data => {
    let photos = data;
    photos = photos.split('\n');
    let photoObjs = [];
    for (var i = 1; i < photos.length - 1; i ++) {
      let photo = photos[i].split(',');
      let photoObj = {
        id: photo[0],
        answer_id: photo[1],
        photo_url: photo[2]
      };
      photoObjs.push(photoObj);
    }
    readFilePromise('./QA_data/exampleAnswers.csv', 'utf8')
      .then(data => {
        let answers = data;
        answers = answers.split('\n');
        let answerObjs = [];
        for (var i = 1; i < answers.length - 1; i ++) {
          let answer = answers[i].split(',');
          let answerObj = {
            id: answer[0],
            question_id: answer[1],
            body: answer[2],
            date: answer[3],
            answerer_name: answer[4],
            answerer_email: answer[5],
            reported: answer[6] ? answer[6] : null,
            helpful: answer[8] ? answer[8] : null,
            photos: []
          };
          answerObjs.push(answerObj);
        }
        answerObjs.forEach(answer => {
          photoObjs.forEach(photo => {
            if (photo.answer_id === answer.id) {
              answer.photos.push(photo.photo_url);
            }
          });
        });
        readFilePromise('./QA_data/exampleQuestions.csv', 'utf8')
          .then(data => {
            let questions = data;
            questions = questions.split('\n');
            let questionObjs = [];
            let productIds = {};
            for (var i = 1; i < questions.length - 1; i ++) {
              let question = questions[i].split(',');
              productIds[question[1]] = {
                product_id: question[1],
                questions: {}
              };
              let questionObj = {
                id: question[0],
                product_id: question[1],
                body: question[2],
                date: question[3],
                asker_name: question[4],
                asker_email: question[5],
                reported: question[6],
                helpful:question[7],
                answers: {}
              };
              questionObjs.push(questionObj);
            }
            questionObjs.forEach(question => {
              answerObjs.forEach(answer => {
                if (answer.question_id === question.id) {
                  question.answers[answer.id] = answer;
                }
              });
              productIds[question.product_id].questions[question.id] = question;
            });
            var insertData = [];
            for (var id in productIds) {
              insertData.push(productIds[id]);
            }
            return insertData;
          })
          .then(insertData => {
            insertData = JSON.stringify(insertData);
            insertData = insertData.split('}}}},').join('}}}}\n');
            insertData = insertData.slice(1, insertData.length - 1);
            writeFilePromise('./QA_data/test1.JSON', insertData)
          })
          .then(() => {
            console.log('success!!!!!');
          })
      })
  })
  .catch(err => {
    console.log(err);
  })
