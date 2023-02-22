import { writeFile, readFile } from 'fs/promises';
import Cart from '../classes/Cart.js';

class CartsManager{
    constructor(path){
        this.path = path
        this.carts = []
    };

    async addCart(){

        const newCart = new Cart()
        this.carts.push(newCart)
        const asStringify = JSON.stringify(this.carts, null, '\t')
        await writeFile(this.path, asStringify)
        
        return newCart
    };

    async getCartById(id){

        const cartsAsStringify = await readFile(this.path, 'utf-8')
        const cartsAsJson = JSON.parse(cartsAsStringify)
        return cartsAsJson.find(cart => cart.id === id)
    };

    async addToCart(cid, pid){

        const cartsAsJson = JSON.parse(await readFile(this.path, 'utf-8'))
            
        cartsAsJson.forEach( (cart) =>  {

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

            }else{

                throw new Error("Not possible add product to cart")
            }
            
        })
        
        //Guardamos los carritos con la nueva modificación
        const cartAsStringify = JSON.stringify(cartsAsJson, null, '\t')
        await writeFile(this.path, cartAsStringify)
    };
};
export default CartsManager;