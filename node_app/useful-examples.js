const EXPRESS = require('express');
const APP = EXPRESS();

const { people, products } = require('./data');

APP.get('/', (req, res) => {
    res.status(200).send(`<h1>Helllo</h1> <a href="/api/products">Products</a>`);
});

APP.get('/api/products', (req, res) => {
    const NEW_PRODUCT = products.map((item) => {
        const { id, name, image } = item;
        return {
            id, name, image
        }
    })
    res.status(200).json(NEW_PRODUCT);
});

// Note that ids are always string
APP.get('/api/products/:id', (req, res) => {
    const singleProduct = products.find((item) => {
        return item.id === Number(req.params.id);
    })
    if(!singleProduct) {
        return res.status(404).send(`<h1>The page you are looking for is not exist</h1>`);
    }
    res.status(200).json(singleProduct);
})

APP.get('/api/v1/query', (req, res) => {
    console.log(req.query); // http://localhost:5001/api/v1/query?name=John&id=2 this will give the object to server { name: 'John', id: '2' }
    const {search, limit } = req.query;
    let sortedProducts = [...products];
    if(search) {
        sortedProducts = sortedProducts.filter((item) => { //http://localhost:5001/api/v1/query?search=a
            return item.name.startsWith(search);
        })
    }
    if(limit) { //http://localhost:5001/api/v1/query?limit=2 this gives only two products
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length < 1) { // http://localhost:5001/api/v1/query?search=zebra
        // res.status(200).send(`<h1>This data is not exist</h1>`);
        // or we can do this
        return res.status(200).json({
            status: "success",
            data: [],
        })
    }
    return res.status(200).json(sortedProducts);
    
})


APP.all('*', (req, res) => {
    res.status(404).send(`<h1>The page you are looking for is not exist</h1>`);
})

APP.listen(5001, () => {
    console.log('Server is listening on port 5001');
})