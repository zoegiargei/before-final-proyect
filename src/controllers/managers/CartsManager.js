import { writeFile, readFile } from 'fs/promises';
import Cart from '../../models/Cart.js';

class CartsManager{

    constructor(path){
        this.path = path
        this.carts = []
    };

    async read(){
        const asJson = JSON.parse(await readFile(this.path, 'utf-8'))
        return asJson
    }

    async write(){
        await writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
    }

    async addCart(){

        const newCart = new Cart()
        this.carts = await this.read()
        this.carts.push(newCart)
        await this.write()
        
        return newCart
    };

    async getCartById(id){

        const cartsAsJson = await this.read()
        return cartsAsJson.find(cart => cart.id === id)
    };

    async addToCart(cid, pid){

        const cartsAsJson = await this.read()
            
        cartsAsJson.forEach( cart =>  {

            if(cart.id === cid){

                //validar si el producto ya existe en el carrito y aumentar su quantity
                if(cart.productsCart.find(prod => prod.id === pid)){
                    
                    const index = cart.productsCart.findIndex(prod => prod.id === pid)
                    const aux = [...cart.productsCart]
                    aux[index].quantity = aux[index].quantity + 1
                    cart.productsCart = aux

                }else{
                    
                    cart.productsCart.push({ id: pid, quantity: 1 })
                }
            }
        })

        this.carts = cartsAsJson
        await this.write()
    };

    async replaceOne(id, newElement){
        
        this.carts = await this.read()
        const index = this.carts.findIndex(elem => elem.id === id)
        
        if(index === -1){ throw Error("Element not found") }

        this.carts[index] = newElement
        await this.write()
    }

};
export default CartsManager;