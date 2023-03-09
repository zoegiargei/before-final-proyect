import { Router } from 'express';
import { contrShowAllproducts } from '../controllers/controllersWeb.js';

const routerWeb = Router();

routerWeb.get('/', contrShowAllproducts)

routerWeb.get('/realtimeproducts', async (req, res) => { res.render('realTimeProducts') })

routerWeb.get('/addProducts', async (req, res) => { res.render('addProducts') })


export default routerWeb;