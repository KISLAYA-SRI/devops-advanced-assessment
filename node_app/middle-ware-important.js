const EXPRESS = require('express');
const APP = EXPRESS();
const { logger } = require('./logger');
// req => middleware => res


// What if we have to add multiple times miidleware in functions 


// APP.use('/api', logger) // This will only works for '/api/products' or '/api/items' only
APP.use(logger); // This ius the second method for using the middle ware Note that we have to put it in the first
// const logger = (req, res, next) => { // This is middleware function note we have to use the next so that we can send next to other so we have to use next
//     const method = req.method;
//     const url = req.url;
//     const time = new Date().getFullYear();
//     console.log(method, url, time);
//     next(); // We have to use next() here
// }

APP.get('/', (req, res) => {
    // const method = req.method;
    // const time = new Date().getFullYear();
    // const url = req.url;
    // console.log(method, time, url);
    res.send('home');
});

APP.get('/about', (req, res) => {
    res.send('About');
})

APP.get('/api/items', (req, res) => {
    res.send('items');
})

APP.get('/api/products', (req, res) => {
    res.send('products');
})

APP.listen(5001, () => {
    console.log(`Server is listening on port 5001`);
})