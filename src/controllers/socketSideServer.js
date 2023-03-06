import { Server } from 'socket.io';
import { productsManager } from '../server.js';


function serverIO(HTTPserver){
    
    const io = new Server( HTTPserver );
    io.on('connection', async socketSideServer => {

        console.log("nuevo cliente conectado!")
    
        socketSideServer.on('message', data => {
            console.log(data)
        })
        
        const allProducts = await productsManager.getElements()
    
        socketSideServer.emit('prodInRealTime', allProducts)

        socketSideServer.on('newProduct', data => {
            console.log(data)
        })
    })
}

export default serverIO;