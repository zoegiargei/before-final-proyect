import { Router } from 'express';
import { contrPostCart } from '../controllers/controllersCarts.js';
import { contrGetCart } from '../controllers/controllersCarts.js';
import { contrProdInCart } from '../controllers/controllersCarts.js';

const routerCarts = Router();

export default routerCarts;

routerCarts.post('/', contrPostCart)

routerCarts.get('/:cid', contrGetCart)

routerCarts.post('/:cid/products/:pid', contrProdInCart)