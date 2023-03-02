function middleware2(req, res, next){
    //Alteramos la petición
    //Vamos a cargar algo que no existe en la petición

    req['io'] = io
    next()
};

export default middleware2;