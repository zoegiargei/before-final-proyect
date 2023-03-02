const socketSideClient = io();

console.log('Conectado a la ruta del servidor')
socketSideClient.emit('message', 'Hola! me estoy comunicando desde el websocket desde el lado del cliente')
