import { writeFile, readFile } from 'fs/promises';
import Product from '../../models/Product.js'
import fieldsValidation from '../validations/fileldsValidation.js';

class Manager{
    constructor(path){
        this.path = path
        this.elements = []
    };

    async createFile(){
        await this.managerPersistence.write([])
    };

    async read(){

        const asJson = JSON.parse(await readFile(this.path, 'utf-8'))
        return asJson
    };

    async write(){

        const asStringify = await writeFile(this.path, JSON.stringify(this.elements, null, '\t'))
        return asStringify
    };

    //title, description, code, price, status, stock, category, thumbnail
    async addElement(element){

        const newElement = new Product(element)

        fieldsValidation(newElement)

        this.elements = await this.read()

        if(this.elements.some(prod => prod.code === newElement.code)){
                    
            throw new Error("There cannot be two identical CODE")
            
        } else{
            
            this.elements.push(newElement)
            await this.write()
        }

        return newElement

    };

    async getElements( { field, value } = {} ){

        const allElements = await this.read()

        if(!field){
            return allElements
        } else{
            allElements.filter(elem => {
                return elem[field] === value
            })
        }
    };

    /*     async getElementByIdentifier({field: fieldName, value: valueName}){

        const allElements = JSON.parse(await readFile(this.path, 'utf-8'))
        return allElements.find(elem => elem[fieldName] === valueName)

    }; */

    async getElementByIdentifier(id){

        const asJson = await this.read()
        return asJson.find(prod => prod.id === id)
    };
    
    async modifyElement(pid, data){
        
        const allProducts = await this.read()
        const index = allProducts.findIndex(prod => prod.id === pid);
        allProducts[index] = {
            ...allProducts[index],
            ...data,
            id: pid
        }
        
        this.elements = allProducts
        await this.write()
    };

    async replaceOne(id, newElement){
        
        this.elements = await this.read()
        const index = this.elements.findIndex(elem => elem.id === id)
        
        if(index === -1){ throw Error("Element not found") }

        this.elements[index] = newElement
        await this.write()
    }

    async deleteElement(pid){

        const allProducts = await this.read()
        const currentLength = allProducts.length
        const newArray = allProducts.filter(prod => prod.id != pid)

        if (newArray.length === currentLength) {
            throw new Error("Product not found")
        }

        this.elements = newArray
        await this.write()
    };
};

export default Manager;