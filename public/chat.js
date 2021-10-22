// make connection to the server


let SERVER_DEVELOPMENT = ()=>{return "http://localhost:4000";}
//let SERVER_PRODUCTION = (PORT)=>{ return `https://nodejs-chat-socket-io.herokuapp.com/${PORT}`;}

//console.log(SERVER_PRODUCTION(process.env.PORT))
const socket = io.connect("https://nodejs-chat-socket-io.herokuapp.com/");

// Query dom
let message = document.querySelector("#message")
let handle = document.querySelector("#handle")
let btn = document.querySelector("button")
let output = document.querySelector("#output")
let feedback = document.querySelector("#feedback")


// emit event ()
btn.addEventListener("click", ()=>{
    /* send a message trough the socket */
    socket.emit('chat', {
        handler: handle.value,  // the person who wrote the message
        message: message.value  // the message itself
    });
});

message.addEventListener("keypress", ()=>{
    socket.emit("typing", handle.value);
})

// listen for events (when server sends messages to its clients)
socket.on("chat", (data)=>{
    /* Clean the client that are typing a message*/
    feedback.innerHTML=""
    /* new messgae received from the server*/
    output.innerHTML += "<p><strong>"+data.handler+"</strong>"+data.message+"</p>";
})

socket.on("typing", (data)=>{
    feedback.innerHTML = "<p><em>"+data+" is typing...</em></p>"
})