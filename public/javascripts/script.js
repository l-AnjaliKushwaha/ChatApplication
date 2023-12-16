// const { Socket } = require("socket.io");

var socket = io();
let name;
let textarea = document.getElementById('textarea');
let button = document.querySelector('button');
let messageArea = document.querySelector('.message_area');

do {
            name = prompt('Please enter your name: ')
} while (!name)

button.addEventListener("click", () => {

            sendMessage(textarea.value);

})

function sendMessage(message) {
            let msg = {
                        user: name,
                        message: message.trim()
            }

            //Append
            appendMessage(msg, 'outgoing');
            textarea.value = ''
            scrollToBottom();

            //send message to server
            socket.emit('message', msg)
}

function appendMessage(msg, type) {
            let mainDiv = document.createElement('div');
            let className = type;
            mainDiv.classList.add(className, 'message');

            let markup = `
            <h4> ${msg.user} </h4>
            <p> ${msg.message} </p>

            `
            mainDiv.innerHTML = markup
            messageArea.appendChild(mainDiv);

}

// Recieve messages 
socket.on('message', (msg) => {
            appendMessage(msg, 'incoming')
            scrollToBottom()
})

function scrollToBottom() {
            messageArea.scrollTop = messageArea.scrollHeight
}

