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

        //obtenemos los carritos guardados en el file
        const cartsAsJson = JSON.parse(await readFile(this.path, 'utf-8'))
        
        //Cargamos el producto al carrito que tiene el id=cid
            
        cartsAsJson.forEach( (cart) =>  {

            if(cart.id === cid){
                
                cart.productsCart.push({ id: pid, quantity: 1 })
            
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