import express from 'express';
import Manager from './managers/manager.js';
import CartsManager from './managers/CartsManager.js'

import routerProducts from './routes/routerProducts.js';
import routerCarts from './routes/routerCarts.js';

//
export const productsManager = new Manager("./fileOfProducts.json");
export const cartsManager = new CartsManager("./fileOfCarts.json");

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