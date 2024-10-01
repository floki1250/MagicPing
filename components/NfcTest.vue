<template>
    <div>
        <div v-if="nfcMessage">
            NFC Message: {{ nfcMessage }}
        </div>
        <div v-if="errorMessage">
            Error: {{ errorMessage }}
        </div>
        <button @click="readNFC">Read NFC</button>
        <button @click="stopNFC">Stop NFC</button>
    </div>
</template>
<script setup>
import { useNFC } from '~/composables/useNFC'

const { nfcMessage, errorMessage, readNFC, stopNFC } = useNFC()
const isNfcSupported = 'NDEFReader' in window

if (!isNfcSupported) {
    errorMessage.value = 'Web NFC is not supported by this browser.'
}
</script>
