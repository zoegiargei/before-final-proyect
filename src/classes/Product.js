import uuid from "uuid";
class Product{
    constructor({ title, description, code, price, status=true, stock, category, thumbnail }){ //status harcodeado

        //Validamos que se manden todos los campos
        if(!title){throw new Error("Didn't enter the title")}
        if(!description){throw new Error("Didn't enter the description")}
        if(!code){throw new Error("Didn't enter the code")}
        if(!price){throw new Error("Didn't enter the price")}
        if(!stock){throw new Error("Didn't enter the stock")}
        if(!category){throw new Error("Didn't enter the category")}

        //if(Object.values(product).some(atribute => (atribute === '' || atribute === undefined))){

        this.title = title,
        this.description = description,
        this.code = code,
        this.price = price,
        this.status = status,
        this.stock = stock,
        this.category = category,
        this.thumbnail = thumbnail,
        this.id = uuid() //Ver como hacer para que no se actualize id cuando hacemos put
    }
};

export default Product;