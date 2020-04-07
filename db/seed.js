
const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

// TO DO: Refactor to reduce redundant code
// TO DO: Make it such that users cannot review the same game twice
// TO DO: Make it such that reviews_count is non-random and instead based upon number of generated reviews
// TO DO: Make it such that comments can be written for more than just initial 10,000,000 reviews

/***************************HELPER FUNCTIONS***************************/

const writeTenMillionGames = (writer, encoding, callback) => {
// write 10 million games
    let game_id = 0;
    function write() {
        let gameOk = true;
        do {
            game_id += 1;
            const data = `${game_id}\n`;
            if (game_id === 10000000) {
                writer.write(data, encoding, callback);
            } else {
                gameOk = writer.write(data, encoding);
            }
        } while (game_id < 10000000 && gameOk);
        if (game_id < 10000000) {  
            writer.once('drain', write);
        }
    }
    write();
}

const writeManyReviews = (writer, encoding, callback) => {
// write 100 million reviews assigned randomly to 10 million games with games with lower ids more likely to have more reviews
    let post_id = 0;
    const languages = ['Arabic', 'Armenian', 'Bosnian', 'Bulgarian', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Finnish', 'French', 
        'Georgian', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'Japanese', 'Korean', 'Latvian', 'Lithuanian', 'Nepali', 'Norwegian', 
        'Persian', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Slovene', 'Spanish', 'Swedish', 'Turkush', 'Ukranian'];
    function write() {
        let reviewsOk = true;
        do {
            post_id += 1;
            const data = `${post_id},${faker.random.boolean()},${faker.date.recent(90)},${Math.floor(Math.random() * Math.floor(10000))},${faker.lorem.paragraph()},${languages[Math.floor(Math.random() * Math.floor(languages.length - 1))]},${Math.floor(Math.pow(Math.random(), 3) * Math.floor(300))},${Math.floor(Math.pow(Math.random(), 3) * Math.floor(100))},${Math.random() * Math.floor(10000000)},${Math.floor(Math.pow(Math.random(), 5) * Math.floor(10000000))}\n`;
            if (post_id === 10000000) {
                writer.write(data, encoding, callback);
            } else {
                reviewsOk = writer.write(data, encoding);
            }
        } while (post_id < 10000000 && reviewsOk);
        if (post_id < 10000000) {  
            writer.once('drain', write);
        }
    }
    write();
}

const writeManyComments = (writer, encoding, callback) => {
    // write 300 million comments with reviews with lower ids more likely to have reviews
        let comment_id = 0;
        function write() {
            let commentsOk = true;
            do {
                comment_id += 1;
                const data = `${comment_id},${faker.date.recent(90)},${faker.lorem.paragraph()},${Math.floor(Math.random(5) * Math.floor(100000000))},${Math.floor(Math.random() * Math.floor(80000000))}\n`;
                if (comment_id === 300000000) {
                    writer.write(data, encoding, callback);
                } else {
                    commentsOk = writer.write(data, encoding);
                }
            } while (comment_id < 300000000 && commentsOk);
            if (comment_id < 300000000) {  
                writer.once('drain', write);
            }
        }
        write();
    }

const writeManyUsers = (writer, encoding, callback) => {
// write 80k users
    let user_id = 0;
    function write() {
        let userOk = true;
        do {
            user_id += 1;
            const data = `${user_id},${faker.internet.userName()},${faker.internet.avatar()},${Math.floor(Math.random() * Math.floor(200))},${Math.floor(Math.pow(Math.random(), 4) * Math.floor(200))}\n`;
            if (user_id === 80000) {
                writer.write(data, encoding, callback);
            } else {
                userOk = writer.write(data, encoding);
            }
        } while (user_id < 80000 && userOk);
        if (user_id < 80000) {  
            writer.once('drain', write);
        }
    }
    write();
}

/*************************CREATE CSV STREAMS*************************/
// const writeGames = fs.createWriteStream('./db/games.csv');
// const writeUsers = fs.createWriteStream('./db/users.csv');
// const writeReviews = fs.createWriteStream('./db/reviews.csv');
const writeComments = fs.createWriteStream('./db/comments.csv');

/**********************INITIALIZE TABLE HEADERS**********************/
// writeGames.write('game_id\n', 'utf8');
// writeUsers.write('user_id,username,user_avatar,product_count,review_count\n', 'utf8');
// writeReviews.write('post_id,recommended,review_date,hours_played,content,language,helpful_yes_count,helpful_funny_count,user_id,game_id\n', 'utf8');
writeComments.write('comment_id,comment_date,comment_content,post_id,user_id\n', 'utf8');

// TO DO: Refactor such that all data can be seeded with one intial call
// writeTenMillionGames(writeGames, 'utf-8', () => {   // write games
//     writeGames.end();
// });
// writeManyUsers(writeUsers, 'utf-8', () => {  // writer users, which then kicks off reviews and comments
//     writeUsers.end();
// });
// writeManyReviews(writeReviews, 'utf-8', () => {
//     writeReviews.end();
// });
writeManyComments(writeComments, 'utf-8', () => {
    writeComments.end();
});