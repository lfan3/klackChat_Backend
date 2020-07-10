const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const soketio = require('socket.io')
const io = soketio(server)
const path = require('path')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')

const UserRouter = require('./routers/UserRouter')
const ChatRouter = require('./routers/ChatRouter')
const chatUsers = require('./users')
const { addUser } = require('./users')

app.use(cors({
    origin : 'http://localhost:8081',
    methods : ['GET', 'POST'],
    credentials:true
}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:'10mb'}))

//public users router
app.use('/users', UserRouter)

//private chatroom router
app.use('/chat', validateUser, ChatRouter)

function validateUser(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) res.json({status:"error", message:"not valide user"})
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.json({status:'error', message:err.message})
        req.user = user
        next()
    })
}

// soket
io.on('connection', (socket)=>{
    console.log('a user is connected')

    socket.on('join', ({pseudo}, callback)=>{
        let user = chatUsers.addUser({id:socket.id,pseudo })
        allUsers = chatUsers.getAllUsers()
        console.log(allUsers)
        socket.emit('message', {user:'admin', text: `WELCOME`})
        socket.broadcast.emit('message', {user:'admin', text: `${user.pseudo} has joined`})
        callback()
    })
    socket.on('sendMessage', (message, cb)=>{
        const user = chatUsers.getUserById(socket.id)
        console.log(message)
        soket.emit('message', {user: user.pseudo, text:message})
        cb()
    })
    socket.on('disconnect', ()=>{
        const user = chatUsers.removeUser(socket.id)
        if(user){
            socket.emit('message', {user: 'Admin', text: `${user.name} has left`})
        }
        console.log('client is disconnect ', socket.id)
    })
})


server.listen(5000, ()=>{
    console.log('running on 5000');
})


