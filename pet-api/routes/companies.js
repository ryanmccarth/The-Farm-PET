var express = require('express');
var router = express.Router();
var db = require('../db');

/* get employees of a given company */
router.get('/:companyId/users', async function(req, res, next) {
    if (!db.isConnected()) { res.status(500); return; }
    var employees = await db.getNames(req.params.companyId);
    res.json(employees);
});

module.exports = router;
