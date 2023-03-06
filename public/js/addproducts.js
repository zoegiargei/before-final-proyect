const socketSideClient = io();

console.log('Conectado a la ruta del servidor')
socketSideClient.emit('message', 'Hola! me estoy comunicando desde el websocket desde el lado del cliente')

const formAddProducts = document.getElementById('addProduct')
formAddProducts.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    socketSideClient.emit('newProduct', { title: dataForm.get('title'), description: dataForm.get('description'), code: dataForm.get('code'), price: dataForm.get('price'), status: dataForm.get('status'), stock: dataForm.get('stock'), category: dataForm.get('category'), thumbnail: dataForm.get('thumbnail') })
    formAddProducts.reset()
})