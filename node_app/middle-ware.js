const EXPRESS = require('express');
const APP = EXPRESS();

// req => middleware => res

const logger = (req, res, next) => { // This is middleware function note we have to use the next so that we can send next to other so we have to use next
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next(); // We have to use next() here
}

APP.get('/', logger, (req, res) => {
    // const method = req.method;
    // const time = new Date().getFullYear();
    // const url = req.url;
    // console.log(method, time, url);
    res.send('home');
});

APP.get('/about', logger, (req, res) => {
    res.send('About');
})

APP.listen(5001, () => {
    console.log(`Server is listening on port 5001`);
})