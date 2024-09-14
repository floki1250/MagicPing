<template>
    <div>
        <UButton block @click="startNFC">Start NFC</UButton>
        <p v-if="nfcData">NFC Data: {{ nfcData }}||</p>
        <p v-if="err">{{ err }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const nfcData = ref(null);
const err = ref(null);
async function startNFC () {
    if (process.client && 'NFCReader' in window) {
        try {
            const reader = new NFCReader();

            reader.onreading = (event) => {
                const { serialNumber } = event;
                nfcData.value = serialNumber;
            };

            await reader.scan();
            console.log('NFC scanning started');
        } catch (error) {
            console.error('Error while scanning NFC:', error);
        }
    } else {
        console.log('Web NFC is not supported ');
        err.value = 'Web NFC is not supported';
    }
}

onMounted(() => {
    // Optional: Start scanning NFC when the component is mounted
});
</script>
