const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    console.log('User connected', socket.id)
    socket.emit('welcome', 'Welcome to the chat')

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log('User joined room: ', data)
    })

    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(data.roomName).emit('receive_message', data.message)
    })
})


server.listen('8080', () => {
    console.log('Server is running on port 8080')
})