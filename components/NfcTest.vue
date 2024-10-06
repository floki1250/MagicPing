<template>
    <div class="grid grid-cols-4 gap-4">
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

// Function to handle the device ready event
function onDeviceReady () {
    console.log('Device is ready'); // Log device readiness
    alert('Device is ready!'); // Confirm the event is firing

    // Check if NFC is enabled
    nfc.enabled(
        () => {
            alert('NFC is enabled'); // Confirm NFC is enabled
            console.log('NFC is enabled');
        },
        error => {
            alert('NFC is not enabled: ' + error);
            console.log('NFC error: ' + error);
        }
    );

    // Add NFC tag reading listener
    nfc.addNdefListener(onNfcMessageRead,
        () => {
            alert("Listening for NFC tags");
            console.log("Listening for NFC messages");
        },
        error => {
            alert("Error adding NFC listener: " + error);
            console.log("Error adding NFC listener: " + error);
        }
    );
}

// Function to read NFC message
function onNfcMessageRead (nfcEvent) {
    var tag = nfcEvent.tag;
    var ndefMessage = tag.ndefMessage;

    if (ndefMessage) {
        var payload = nfc.bytesToString(ndefMessage[0].payload);
        alert("NFC message: " + payload);
        console.log("Read NFC message:", payload);
    } else {
        alert("No NDEF message found");
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
        () => {
            alert('Successfully wrote to NFC tag');
            console.log('Wrote data to NFC tag');
        },
        error => {
            alert("Write failed: " + error);
            console.log("Write failed: " + error);
        }
    );
}

// Function to open NFC settings
const openSettings = () => {
    nfc.showSettings(
        () => {
            alert('NFC settings opened');
        },
        error => {
            alert("Failed to open settings: " + error);
            console.log("Failed to open settings: " + error);
        }
    );
}
</script>
