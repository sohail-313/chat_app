const express = require("express");
const app = express();

const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = require('http').createServer(app);


//Socket.IO

const io = new Server(server, {
    cors:{
        origin: "https://react-chat-nd2tzops1-sohail-313.vercel.app",
        methods: ["GET", "POST"],
    },
})

io.on('connection', (socket) =>{
    console.log(`User ${socket.id} is Connected`);


    socket.on('join_room', (roomNo)=>{
       socket.join(roomNo)
    })

    socket.on('send_message', (data) =>{
        console.log(data)
        socket.to(data.room).emit("receive_message", data);
    })
    socket.on('disconnect',()=>{
        console.log("User Disconnected", socket.id)
    })
})




server.listen(3001, ()=>{
    console.log("Server Started")
})