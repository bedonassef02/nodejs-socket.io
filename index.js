const app = require('express')();
const http = require('http').Server(app);

const path = require('path');

const io = require('socket.io')(http);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

csnp = io.of('/custom-namespace');

csnp.on('connection', (socket) => {
    console.log('A user connected');

    csnp.emit('testEvent', 'Hello from custom namespace');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});