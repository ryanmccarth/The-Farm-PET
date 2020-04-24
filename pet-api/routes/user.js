var express = require('express');
var router = express.Router();
var db = require('../db');

/* get requests sent to a given user */
router.get('/:userId/requests', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    // code here
});

/* get reviews written for a given user */
router.get('/:userId/reviews', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    // code here
});

module.exports = router;
