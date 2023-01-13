const logger = (req, res, next) => { // This is middleware function note we have to use the next so that we can send next to other so we have to use next
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next(); // We have to use next() here
}

module.exports = {
    logger: logger,
}