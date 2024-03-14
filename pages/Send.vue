<template>
  <div>
    <h2>
      Sender
      <p>{{ characterName }}</p>
    </h2>
    <UInput type="text" v-model="receiver" placeholder="Enter receiver" />
    <UButton @click="scan">Scan Qr Code</UButton><b>{{ text }}</b>
    <video ref="videoElement" class="w-full rounded-lg" v-show="qrscannerEl"></video>

    <hr />
    <UInput type="text" v-model="messageToSend" placeholder="Enter message" />
    <UButton @click="sendMessage">Send Message</UButton>
    <UButton @click="connect">Connect</UButton>
    <hr />
    <p v-if="messageReceived">{{ messageReceived }}</p>
    <Chat />
  </div>
</template>

<script setup>
import QrScanner from "qr-scanner";
import { ref } from "vue";
import Peer from "peerjs";
import { uniqueNamesGenerator, starWars, adjectives } from "unique-names-generator";
const videoElement = ref(null);
const characterName = uniqueNamesGenerator({
  dictionaries: [adjectives, starWars],
}).replace(/\s/g, "");
const text = ref("");
let qrScanner;
const qrscannerEl = ref(false);
async function scan () {
  qrscannerEl.value = true;
  try {
    qrScanner = new QrScanner(videoElement.value, (r) => (text.value = r.data), {
      onDecodeError: (error) => console.error(error),
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true,
    });

    await qrScanner.start();
  } catch (error) {
    console.log(error);
    qrscannerEl.value = false;
  }
}
const messageReceived = ref("");
const messageToSend = ref("");
const receiver = ref("");
const myPeer = new Peer(characterName, {});

const connect = () => {
  const conn = myPeer.connect(receiver.value);
  conn.on("open", () => {
    console.log("Connected to peer");
    conn.on("data", (data) => {
      messageReceived.value = data;
    });
  });
};

const sendMessage = () => {
  const conn = myPeer.connect(receiver.value);
  conn.on("open", () => {
    conn.send(messageToSend.value);
    messageToSend.value = ""; // Clear the input field after sending message
  });
};
</script>
