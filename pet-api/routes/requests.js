var express = require('express');
var router = express.Router();
var db = require('../db');

/* send requests to a list of users */
router.post('/', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    // code here
});

/* get requests sent to a given user */
router.get('/:userId', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    console.log("Sending requests for userId " + req.params.userId);

    // hardcoded for now
    res.json([
        {name: 'Oscar Gibson', userId: 0},
        {name: 'Aaron Wright', userId: 1},
        {name: 'Trifon Trifonov', userId: 2},
        {name: 'Zachary Williams', userId: 3},
        {name: 'Stephan Lensky', userId: 4},
        {name: 'Ryan McCarthy', userId: 5},
        {name: 'Alden Burgess', userId: 6},
        {name: 'Rishikumar Jambunathan', userId: 7},
        {name: 'Todd Dvorsky', userId: 8},
        {name: 'Evan Besser', userId: 9},
        {name: "Joe Shmoe", userId: 10},
        {name: "John Doe", userId: 11},
        {name: "Jane Doe", userId: 12},
        {name: "John Smith", userId: 13},
        {name: "Test Name", userId: 14}
    ])
});
