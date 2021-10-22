const express = require("express")
const port= process.env.PORT || 4000
const socket = require("socket.io")

const app = express()
app.use(express.static("public"))


const server = app.listen(port, function(){
    console.log(`Listening on http://localhost:${port}`)
})

//socket.io
const io = socket(server)

/* Listen for clients connections */
io.on('connection', function(socket){
    console.log(`New Socket connection Socket-id: ${socket.id}`)

    /* listen for messages of that client (socket) */
    socket.on("chat", (data)=>{
        /* sends this message to all connected sockets */
        io.sockets.emit("chat", data)
    })

    socket.on("typing", (data)=>{
        socket.broadcast.emit("typing", data)
    })
})



