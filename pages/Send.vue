<template>
  <div
    class="dark:bg-black/70  bg-white/50 border border-gray-200 dark:border-gray-500  h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg p-4">
    <UBreadcrumb :links="[{
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    }, {
      label: 'Send',
      icon: 'i-line-md-telegram'
    }]" />
    <br>
    <h1 class="text-3xl text-bold reem-kufi dark:text-white  text-black/70">
      Sender
    </h1>
    <p class="reem-kufi text-gray-500">I'm {{ characterName }}</p>

    <UDivider class="my-4" />
    <div class="flex justify-between">
      <UButtonGroup size="sm" orientation="horizontal">
        <UInput color="primary" variant="outline" type="text" v-model="receiver" placeholder="Enter receiver" />
        <UButton icon="i-solar-qr-code-bold-duotone" color="primary" variant="solid" @click="scan" />
      </UButtonGroup>
      <UButton @click="connect" variant="solid" icon="i-solar-link-line-duotone">Connect</UButton>
    </div>
    <video ref="videoElement" class="w-full rounded-lg" v-show="qrscannerEl"></video>
  </div>
  <Chat />
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
