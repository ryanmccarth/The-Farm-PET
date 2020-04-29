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

/* delete a request with a given requestId */
router.delete('/:requestId/delete', async function(req,res) {
    if (!db.isConnected()) { res.status(500); return; }
    else {
        await db.deleteRequest(req.params.requestId);
    }

    res.sendStatus(200);
});

module.exports = router;