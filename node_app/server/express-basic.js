const EXPRESS = require('express');
const APP = EXPRESS();

// The method we are using are 
//APP.get()  APP.post() APP.delete() APP.update() APP.put() APP.all() APP.listen() APP.use()

APP.get('/', (req, res) => {
    console.log();
    res.status(200).send(`<h1>Hellllloooooooo This is Home Page</h1>`);
})

APP.get('/about', (req, res) => {
    res.status(200).send(`<h1> About Page</h1>`);
});

APP.all('*', (req, res) => {
    res.status(404).send(`<h1> This page does not exist </h1>`);
})

APP.listen(5001, () => {
    console.log('Server is listening on port 5001');
});


