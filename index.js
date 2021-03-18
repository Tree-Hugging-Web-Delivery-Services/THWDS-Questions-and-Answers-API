const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });

let qaSchema = mongoose.Schema({
  "product_id": { type: Number, index: true },
  [question_id]: {
    "id": Number,
    "question_body": String,
    "question_date": Date,
    "asker_name": String,
    "asker_email": String,
    "question_helpfulness": Number,
    "reported": Boolean,
    "answers": {
      [answer_id]: {
        "id": Number,
        "body": String,
        "date": Date,
        "answerer_name": String,
        "answerer_email": String,
        "helpfulness": Number,
        "photos": [String]
      }
    }
  }
});

let QA = mongoose.model('QA', qaSchema);

async function logChunks(readable) {
  for await (const chunk of readable) {
    chunks = chunk.split('\n');
    chunks.forEach(item => {
      item = item.split(',');
      QA.create({})
    })
  }
};

let insert = (filepath) => {
  let readable = fs.createReadStream(filepath, {encoding: 'utf8'});
  readable.on('open', () => {
    logChunks(readable);
  })
}

insert('./QA_data/exampleQuestions.csv');

