var express = require('express');
var router = express.Router();

//return the list of Employees
router.get('/', function(req, res){
    var employees = [
        {name: "Oscar Gibson"},
        {name: 'Aaron Wright'},
        {name: 'Trifon Trifonov'},
        {name: 'Zachary Williams'},
        {name: 'Stephan Lensky'},
        {name: 'Ryan McCarthy'},
        {name: 'Alden Burgess'},
        {name: 'Rishikumar Jambunathan'},
        {name: 'Todd Dvorsky'},
        {name: 'Evan Besser'},
        {name: "Joe Shmoe"},
        {name: "John Doe"},
    ];
    res.json(employees);

});

module.exports = router;
