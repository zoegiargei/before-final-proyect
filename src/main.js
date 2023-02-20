import express from 'express';
import Manager from './managers/manager.js';
import CartsManager from './managers/CartsManager.js'

import routerProducts from './routerProducts.js';
import routerCarts from './routerCarts.js';

//
export const productsManager = new Manager("./fileOfProducts.json");
export const cartsManager = new CartsManager("./fileOfCarts");

//
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'))

//Cargamos los routers
app.use('/api/products', routerProducts);
app.use('/api', routerCarts);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`connected to PORT ${PORT}`)
});