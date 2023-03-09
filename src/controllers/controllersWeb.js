import { productsManager } from "../server.js";

export const contrShowAllproducts = async (req, res) => {

    const allProducts = await productsManager.getElements()
    const thIsProducts = allProducts.length > 0
    res.render('index', { title: 'Home', thIsProducts: thIsProducts , products: allProducts}) //Si omito la extensión de index.handlebars el render va a ir a buscar archivos .handlebars por el middleware que definimos antes
};