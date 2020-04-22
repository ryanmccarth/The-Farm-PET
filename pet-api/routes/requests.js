var express = require('express');
var router = express.Router();
var db = require('../db');

/* send requests to a list of users */
router.post('/', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    else{
        console.log(req.body.userid);
        db.sendRequests(req.body.employeesList, req.body.userid);
        res.json(true);
    }
});

/* get requests sent to a given user */
router.get('/:userId', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    // code here
});

module.exports = router;