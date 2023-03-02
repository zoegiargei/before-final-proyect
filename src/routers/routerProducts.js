import { Router } from 'express';
import { productsManager } from '../server.js';

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

        const data = req.body;
        console.log(data);

        const savedProduct = await productsManager.addElement(data);

        //agregar acá req[io].socket.

        res.status(201).json({ savedProduct });
    } catch (error) {

        res.status(400).json({ msg: error.message });
    }
});

routerProducts.put('/:pid', async (req, res) => {
    try {

        const pid = req.params.pid;
        const data = req.body;

        await productsManager.modifyElement(pid, data)

        res.send({ status: "success", message: "Product updated" });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

routerProducts.delete('/:pid', async (req, res) => {
    try {
        
        const pid = req.params.pid
        productsManager.deleteElement(pid)
        return res.send({ status: "success", message: "Product deleted" })

    } catch (error) {

        return res.status(400).json({ msg: error.message })
    }
});

export default routerProducts;