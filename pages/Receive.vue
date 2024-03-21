<template>
    <div>
        <h2>
            Receiver
            <p>{{ characterName }}</p>
            <img :src="qrcode" alt="QR Code" v-if="qrcode" />
            <UButton @click="handleFileDownload" v-if="receivedFile">Download : {{ receivedFile.name }}</UButton>
            <p class="text-gray-500 flex flex-wrap w-40">{{ receivedFile }}</p>
            <hr />
            <p v-if="messageReceived">{{ messageReceived }}</p>
        </h2>
        <hr />
    </div>
</template>

<script setup>
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { download } from "downloadjs";
import { ref, onMounted } from "vue";
import Peer from "peerjs";
import { uniqueNamesGenerator, starWars, adjectives } from "unique-names-generator";

const characterName = uniqueNamesGenerator({
    dictionaries: [adjectives, starWars],
}).replace(/\s/g, "");
let qrcode = useQRCode(characterName);
const messageReceived = ref("");
const myPeer = new Peer(characterName, {});
const receivedFile = ref(null);
const receivedChunks = ref([]); const receivedFile = ref(null);

const chunkSize = 16 * 1024;
onMounted(() => {
    myPeer.on("connection", (conn) => {
        conn.on("data", (data) => {
            if (typeof data === "string") {
                messageReceived.value = data;
                console.log(typeof data);
                if (typeof data === "object") {
                    // Check for metadata
                    receivedFile.value = data;
                } else {
                    receivedChunks.value.push(data);
                }

                if (
                    receivedChunks.value.length === Math.ceil(receivedFile.value.size / (1024 * 1024))
                ) {
                    // Download completed, trigger download logic
                    const blob = new Blob(receivedChunks.value, {
                        type: receivedFile.value.type,
                    });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = receivedFile.value.name;
                    link.click();

                    window.URL.revokeObjectURL(url);
                }
            } else {
                receivedFile.value = data;
            }

            if (
                receivedFile.value.chunks.length ===
                Math.ceil(receivedFile.value.size / chunkSize)
            ) {
                handleFileDownload();
            }
        });
    });
});
async function handleFileDownload () {
    const blob = new Blob(receivedFile.value.chunks, {
        type: receivedFile.value.type,
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = receivedFile.value.name;
    link.click();
    window.URL.revokeObjectURL(url); // Clean up memory leak
}
</script>
