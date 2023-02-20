import uuid from 'uuid';

class Cart{
    constructor(){
        this.id = uuid(),
        this.productsCart = []
    }

    addProductToCart({ product }){

        //Validar los datos de product: id, quantity

        if(this.productsCart.find(product)){

            const index = this.productsCart.findIndex(prod => prod.id === product.id)
            const aux = [...this.productsCart]
            aux[index].quantity = (aux[index].quantity) + 1
            this.productsCart = aux
            return this.productsCart

        } else{
            
            this.productsCart.push(product)
            return this.productsCart
        }
    }
}

export default Cart;