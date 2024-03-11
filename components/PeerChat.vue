<template>
    <div>
        <h1>Peer Chat</h1>
        <button @click="initPeer">Start Chat</button>
        <div v-if="peerId">Your Peer ID: {{ peerId }}</div>
        <div v-if="message">Received Message: {{ message }}</div>
    </div>
</template>

<script>
import SimplePeer from "simple-peer";

export default {
    data () {
        return {
            peerId: null,
            message: null,
            peer: null,
        };
    },
    methods: {
        initPeer () {
            this.peer = new SimplePeer({ initiator: location.hash === "#init" });

            this.peer.on("signal", (data) => {
                console.log("My signal:", data);
                // Share this signal with the other peer using your signaling mechanism
                // (e.g., local storage, database)
            });

            this.peer.on("data", (data) => {
                this.message = data.toString();
            });

            // Listen for incoming signals from the other peer
            // (This would typically happen in another component/page)
            window.addEventListener("peerSignal", (event) => {
                this.peer.signal(event.detail);
            });

            this.peerId = this.peer.id;
        },
    },
};
</script>
