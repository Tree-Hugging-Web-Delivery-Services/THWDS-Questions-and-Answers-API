--
-- ---

-- DROP TABLE IF EXISTS `products`;
--
-- CREATE TABLE `products` (
--   `id` INTEGER AUTO_INCREMENT
-- );

-- ---
-- Table 'questions'
--
-- ---
DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;
USE QA;

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  questionId INT AUTO_INCREMENT,
  product_id INT,
  question_body TEXT,
  question_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR(64),
  asker_email VARCHAR(64),
  question_reported INT NOT NULL DEFAULT 0,
  question_helpful INT NOT NULL DEFAULT 0,
  INDEX (product_id),
  PRIMARY KEY (questionId)
  );

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answerId INT AUTO_INCREMENT,
  question_id INT,
  answer_body TEXT,
  answer_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(64),
  answerer_email VARCHAR(64),
  answer_reported INT NOT NULL DEFAULT 0,
  answer_helpful INT NOT NULL DEFAULT 0,
  PRIMARY KEY (answerId),
  FOREIGN KEY (question_id) REFERENCES questions (questionId)
  );

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos(
  photoId INT AUTO_INCREMENT,
  answer_id INT,
  url VARCHAR(240),
  PRIMARY KEY (photoId),
  FOREIGN KEY (answer_id) REFERENCES answers (answerId)
  );

LOAD DATA INFILE '/var/lib/mysql/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
