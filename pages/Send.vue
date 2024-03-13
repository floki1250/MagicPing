<template>
  <div>
    <h2>Simple Peer Messenger</h2>
    <p v-if="messageReceived">{{ messageReceived }}</p>

    <input v-model="messageToSend" />
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SimplePeer from "simple-peer";

const messageReceived = ref(null);
const messageToSend = ref("");
let peer;

onMounted(() => {
  peer = new SimplePeer({ initiator: true, trickle: false });

  peer.on("data", (data) => {
    // Handle received data
    if (typeof data === "string") {
      messageReceived.value = data;
    } else {
      // Handle other types of data if needed
    }
  });
});

const sendMessage = () => {
  if (peer) {
    peer.send(messageToSend.value);
  } else {
    // Create a new peer if it doesn't exist
    peer = new SimplePeer({ trickle: false });
    peer.on("data", (data) => {
      // Handle received data
      if (typeof data === "string") {
        messageReceived.value = data;
      } else {
        // Handle other types of data if needed
      }
    });
  }
};
</script>
