// make connection to the server
const socket = io.connect("http://localhost:4000");

// Query dom
let message = document.querySelector("#message")
let handle = document.querySelector("#handle")
let btn = document.querySelector("button")
let output = document.querySelector("#output")


// emit event ()
btn.addEventListener("click", ()=>{
    /* send a message trough the socket */
    socket.emit('chat', {
        handler: handle.value,  // the person who wrote the message
        message: message.value  // the message itself
    });
});

// listen for events (when server sends messages to its clients)
socket.on("chat", (data)=>{
    /* new messgae received from the server*/
    output.innerHTML += "<p><strong>"+data.handler+"</strong>"+data.message+"</p>";
})