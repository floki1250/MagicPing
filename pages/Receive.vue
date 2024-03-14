<template>
    <div>
        <h2>
            Receiver
            <p>{{ characterName }}</p>
            <img :src="qrcode" alt="QR Code" v-if="qrcode" />
        </h2>
        <hr />
        <p v-if="messageReceived">{{ messageReceived }}</p>
    </div>
</template>

<script setup>
import { useQRCode } from "@vueuse/integrations/useQRCode";

import { ref, onMounted } from "vue";
import Peer from "peerjs";
import { uniqueNamesGenerator, starWars, adjectives } from "unique-names-generator";

const characterName = uniqueNamesGenerator({
    dictionaries: [adjectives, starWars],
}).replace(/\s/g, "");
let qrcode = useQRCode(characterName);
const messageReceived = ref("");
const myPeer = new Peer(characterName, {});

onMounted(() => {
    myPeer.on("connection", (conn) => {
        conn.on("data", (data) => {
            messageReceived.value = data;
        });
    });
});
</script>
