import { io } from "../../server.js";

function addToReq(req, res, next){
    req.allProducts = []
    req['io'] = io
    next()
}

export default addToReq;