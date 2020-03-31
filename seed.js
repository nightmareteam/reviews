/* eslint-disable camelcase */
const faker = require('faker');
const db = require('./db');
const reviews = [];
const languageArray = [
  'Arabic',
  'Bulgarian',
  'Bosnian',
  'Czech',
  'German',
  'Danish',
  'Greek',
  'English',
  'Spanish',
  'Estonian',
  'Persian',
  'Finnish',
  'French',
  'Hindi',
  'Croatian',
  'Hungarian',
  'Armenian',
  'Italian',
  'Japanese',
  'Georgian',
  'Korean',
  'Lithuanian',
  'Latvian',
  'Nepali',
  'Dutch',
  'Norwegian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Slovene',
  'Swedish',
  'Turkish',
  'Ukrainian',
  'Chinese',
];

const getRandomInteger = (max) => Math.floor(Math.random() * Math.floor(max));
const getRandomParagraph = () => {
  const random = getRandomInteger(1);
  const paragraph = [faker.lorem.paragraph, faker.lorem.paragraphs];
  return paragraph[random]();
};

for (let i = 0; i < 100; i++) {
  reviews.push({
    game_id: faker.random.number({
      'min': 1,
      'max': 10
    }),
    post_id: faker.random.number(),
    recommended: faker.random.boolean(),
    review_date: faker.date.past(),
    hours_played: faker.random.number(10000),
    content: faker.lorem.paragraph(),
    language: languageArray[getRandomInteger(languageArray.length - 1)],
    helpful_yes_count: faker.random.number(1000),
    helpful_no_count: faker.random.number(1000),
    helpful_funny_count: faker.random.number(1000),
    user_id: faker.random.number(),
    username: faker.internet.email().split('@')[0],
    user_avatar: faker.image.avatar(),
    product_count: faker.random.number(100),
    review_count: faker.random.number(100),
    steam_level: faker.random.number(100),
    registration_date: faker.date.past()
  });
}

const comments = [];
reviews.forEach(review => {
  comments.push({
    /* COMMENT FIELDS */
    post_id: review.post_id,
    comment_id: faker.random.number(), 
    comment_date: faker.date.past(),
    comment_content: faker.lorem.sentence(),

    /* USER FIELDS */
    user_id: faker.random.number(), 
    username: faker.internet.email().split('@')[0],
    user_avatar: faker.image.avatar(),

    /* STEAM INFO */
    steam_level: faker.random.number(500),
    acheivement_text: faker.lorem.words(),
    experience_points: faker.random.number(500)
  });
});

db.Review.sync({ force: true, logging: false })
  .then(() => {
    console.log('Review table dropped and synced');
    return;
  }) 
  .then(() => {
    return db.Review.bulkCreate(reviews);
  })
  .then(() => {
    console.log('Reviews have been inserted');
  })
  .then(() => {
    return db.Comment.sync({ force: true, logging: false });
  })
  .then(() => {
    console.log('Comment table dropped and synced');
    return db.Comment.bulkCreate(comments);
  })
  .then(() => {
    console.log('Comments have been inserted');
  })
  .catch(e => console.error(e));

// db.Comment.sync({ force: true, logging: false }).then(() => {
//   console.log('Comment table dropped and synced');
//   db.Comment.bulkCreate(comments)
//     .then(() => {
//       console.log('Comments have been inserted');
//       return db.Comment.findAll();
//     })
//     .then(comments => {
//       console.log(comments);
//     });
// });

  