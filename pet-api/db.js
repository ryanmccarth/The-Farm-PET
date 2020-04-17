var mysql = require("mysql");

class PetDB {
    constructor() {
        this.connected = false;
        this.connect();
    }

    async connect() {
        while (!this.connected) {
            var connection = mysql.createConnection({
                host     : "db",
                user     : "bessy",
                password : "the-cow",
                database : "pet"
            });

            console.log("Trying to connect to database...");
            var _this = this;
            connection.connect(function(err) {
                if (!err) {
                    console.log("Successfully connected to database");
                    _this.connected = true;
                    _this.c = connection;
                }
            });
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
            c.query("SELECT * FROM `pet`.`users` WHERE `email` = ?", [email], function (error, results, fields) {
                if (error) throw error;
                if (results.length) resolve(results[0]);
                resolve(null)
            });
        });
    }
}

module.exports = new PetDB();
