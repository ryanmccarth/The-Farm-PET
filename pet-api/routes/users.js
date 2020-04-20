var express = require('express');
var router = express.Router();

//return the list of Employees
router.get('/', function(req, res){
    var employees = [
        {name: "Oscar Gibson", id: 1},
        {name: 'Aaron Wright', id: 2},
        {name: 'Trifon Trifonov', id: 3},
        {name: 'Zachary Williams', id: 4},
        {name: 'Stephan Lensky', id: 5},
        {name: 'Ryan McCarthy', id: 6},
        {name: 'Alden Burgess', id: 7},
        {name: 'Rishikumar Jambunathan', id: 8},
        {name: 'Todd Dvorsky', id: 9},
        {name: 'Evan Besser', id: 10},
        {name: "Joe Shmoe", id: 11},
        {name: "John Doe", id: 12},
    ];
    res.json(employees);

});

module.exports = router;
