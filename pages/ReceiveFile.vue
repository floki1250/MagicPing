<template>
    <div>
        <h1>My ID: {{ myPeer.toString() }}</h1>
        <p v-if="messages.length">Received messages:</p>
        <ul v-if="messages.length">
            <li v-for="msg in messages" :key="msg">
                {{ msg }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import Peer from 'peerjs';

let myPeer = null;
const messages = ref([]);

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
myPeer.on('connection', (conn) => {
    conn.on('data', (data) => {
        messages.value.push(data);
    });
});
</script>
