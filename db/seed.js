const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const writeGames = fs.createWriteStream('./db/games.csv');
const writeReviews = fs.createWriteStream('reviews.csv');
const writeUsers = fs.createWriteStream('./db/users.csv');
const writeComments = fs.createWriteStream('./db/comments.csv');

function writeTenMillionGames(writer, encoding, callback) { // write 10 million games
    let i = 10000000;
    let id = 0;
    function write() {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            const data = `${id}\n`;
            if (i === 0) {
                writer.write(data, encoding, callback);
            } else {
                ok = writer.write(data,encoding);
            }
        } while (i > 0 && ok); // continue only when buffer not full and entries still need to be written
        if (i > 0) {    // if exited while loop while entries still needed to be writte, restart once drain has taken place
            writer.once('drain', write);
        }
    }
    write();
}

function writeReviews(writer, encoding, callback) { // generate between 0 and 30 reviews per game, with 0 being much more likely
    let i = 10000000; // iterate through each game
    function write() {
        let ok = true; // buffer not full
        do {    // keep looping while buffer not full and entries need to be written, each loop is for each game
            i -= 1;
            let id = 0;
            let reviewNum = Math.floor(Math.pow(Math.random(), 3) * Math.floor(max)); // random number between 0 and 30 with 0 being more likely
            do {
                const data = `${id}\n`;
                if (reviewNum === 0) {
                    writer.write(data, encoding, callback);
                } else {
                    ok = writer.write(data.encoding);
                }
            } while (reviewNum > 0  && ok); // check status of ok here instead of in outer
        } while (i > 0);
    }
    write();
}

writeTenMillionGames(writeGames, 'utf-8', () => {   // write users
    writeGames.end();
});