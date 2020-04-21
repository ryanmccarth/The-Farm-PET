var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../db');

/* handle a request to write or edit a review */
router.post('/', async function(req, res, next) {
	if (!db.isConnected()) { res.status(500); return; }
    
    if (!req.body || (!req.body.reviewerId && !req.body.reviewId)) {
        res.status(400).json({message: "write request must contain parameters for write or edit"});
        return;
    }
    
    // Check if this is an input request for a new review
    if(req.body.reviewerId) {
        var result = await db.insertReview(req.body.reviewerId, req.body.revieweeId, req.body.text, req.body.datetime, req.body.isDraft);
        // should I error check the result? do I need it at all?
    }
    
    // if not, execute it as an update request
    else {
        var result = await db.editReview(req.body.reviewId, req.body.text, req.body.datetime, req.body.isDraft);
        // Should i error check the result?
    }
});

module.exports = router;