import express from 'express';
import Manager from './controllers/managers/Manager.js';
import CartsManager from './controllers/managers/CartsManager.js'

import routerProducts from './routers/routerProducts.js';
import routerCarts from './routers/routerCarts.js';
import routerWeb from './routers/routerWeb.js';
import { engine } from 'express-handlebars';
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

//
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

//Multer y middlewares
//const upload = multer({ dest: 'uploads/' })

//
app.use('/api/products', routerProducts);
app.use('/api', routerCarts);
app.use('/web', routerWeb);

const PORT = 8080;
const HTTPserver = app.listen(PORT, () => {console.log(`connected to PORT ${PORT}`)});

//
export const io = new Server( HTTPserver );

io.on('connection', socketSideServer => {

    console.log("nuevo cliente conectado!")
    
    socketSideServer.on('message', data =>{
        console.log(data)
    })
})