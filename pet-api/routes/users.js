var express = require('express');
var router = express.Router();
var db = require('../db');

//return the list of Employees
router.get('/',  async function(req, res){
    if (!db.isConnected()) { res.status(500); return; }
    
    var employees = await db.getNames();
    res.json(employees);
});

module.exports = router;
