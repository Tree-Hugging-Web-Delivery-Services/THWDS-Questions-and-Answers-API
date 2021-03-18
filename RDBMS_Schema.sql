-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER AUTO_INCREMENT
);

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `question_id` INTEGER AUTO_INCREMENT,
  `product_id` INTEGER,
  `question_body` MEDIUMTEXT,
  `question_date` DATETIME,
  `asker_name` VARCHAR,
  `asker_email` VARCHAR,
  `question_helpfulness` INTEGER,
  `reported` VARCHAR(5),
  PRIMARY KEY (`question_id`)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id` INTEGER AUTO_INCREMENT,
  `question_id` INTEGER,
  `body` MEDIUMTEXT,
  `date` DATETIME,
  `answerer_name` VARCHAR,
  `answerer_email` VARCHAR,
  `helpfulness` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER AUTO_INCREMENT,
  `answer_id` INTEGER,
  `photo_url` VARCHAR,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `questions` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `answers` ADD FOREIGN KEY (question_id) REFERENCES `questions` (`question_id`);
ALTER TABLE `photos` ADD FOREIGN KEY (answer_id) REFERENCES `answers` (`id`);
