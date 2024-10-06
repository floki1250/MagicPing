<template>
    <div>
        <h1>NFC Text Sharing</h1>

        <div>
            <label for="mimeType">MIME Type:</label>
            <input type="text" v-model="mimeType" placeholder="text/plain">
        </div>

        <div>
            <label for="payload">Payload:</label>
            <input type="text" v-model="payload" placeholder="Enter text to share">
        </div>

        <button @click="shareMessage">Share via NFC</button>
        <button @click="loadSampleData">Load Sample Data</button>

        <div v-if="status" id="status">{{ status }}</div>
    </div>
</template>

<script setup>
// Import necessary libraries for NFC, if available in Cordova environment
import { ref, onMounted } from 'vue'

// State variables
const mimeType = ref('text/plain')
const payload = ref('Hello from PhoneGap')
const status = ref('')
let sampleDataIndex = 0

// Sample NFC data
const sampleData = [
    { mimeType: 'text/pg', payload: 'Hello PhoneGap' },
    { mimeType: 'game/rockpaperscissors', payload: 'Rock' },
    {
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\nVERSION:2.1\nN:Coleman;Don;;;\nFN:Don Coleman\nORG:Chariot Solutions;\nTEL:215-358-1780\nEMAIL:dcoleman@chariotsolutions.com\nEND:VCARD'
    }
]

// Lifecycle hook to wait until device is ready
onMounted(() => {
    document.addEventListener('deviceready', () => {
        console.log('Device is ready!')
    })
})

// Function to share message via NFC
const shareMessage = () => {
    if (!window.nfc || !window.ndef) {
        alert("NFC or NDEF plugin not found!")
        return
    }

    const record = window.ndef.mimeMediaRecord(mimeType.value, window.nfc.stringToBytes(payload.value))

    // Share NFC record
    window.nfc.share(
        [record],
        () => {
            navigator.notification.vibrate(100)  // Vibrate on success
            setStatus("Message sent successfully!")
        },
        (error) => {
            alert("Failed to share: " + error)
            setStatus("Error while sharing message")
        }
    )
}

// Function to load sample data into inputs
const loadSampleData = () => {
    const sample = sampleData[sampleDataIndex]

    mimeType.value = sample.mimeType
    payload.value = sample.payload

    sampleDataIndex++
    if (sampleDataIndex >= sampleData.length) {
        sampleDataIndex = 0
    }
}

// Function to set status message
const setStatus = (message) => {
    status.value = message
    setTimeout(() => { status.value = '' }, 3000)
}
</script>

<style scoped>
h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

input {
    display: block;
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
    max-width: 300px;
}

button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}

#status {
    margin-top: 1rem;
    color: green;
}
</style>
