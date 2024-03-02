<template>
    <div>
        <UInput type="text" v-model="message" placeholder="Enter message" />
        <UInput type="text" v-model="recipientPeerId" placeholder="Enter recipientPeerId" />
        <button @click="sendMessage">Send</button>
        <p v-if="recipientPeerId">{{ recipientPeerId }}</p>
    </div>
</template>

<script setup>
import Peer from 'peerjs';

let myPeer = null;
let recipientPeerId = ref('');
const message = ref('');

// Connect to the PeerJS Server using the configured URL
const serverUrl = process.env.PEERJS_SERVER_URL || 'localhost:9000';
const options = {
    host: serverUrl.split(':')[0],
    port: serverUrl.split(':')[1],
    path: '/',
};
const { data, pending, error, refresh } = await useFetch('http://localhost:9000/peerjs/id', {

})
myPeer = new Peer(options); // Connect to server
console.log(myPeer, options)

function sendMessage () {
    if (!recipientPeerId.value || !message.value) return;

    const conn = myPeer.connect(recipientPeerId.value);
    conn.on('connection', (el) => {
        console.log(el)
    })
    conn.on('open', () => {
        conn.send(message.value);
        message.value = ''; // Clear message input after sending
    });
    conn.on('error', (err) => {
        console.error('Connection error:', err);
        // Handle connection errors gracefully (e.g., display error message)
    });
}
</script>
