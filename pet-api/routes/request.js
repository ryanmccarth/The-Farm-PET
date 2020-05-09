var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
var db = require('../db');

/* send requests to a list of users */
router.post('/', asyncHandler(async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    else{
        db.sendRequests(req.body.employeesList, req.body.userid);
        res.json(true);
    }
}));

/* delete a request with a given requestId */
router.delete('/:requestId/delete', asyncHandler(async function(req,res) {
    if (!db.isConnected()) { res.status(500); return; }
    else {
        await db.deleteRequest(req.params.requestId);
    }
    res.sendStatus(200);
}));

router.get('/:userid', async function(req, res) {
    if (!db.isConnected()) { res.status(500); return; }
    else{
        var employees = await db.getPendingRequests(req.params.userid);
        res.json(employees);
    }
});

module.exports = router;