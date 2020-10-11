const path = require('path');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');

const routes = require('./routes');

require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    next();
});

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('MongoDB Connected');
    server.listen(process.env.PORT || 8080, () => {
        console.log('Server running on 8080');
    });
})