// All question and related answer data for a specific question on a single JSON object identified by product_id
mongoDBSchemaAlt = {
  "product_id": numString,
  `${question_id}` numString: {
    "id": number,
    "question_body": string,
    "question_date": timeStamp,
    "asker_name": string,
    "asker_email": string,
    "question_helpfulness": number,
    "reported": boolean,
    "answers": {
      `${answer_id}` numString: {
        "id": number,
        "body": string,
        "date": timeStamp,
        "answerer_name": string,
        "answerer_email": string,
        "helpfulness": number,
        "photos": [
          img/src string, ...more img/src strings
        ]
      },
      ...more answers
    }
  }
  ...more questions
}

// Alternatively, each question and related answer data is a JSON object, contains product_id reference
mongoDBSchema = {
  "product_id": numString,
  "question_id": number,
  "question_body": string,
  "question_date": timeStamp,
  "asker_name": string,
  "asker_email": string,
  "question_helpfulness": number,
  "reported": boolean,
  "answers": {
    `${answer_id}` numString: {
      "id": number,
      "body": string,
      "date": timeStamp,
      "answerer_name": string,
      "answerer_email": string,
      "helpfulness": number,
      "photos": [
        img/src string, ...more img/src string
      ]
    },
    ...more answers
  }
};
