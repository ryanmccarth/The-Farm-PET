var mysql = require("mysql2/promise");

class PetDB {
    constructor() {
        this.connected = false;
        this.connect();
    }

    async connect() {
        while (!this.connected) {
            console.log("Trying to connect to database...");
            try {
                const connection = await mysql.createConnection({
                    host     : "db",
                    user     : "bessy",
                    password : "the-cow",
                    database : "pet"
                });
                console.log("Successfully connected to database");
                this.connected = true;
                this.c = connection;
            } catch (e) {
                // wait a few seconds before trying to connect again
                await new Promise((resolve) => {setTimeout(resolve, 3000);});
            }
        }
    }

    isConnected() {
        return this.connected;
    }

    async getUserByEmail(email) {
        if (!this.connected) return;
        const [rows, fields] = await this.c.execute("SELECT * FROM `users` WHERE `email` = ?", [email]);
        if (rows.length) return rows[0];
        return null;

        // const c = this.c
        // return new Promise((resolve) => {
        //     c.query("SELECT * FROM `users` WHERE `email` = ?", [email], function (error, results, fields) {
        //         if (error) throw error;
        //         throw new Error("whoops2");

        //         // select queries always return an array of results, but we can assume emails are unique and just return the first element
        //         if (results.length) resolve(results[0]);
        //         // if the query didn't return anything, then the user doesn't exist and we return null
        //         else resolve(null);
        //     });
        // });
    }

    // Purpose: to return a Promise that adds a review row to the reviews table upon resolving
    // Input:   reviewerId - integer representing the writer's Id (userId, not companyUserId)
    //          revieweeId - integer representing the receiver's Id (userId, not companyUserId)
    //          text       - string to be written as the reviewText
    //          dateTime   - date and time of submission in the format "YYYY-MM-DD HH:MI:SS" (important)
    //          isDraft    - boolean representing whether this is a draft or final
    // Returns: Promise object that inserts a review row with given parameters upon resolving
    async insertReview(reviewerId, revieweeId, text, datetime, isDraft) {
        if(!this.connected) return;                 // check connection

        const [rows, fields] = await this.c.execute(
            `INSERT INTO reviews (writtenBy, writtenFor, reviewText, lastUpdated, isDraft) VALUES (?,?,?,?,?)`,
            [reviewerId, revieweeId, text, datetime, isDraft]);
        return true;

        // const c = this.c;
        // // TODO: should we check if users exist before inserting?? if not, disregard
        // return new Promise((resolve) => {
        //     c.query(`INSERT INTO reviews (writtenBy, writtenFor, reviewText, lastUpdated, isDraft) VALUES (?,?,?,?,?)`,
        //     [reviewerId, revieweeId, text, datetime, isDraft]    ,
        //     function (error, results, fields) {
        //         if(error) throw error;
        //         resolve(true);
        //     });
        // });
    }

