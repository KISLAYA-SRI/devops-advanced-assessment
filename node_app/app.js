const EXPRESS = require('express');
const morgan = require('morgan');
const APP = EXPRESS();
const PEOPLE = require('./router/people');
const LOGIN = require('./router/auth');
// Let Us learn about the Routers
// what is routers it is basically setting the multiple routes in the different folders
// there is a router folder
APP.use(morgan('tiny'));
APP.use(EXPRESS.static('./methods-public'));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: false }))


APP.use('/api/people', PEOPLE);
APP.use('/login', LOGIN);
APP.listen(5001, () => {
    console.log(`Server is listening on port 5001`);
})