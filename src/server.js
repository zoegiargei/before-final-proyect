import express from 'express';
import Manager from './controllers/managers/Manager.js';
import CartsManager from './controllers/managers/CartsManager.js'

import routerProducts from './routers/routerProducts.js';
import routerCarts from './routers/routerCarts.js';
import routerWeb from './routers/routerWeb.js';
import { engine } from 'express-handlebars';
//import serverIO from './controllers/socketSideServer.js';
import { Server } from 'socket.io';

//import middleware1 from './controllers/middlewares/middleware1.js'

//Multer (los importamos)
//Multer --> librería
//import multer from 'multer';

//
export const productsManager = new Manager("./fileOfProducts.json");
export const cartsManager = new CartsManager("./fileOfCarts.json");

//
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('./views'));
app.use(express.static('./public'));
//app.use(middleware1);
app.use((req, res, next) => {
    req['io'] = io
    next()
})

//
app.engine('handlebars', engine());
//settings: .set
app.set('views', './views');
app.set('view engine', 'handlebars');

//Multer y middlewares
//const upload = multer({ dest: 'uploads/' })

//
app.use('/api/products', routerProducts);
app.use('/api', routerCarts);
app.use('/web', routerWeb);

const port = (process.env.PORT || 8080);
export const HTTPserver = app.listen(port, () => {console.log(`Server running on port: ${ port }`)});

//
//serverIO(HTTPserver)

const io = new Server( HTTPserver );
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