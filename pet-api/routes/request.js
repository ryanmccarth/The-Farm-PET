var express = require('express');
var router = express.Router();
var db = require('../db');

/* send requests to a list of users */
router.post('/', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    else{
        db.sendRequests(req.body.employeesList, req.body.userid);
        res.json(true);
    }
});

router.get('/', async function(req, res) {
    if (!db.isConnected()) { res.status(500); return; }
    else{
        db.getPendingRequests(req.body.userid);
        res.json(true);
    }
});

module.exports = router;