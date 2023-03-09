function fieldsValidation(element){
    if((Object.values(element).some(atribute => (atribute === '' || atribute === undefined)))){
        
        throw new Error("Didn't complete some field")
    } else{
        return
    }
}

export default fieldsValidation;