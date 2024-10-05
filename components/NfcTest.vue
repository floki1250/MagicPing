<template>
    <div>
        <h1>NFC Example</h1>
        <button @click="writeNFC">Write NFC Tag</button>
        <p v-if="nfcMessage">NFC Message: {{ nfcMessage }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Reactive state to hold NFC message
const nfcMessage = ref('');

// Function to handle NFC reading
const onNFCRead = (nfcEvent) => {
    const tag = nfcEvent.tag;
    nfcMessage.value = tag.ndefMessage
        ? nfc.bytesToString(tag.ndefMessage[0].payload)
        : 'No NDEF data';
};

// Function to write to NFC tag
const writeNFC = () => {
    const message = [
        ndef.textRecord('Hello from Nuxt 3 with Cordova!')
    ];

    nfc.write(message).then(() => {
        alert('NFC Tag written successfully!');
    }).catch(err => {
        console.error('Failed to write NFC tag:', err);
    });
};

onMounted(() => {
    if (window.cordova) {
        document.addEventListener('deviceready', () => {
            console.log('Device is ready, initializing NFC...');
            // Initialize NFC listener
            nfc.addNdefListener(onNFCRead, () => {
                console.log('Listening for NFC Tags...');
            }, (err) => {
                console.error('Error adding NFC listener:', err);
            });
        }, false);
    }
});

onBeforeUnmount(() => {
    if (window.cordova) {
        document.removeEventListener('deviceready', null);
        nfc.removeNdefListener(onNFCRead, () => {
            console.log('Stopped NFC listener');
        }, (err) => {
            console.error('Error removing NFC listener:', err);
        });
    }
});
</script>
