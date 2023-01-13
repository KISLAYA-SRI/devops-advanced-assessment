const EXPRESS = require('express');
const ROUTER =  EXPRESS.Router();
let { people } = require('../data');
// What is controllers ? it is simply to shorten the routers
const {
    fun1,
    fun2,
    fun3,
    fun4,
    fun5
} = require('../controllers/people')

// Note that these apis are pointing to the '/api/people'
// Get Method
// Note That we have already use ('/api/people') so that we can replace it with '/'
ROUTER.get('/', (req, res) => {
    res.status(200).json({
        "success": "true",
        "data": people
    });
})

// Post Method

ROUTER.post('/', (req, res) => {
    const name = req.body;
    if(!name) {
        res.status(400).json({
            success: false,
            data: "please provide some data"
        })
    } 
    res.status(200).send({
        success: true,
        person: name.name,
    })
})

ROUTER.post('/postman', (req, res) => {
    const {name} = req.body;
    if(!name) {
        return res.status(400).json({
            success: false,
            data: "please Provide some data"
        })
    }
    res.status(200).send({
        success: true,
        data: [...people, {
            id: people.length + 1,
            name: name
        }]
    })
})    

// PUT method

ROUTER.put('/:id', (req, res) => { // This will also become work fine with post method
    const {id} = req.params;
    const {name} = req.body;
    const person = people.find((person) => {
        return person.id === Number(id);
    })
    if(!person) {
        res.status(404).json({
            success: false,
            data: 'Please provide valid id or name'
        })
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id)) {
            person.name = name;
        }
        return person;
    })
    res.status(200).json({
        success: true,
        data: newPeople,
    });
})

// DELETE METHOD

ROUTER.delete('/:id', (req, res) => { // This will also works with post
    const person = people.find((person) => {
        return person.id === Number(req.params.id);
    });

    if(!person) {
        res.status(400).json({
            success: false,
            data: 'Please send the valid number',
        })
    }
    const newPeople = people.filter((person) => {
        return person.id !== Number(req.params.id);
    })
    res.status(200).json({
        success: true,
        data: newPeople,
    })
})


module.exports = ROUTER;

