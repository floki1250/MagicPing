<!-- index.vue -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { Peer } from "peerjs";
const peer = new Peer("1250");
const received = ref('');
function connect () {
  console.log("Connecting...")
  const conn = peer.connect("1251");
  conn.on("open", () => {
    conn.send("hi!");
  });
}
function receive () {
  received.value = 'loading...'
  peer.on("connection", (conn) => {
    conn.on("data", (data) => {
      // Will print 'hi!'
      console.log(data);
      received.value = data
    });
    conn.on("open", () => {
      conn.send("hello!");
    });
  });
}

</script>
