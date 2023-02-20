import { writeFile, readFile } from 'fs/promises';
import Product from '../classes/Product.js';

class Manager{

    constructor(path){
        this.path = path
        this.elements = []
    };

    async addElement({ title, description, code, price, status, stock, category, thumbnail }){

        const newElement = new Product({ title, description, code, price, status, stock, category, thumbnail })

        if((Object.values(newElement).some(atribute => (atribute === '' || atribute === undefined)))){
        
            throw new Error("Didn't complete some field")
        
        } else{

            if((JSON.parse(await readFile(this.path, 'utf-8'))).some(prod => prod.code === newElement.code)){
                    
                throw new Error("There cannot be two identical CODE")
                
            } else{
                
                this.elements.push(newElement)
                const elementsAsString = JSON.stringify(this.elements, null, '\t')
                await writeFile(this.path, elementsAsString)
            }
    
            return newElement
        }

    };

    async getElements( {field, value} = {} ){

        const allElements = JSON.parse(await readFile(this.path, 'utf-8'))

        if(!field){
            return allElements
        } else{
            allElements.filter(elem => {
                return elem[field] === value
            })
        }
    };

    /*     async getElements(){
        return JSON.parse(await readFile(this.path, 'utf-8'))
    }; */

    /*     async getElementByIdentifier({field: fieldName, value: valueName}){

        const allElements = JSON.parse(await readFile(this.path, 'utf-8'))
        return allElements.find(elem => elem[fieldName] === valueName)

    }; */

    async getElementByIdentifier(id){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = JSON.parse(asStringify)
        return asJson.find(prod => prod.id === id)
    };

    async updateElementsFile(newArray){

        this.elements = newArray
        const elementsAsString = JSON.stringify(this.elements, null, '\t')
        await writeFile(this.path, elementsAsString)
    }

};

export default Manager;