import { Router } from 'express';
import { productsManager } from "../server.js";

const routerWeb = Router();

routerWeb.get('/', async (req, res)=>{

    const allProducts = await productsManager.getElements()
    const thIsProducts = allProducts.length > 0
    res.render('index', { title: 'Home', thIsProducts: thIsProducts , products: allProducts}) //Si omito la extensión de index.handlebars el render va a ir a buscar archivos .handlebars por el middleware que definimos antes
})

routerWeb.get('/realtimeproducts', async (req, res)=>{

    //res.sendFile('productsinrealtime.html', { root: './public'})
    res.render('realTimeProducts', {})
})

routerWeb.get('/addProducts', async (req, res)=>{
    res.render('addProducts')
})


export default routerWeb;