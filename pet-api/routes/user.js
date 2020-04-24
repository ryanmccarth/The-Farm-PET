var express = require('express');
var router = express.Router();
var db = require('../db');

/* get requests sent to a given user */
router.get('/:userId/requests', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    console.log("Getting requests for userId " + req.params.userId);

    // hardcoded for now
    // data format: (to be used when making calls to getRequests and etc)
    // name: name of requester. Get name by getUserById(<requestedBy field of this request>)
    // userId: Id of requester. requestedBy field of this request
    // requestId: requestId field this request.
    // draftId: id of review (if a draft exists) getReview(requestedBy, requestedFor).<...>.reviewId
    // NOTE: draftId is used for both loading the draft and marking the row by color
    res.json([
        {name: 'Aaron Wright', userId: 1, requestId: 124, draftId: -1},
        {name: 'Trifon Trifonov', userId: 2, requestId: 125, draftId: -1},
        {name: 'Zachary Williams', userId: 3, requestId: 126, draftId: 222},
        {name: 'Stephan Lensky', userId: 4, requestId: 126, draftId: -1},
        {name: 'Ryan McCarthy', userId: 5, requestId: 127, draftId: -1},
        {name: 'Alden Burgess', userId: 6, requestId: 128, draftId: 277},
        {name: 'Rishikumar Jambunathan', userId: 7, requestId: 129, draftId: -1},
        {name: 'Todd Dvorsky', userId: 8, requestId: 129, draftId: -1},
        {name: 'Evan Besser', userId: 9, requestId: 130, draftId: -1},
        {name: "Joe Shmoe", userId: 10, requestId: 131, draftId: 255},
        {name: "John Doe", userId: 11, requestId: 132, draftId: 773},
        {name: "Jane Doe", userId: 12, requestId: 133, draftId: -1},
        {name: "John Smith", userId: 13, requestId: 134, draftId: 999},
        {name: "Test Name", userId: 14, requestId: 134, draftId: -1}
    ]);
});

/* get reviews written for a given user */
router.get('/:userId/reviews', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    // code here
});

module.exports = router;
