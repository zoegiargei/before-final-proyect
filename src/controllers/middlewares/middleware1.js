function middleware1(req, res, next) {
    console.log('middleware 1: petición recibida')
    next()
};

export default middleware1;