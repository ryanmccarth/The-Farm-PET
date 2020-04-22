var express = require('express');
var router = express.Router();
var db = require('../db');

//return the list of Employees
router.get('/:userId/:companyId',  async function(req, res){
    if (!db.isConnected()) { res.status(500); return; }
    var employees = await db.getNames(req.params.userId, req.params.companyId);
    res.json(employees);
});

module.exports = router;
