var mysql = require("mysql");

class PetDB {
    constructor() {
        this.connected = false;
        this.connect();
    }

    async connect() {
        while (!this.connected) {
            const connection = mysql.createConnection({
                host     : "db",
                user     : "bessy",
                password : "the-cow",
                database : "pet"
            });

            console.log("Trying to connect to database...");
            const _this = this;
            connection.connect(function(err) {
                if (!err) {
                    console.log("Successfully connected to database");
                    _this.connected = true;
                    _this.c = connection;
                }
            });

            // wait a few seconds before trying to connect again
            await new Promise((resolve) => {setTimeout(resolve, 3000);});
        }
    }

    isConnected() {
        return this.connected;
    }

    getUserByEmail(email) {
        if (!this.connected) return;
        const c = this.c
        return new Promise((resolve) => {
            c.query("SELECT * FROM `users` WHERE `email` = ?", [email], function (error, results, fields) {
                if (error) throw error;

                // select queries always return an array of results, but we can assume emails are unique and just return the first element
                if (results.length) resolve(results[0]);
                // if the query didn't return anything, then the user doesn't exist and we return null
                else resolve(null);
            });
        });
    }

    // Purpose: to return a Promise that adds a review row to the reviews table upon resolving
    // Input:   reviewerId - integer representing the writer's Id (userId, not companyUserId)
    //          revieweeId - integer representing the receiver's Id (userId, not companyUserId)
    //          text       - string to be written as the reviewText
    //          dateTime   - date and time of submission in the format "YYYY-MM-DD HH:MI:SS" (important)
    //          isDraft    - boolean representing whether this is a draft or final
    // Returns: Promise object that inserts a review row with given parameters upon resolving
    insertReview(reviewerId, revieweeId, text, datetime, isDraft) {
        if(!this.connected) return;                 // check connection

        const c = this.c;
        // TODO: should we check if users exist before inserting?? if not, disregard
        return new Promise((resolve) => {
            c.query(`INSERT INTO reviews (writtenBy, writtenFor, reviewText, lastUpdated, isDraft) VALUES (?,?,?,?,?)`,
            [reviewerId, revieweeId, text, datetime, isDraft]    ,
            function (error, results, fields) {
                if(error) throw error;
                resolve(true);
            });
        });
    }

    // Purpose: to return a Promise that updates the text, datetime and draft status of a review upon resolving
    // Input:   reviewId - integer representing the Id of the review that will be edited
    //          text     - string to be written as reviewText
    //          dateTime - date and time of edit in the format "YYYY-MM-DD HH:MI:SS" (important)
    //          isDraft  - boolean representing whether this is a draft or final
    // Returns: Promise object that replaces the reviewText, lastUpdated and isDraft fields in the review
    //          referenced by reviewId upon resolving
    editReview(reviewId, text, datetime, isDraft) {
        if(!this.connected) return;
        const c = this.c;

        return new Promise((resolve) => {
            c.query(`UPDATE reviews SET reviewText=?, lastUpdated=?, isDraft=? WHERE reviewId=?`,
            [text, datetime, isDraft, reviewId],
            function(error, results, fields){
                if(error) throw error;
                resolve(true);
            });
        });
    }

    getRequestsByRequesteeId(requesteeId) {
        if(!this.connected) return;
        const c = this.c;

        return new Promise((resolve) => {
            c.query("SELECT * FROM requests WHERE requestedFor=?", [requesteeId], function(error, results, fields){
                if(error) throw error;
                resolve(results);
            });
        });
    }

    getManyUsersByUserId(userIds) {
        if(!this.connected) return;
        const c = this.c;
        const placeholders = new Array(userIds.length);
        placeholders.fill("?");

        return new Promise((resolve) => {
            c.query(`SELECT * FROM users WHERE userId in (${placeholders.join(",")})`, userIds, function(error, results, fields){
                if(error) throw error;
                resolve(results);
            });
        });
    }

    deleteRequest(requestId) {
        if(!this.connected) return;
        const c = this.c;

        return new Promise((resolve) => {
            c.query("DELETE FROM requests WHERE requestId=?", [requestId], function(error, results, fields){
                if(error) throw error;
                resolve(true);
            });
        });
    }

}

module.exports = new PetDB();
