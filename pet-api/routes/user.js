var express = require('express');
var router = express.Router();
var db = require('../db');

/* get requests sent to a given user */
router.get('/:userId/requests', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    console.log("Getting requests for userId " + req.params.userId);

    requests = await db.getRequestsByRequesteeId(req.params.userId);
    if (requests.length == 0) {
        res.json([]);
        return;
    }

    users = await db.getManyUsersByUserId(requests.map(request => request.requestedBy));

    // some sanity checking
    if (requests.length !== users.length) {
        console.log("requests length does not equal users length!");
        console.log("requests: " + requests);
        console.log("users: " + users);
        res.status(500);
        return;
    }

    r = [];
    for (let i = 0; i < requests.length; i++) {
        // data format: (to be used when making calls to getRequests and etc)
        // name: name of requester. Get name by getUserById(<requestedBy field of this request>)
        // userId: Id of requester. requestedBy field of this request
        // requestId: requestId field this request.
        // draftId: id of review (if a draft exists) getReview(requestedBy, requestedFor).<...>.reviewId
        // NOTE: draftId is used for both loading the draft and marking the row by color
        r.push({
            name: `${users[i].firstName} ${users[i].lastName}`,
            userId: users[i].userId,
            requestId: requests[i].requestId,
            draftId: -1 // drafts not implemented for now
        })
    }

    res.json(r);

    // old hardcoded data before we connected this to the db
    // res.json([
    //     {name: 'Aaron Wright', userId: 1, requestId: 124, draftId: -1},
    //     {name: 'Trifon Trifonov', userId: 2, requestId: 125, draftId: -1},
    //     {name: 'Zachary Williams', userId: 3, requestId: 126, draftId: 222},
    //     {name: 'Stephan Lensky', userId: 4, requestId: 126, draftId: -1},
    //     {name: 'Ryan McCarthy', userId: 5, requestId: 127, draftId: -1},
    //     {name: 'Alden Burgess', userId: 6, requestId: 128, draftId: 277},
    //     {name: 'Rishikumar Jambunathan', userId: 7, requestId: 129, draftId: -1},
    //     {name: 'Todd Dvorsky', userId: 8, requestId: 129, draftId: -1},
    //     {name: 'Evan Besser', userId: 9, requestId: 130, draftId: -1},
    //     {name: "Joe Shmoe", userId: 10, requestId: 131, draftId: 255},
    //     {name: "John Doe", userId: 11, requestId: 132, draftId: 773},
    //     {name: "Jane Doe", userId: 12, requestId: 133, draftId: -1},
    //     {name: "John Smith", userId: 13, requestId: 134, draftId: 999},
    //     {name: "Test Name", userId: 14, requestId: 134, draftId: -1}
    // ]);
});

/* get reviews written for a given user */
router.get('/:userId/reviews', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    reviews = await db.getReviewsById(req.params.userId);
    if(reviews == null){
        res.json([]);
        return;
    }
    else{
        reviewerIds = []
        recipientIds = []

        for(let i = 0; i < reviews.length; i++){
            reviewerIds.push(reviews[i].writtenBy)
            recipientIds.push(reviews[i].writtenFor)
        }

        var mappedReviewer = new Map();
        var mappedRecipient = new Map();
        count = 0;
        for(let i = 0; i < reviews.length; i++){
            if(mappedReviewer.get(reviews[i].writtenBy) == undefined){
                mappedReviewer.set(reviews[i].writtenBy, count)
                count++
            }
        }
        count = 0;
        for(let i = 0; i < reviews.length; i++){
            if(mappedRecipient.get(reviews[i].writtenFor) == undefined){
                mappedRecipient.set(reviews[i].writtenFor, count)
                count++
            }
        }

        reviewers = await db.getManyUsersByUserId(reviewerIds);
        recipients = await db.getManyUsersByUserId(recipientIds);

        returnList = []
        for (let i = 0; i < reviews.length; i++) {
            returnList.push({
                reviewId: reviews[i].reviewId,
                writtenBy: `${reviewers[mappedReviewer.get(reviews[i].writtenBy)].firstName} ${reviewers[mappedReviewer.get(reviews[i].writtenBy)].lastName}`,
                writtenFor: `${recipients[mappedRecipient.get(reviews[i].writtenFor)].firstName} ${recipients[mappedRecipient.get(reviews[i].writtenFor)].lastName}`,
                reviewText: reviews[i].reviewText,
                lastUpdated: reviews[i].lastUpdated,
                isDraft: reviews[i].isDraft
            })
        }
        res.json(returnList);
    }
});

/* get reviews for all employees under a manager*/
router.get('/:userId/managerReviews', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    reviews = [];
    users = await db.getIdsByManager(req.params.userId)
    if(users !== null){
        for(let i = 0; i < users.length; i++){
            review = await db.getReviewsById(users[i].userId)
            if(review !== null){
                for(let i = 0; i < review.length; i++){
                    reviews.push(review[i])
                }
            }
        }
    }
    if(reviews.length == 0){
        res.json([]);
        return;
    }
    else{
        reviewerIds = []
        recipientIds = []

        for(let i = 0; i < reviews.length; i++){
            reviewerIds.push(reviews[i].writtenBy)
            recipientIds.push(reviews[i].writtenFor)
        }

        var mappedReviewer = new Map();
        var mappedRecipient = new Map();
        count = 0;
        for(let i = 0; i < reviews.length; i++){
            if(mappedReviewer.get(reviews[i].writtenBy) == undefined){
                mappedReviewer.set(reviews[i].writtenBy, count)
                count++
            }
        }
        count = 0;
        for(let i = 0; i < reviews.length; i++){
            if(mappedRecipient.get(reviews[i].writtenFor) == undefined){
                mappedRecipient.set(reviews[i].writtenFor, count)
                count++
            }
        }

        reviewers = await db.getManyUsersByUserId(reviewerIds);
        recipients = await db.getManyUsersByUserId(recipientIds);

        returnList = []
        for (let i = 0; i < reviews.length; i++) {
            returnList.push({
                reviewId: reviews[i].reviewId,
                writtenBy: `${reviewers[mappedReviewer.get(reviews[i].writtenBy)].firstName} ${reviewers[mappedReviewer.get(reviews[i].writtenBy)].lastName}`,
                writtenFor: `${recipients[mappedRecipient.get(reviews[i].writtenFor)].firstName} ${recipients[mappedRecipient.get(reviews[i].writtenFor)].lastName}`,
                reviewText: reviews[i].reviewText,
                lastUpdated: reviews[i].lastUpdated,
                isDraft: reviews[i].isDraft
            })
        }
        res.json(returnList);
    }
});
module.exports = router;
