const http = require('http');
const {readFileSync } = require('fs');

// Get all files here
const HOMEPAGE = readFileSync('./navbar-app/index.html');
const HOMESTYLES = readFileSync('./navbar-app/styles.css');
const HOMEIMAGE = readFileSync('./navbar-app/logo.svg');
const HOMELOGIC = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);
    const URL = req.url;
    console.log(URL);
    // Home Page
    if(URL === '/') {
        res.writeHead(200, {
            'content-type': 'text/html',
        })
        res.write(HOMEPAGE);
        res.end();
    } else if(URL === '/about') { // About page
        res.writeHead(200, {
            'content-type': 'text/html',
        })
        res.write('<h2>About PAge</h2>');
        res.end();
    } else if(URL === '/styles.css') { // About page
        res.writeHead(200, {
            'content-type': 'text/css',
        })
        res.write(HOMESTYLES);
        res.end();
    } else if(URL === '/logo.svg') { // About page
        res.writeHead(200, {
            'content-type': 'image/svg+xml',
        })
        res.write(HOMEIMAGE);
        res.end();
    } else if(URL === '/browser-app.js') { // About page
        res.writeHead(200, {
            'content-type': 'text/javascript',
        })
        res.write(HOMELOGIC);
        res.end();
    } 
    else { // Error 404
        res.writeHead(404, {
            'content-type': 'text/html',
        })
        res.write('<h2>The resource you are trying to access not found</h2>');
        res.end();
    }
});

server.listen(5001,() => {
    console.log('port 5001 is used');
})