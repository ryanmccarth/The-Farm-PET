var express = require('express');
var router = express.Router();

var db = require('../db');

/* handle a request to write or edit a review */
router.post('/', async function(req, res, next) {
	if (!db.isConnected()) { res.status(500); return; }

    if (!req.body || (!req.body.reviewerId && !req.body.reviewId)) {
        res.status(400).json({message: "write request must contain parameters for write or edit"});
        return;
    }

    var result; // do I need this?
    // Update draft if it's a draft. If a draft doesn't exist (reviewId is -1), create review
    if(req.body.reviewId!==-1){
        result = await db.editReview(req.body.reviewId, req.body.text, req.body.datetime, req.body.isDraft);
    }
    else{
        result = await db.insertReview(req.body.reviewerId, req.body.revieweeId, req.body.text, req.body.datetime, req.body.isDraft);
    }

    // if it's not a draft, delete the request
    if(!req.body.isDraft){
        await db.deleteRequest(req.body.requestId);
    }

    res.sendStatus(200);
});

module.exports = router;