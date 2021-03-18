const fs = require('fs');
const util = require('util');
const stream = require('stream');
const events = require('events');

const writeFilePromise = util.promisify(fs.writeFile);

async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}

async function readableToString(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const finished = util.promisify(stream.finished); // (A)

async function writeIterableToFile(iterable, filePath) {
  const writable = fs.createWriteStream(filePath, {encoding: 'utf8'});
  for await (const chunk of iterable) {
    if (!writable.write(chunk)) { // (B)
      // Handle backpressure
      await once(writable, 'drain');
    }
  }
  writable.end(); // (C)
  // Wait until done. Throws if there are errors.
  await finished(writable);
}


async function csvToJson(readable) {
  for await (const chunk of readable) {
    let photo = chunk.split(',');
    let photoObj = {
      id: photo[0],
      answer_id: photo[1],
      photo_url: photo[2]
    };
  }
  return('success');
}

let photoStream = fs.createReadStream('./QA_data/examplePhotos.csv', {encoding: 'utf8'});
let photosJson = fs.createWriteStream('./QA_data/test5.JSON', {encoding: 'utf8'});
let answerStream = fs.createReadStream('./QA_data/exampleAnswers.csv', {encoding: 'utf8'});






photoStream.on('open', () => {
  console.log('streaming');
})

