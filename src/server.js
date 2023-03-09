import express from 'express';
import Manager from './controllers/managers/Manager.js';
import CartsManager from './controllers/managers/CartsManager.js'

import routerProducts from './routers/routerProducts.js';
import routerCarts from './routers/routerCarts.js';
import routerWeb from './routers/routerWeb.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import timeNow from './controllers/middlewares/timeNow.js';
import addToReq from './controllers/middlewares/addToReq.js'
import mistake from './controllers/middlewares/mistake.js';

//
export const productsManager = new Manager("./fileOfProducts.json");
export const cartsManager = new CartsManager("./fileOfCarts.json");

//
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(timeNow)
app.use(addToReq)
app.use(mistake)


//
app.engine('handlebars', engine());
//settings: .set
app.set('views', './views');
app.set('view engine', 'handlebars');

//
app.use('/api/products', routerProducts);
app.use('/api', routerCarts);
app.use('/web', routerWeb);

const port = (process.env.PORT || 8080);
export const HTTPserver = app.listen(port, () => {console.log(`Server running on port: ${ port }`)});

//
export const io = new Server( HTTPserver );
io.on('connection', async socketSideServer => {

    console.log("nuevo cliente conectado!")

    socketSideServer.on('message', data => {
        console.log(data)
    })

    const allProducts = await productsManager.getElements()
    socketSideServer.emit('allProducts', allProducts)

    socketSideServer.on('newProduct', data => {
        console.log(data)
        productsManager.addElement(data)
    })
})