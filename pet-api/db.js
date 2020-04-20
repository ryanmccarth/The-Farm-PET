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

    sendRequests(employeesList) {
        const listLength = employeesList.length;
        const c = this.c;
        var i = 0;
        while(i < listLength){
            var sql = "INSERT INTO requests (requestedBy, requestedFor) SELECT 1, ?" +
            " WHERE NOT EXISTS (SELECT * FROM requests WHERE requestedBy=1 AND requestedFor=?)";
            c.query(sql, [employeesList[i].id, employeesList[i].id], function(error, results, fields){
                if (error) throw error;
            });
            i++;
        }
    }

    getNames() {
        if (!this.connected) return;
        const c = this.c
        return new Promise((resolve) => {
            c.query("SELECT CONCAT(firstName,' ',lastName) AS name, userID AS id FROM users ORDER BY name", function (error, results) {
                if (error) { throw error; }
                
                resolve(results);                
            });
        });
    }
}

module.exports = new PetDB();
