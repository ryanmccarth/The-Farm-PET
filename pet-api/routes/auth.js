var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../db');

/* handle login request, returning an auth token if successful */
router.post('/', async function(req, res, next) {
	if (!db.isConnected()) { res.status(500); return; }
	if (!req.body || req.body.username === undefined || req.body.password === undefined) {
		res.status(400).json({message: "login request must contain username and password"});
		return;
	}
	// console.log(req.body);

	var user = await db.getUserByEmail(req.body.username);
	if (user === null) {
		res.status(401).json({message: "invalid email or password"});
		return;
	}

	// if (bcrypt.compareSync(req.body.password, user.password)) {
	if (req.body.password === user.password) {
		delete user.password;
		res.json({"token": "xxxxxxxxxx", "session": user});
	} else {
		res.status(401).json({message: "invalid email or password"});
	}
});

module.exports = router;
