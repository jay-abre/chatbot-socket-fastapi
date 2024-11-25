const socket = new WebSocket("ws://localhost:8000/ws/chat");

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];

        // Initialize WebSocket connection
        this.socket = socket; // Connect to the WebSocket server

        // Listen for responses from the server
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received response:', data); // Debug log
            let msg = { name: data.sender_id === "User" ? "You" : "ChaMi", message: data.message };
            this.messages.push(msg);
            this.updateChatText(this.args.chatBox);
        };
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // Show or hide the box
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        console.log('Sending message:', text1); // Debug log

        // Add the user's message to the chatbox immediately
        let msg1 = { name: "You", message: text1 };
        this.messages.push(msg1);
        this.updateChatText(chatbox);

        // Send the user's message to the WebSocket server
        this.socket.send(JSON.stringify({ message: text1 }));

        textField.value = ""; // Clear input field
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, number) {
            if (item.name == "ChaMi") {
                html += '<div class="messages__item messages__item--visitor"><strong>' + item.name + ':</strong> ' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator"><strong>' + item.name + ':</strong> ' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbot = new Chatbox();
chatbot.display();