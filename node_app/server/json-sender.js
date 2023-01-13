const EXPRESS = require('express');
const APP = EXPRESS();
const {products, people} = require('./data');

APP.get('/', (req, res) => {
    res.status(200).json(products);
});

APP.listen(5001, () => {
    console.log(`Port is listening on port 5001`);
})