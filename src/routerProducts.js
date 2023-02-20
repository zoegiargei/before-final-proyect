import { Router } from 'express';
import { productsManager } from './main.js';

const routerProducts = Router();

routerProducts.get('/:pid', async (req, res) => {

    const searchedId = req.params.pid;
    const product = await productsManager.getElementByIdentifier(searchedId);

    res.json({ product });
});

routerProducts.get('/', async (req, res) => {

    const limit = req.query.limit;
    const stock = parseInt(req.query.stock);
    const allProducts = await productsManager.getElements();

    if (limit) {

        const productsSlice = allProducts.slice(0, limit);
        return res.json({ productsSlice });
    }

    if (stock) {
        const productsByStock = await productsManager.getElements({ field: 'stock', value: stock });
        return res.json({ productsByStock });
    }

    return res.json({ allProducts });
});

routerProducts.post('/', async (req, res) => {

    try {

        const newProduct = req.body;
        console.log(newProduct);

        const savedProduct = await productsManager.addElement(newProduct);

        res.status(201).json({ savedProduct });
    } catch (error) {

        res.status(400).json({ msg: error.message });
    }
});

routerProducts.put('/:pid', async (req, res) => {
    try {
        const searchedId = req.params.pid;
        const infoInBody = req.body;

        const allProducts = await productsManager.getElements();
        console.log(allProducts);
        //const product = await productsManager.getElementByIdentifier({campo: 'id', value: searchedId})
        const index = allProducts.findIndex(prod => prod.id === searchedId);
        allProducts[index] = {
            ...allProducts[index],
            ...infoInBody,
            id: searchedId
        };

        productsManager.updateElementsFile(allProducts);

        res.send({ status: "success", message: "Product updated" });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

routerProducts.delete('/:pid', async (req, res) => {

    const searchedId = req.params.pid;
    const allProducts = await productsManager.getElements();
    const currentLength = allProducts.length;

    console.log(currentLength);

    const newArray = allProducts.filter(prod => prod.id != searchedId);

    if (newArray.length === currentLength) {
        return res.status(400).json({ status: "error", error: "Product not found" });
    }

    await productsManager.updateElementsFile(newArray);

    return res.send({ status: "success", message: "Product deleted" });

});

export default routerProducts;