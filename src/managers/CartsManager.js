import { writeFile, readFile } from 'fs/promises';
import Cart from '../classes/Cart.js';

class CartsManager{
    constructor(path){
        this.path = path
    }

    async addCart(){
        try {

            const newCart = new Cart()
            const asStringify = JSON.stringify(newCart, null, '\t')
            await writeFile(this.path, asStringify)
            
            return newCart

        } catch (error) {

            res.status(400).send( {msg: error.message} )
        }
    }

    async getCartById(id){

        try {

            const cartsAsStringify = await readFile(this.path, 'utf-8')
            const cartsAsJson = JSON.parse(cartsAsStringify)
            return cartsAsJson.find(cart => cart.id === id)

        } catch (error) {
            res.status(400).send( {msg: error.message} )
        }
    }

    async addToCart(cid, { product }){
        try {
            const cartsAsStringify = await readFile(this.path, 'utf-8')
            const cartsAsJson = JSON.parse(cartsAsStringify)

            const indexCart = cartsAsJson.findIndex(cart => cart.id === cid)

            cartsAsJson[indexCart].addProductToCart({ product })
            
            await writeFile(this.path, cartsAsJson)

        } catch (error) {
            res.status(400).send( {msg: error.message} )
        }
    }
}

export default CartsManager;