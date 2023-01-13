const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

ROUTER.post('/', (req, res) => {
    console.log(req.body)   // This will be the fetcher of form data as object
    const { name } = req.body
    if(name) {
        res.status(200).send(`<h1>Submitted</h1>`)
    } else {
        res.status(401).send(`<h1>Please provide data</h1>`)
    }
});

module.exports = ROUTER;