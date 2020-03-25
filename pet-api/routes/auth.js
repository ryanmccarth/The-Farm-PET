var express = require('express');
var router = express.Router();

/* handle login request, returning an auth token if successful */
router.post('/', function(req, res, next) {
	if (!req.body || req.body.username === undefined || req.body.password === undefined) {
		res.status(400).json({message: "login request must contain username and password"});
		return;
	}
	console.log(req.body);
	if (req.body.username == "fido@umass.edu" && req.body.password == "fido") {
		res.json({"token": "xxxxxxxxxx"});
	} else {
		res.status(401).json({message: "invalid email or password"});
	}
});

module.exports = router;
