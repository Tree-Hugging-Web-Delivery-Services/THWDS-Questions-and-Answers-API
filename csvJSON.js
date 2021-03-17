const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

readFilePromise('./Q&A_data/examplePhotos.csv', 'utf8')
  .then(data => {
    let photos = data;
    photos = photos.split('\n');
    let photoObjs = [];
    for (var i = 1; i < photos.length; i ++) {
      let photo = photos[i].split(',');
      let photoObj = {
        id: photo[0],
        answer_id: photo[1],
        photo_url: photo[2]
      };
      photoObjs.push(photoObj);
    }
    readFilePromise('./Q&A_data/exampleAnswers.csv', 'utf8')
      .then(data => {
        let answers = data;
        answers = answers.split('\n');
        let answerObjs = [];
        for (var i = 1; i < answers.length; i ++) {
          let answer = answers[i].split(',');
          let answerObj = {
            id: answer[0],
            question_id: answer[1],
            body: answer[2],
            date: answer[3],
            answerer_name: answer[4],
            answerer_email: answer[5],
            reported: answer[6],
            helpful: answer[8],
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
        readFilePromise('./Q&A_data/exampleQuestions.csv', 'utf8')
          .then(data => {
            console.log(data);
            let questions = data;
            questions = questions.split('\n');
            let questionObjs = [];
            for (var i = 1; i < questions.length; i ++) {
              let question = questions[i].split(',');
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
            });
            return questionObjs;
          })
          .then(questionObjs => {
            questionObjs = JSON.stringify(questionObjs);
            writeFilePromise('test.JSON', questionObjs)
          })
          .then(() => {
            console.log('hooray!!!!!');
          })
      })
  })
  .catch(err => {
    console.log(err);
  })
