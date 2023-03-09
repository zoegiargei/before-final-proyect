import { Router } from 'express';
import { contrGetProd } from '../controllers/controllersProducts.js';
import { contrGetProducts } from '../controllers/controllersProducts.js';
import { contrPostProd } from '../controllers/controllersProducts.js';
import { contrPutProd } from '../controllers/controllersProducts.js';
import { contrDelProd } from '../controllers/controllersProducts.js';

//Multer --> librería para subir archivos desde un formulario(cliente)
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })
//

const routerProducts = Router();


routerProducts.get('/:pid', contrGetProd)

routerProducts.get('/', contrGetProducts)

routerProducts.post('/', upload.single('uploaded_thumbnail'), contrPostProd)

routerProducts.put('/:pid', contrPutProd)

routerProducts.delete('/:pid', contrDelProd)


export default routerProducts;