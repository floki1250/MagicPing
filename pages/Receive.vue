<template>
    <div>
        <h2>Receiver Component {{ peerid }}</h2>
        <p v-if="fileReceived">{{ fileReceived.name }} received successfully!</p>
        <b v-if="messageReceived">{{ messageReceived }}</b>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const fileReceived = ref(null);
const messageReceived = ref("");

const peer = useNuxtApp().$peer;
const peerid = useNuxtApp().$peerid;

onMounted(() => {
    peer.on("connection", (conn) => {
        conn.on("data", (data) => {
            messageReceived.value = data;
        });
    });
});
</script>
