const app = require('./src/app.js');
const dotenv = require('dotenv').config();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST"],
    }
});

io.on('connection', () => {
    console.log('User connected');
})


server.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));