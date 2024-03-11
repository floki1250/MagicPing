<template>
  <div>
    <header class="bg-[#3d405b] text-white h-36">
      <div class="flex justify-between p-4">
        <div class="text-6xl font-bold font-sans">
          <h1>MagicDrop</h1>
        </div>
        <div class="text-6xl font-bold font-sans">
          <UButton :icon="$colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" size="xl" color="white"
            variant="link" @click="switchColorMode" />
        </div>
      </div>
    </header>
    <main>
      <div class="w-full min-h-12 bg-[#f2cc8f] text-black p-4 flex justify-between">
        <div>
          <h1 class="font-bold text-2xl">RECEIVING</h1>
          <p class="text-sm">
            Your device will shown as <b>{{ characterName }}</b>
          </p>
        </div>
        <div>
          <UToggle size="md" :model-value="true" />
        </div>
      </div>
      <div>
        <Peers :data="data" :loading="pending" />
        <Cloud />
      </div>
    </main>
  </div>
</template>

<script setup>
import Peer from "peerjs";
import { uniqueNamesGenerator, starWars, adjectives } from "unique-names-generator";
const characterName = uniqueNamesGenerator({
  dictionaries: [adjectives, starWars],
}).replace(/\s/g, "");

const { data, pending, refresh } = await useFetch(
  "http://192.168.137.1:9000/peerjs/peers",
  {
    transform (data) {
      return data.filter((el) => el !== characterName);
    },
  }
);
useIntervalFn(() => {
  console.log("Refreshing...");
  refresh();
}, 10000);

let myPeer = null;

// Connect to the PeerJS Server using the configured URL
const serverUrl = process.env.PEERJS_SERVER_URL || "192.168.137.1:9000";
const options = {
  host: serverUrl.split(":")[0],
  port: serverUrl.split(":")[1],
  path: "/",
  debug: 3,
};
myPeer = new Peer(characterName, options); // Connect to server
const colorMode = useColorMode();

function switchColorMode () {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>
