import { cartsManager } from '../server.js';
import { productsManager }  from '../server.js';

export const contrPostCart = async (req, res) => {

    const newCart = await cartsManager.addCart()
    res.json({ newCart })
};


export const contrGetCart = async (req, res) => {
    const cid = req.params.cid
    const cart = await cartsManager.getCartById(cid)
    res.json({ cart })
};

export const contrProdInCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
    
        const productById = await productsManager.getElementByIdentifier(pid)

        //A modo de test
        //console.log(productById)

        if(!productById){
            res.status(400).send({status:"error", error:"Product not existing"})
        }
        
        await cartsManager.addToCart(cid, pid)
        res.send({ status:"success", message:"Product added to cart" })

    } catch (error) {

        console.log(error)
        res.status(400).send({ status:"error", error:"Not possible" })
    }
};