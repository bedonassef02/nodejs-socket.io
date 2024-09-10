const app = require('express')();
const http = require('http').Server(app);

const path = require('path');

const io = require('socket.io')(http);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let users = 0;

io.on('connection', (socket) => {
    console.log('A user connected');

    users++;
    io.emit('newUser', { message: 'New user connected' });


    socket.on('disconnect', () => {
        console.log('User disconnected');

        users--;
        io.sockets.emit('userDisconnected', { message: 'User disconnected' });
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});