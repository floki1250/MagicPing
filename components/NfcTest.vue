<template>
    <div class="grid grid-cols-4 gap-4">
        <UButton @click="shareMessage" icon="i-solar-share-bold-duotone" variant="soft">Share Message</UButton>
        <UButton @click="openSettings" icon="i-solar-settings-bold-duotone" variant="soft">Settings</UButton>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
const permissions = cordova.plugins.permissions;

onMounted(() => {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady () {
    // Check if NFC permission is granted
    permissions.hasPermission(permissions.NFC, status => {
        if (!status.hasPermission) {
            alert('NFC permission not granted. Requesting permission...');
            permissions.requestPermission(permissions.NFC, success => {
                alert('NFC permission granted');
                enableNFC();
            }, error => {
                alert('NFC permission denied');
            });
        } else {
            enableNFC();
        }
    });
}

function enableNFC () {
    // Enable NFC if the permission is granted
    nfc.enabled(
        () => {
            alert('NFC is enabled');
            console.log('NFC is enabled');
        },
        error => {
            alert('NFC is not enabled: ' + error);
            console.log('NFC error: ' + error);
        }
    );

    // Add the NFC tag reading listener
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
