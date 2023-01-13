const EXPRESS = require('express');
const APP = EXPRESS();
const { logger } = require('./logger');
const { authorize } = require('./authorize');
const morgan = require('morgan');
// req => middleware => res


// What if we have to add multiple times miidleware in functions 


// APP.use('/api', logger) // This will only works for '/api/products' or '/api/items' only
APP.use(EXPRESS.static('./public')); // This is built in express middle ware there are other third party middle ware also available in npm most famous is morgan
// APP.use(logger); // This ius the second method for using the middle ware Note that we have to put it in the first
APP.use(morgan('tiny'));
APP.use([logger, authorize]); // Note that authorize will run after logger

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

APP.get('/about',[logger, authorize] , (req, res) => { // by this we can use multiple 
    res.send('About');
})

APP.get('/api/items', (req, res) => {
    console.log(req.user);
    res.send('items');
})

APP.get('/api/products', (req, res) => {
    res.send('products');
})

APP.listen(5001, () => {
    console.log(`Server is listening on port 5001`);
})