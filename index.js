const express = require("express")
const port= 4000
const socket = require("socket.io")

const app = express()
app.use(express.static("public"))


const server = app.listen(port, function(){
    console.log(`Listening on http://localhost:${port}`)
})

//socket.io
const io = socket(server)

io.on('connection', function(socket){
    console.log("mde socket connection")
})



