<template>
    <div class="grid grid-cols-2 gap-4">
        <UButton @click="shareMessage" icon="i-solar-share-bold-duotone" variant="soft">Share Message</UButton>
        <UButton @click="openSettings" icon="i-solar-settings-bold-duotone" variant="soft">Settings</UButton>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Wait until the device is ready
onMounted(() => {
    document.addEventListener("deviceready", onDeviceReady, false);
});

// Function to handle device ready event
function onDeviceReady () {
    // Enable NFC
    nfc.enabled(
        () => alert('NFC enabled'),
        error => alert(error)
    );

    // Add NFC tag reading listener
    nfc.addNdefListener(onNfcMessageRead,
        () => console.log("Listening for NFC messages"),
        error => console.log("Error adding NFC listener: " + error)
    );

    // Vibrate the device to indicate readiness
    navigator.vibrate(1000);
}

// Function to read NFC message
function onNfcMessageRead (nfcEvent) {
    var tag = nfcEvent.tag;
    var ndefMessage = tag.ndefMessage;

    if (ndefMessage) {
        // Iterate through the NDEF records
        var payload = nfc.bytesToString(ndefMessage[0].payload);
        console.log("Read NFC message:", payload);
        alert("NFC message: " + payload);
    }
}

// Function to share a message via NFC
const shareMessage = () => {
    var message = [
        ndef.textRecord("Hello, world"),
        ndef.uriRecord("http://github.com/chariotsolutions/phonegap-nfc")
    ];

    nfc.write(
        message,
        () => console.log('Wrote data to NFC tag'),
        error => console.log("Write failed: " + error)
    );
}

// Function to open NFC settings
const openSettings = () => {
    nfc.showSettings();
}
</script>
