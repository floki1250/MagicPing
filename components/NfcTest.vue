<template>
    <div class="grid grid-cols-2 gap-4">
        <UButton @click="shareMessage" icon="i-solar-share-bold-duotone" variant="soft">Share Message</UButton>
        <UButton @click="openSettings" icon="i-solar-settings-bold-duotone" variant="soft">Settings</UButton>
        <h1>Status: {{ status }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const cordova = window.cordova
const status = ref("")
if (!cordova) {
    status.value = 'cordova not available'
    console.log('cordova not available')
} else {
    status.value = 'cordova available'
    console.log('cordova available')
}

// Trigger permission requests when button is clicked
const shareMessage = () => {
    const message = [
        ndef.textRecord("Hello, world"),
        ndef.uriRecord("http://github.com/chariotsolutions/phonegap-nfc")
    ]

    nfc.write(message, () => {
        console.log('Successfully wrote to NFC tag')
    }, error => {
        console.log('Write failed: ' + error)
    })
}

const openSettings = () => {
    nfc.showSettings(() => {
        console.log('Opened NFC settings')
    }, error => {
        console.log('Failed to open settings: ' + error)
    })
}
</script>
