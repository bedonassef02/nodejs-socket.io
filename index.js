const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let room = 1;
let full = 0;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.join('room-' + room);

    io.sockets.in('room-' + room).emit('connectedRoom', 'you are connected to room ' + room);

    full++;

    if(full == 2){
        room++;
        full = 0;
    }

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});