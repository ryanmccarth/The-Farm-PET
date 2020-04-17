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
}

module.exports = new PetDB();
