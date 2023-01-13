const authorize = (req, res, next) => {
    const { user } = req.query;
    if(user) {
        req.user = { //http://localhost:5001/api/products?user=john this will acept by the server 
            name: 'John',
            id: 5,
        }
        next()
    }
    else {
        res.status(401).send("Unauthorize");
    }
}

module.exports = {
    authorize: authorize,
}