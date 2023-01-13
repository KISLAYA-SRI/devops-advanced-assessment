
let { people } = require('../data');

const fun1 = (req, res) => {
    res.status(200).json({
        "success": "true",
        "data": people
    });
}

const fun2 = (req, res) => {
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
}

const fun3 = (req, res) => {
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
}

const fun4 = (req, res) => { // This will also become work fine with post method
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
}

const fun5 =  (req, res) => { // This will also works with post
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
}

module.exports = {
    fun1,
    fun2,
    fun3,
    fun4,
    fun5,
}