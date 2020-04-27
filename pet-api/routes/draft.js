var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/:draftId', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    console.log("Retrieving draft with draftId " + req.params.draftId);

    draft = await db.getDraftById(req.params.draftId);

    res.json(draft);
});

module.exports = router;