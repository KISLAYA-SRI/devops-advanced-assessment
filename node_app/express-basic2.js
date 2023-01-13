const EXPRESS = require('express');
const PATH = require('path');
const APP = EXPRESS();

//Set up static and middleware 
APP.use(EXPRESS.static('./public'));

// Note that public folder already served by express we don't need to use res.sendFile() method.
// But we have to put index.html in public folder

APP.get('/', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, './navbar-app/index.html'));
});

APP.all('*', (req, res) => {
    res.send(`<h1>This Page is not found</h1>`)
})

APP.listen(5001, () => {
    console.log('Server is listening on port 5001');
})