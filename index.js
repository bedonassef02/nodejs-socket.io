const app = require('express')();
const http = require('http').Server(app);

const path = require('path');

const io = require('socket.io')(http);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    setTimeout(() => {
        socket.send('Hello from server');
        socket.emit('customEvent', { msg: 'Hello from server' });
    }, 3000);


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});