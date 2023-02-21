import { writeFile, readFile } from 'fs/promises';
import Cart from '../classes/Cart.js';

class CartsManager{
    constructor(path){
        this.path = path
        this.carts = []
    }

    async addCart(){

        const newCart = new Cart()
        this.carts.push(newCart)
        const asStringify = JSON.stringify(this.carts, null, '\t')
        await writeFile(this.path, asStringify)
        
        return newCart
    }

    async getCartById(id){

        const cartsAsStringify = await readFile(this.path, 'utf-8')
        const cartsAsJson = JSON.parse(cartsAsStringify)
        return cartsAsJson.find(cart => cart.id === id)
    }

    async addToCart(cid, { product }){

        //obtenemos los carritos guardados en el file
        const cartsAsJson = JSON.parse(await readFile(this.path, 'utf-8'))

        //obtenemos la posicion de donde se encuentra nuestro carrito al que le queremos agregar un producto a su array
        //const indexCart = cartsAsJson.findIndex(cart => cart.id === cid)

        /*         cartsAsJson.forEach(cart => {

            if(cart.id === cid){
                if(cart.products.length > 0){
                    console.log(cart.products)
                } else{
                    cart.products.push({product})
                }
            }
        }) */

        cartsAsJson.map(cart => {
            if(cart.id === cid){
                cart.products.push({product})
                console.log(cart.product)
            }
        })

        const cartAsStringify = JSON.stringify(cartsAsJson, null, '\t')
        await writeFile(this.path, cartAsStringify)
    }
}
export default CartsManager;