    // Purpose: to return a Promise that updates the text, datetime and draft status of a review upon resolving
    // Input:   reviewId - integer representing the Id of the review that will be edited
    //          text     - string to be written as reviewText
    //          dateTime - date and time of edit in the format "YYYY-MM-DD HH:MI:SS" (important)
    //          isDraft  - boolean representing whether this is a draft or final
    // Returns: Promise object that replaces the reviewText, lastUpdated and isDraft fields in the review
    //          referenced by reviewId upon resolving
    async editReview(reviewId, text, datetime, isDraft) {
        if(!this.connected) return;

        const [rows, fields] = await this.c.execute(
            `UPDATE reviews SET reviewText=?, lastUpdated=?, isDraft=? WHERE reviewId=?`,
            [text, datetime, isDraft, reviewId]);
        return true;

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query(`UPDATE reviews SET reviewText=?, lastUpdated=?, isDraft=? WHERE reviewId=?`,
        //     [text, datetime, isDraft, reviewId],
        //     function(error, results, fields){
        //         if(error) throw error;
        //         resolve(true);
        //     });
        // });
    }

    async getRequestsByRequesteeId(requesteeId) {
        if(!this.connected) return;
        const [rows, fields] = await this.c.execute("SELECT * FROM requests WHERE requestedFor=?", [requesteeId]);
        return rows;

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query("SELECT * FROM requests WHERE requestedFor=?", [requesteeId], function(error, results, fields){
        //         if(error) throw error;
        //         resolve(results);
        //     });
        // });
    }

    async getManyUsersByUserId(userIds) {
        if(!this.connected) return;
        const placeholders = new Array(userIds.length);
        placeholders.fill("?");

        const [rows, fields] = await this.c.execute(`SELECT * FROM users WHERE userId in (${placeholders.join(",")})`, userIds);
        const reference_object = {};
        for (var i = 0; i < userIds.length; i++) {
            reference_object[userIds[i]] = i;
        }
        rows.sort(function(a, b) {
            return reference_object[a.userId] - reference_object[b.userId];
        });
        return rows;

        // const c = this.c;
        // // shouldn't we escape the ${....} below?
        // return new Promise((resolve) => {
        //     c.query(`SELECT * FROM users WHERE userId in (${placeholders.join(",")})`, userIds, function(error, results, fields){
        //         if(error) throw error;

        //         const reference_object = {};
        //         for (var i = 0; i < userIds.length; i++) {
        //             reference_object[userIds[i]] = i;
        //         }
        //         results.sort(function(a, b) {
        //             return reference_object[a.userId] - reference_object[b.userId];
        //         });

        //         resolve(results);
        //     });
        // });
    }

    // Purpose: to delete a request with the given requestId
    // Input:   requestId - integer representing the desired request's requestId
    // Returns: Promise object that sends the query and returns true upon resolving
    async deleteRequest(requestId) {
        if(!this.connected) return;

        const [rows, fields] = await this.c.execute("DELETE FROM requests WHERE requestId=?", [requestId]);
        return true

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query("DELETE FROM requests WHERE requestId=?", [requestId], function(error, results, fields){
        //         if(error) throw error;
        //         resolve(true);
        //     });
        // });
    }

    // Purpose: to delete a review with the specified reviewId
    // Input:   reviewId - integer representing the desired review's reviewId
    // Returns: Promise object that sends the query returns true upon resolving
    async deleteReview(reviewId) {
        if(!this.connect) return;

        const [rows, fields] = await this.c.execute("DELETE FROM reviews WHERE reviewId=?", [reviewId]);
        return true;

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query("DELETE FROM reviews WHERE reviewId=?", [reviewId], function(error, results, fields){
        //         if(error) throw error;
        //         resolve(true);
        //     });
        // });
    }

    async sendRequests(employeesList, id) {
        const listLength = employeesList.length;
        const c = this.c;
        var i = 0;
        while(i < listLength){
            var sql = "INSERT INTO requests (requestedBy, requestedFor) SELECT ?, ?" +
            " WHERE NOT EXISTS (SELECT * FROM requests WHERE requestedBy=? AND requestedFor=?)";
            const [rows, fields] = await this.c.execute(sql, [id, employeesList[i].id, id, employeesList[i].id]);
            // c.query(sql, [id, employeesList[i].id, id, employeesList[i].id], function(error, results, fields){
            //     if (error) throw error;
            // });
            i++;
        }
    }

    async getNames(company) {
        if (!this.connected) return;
        var sql = "SELECT CONCAT(firstName,' ',lastName) AS name, userID AS id " +
        "FROM users WHERE companyID = ? ORDER BY name";
        const [rows, fields] = await this.c.execute(sql, [company]);
        return rows;

        // const c = this.c
        // return new Promise((resolve) => {
        //     c.query(sql, [company], function (error, results) {
        //         if (error) { throw error; }
        //         resolve(results);
        //     });
        // });
    }

    // Purpose: to get unfinished drafts written by this reviewer and return who it was written for and the review's Id
    // Input:   reviewerId - integer representing the writer of the draft. Used for the search query
    // Returns: Promise object that, upon resolving, returns a list of reviews, each index containing the fields
    //          writtenFor and reviewId.
    async getDraftInfoWrittenBy(reviewerId){
        const [rows, fields] = await this.c.execute("SELECT writtenFor, reviewId FROM reviews WHERE writtenBy=? AND isDraft=TRUE", [reviewerId]);
        return rows;
        // return new Promise((resolve) => {
        //     const c = this.c;
        //     c.query("SELECT writtenFor, reviewId FROM reviews WHERE writtenBy=? AND isDraft=TRUE", [reviewerId], function(error, results, fields){
        //         if(error) throw error;
        //         resolve(results);
        //     });
        // });
    }

    async getReviewsById(id) {
        if(!this.connected) return;

        const [rows, fields] = await this.c.execute("SELECT * FROM reviews WHERE (writtenFor=? AND isDraft=FALSE)", [id]);
        if (rows.length) {
            return rows;
        }
        return null;

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query("SELECT * FROM reviews WHERE (writtenFor=? AND isDraft=FALSE)", [id], function(error, results, fields){
        //         if(error) throw error;
        //         if(results.length){
        //             resolve(results);
        //         }
        //         else resolve(null);
        //     });
        // });
    }

    // Purpose: to return the text of a draft review with the given reviewId
    // Input:   draftId - integer representing the reviewId of the draft
    // Returns: Promise object that returns the desired draft (review) upon resolving
    async getDraftById(draftId){

        const [rows, fields] = await this.c.execute("SELECT reviewText FROM reviews WHERE reviewId=?", [draftId]);
        return rows[0];

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query("SELECT reviewText FROM reviews WHERE reviewId=?", [draftId], function(error, results, fields){
        //         if(error) throw error;
        //         resolve(results[0]);
        //     });
        // });
    }

    async getIdsByManager(id){
        if(!this.connected) return;

        const [rows, fields] = await this.c.execute("SELECT userId FROM users WHERE managerId=?", [id]);
        if (rows.length) {
            return rows;
        }
        return null;

        // const c = this.c;

        // return new Promise((resolve) => {
        //     c.query("SELECT userId FROM users WHERE managerId=?", [id], function(error, results, fields){
        //         if(error) throw error;
        //         if(results.length){
        //             resolve(results);
        //         }
        //         else resolve(null)
        //     });
        // });
    }

    // Returns IDs of all employees that given ID has sent requests to
    async getPendingRequests(id) {
        if (!this.connected) return;

        const [rows, fields] = await this.c.execute("SELECT requestedFor AS id FROM requests WHERE requestedBy = ?", [id]);
        return rows;

        // const c = this.c
        // return new Promise((resolve) => {
        //     c.query("SELECT requestedFor AS id FROM requests WHERE requestedBy = ?", [id], function (error, results) {
        //         if (error){ throw error; }
        //         resolve(results);
        //     });
        // });
    }

}

module.exports = new PetDB();
