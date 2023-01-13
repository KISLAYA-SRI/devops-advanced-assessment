const EXPRESS = require('express');
const morgan = require('morgan');
const APP = EXPRESS();
// Let us learn about Method
// GET method => Read Data
// Post => 
let { people } = require('./data');
APP.use(morgan('tiny'));

APP.use(EXPRESS.static('./methods-public'));
APP.use(EXPRESS.json());

APP.get('/api/people', (req, res) => {
    res.status(200).json({
        "success": "true",
        "data": people
    });
})

APP.post('/api/people', (req, res) => {
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
// Note if you have too access the form data parse form data you have to url encoded and also req.body

APP.use(EXPRESS.urlencoded({ extended: false }))

APP.post('/login', (req, res) => {
    console.log(req.body)   // This will be the fetcher of form data as object
    const { name } = req.body
    if(name) {
        res.status(200).send(`<h1>Submitted</h1>`)
    } else {
        res.status(401).send(`<h1>Please provide data</h1>`)
    }
    
})

APP.post('/api/postman/people', (req, res) => {
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

// PUT  METHOD is for updating suppose we want to edit or delete (name in our array)

APP.put('/api/people/:id', (req, res) => { // This will also become work fine with post method
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

APP.delete('/api/people/:id', (req, res) => { // This will also works with post
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

APP.listen(5001, () => {
    console.log(`Server is listening on port 5001`);
})