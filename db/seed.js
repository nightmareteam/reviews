const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const writeGames = fs.createWriteStream('./db/games.csv');
writeGames.write('game_id\n', 'utf8');

const writeReviews = fs.createWriteStream('./db/reviews.csv');
writeReviews.write('post_id,recommended,game_id\n', 'utf8');

// make 80,000 users
const writeUsers = fs.createWriteStream('./db/users.csv');
writeUsers.write('user_id,username,user_avatar,product_count,review_count\n', 'utf8');

const writeComments = fs.createWriteStream('./db/comments.csv');

function writeTenMillionGames(writer, encoding, callback) { // write 10 million games
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
        } while (game_id < 10 && ok); // continue only when buffer not full and entries still need to be written
        if (game_id < 10) {    // if exited while loop while entries still needed to be writte, restart once drain has taken place
            writer.once('drain', write);
        }
    }
    write();
}

// function writeManyUsers(writer, encoding, callback) { // write 80 thousands users
//     let i = 10;
//     let game_id = 0;
//     function write() {
//         let ok = true;
//         do {
//             i -= 1;
//             game_id += 1;
//             const data = `${game_id}\n`;
//             if (i === 0) {
//                 writer.write(data, encoding, callback);
//             } else {
//                 ok = writer.write(data, encoding);
//             }
//         } while (i > 0 && ok); // continue only when buffer not full and entries still need to be written
//         if (i > 0) {    // if exited while loop while entries still needed to be writte, restart once drain has taken place
//             writer.once('drain', write);
//         }
//     }
//     write();
// }

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


// TO DO: Promisify these
writeTenMillionGames(writeGames, 'utf-8', () => {   // write users
    writeGames.end();
});

// writeManyUsers(writeUsers, 'utf-8', () => {   // write users
//     writeUsers.end();
// });

// writeManyReviews(writeReviews, 'utf-8', () => {   // write users
//     writeReviews.end();
// });

// ${review_date}${hours_played}${content}${language}${helpful_yes_count}${helpful_no_count}${helpful_funny_count}${user_id}