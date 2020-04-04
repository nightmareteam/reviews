const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

// TO DO: Refactor to reduce redundant code

/*************************CREATE CSV STREAMS*************************/
const writeUsers = fs.createWriteStream('./db/users.csv');
const writeGames = fs.createWriteStream('./db/games.csv');
const writeReviews = fs.createWriteStream('./db/reviews.csv');
const writeComments = fs.createWriteStream('./db/comments.csv');

/**********************INITIALIZE TABLE HEADERS**********************/
writeGames.write('game_id\n', 'utf8');
writeUsers.write('user_id,username,user_avatar,product_count,review_count\n', 'utf8');
writeReviews.write('post_id,recommended,review_date,hours_played,content,language,helpful_yes_count,helpful_funny_count,user_id,game_id\n', 'utf8');
writeComments.write('comment_id,comment_date,comment_content,post_id,user_id\n', 'utf8');

/***************************HELPER FUNCTIONS***************************/

const writeTenMillionGames = (writer, encoding, callback) => { // write 10 million games
    let game_id = 0;
    function write() {
        let ok = true;
        do {
            game_id += 1;
            const data = `${game_id}\n`;
            if (game_id === 10) {
                writer.write(data, encoding, callback);
            } else {
                ok = writer.write(data, encoding);
            }
            console.log("games");
        } while (game_id < 10 && ok); // continue only when buffer not full and entries still need to be written
        if (game_id < 10) {    // if exited while loop while entries still needed to be writte, restart once drain has taken place
            writer.once('drain', write);
        }
    }
    write();
}

const writeManyReviews = () => {
// track total number of and create reviews in database
    let post_id = 0;
    const languages = ['Arabic', 'Armenian', 'Bosnian', 'Bulgarian', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Finnish', 'French', 
        'Georgian', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'Japanese', 'Korean', 'Latvian', 'Lithuanian', 'Nepali', 'Norwegian', 
        'Persian', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Slovene', 'Spanish', 'Swedish', 'Turkush', 'Ukranian'];
    return (writer, encoding, callback, user_id, numReviewsForUser) => {
    // generate reviews for a given user
        function write() {
            let reviewsOk = true;
            do {
                post_id += 1;
                numReviewsForUser -= 1;
                // TO DO: Make it more likely for reviews to be in English
                // TO DO: Make it less likely for reviews of games with less reviews to have high vote counts
                const data = `${post_id},${faker.random.boolean()},date,${Math.floor(Math.random() * Math.floor(10000))},${faker.lorem.paragraph()},${languages[Math.floor(Math.random() * Math.floor(languages.length - 1))]},${Math.floor(Math.pow(Math.random(), 3) * Math.floor(300))},${Math.floor(Math.pow(Math.random(), 3) * Math.floor(100))},${user_id},game_id\n`;
                if (numReviewsForUser === 0) {
                    writer.write(data, encoding, callback);
                } else {
                    reviewsOk = writer.write(data, encoding);
                }
            } while (numReviewsForUser > 0 && reviewsOk); // continue only when buffer not full and entries still need to be written
            if (numReviewsForUser > 0) {    // if exited while loop while entries still needed to be writte, restart once drain has taken place
                writer.once('drain', write);
            }
        }
        write();
    }
}

const writeManyUsers = (writer, encoding, callback) => { // write 80 thousands users
    let user_id = 0;
    const writeReviewsForThisUser = writeManyReviews();
    function write() {
        let gameOk = true;
        do { // for each user
            user_id += 1;
            const numReviewsForUser = Math.floor(Math.pow(Math.random(), 4) * Math.floor(200)); // more likely to be closer to 0
            const data = `${user_id},${faker.internet.userName()},${faker.internet.avatar()},${Math.floor(Math.random() * Math.floor(200))},${numReviewsForUser}\n`;
            if (user_id === 10) {
                writer.write(data, encoding, callback);
            } else {
                gameOk = writer.write(data, encoding);
            }
            // write reviewCount number of reviews for specified user
            writeReviewsForThisUser(writeReviews, 'utf-8', () => {
                writeReviews.end();
            }, user_id, numReviewsForUser);
        } while (user_id < 10 && gameOk);
        if (user_id < 10) {
            writer.once('drain', write);
        }
    }
    write();
}

const generateAllData = () => {
// kick off data generation for all four tables
    writeTenMillionGames(writeGames, 'utf-8', () => {   // write games
        writeGames.end();
        writeManyUsers(writeUsers, 'utf-8', () => {  // writer users, which then kicks off reviews and comments
            writeUsers.end();
        });
    });
};

generateAllData();

// function writeReviewsAndComments(writer, encoding, callback) {
// // generate between 0 and 30 reviews per game, with less reviews more likely
// // generate comments for reviews that exist
//     let game_id = 10; // iterate through each game
//     let post_id = 0;
//     function write() {
//         let ok = true; // buffer not full
//         do {    // each loop is for each game, keep looping while buffer not full and entries need to be written, 
//             game_id -= 1;
//             let reviewNum = Math.floor(Math.pow(Math.random(), 3) * Math.floor(30)); // random number between 0 and 30 with 0 being more likely
//             let user_idList = [];
//             do {    // loop through each review -- full cycle is for a single game
//                 post_id += 1;
//                 reviewNum -= 1;
//                 const data = `${post_id},${faker.random.boolean()},${game_id}\n`;
//                 if (reviewNum === 0) {
//                     writer.write(data, encoding, callback);
//                 } else {
//                     ok = writer.write(data, encoding);
//                 }
//             } while (reviewNum > 0  && ok); // check status of ok here instead of in outer
//             if (reviewNum > 0) {    // if exited while loop while entries still needed to be writte, restart once drain has taken place
//                 writer.once('drain', write);
//             }
//         } while (game_id > 0);
//     }
//     write();
// }

// writeManyReviews(writeReviews, 'utf-8', () => {   // write users
//     writeReviews.end();
// });
